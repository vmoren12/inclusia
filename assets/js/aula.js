// Secció «Aula»: recomanacions per a una aula inclusiva, amb filtres i seguiment del que s'aplica.

import { RECOMMENDATIONS, AULA_AREAS, AULA_LEVELS, AULA_EFFORT, AULA_EVIDENCE } from './data/aula.js';
import { PROFILES, labelOf } from './data/taxonomy.js';
import { $, $$, esc, matchesQuery, chipsHTML } from './utils.js';

export const AULA_KINDS = [
  { id: 'fes', label: 'Recomanacions' },
  { id: 'evita', label: 'Pràctiques a evitar' },
];

export const AULA_FACETS = [
  { key: 'areas', title: 'Àmbit', items: AULA_AREAS },
  { key: 'profiles', title: 'Perfil de l’alumnat', items: PROFILES },
  { key: 'level', title: 'Nivell de suport', items: AULA_LEVELS },
  { key: 'effort', title: 'Aplicació', items: AULA_EFFORT },
  { key: 'evidence', title: 'Evidència', items: AULA_EVIDENCE },
  { key: 'kind', title: 'Tipus', items: AULA_KINDS },
];

/** Valors d'una recomanació per a una faceta (sempre com a llista). */
export function facetValues(rec, key) {
  if (key === 'kind') return [rec.kind ?? 'fes'];
  const v = rec[key];
  return Array.isArray(v) ? v : [v];
}

/**
 * Filtra recomanacions.
 * @param {object} filters { query, facets: { key: Set }, status: 'all' | 'pending' | 'applied' }
 * @param {Set<string>} applied ids aplicats
 */
export function filterRecommendations(recs, filters, applied, { skipFacet } = {}) {
  return recs.filter((r) => {
    if (filters.status === 'pending' && applied.has(r.id)) return false;
    if (filters.status === 'applied' && !applied.has(r.id)) return false;
    for (const { key } of AULA_FACETS) {
      if (key === skipFacet) continue;
      const selected = filters.facets[key];
      if (selected?.size && !facetValues(r, key).some((v) => selected.has(v))) return false;
    }
    if (filters.query) {
      const parts = [
        r.title,
        r.summary,
        ...r.how,
        r.why,
        r.source,
        ...r.areas.map((id) => labelOf(AULA_AREAS, id)),
        ...r.profiles.map((id) => labelOf(PROFILES, id)),
      ];
      if (!matchesQuery(filters.query, parts)) return false;
    }
    return true;
  });
}

const ICON_CHECK = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>';

/**
 * @param {{ getState: () => object, persist: () => void }} store
 */
export function initAula(store) {
  const filters = {
    query: '',
    facets: Object.fromEntries(AULA_FACETS.map(({ key }) => [key, new Set()])),
    status: 'all',
  };
  const applied = () => new Set(store.getState().applied);

  $('#aula-facet-groups').innerHTML = AULA_FACETS.map(
    ({ key, title, items }) => `
      <fieldset class="filter-group">
        <legend>${esc(title)}</legend>
        <div class="chips">${chipsHTML(key, items, { attr: 'data-aula-facet' })}</div>
      </fieldset>`,
  ).join('');

  function renderFacets(done) {
    const root = $('#aula-facet-groups');
    for (const { key, items } of AULA_FACETS) {
      const pool = filterRecommendations(RECOMMENDATIONS, filters, done, { skipFacet: key });
      for (const it of items) {
        const n = pool.filter((r) => facetValues(r, key).includes(it.id)).length;
        const el = $(`[data-count="${key}:${it.id}"]`, root);
        el.textContent = n;
        el.closest('.chip').querySelector('input').checked = filters.facets[key].has(it.id);
      }
    }
    const active =
      AULA_FACETS.reduce((sum, { key }) => sum + filters.facets[key].size, 0) + Number(filters.status !== 'all');
    const badge = $('#aula-filters-count');
    badge.hidden = !active;
    badge.textContent = active;
    $('#aula-clear').hidden = !active && !filters.query;
  }

  function cardHTML(r, done) {
    const isDone = done.has(r.id);
    const evita = r.kind === 'evita';
    const areaTags = r.areas
      .map((id) => `<span class="tag tag--area">${esc(labelOf(AULA_AREAS, id))}</span>`)
      .join('');
    const evidenceTag = `<span class="tag tag--evidence" data-level="${r.evidence}">${esc(labelOf(AULA_EVIDENCE, r.evidence))}</span>`;
    const profileTags = r.profiles.map((id) => `<span class="tag">${esc(labelOf(PROFILES, id))}</span>`).join('');
    const label = evita ? (isDone ? 'Ho evito' : 'Marca que ho evito') : isDone ? 'Ho aplico' : 'Marca que ho aplico';
    return `
      <li class="card rec${isDone ? ' is-applied' : ''}${evita ? ' rec--evita' : ''}">
        <div class="card__meta">${evita ? '<span class="tag tag--evita">Evita</span>' : ''}${areaTags}</div>
        <h3 class="card__title">${esc(r.title)}</h3>
        <p class="card__desc">${esc(r.summary)}</p>
        <details class="rec__details">
          <summary>${evita ? 'Què fer en lloc d’això' : 'Com fer-ho'}</summary>
          <ul>${r.how.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
          <p><strong>Per què:</strong> ${esc(r.why)}</p>
          <p class="rec__source"><strong>Font:</strong> ${esc(r.source)}</p>
        </details>
        <div class="tags">${evidenceTag}<span class="tag">${esc(labelOf(AULA_LEVELS, r.level))}</span><span class="tag">${esc(labelOf(AULA_EFFORT, r.effort))}</span></div>
        <div class="tags rec__profiles">${profileTags}</div>
        <div class="card__foot">
          <button class="btn apply" type="button" data-id="${esc(r.id)}" aria-pressed="${isDone}">${ICON_CHECK} ${label}</button>
        </div>
      </li>`;
  }

  function render() {
    const done = applied();
    renderFacets(done);
    const list = filterRecommendations(RECOMMENDATIONS, filters, done);
    $('#aula-cards').innerHTML = list.map((r) => cardHTML(r, done)).join('');
    $('#aula-empty').hidden = list.length > 0;
    const total = RECOMMENDATIONS.length;
    $('#aula-count').textContent =
      list.length === total ? `${total} recomanacions` : `${list.length} de ${total} recomanacions`;
    const n = RECOMMENDATIONS.filter((r) => done.has(r.id)).length;
    $('#aula-progress-text').textContent = `Ja n’apliques ${n} de ${total}`;
    const bar = $('#aula-progress');
    bar.value = n;
    bar.max = total;
  }

  function toggleApplied(id) {
    const state = store.getState();
    state.applied = state.applied.includes(id) ? state.applied.filter((a) => a !== id) : [...state.applied, id];
    store.persist();
  }

  // Esdeveniments
  let searchTimer;
  $('#aula-search').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      filters.query = e.target.value.trim();
      render();
    }, 120);
  });
  $('#aula-facet-groups').addEventListener('change', (e) => {
    const input = e.target.closest('input[data-aula-facet]');
    if (!input) return;
    const set = filters.facets[input.dataset.aulaFacet];
    if (input.checked) set.add(input.value);
    else set.delete(input.value);
    render();
  });
  $('#aula-status').addEventListener('change', (e) => {
    filters.status = e.target.value;
    render();
  });
  $('#aula-clear').addEventListener('click', () => {
    filters.query = '';
    $('#aula-search').value = '';
    filters.status = 'all';
    $('#aula-status input[value="all"]').checked = true;
    AULA_FACETS.forEach(({ key }) => filters.facets[key].clear());
    render();
  });
  $('#aula-cards').addEventListener('click', (e) => {
    const btn = e.target.closest('button.apply');
    if (!btn) return;
    toggleApplied(btn.dataset.id);
    render();
    $(`#aula-cards button.apply[data-id="${CSS.escape(btn.dataset.id)}"]`)?.focus();
  });

  // Impressió: obre tots els detalls de la llista filtrada.
  $('#aula-print').addEventListener('click', () => {
    const details = $$('#aula-cards details:not([open])');
    details.forEach((d) => (d.open = true));
    document.body.classList.add('print-aula');
    window.addEventListener(
      'afterprint',
      () => {
        details.forEach((d) => (d.open = false));
        document.body.classList.remove('print-aula');
      },
      { once: true },
    );
    window.print();
  });

  render();
  return { render };
}
