// Utilitats de DOM i interfície compartides per les diferents seccions.

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Minúscules i sense accents ni punt volat, per cercar. */
export const normalize = (s) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/·/g, '');

/** Cerca de diverses paraules (totes han d'aparèixer). */
export const matchesQuery = (query, parts) => {
  const haystack = normalize(parts.join(' '));
  return normalize(query).split(/\s+/).filter(Boolean).every((w) => haystack.includes(w));
};

export const slug = (s) =>
  normalize(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'prompt';

let toastTimer;
export function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Alternativa per a navegadors sense API del porta-retalls (o context no segur).
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.className = 'sr-only';
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function flashButton(btn, label = 'Copiat') {
  const original = btn.innerHTML;
  btn.classList.add('is-done');
  btn.textContent = `${label} ✓`;
  setTimeout(() => {
    btn.classList.remove('is-done');
    btn.innerHTML = original;
  }, 1500);
}

export function download(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Xips (checkbox) per a un grup de filtres. */
export const chipsHTML = (name, items, { counts = true, attr = 'data-facet' } = {}) =>
  items
    .map(
      (it) =>
        `<label class="chip"><input type="checkbox" ${attr}="${name}" value="${it.id}"><span>${esc(it.label)}${
          counts ? ` <span class="count" data-count="${name}:${it.id}"></span>` : ''
        }</span></label>`,
    )
    .join('');
