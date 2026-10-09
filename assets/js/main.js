import { BUILTIN_PROMPTS } from './data/prompts.js';
import { ACTIONS, PROFILES, FORMATS, FACETS, labelOf } from './data/taxonomy.js';
import { BUILDER_ACTIONS, BUILDER_STAGES, BUILDER_FORMATS, BUILDER_EXTRAS } from './data/builder-blocks.js';
import { findPlaceholders, fillPlaceholders, tokenize } from './placeholders.js';
import { loadState, saveState, mergePrompts, upsertPrompt, removePrompt, STORAGE_KEY } from './store.js';
import { buildExport, parseImport, applyImport } from './io.js';
import { buildPrompt } from './builder.js';
import { DIGITAL_FORMAT, digitalAddonFor, digitalHintFor, supportsDigitalAddon, withDigitalAddon } from './data/digital.js';
import { $, $$, esc, matchesQuery, slug, toast, copyText, flashButton, download } from './utils.js';
import { initAula } from './aula.js';

/* ───────────────────────── Estat ───────────────────────── */

let state = loadState();
let prompts = [];
const ui = {
  query: '',
  facets: { actions: new Set(), profiles: new Set(), formats: new Set() },
  onlyFav: false,
  onlyMine: false,
  sort: 'default',
};
// Valors dels camps [..] omplerts en aquesta sessió (no es desen: poden contenir dades de l'alumnat).
const fieldValues = {};
let current = null; // prompt obert al diàleg
let editing = null; // { mode: 'new' | 'edit' | 'override' | 'duplicate', base }
let aula = { render() {} }; // secció Aula (s'inicialitza a init)

function refresh() {
  prompts = mergePrompts(BUILTIN_PROMPTS, state.prompts);
}

function persist() {
  if (!saveState(state)) toast('No s’ha pogut desar: l’emmagatzematge del navegador està ple o bloquejat.');
}

const isFav = (id) => state.favorites.includes(id);
// Complement digital (HTML): preferència global, només per als prompts que l'admeten.
const digitalOn = (p) => state.settings.digital && supportsDigitalAddon(p);
const promptText = (p) => (digitalOn(p) ? withDigitalAddon(p.text, p) : p.text);
// Els prompts que admeten el complement també apareixen al filtre de format digital.
const facetValues = (p, key) =>
  key === 'formats' && supportsDigitalAddon(p) ? [...p.formats, DIGITAL_FORMAT] : p[key];
const filledText = (p) => fillPlaceholders(promptText(p), fieldValues);
const hasFilled = (p) => findPlaceholders(p.text).some((f) => fieldValues[f.key]?.trim());

async function copyPrompt(p, btn) {
  const ok = await copyText(filledText(p));
  if (!ok) {
    toast('No s’ha pogut copiar. Selecciona el text i copia’l manualment.');
    return;
  }
  state.stats[p.id] = (state.stats[p.id] ?? 0) + 1;
  persist();
  if (btn) flashButton(btn);
  toast(hasFilled(p) ? 'Copiat amb els camps omplerts. Enganxa’l a la IA.' : 'Copiat. Enganxa’l a la IA.');
}

const ICON_COPY =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>';
const ICON_STAR =
  '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></svg>';

/* ───────────────────────── Biblioteca: filtres ───────────────────────── */

function matches(p, { skipFacet } = {}) {
  if (ui.onlyFav && !isFav(p.id)) return false;
  if (ui.onlyMine && p.source === 'builtin') return false;
  for (const { key } of FACETS) {
    if (key === skipFacet) continue;
    const selected = ui.facets[key];
    if (selected.size && !facetValues(p, key).some((v) => selected.has(v))) return false;
  }
  if (ui.query) {
    const parts = [
      p.title,
      p.description,
      p.text,
      ...p.actions.map((id) => labelOf(ACTIONS, id)),
      ...p.profiles.map((id) => labelOf(PROFILES, id)),
      ...facetValues(p, 'formats').map((id) => labelOf(FORMATS, id)),
    ];
    if (!matchesQuery(ui.query, parts)) return false;
  }
  return true;
}

function sortList(list) {
  const order = new Map(prompts.map((p, i) => [p.id, i]));
  // Amb el filtre digital actiu, primer els prompts digitals específics i després els que admeten el complement.
  const digitalFirst = ui.facets.formats.has(DIGITAL_FORMAT);
  const isDigital = (p) => Number(digitalFirst && p.formats.includes(DIGITAL_FORMAT));
  const byDefault = (a, b) =>
    isDigital(b) - isDigital(a) || isFav(b.id) - isFav(a.id) || order.get(a.id) - order.get(b.id);
  const sorters = {
    default: byDefault,
    popular: (a, b) => (state.stats[b.id] ?? 0) - (state.stats[a.id] ?? 0) || byDefault(a, b),
    alpha: (a, b) => a.title.localeCompare(b.title, 'ca'),
    recent: (a, b) =>
      (b.source !== 'builtin') - (a.source !== 'builtin') ||
      String(b.updatedAt ?? '').localeCompare(String(a.updatedAt ?? '')) ||
      byDefault(a, b),
  };
  return [...list].sort(sorters[ui.sort] ?? byDefault);
}

function renderFacets() {
  const root = $('#facet-groups');
  if (!root.childElementCount) {
    root.innerHTML = FACETS.map(
      ({ key, title, items }) => `
      <fieldset class="filter-group">
        <legend>${esc(title)}</legend>
        <div class="chips">
          ${items
            .map(
              (it) => `<label class="chip"><input type="checkbox" data-facet="${key}" value="${it.id}"><span>${esc(it.label)} <span class="count" data-count="${key}:${it.id}"></span></span></label>`,
            )
            .join('')}
        </div>
      </fieldset>`,
    ).join('');
  }
  // Recompte: quants resultats hi hauria tenint en compte la resta de filtres.
  for (const { key, items } of FACETS) {
    const pool = prompts.filter((p) => matches(p, { skipFacet: key }));
    for (const it of items) {
      const n = pool.filter((p) => facetValues(p, key).includes(it.id)).length;
      const el = $(`[data-count="${key}:${it.id}"]`, root);
      el.textContent = n;
      el.closest('.chip').querySelector('input').checked = ui.facets[key].has(it.id);
    }
  }
  const active =
    FACETS.reduce((sum, { key }) => sum + ui.facets[key].size, 0) + Number(ui.onlyFav) + Number(ui.onlyMine);
  const badge = $('#filters-count');
  badge.hidden = !active;
  badge.textContent = active;
  $('#clear-filters').hidden = !active && !ui.query;
}

function cardHTML(p) {
  const actionTags = p.actions
    .map((id) => `<span class="tag tag--action" data-id="${id}">${esc(labelOf(ACTIONS, id))}</span>`)
    .join('');
  const sourceTag =
    p.source === 'user'
      ? '<span class="tag tag--mine">Meu</span>'
      : p.source === 'modified'
        ? '<span class="tag tag--mine">Modificat</span>'
        : '';
  const maxTags = 4;
  const profileTags = p.profiles
    .slice(0, maxTags)
    .map((id) => `<span class="tag">${esc(labelOf(PROFILES, id))}</span>`)
    .join('');
  const more = p.profiles.length > maxTags ? `<span class="tag">+${p.profiles.length - maxTags}</span>` : '';
  const fav = isFav(p.id);
  const digitalTag = p.formats.includes(DIGITAL_FORMAT) ? '<span class="tag tag--digital">HTML interactiu</span>' : '';
  return `
    <li class="card">
      <div class="card__meta">${actionTags}${digitalTag}${sourceTag}</div>
      <h3 class="card__title"><button type="button" data-act="open" data-id="${esc(p.id)}">${esc(p.title)}</button></h3>
      ${p.description ? `<p class="card__desc">${esc(p.description)}</p>` : ''}
      <div class="tags">${profileTags}${more}</div>
      <div class="card__foot">
        <button class="btn btn--primary" type="button" data-act="copy" data-id="${esc(p.id)}">${ICON_COPY} Copia</button>
        <button class="btn" type="button" data-act="open" data-id="${esc(p.id)}">Obre</button>
        <button class="btn btn--icon fav" type="button" data-act="fav" data-id="${esc(p.id)}" aria-pressed="${fav}" title="${fav ? 'Treu de preferits' : 'Afegeix a preferits'}">${ICON_STAR}<span class="sr-only">Preferit: ${esc(p.title)}</span></button>
      </div>
    </li>`;
}

function renderLibrary() {
  renderFacets();
  const list = sortList(prompts.filter((p) => matches(p)));
  $('#cards').innerHTML = list.map(cardHTML).join('');
  $('#empty').hidden = list.length > 0;
  $('#results-count').textContent =
    list.length === prompts.length
      ? `${prompts.length} prompts`
      : `${list.length} de ${prompts.length} prompts`;
}

function clearFilters() {
  ui.query = '';
  $('#search').value = '';
  ui.onlyFav = ui.onlyMine = false;
  $('#only-favorites').checked = $('#only-mine').checked = false;
  FACETS.forEach(({ key }) => ui.facets[key].clear());
  renderLibrary();
}

function toggleFavorite(id) {
  state.favorites = isFav(id) ? state.favorites.filter((f) => f !== id) : [...state.favorites, id];
  persist();
  toast(isFav(id) ? 'Afegit a preferits' : 'Tret de preferits');
}

/* ───────────────────────── Diàleg: veure i omplir ───────────────────────── */

const findPrompt = (id) => prompts.find((p) => p.id === id);

function tagsHTML(p) {
  return [
    ...p.actions.map((id) => `<span class="tag tag--action" data-id="${id}">${esc(labelOf(ACTIONS, id))}</span>`),
    ...p.profiles.map((id) => `<span class="tag">${esc(labelOf(PROFILES, id))}</span>`),
    ...p.formats.map((id) => `<span class="tag">${esc(labelOf(FORMATS, id))}</span>`),
  ].join('');
}

function renderPromptText(target, text, addon = '') {
  target.innerHTML =
    tokenize(text, fieldValues)
      .map((t) =>
        t.type === 'text'
          ? esc(t.value)
          : `<mark class="ph${t.type === 'filled' ? ' ph--filled' : ''}" title="${esc(t.key)}">${esc(t.value)}</mark>`,
      )
      .join('') + (addon ? `
<span class="addon">${esc(addon)}</span>` : '');
}

function renderViewText() {
  renderPromptText($('#view-text'), current.text, digitalOn(current) ? digitalAddonFor(current) : '');
}

function openView(id) {
  const p = findPrompt(id);
  if (!p) return;
  current = p;
  $('#view-title').textContent = p.title;
  $('#view-desc').textContent = p.description ?? '';
  $('#view-desc').hidden = !p.description;
  $('#view-tags').innerHTML = tagsHTML(p);

  const fields = findPlaceholders(p.text);
  const fill = $('#view-fill');
  fill.hidden = fields.length === 0;
  $('#view-fill-title').textContent = `Omple els camps (${fields.length})`;
  $('#view-fields').innerHTML = fields
    .map((f, i) => {
      const list = f.options.length
        ? `<datalist id="opts-${i}">${f.options.map((o) => `<option value="${esc(o)}"></option>`).join('')}</datalist>`
        : '';
      return `<label>${esc(f.key)}
        <input data-key="${esc(f.key)}" value="${esc(fieldValues[f.key] ?? '')}" placeholder="${esc(f.options.length ? 'Tria o escriu…' : 'Escriu…')}" ${f.options.length ? `list="opts-${i}"` : ''}>
        ${list}</label>`;
    })
    .join('');
  $('#view-digital-box').hidden = !supportsDigitalAddon(p);
  $('#view-digital').checked = state.settings.digital;
  $('#view-digital-hint').textContent = digitalHintFor(p);
  renderViewText();

  const fav = $('#view-fav');
  fav.setAttribute('aria-pressed', String(isFav(p.id)));
  fav.title = isFav(p.id) ? 'Treu de preferits' : 'Afegeix a preferits';
  $('#view-delete').hidden = p.source !== 'user';
  $('#view-restore').hidden = p.source !== 'modified';

  history.replaceState(null, '', `#p=${encodeURIComponent(p.id)}`);
  const dlg = $('#dlg-view');
  if (!dlg.open) dlg.showModal();
  $('#view-copy').focus();
}

/* ───────────────────────── Diàleg: editar ───────────────────────── */

function renderEditFacets(selected = {}) {
  $('#edit-facets').innerHTML = FACETS.map(
    ({ key, title, items }) => `
    <fieldset class="field">
      <legend>${esc(title)}</legend>
      <div class="chips">
        ${items
          .map(
            (it) =>
              `<label class="chip"><input type="checkbox" name="${key}" value="${it.id}" ${selected[key]?.includes(it.id) ? 'checked' : ''}><span>${esc(it.label)}</span></label>`,
          )
          .join('')}
      </div>
    </fieldset>`,
  ).join('');
}

/**
 * mode 'new': prompt nou (opcionalment amb dades inicials)
 * mode 'edit': edita un prompt propi o una versió modificada
 * mode 'override': edita un prompt inclòs (crea una versió pròpia)
 * mode 'duplicate': còpia nova
 */
function openEditor(mode, base = {}) {
  editing = { mode, base };
  const titles = { new: 'Nou prompt', edit: 'Edita el prompt', override: 'Edita el prompt', duplicate: 'Duplica el prompt' };
  const notes = {
    new: 'Es desarà a «Els meus» en aquest navegador.',
    edit: '',
    override: 'Es desarà com a versió teva. Sempre podràs restaurar l’original.',
    duplicate: 'Es crearà un prompt nou a «Els meus».',
  };
  $('#edit-title').textContent = titles[mode];
  $('#edit-note').textContent = notes[mode];
  $('#edit-note').hidden = !notes[mode];
  $('#edit-name').value = mode === 'duplicate' ? `${base.title} (còpia)` : (base.title ?? '');
  $('#edit-description').value = base.description ?? '';
  $('#edit-text').value = base.text ?? '';
  $('#edit-error').hidden = true;
  renderEditFacets(base);
  $('#edit-digital').checked = base.digital === true;
  $('#dlg-view').close();
  $('#dlg-edit').showModal();
  $('#edit-name').focus();
}

function saveEditor(event) {
  event.preventDefault();
  const form = $('#edit-form');
  const data = {
    title: $('#edit-name').value,
    description: $('#edit-description').value,
    text: $('#edit-text').value,
    actions: $$('input[name="actions"]:checked', form).map((i) => i.value),
    profiles: $$('input[name="profiles"]:checked', form).map((i) => i.value),
    formats: $$('input[name="formats"]:checked', form).map((i) => i.value),
    digital: $('#edit-digital').checked,
  };
  if (!data.title.trim() || !data.text.trim()) {
    const err = $('#edit-error');
    err.textContent = 'Cal un títol i el text del prompt.';
    err.hidden = false;
    (data.title.trim() ? $('#edit-text') : $('#edit-name')).focus();
    return;
  }
  const { mode, base } = editing;
  if (mode === 'edit') {
    data.id = base.id;
    if (base.baseId) data.baseId = base.baseId;
    data.createdAt = base.createdAt;
  } else if (mode === 'override') {
    data.baseId = base.id;
  }
  const saved = upsertPrompt(state, data);
  if (!saved) return;
  // Si s'ha modificat un prompt inclòs, el preferit i el recompte passen a la versió nova.
  if (mode === 'override') {
    state.favorites = state.favorites.map((f) => (f === base.id ? saved.id : f));
    if (state.stats[base.id]) state.stats[saved.id] = state.stats[base.id];
  }
  persist();
  refresh();
  renderLibrary();
  $('#dlg-edit').close();
  toast('Desat');
  openView(saved.id);
}

/* ───────────────────────── Generador ───────────────────────── */

const BUILDER_KEY = 'inclusia.builder';
const builderDefaults = () => ({
  action: 'adaptar',
  format: 'fitxa',
  profiles: [],
  stage: '',
  area: '',
  topic: '',
  notes: '',
  extras: BUILDER_EXTRAS.filter((e) => e.default).map((e) => e.id),
});
let builder = builderDefaults();

function loadBuilder() {
  try {
    const saved = JSON.parse(localStorage.getItem(BUILDER_KEY) ?? 'null');
    if (saved && typeof saved === 'object') builder = { ...builderDefaults(), ...saved };
  } catch {
    /* sense dades desades */
  }
}

function saveBuilder() {
  try {
    localStorage.setItem(BUILDER_KEY, JSON.stringify(builder));
  } catch {
    /* no és crític */
  }
}

function renderBuilderControls() {
  $('#b-action').innerHTML = BUILDER_ACTIONS.map(
    (a) => `<label><input type="radio" name="b-action" value="${a.id}"><span>${esc(a.label)}</span></label>`,
  ).join('');
  $('#b-profiles').innerHTML = PROFILES.map(
    (p) => `<label class="chip"><input type="checkbox" name="b-profiles" value="${p.id}"><span>${esc(p.label)}</span></label>`,
  ).join('');
  $('#b-format').innerHTML = FORMATS.filter((f) => BUILDER_FORMATS[f.id])
    .map((f) => `<label class="chip"><input type="radio" name="b-format" value="${f.id}"><span>${esc(f.label)}</span></label>`)
    .join('');
  $('#b-extras').innerHTML = BUILDER_EXTRAS.map(
    (e) =>
      `<label class="chip" data-only="${e.onlyFor ?? ''}" data-not-format="${e.notForFormat ?? ''}"><input type="checkbox" name="b-extras" value="${e.id}"><span>${esc(e.label)}</span></label>`,
  ).join('');
  $('#b-stage-list').innerHTML = BUILDER_STAGES.map((s) => `<option value="${esc(s)}"></option>`).join('');
}

function syncBuilderForm() {
  const form = $('#builder-form');
  $$('input[name="b-action"]', form).forEach((i) => (i.checked = i.value === builder.action));
  $$('input[name="b-format"]', form).forEach((i) => (i.checked = i.value === builder.format));
  $$('input[name="b-profiles"]', form).forEach((i) => (i.checked = builder.profiles.includes(i.value)));
  $$('input[name="b-extras"]', form).forEach((i) => (i.checked = builder.extras.includes(i.value)));
  $('#b-stage').value = builder.stage;
  $('#b-area').value = builder.area;
  $('#b-topic').value = builder.topic;
  $('#b-notes').value = builder.notes;
}

function readBuilderForm() {
  const form = $('#builder-form');
  builder = {
    action: $('input[name="b-action"]:checked', form)?.value ?? 'adaptar',
    format: $('input[name="b-format"]:checked', form)?.value ?? 'fitxa',
    profiles: $$('input[name="b-profiles"]:checked', form).map((i) => i.value),
    extras: $$('input[name="b-extras"]:checked', form).map((i) => i.value),
    stage: $('#b-stage').value,
    area: $('#b-area').value,
    topic: $('#b-topic').value,
    notes: $('#b-notes').value,
  };
}

let built = null;
function renderBuilderOutput() {
  built = buildPrompt(builder);
  $$('#b-extras .chip').forEach((el) => {
    el.hidden =
      (Boolean(el.dataset.only) && el.dataset.only !== builder.action) ||
      el.dataset.notFormat === builder.format;
  });
  renderPromptText($('#b-output'), built.text);
  const words = built.text.split(/\s+/).filter(Boolean).length;
  $('#b-words').textContent = `${words} paraules`;
}

/* ───────────────────────── Vistes, tema i importació ───────────────────────── */

// Cada vista té el seu fragment d'URL perquè es pugui enllaçar i recarregar.
const VIEWS = { library: '', builder: '#generador', aula: '#aula' };
let currentView = 'library';
const viewUrl = () => VIEWS[currentView] || location.pathname + location.search;

function showView(view) {
  if (!(view in VIEWS)) return;
  const changed = view !== currentView;
  currentView = view;
  for (const v of Object.keys(VIEWS)) $(`#view-${v}`).hidden = v !== view;
  $$('.tabs__btn').forEach((b) => {
    if (b.dataset.view === view) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  if (!location.hash.startsWith('#p=')) history.replaceState(null, '', viewUrl());
  if (changed) window.scrollTo({ top: 0 });
}

const THEMES = ['auto', 'light', 'dark'];
const THEME_LABELS = { auto: 'automàtic', light: 'clar', dark: 'fosc' };
function applyTheme() {
  const theme = state.settings.theme;
  if (theme === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  $('[data-theme-label]').textContent = THEME_LABELS[theme];
}

let pendingImport = null;
async function handleImportFile(file) {
  try {
    pendingImport = parseImport(await file.text());
  } catch (err) {
    toast(err.message);
    return;
  }
  const n = pendingImport.prompts.length;
  const f = pendingImport.favorites.length;
  const a = pendingImport.applied.length;
  $('#import-summary').textContent =
    `El fitxer conté ${n} ${n === 1 ? 'prompt' : 'prompts'}, ${f} ${f === 1 ? 'preferit' : 'preferits'} ` +
    `i ${a} ${a === 1 ? 'mesura d’aula marcada' : 'mesures d’aula marcades'}.`;
  $('#dlg-import').showModal();
}

function finishImport(mode) {
  if (!pendingImport) return;
  if (mode === 'replace' && !confirm('Se substituiran tots els teus prompts, preferits i mesures marcades. Vols continuar?')) return;
  const result = applyImport(state, pendingImport, mode);
  state = result.state;
  pendingImport = null;
  persist();
  refresh();
  renderLibrary();
  aula.render();
  toast(
    mode === 'replace'
      ? `Importació feta: ${result.added} prompts.`
      : `Importació feta: ${result.added} nous, ${result.updated} actualitzats.`,
  );
}

function exportData() {
  const date = new Date().toISOString().slice(0, 10);
  download(`inclusia-${date}.json`, JSON.stringify(buildExport(state), null, 2), 'application/json');
  toast('Dades exportades');
}

/* ───────────────────────── Esdeveniments ───────────────────────── */

function closeMenu() {
  $('#menu-list').hidden = true;
  $('#menu-btn').setAttribute('aria-expanded', 'false');
}

function bindEvents() {
  // Navegació
  $$('[data-view]').forEach((b) => b.addEventListener('click', () => showView(b.dataset.view)));

  // Cerca i filtres
  let searchTimer;
  $('#search').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      ui.query = e.target.value.trim();
      renderLibrary();
    }, 120);
  });
  $('#facet-groups').addEventListener('change', (e) => {
    const input = e.target.closest('input[data-facet]');
    if (!input) return;
    const set = ui.facets[input.dataset.facet];
    if (input.checked) set.add(input.value);
    else set.delete(input.value);
    renderLibrary();
  });
  $('#only-favorites').addEventListener('change', (e) => {
    ui.onlyFav = e.target.checked;
    renderLibrary();
  });
  $('#only-mine').addEventListener('change', (e) => {
    ui.onlyMine = e.target.checked;
    renderLibrary();
  });
  $('#sort').addEventListener('change', (e) => {
    ui.sort = e.target.value;
    renderLibrary();
  });
  $('#clear-filters').addEventListener('click', clearFilters);

  // Targetes
  $('#cards').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const p = findPrompt(btn.dataset.id);
    if (!p) return;
    if (btn.dataset.act === 'copy') copyPrompt(p, btn);
    else if (btn.dataset.act === 'open') openView(p.id);
    else if (btn.dataset.act === 'fav') {
      toggleFavorite(p.id);
      renderLibrary();
      $(`button[data-act="fav"][data-id="${CSS.escape(p.id)}"]`)?.focus();
    }
  });

  // Diàleg de visualització
  $('#view-fields').addEventListener('input', (e) => {
    const input = e.target.closest('input[data-key]');
    if (!input) return;
    fieldValues[input.dataset.key] = input.value;
    renderViewText();
  });
  $('#view-clear-fields').addEventListener('click', () => {
    findPlaceholders(current.text).forEach((f) => delete fieldValues[f.key]);
    $$('#view-fields input').forEach((i) => (i.value = ''));
    renderViewText();
  });
  $('#view-digital').addEventListener('change', (e) => {
    state.settings.digital = e.target.checked;
    persist();
    renderViewText();
  });
  $('#view-copy').addEventListener('click', (e) => copyPrompt(current, e.currentTarget));
  $('#view-fav').addEventListener('click', (e) => {
    toggleFavorite(current.id);
    e.currentTarget.setAttribute('aria-pressed', String(isFav(current.id)));
    renderLibrary();
  });
  $('#view-edit').addEventListener('click', () => {
    if (current.source === 'builtin') openEditor('override', current);
    else openEditor('edit', current);
  });
  $('#view-duplicate').addEventListener('click', () => openEditor('duplicate', current));
  $('#view-download').addEventListener('click', () => {
    download(`${slug(current.title)}.txt`, filledText(current), 'text/plain;charset=utf-8');
  });
  $('#view-delete').addEventListener('click', () => {
    if (!confirm(`Vols eliminar «${current.title}»? No es pot desfer.`)) return;
    removePrompt(state, current.id);
    persist();
    refresh();
    renderLibrary();
    $('#dlg-view').close();
    toast('Prompt eliminat');
  });
  $('#view-restore').addEventListener('click', () => {
    if (!confirm('Es perdran els teus canvis i es recuperarà el prompt original. Vols continuar?')) return;
    const originalId = current.original.id;
    state.favorites = state.favorites.map((f) => (f === current.id ? originalId : f));
    removePrompt(state, current.id);
    persist();
    refresh();
    renderLibrary();
    openView(originalId);
    toast('Original restaurat');
  });
  $('#dlg-view').addEventListener('close', () => {
    current = null;
    if (location.hash.startsWith('#p=')) history.replaceState(null, '', viewUrl());
  });

  // Editor
  $('#edit-form').addEventListener('submit', saveEditor);
  $('[data-action="new-prompt"]').addEventListener('click', () => openEditor('new'));

  // Tancar diàlegs: botons, clic al fons
  $$('dialog').forEach((dlg) => {
    dlg.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || e.target === dlg) dlg.close();
    });
  });

  // Menú
  const menuBtn = $('#menu-btn');
  menuBtn.addEventListener('click', () => {
    const open = $('#menu-list').hidden;
    $('#menu-list').hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) $('#menu-list button').focus();
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu')) closeMenu();
  });
  $('#menu-list').addEventListener('keydown', (e) => {
    const items = $$('#menu-list button');
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') items[(i + 1) % items.length].focus();
    else if (e.key === 'ArrowUp') items[(i - 1 + items.length) % items.length].focus();
    else if (e.key === 'Escape') {
      closeMenu();
      menuBtn.focus();
    } else return;
    e.preventDefault();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'new-prompt') return;
    closeMenu();
    if (action === 'export') exportData();
    else if (action === 'import') $('#import-file').click();
    else if (action === 'about') $('#dlg-about').showModal();
    else if (action === 'theme') {
      state.settings.theme = THEMES[(THEMES.indexOf(state.settings.theme) + 1) % THEMES.length];
      persist();
      applyTheme();
      toast(`Tema ${THEME_LABELS[state.settings.theme]}`);
    }
  });

  // Importació
  $('#import-file').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleImportFile(file);
    e.target.value = '';
  });
  $('#dlg-import').addEventListener('close', () => {
    const dlg = $('#dlg-import');
    if (dlg.returnValue === 'ok') finishImport($('input[name="import-mode"]:checked', dlg).value);
    else pendingImport = null;
    dlg.returnValue = '';
  });

  // Generador
  $('#builder-form').addEventListener('input', () => {
    readBuilderForm();
    saveBuilder();
    renderBuilderOutput();
  });
  $('#builder-form').addEventListener('submit', (e) => e.preventDefault());
  $('#b-copy').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if (await copyText(built.text)) {
      flashButton(btn);
      toast('Copiat. Enganxa’l a la IA.');
    } else toast('No s’ha pogut copiar.');
  });
  $('#b-save').addEventListener('click', () => openEditor('new', built));
  $('#b-reset').addEventListener('click', () => {
    builder = builderDefaults();
    saveBuilder();
    syncBuilderForm();
    renderBuilderOutput();
  });

  // Teclat: "/" per anar al cercador de la vista actual
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable]') || $('dialog[open]')) return;
    e.preventDefault();
    if (currentView === 'aula') {
      $('#aula-search').focus();
      return;
    }
    showView('library');
    $('#search').focus();
  });

  // Sincronització entre pestanyes
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY) return;
    state = loadState();
    refresh();
    renderLibrary();
    aula.render();
    applyTheme();
  });

  // Filtres plegats en pantalles petites
  const narrow = matchMedia('(max-width: 900px)');
  const syncFilters = () => $$('.filters').forEach((d) => (d.open = !narrow.matches));
  narrow.addEventListener('change', syncFilters);
  syncFilters();
}

/* ───────────────────────── Inici ───────────────────────── */

// Enllaços directes: #p=<id> obre un prompt; #generador i #aula obren la vista.
function openFromHash() {
  const match = location.hash.match(/^#p=(.+)$/);
  if (match) {
    showView('library');
    if (match[1] !== current?.id) openView(decodeURIComponent(match[1]));
    return;
  }
  const view = Object.keys(VIEWS).find((v) => VIEWS[v] && VIEWS[v] === location.hash);
  showView(view ?? 'library');
}

function init() {
  refresh();
  applyTheme();
  bindEvents();
  renderLibrary();

  loadBuilder();
  renderBuilderControls();
  syncBuilderForm();
  renderBuilderOutput();

  aula = initAula({ getState: () => state, persist });

  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

init();
