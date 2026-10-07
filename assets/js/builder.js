// Generador: compon un prompt a partir de les opcions triades.

import { BUILDER_ACTIONS, BUILDER_FORMATS, BUILDER_PROFILES, BUILDER_EXTRAS } from './data/builder-blocks.js';
import { PROFILES, labelOf } from './data/taxonomy.js';
import { DIGITAL_ADDON } from './data/digital.js';

const joinList = (items) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} i ${items.at(-1)}`;

/**
 * @param {object} opts
 * @param {'adaptar'|'crear'} opts.action
 * @param {string} opts.format   id de BUILDER_FORMATS
 * @param {string[]} opts.profiles
 * @param {string} [opts.stage]
 * @param {string} [opts.area]
 * @param {string} [opts.topic]
 * @param {string[]} [opts.extras]
 * @param {string} [opts.notes]  indicacions lliures de l'usuari
 */
export function buildPrompt(opts) {
  const action = BUILDER_ACTIONS.find((a) => a.id === opts.action) ?? BUILDER_ACTIONS[0];
  const formatId = BUILDER_FORMATS[opts.format] ? opts.format : 'fitxa';
  const format = BUILDER_FORMATS[formatId];
  const profiles = (opts.profiles ?? []).filter((p) => BUILDER_PROFILES[p]);
  const extras = BUILDER_EXTRAS.filter(
    (e) =>
      (opts.extras ?? []).includes(e.id) &&
      (!e.onlyFor || e.onlyFor === action.id) &&
      e.notForFormat !== formatId,
  );

  const stage = opts.stage?.trim() || '[etapa i curs]';
  const area = opts.area?.trim();
  const topic = opts.topic?.trim() || (action.id === 'crear' ? '[tema]' : '');

  const header = [`${action.task} per a alumnat de ${stage}.`];
  if (profiles.length) header.push(`Perfil de l’alumnat: ${profiles.map((p) => labelOf(PROFILES, p)).join(', ')}.`);
  header.push(`Format de sortida: ${format.name}.`);
  const subject = [area, topic].filter(Boolean).join(' — ');
  if (subject) header.push(`Àrea i tema: ${subject}.`);

  const lines = [];
  const add = (line) => {
    if (line && !lines.includes(line)) lines.push(line);
  };
  action.lines.forEach(add);
  format.lines.forEach(add);
  profiles.forEach((p) => BUILDER_PROFILES[p].forEach(add));
  extras.forEach((e) => add(e.line));
  if (opts.notes?.trim()) add(opts.notes.trim());

  const deliverables = [format.deliver, ...extras.map((e) => e.deliver).filter(Boolean)];

  const text = [
    header.join('\n'),
    '',
    'Instruccions:',
    ...lines.map((l, i) => `${i + 1}. ${l}`),
    '',
    `Lliura ${joinList(deliverables)}.`,
    ...(extras.some((e) => e.addon) ? ['', DIGITAL_ADDON] : []),
  ].join('\n');

  const profileLabels = profiles.map((p) => labelOf(PROFILES, p));
  const verb = action.id === 'crear' ? 'Crear' : 'Adaptar';
  const title = `${verb}: ${format.name}${profileLabels.length ? ` (${profileLabels.join(', ')})` : ''}`;

  return {
    title,
    text,
    actions: [action.id],
    profiles,
    formats: [formatId],
    // Si el text encara no inclou la versió digital, es podrà afegir des de la biblioteca.
    digital: formatId !== 'digital' && !extras.some((e) => e.addon),
  };
}
