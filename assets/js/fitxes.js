// Guies ràpides d'una pàgina (A4) per perfil, dins la secció «Aula».

import { FITXES, FITXA_EVIDENCE } from './data/fitxes.js';
import { $, esc } from './utils.js';

/** Marcatge mínim: **negreta** i *cursiva* (el text s'escapa abans). */
export const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

const EV_LABEL = { 3: 'Evidència sòlida', 2: 'Evidència moderada', 1: 'Consens expert' };

export const dotsHTML = (ev) =>
  `<span class="sheet__ev" data-ev="${ev}" role="img" aria-label="${EV_LABEL[ev]}">${'<i></i>'.repeat(3)}</span>`;

const itemHTML = ({ text, src, ev }) =>
  `<li><p>${inline(text)} <cite>${esc(src)}</cite></p>${dotsHTML(ev)}</li>`;

/** Full A4 complet d'una guia. */
export function sheetHTML(f) {
  const legend = FITXA_EVIDENCE.map(({ ev, label }) => `<span>${dotsHTML(ev)} ${esc(label)}</span>`).join('');
  const sections = f.sections
    .map(
      (s, i) => `
        <section class="sheet__sec">
          <h3>${i + 1} · ${esc(s.title)}</h3>
          <ul>${s.items.map(itemHTML).join('')}</ul>
        </section>`,
    )
    .join('');
  return `
    <article class="sheet" aria-label="${esc(f.title)}">
      <header class="sheet__head">
        <div>
          <h2 class="sheet__title">${esc(f.title)}</h2>
          <p class="sheet__sub">Propostes metodològiques d’alta eficàcia basades en evidència · Guia ràpida per a l’equip docent</p>
        </div>
        <div class="sheet__legend"><span class="sheet__legend-title">Nivell d’evidència:</span>${legend}</div>
      </header>
      <p class="sheet__principle"><strong>Principi clau:</strong> ${inline(f.principle)}</p>
      <div class="sheet__grid">${sections}</div>
      <section class="sheet__sec sheet__sec--avoid">
        <h3>${f.sections.length + 1} · Evitar: pràctiques sense evidència <span>(no hi dediqueu temps ni recursos)</span></h3>
        <ul>${f.avoid.map(itemHTML).join('')}</ul>
      </section>
      <ol class="sheet__keys">
        ${f.keys.map((k) => `<li><strong>${esc(k.title)}</strong><span>${inline(k.text)}</span></li>`).join('')}
      </ol>
      <p class="sheet__refs"><strong>Referències:</strong> ${f.refs.map(inline).join(' · ')}</p>
      <p class="sheet__foot">Inclusia · vmoren12.github.io/inclusia · Víctor Moreno de la Torre · CC BY 4.0. Mesures i suports segons el Decret 150/2017.</p>
    </article>`;
}

export function initFitxes() {
  const dlg = $('#dlg-fitxa');
  const area = $('#print-area');
  let current = null;

  $('#fitxes-list').innerHTML = FITXES.map(
    (f) => `
      <li>
        <button class="fitxa-btn" type="button" data-fitxa="${esc(f.id)}">
          <span class="fitxa-btn__label">${esc(f.label)}</span>
          <span class="fitxa-btn__tag">${esc(f.tagline)}</span>
        </button>
      </li>`,
  ).join('');

  function open(id) {
    current = FITXES.find((f) => f.id === id);
    if (!current) return;
    $('#fitxa-title').textContent = current.title;
    $('#fitxa-sheet').innerHTML = sheetHTML(current);
    $('#fitxa-sheet').scrollTop = 0;
    if (!dlg.open) dlg.showModal();
  }

  $('#fitxes-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-fitxa]');
    if (btn) open(btn.dataset.fitxa);
  });

  $('#fitxa-print').addEventListener('click', () => {
    if (!current) return;
    area.innerHTML = sheetHTML(current);
    document.body.classList.add('print-fitxa');
    window.addEventListener(
      'afterprint',
      () => {
        document.body.classList.remove('print-fitxa');
        area.innerHTML = '';
      },
      { once: true },
    );
    window.print();
  });

  return { open };
}
