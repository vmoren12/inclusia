// Generador: compon un prompt estructurat per seccions a partir de les opcions triades.

import {
  BUILDER_ROLE,
  BUILDER_ACTIONS,
  BUILDER_DURATIONS,
  BUILDER_FORMATS,
  UNIVERSAL_PROFILE,
  BUILDER_PROFILES,
  DUA_PRINCIPLES,
  LEVEL_TIERS,
  LEVEL_STYLES,
  LEVEL_MODES,
  BUILDER_SCAFFOLDS,
  BUILDER_EXERCISES,
  BUILDER_COUNTS,
  BLOOM_LEVELS,
  BLOOM_HIGHER,
  BUILDER_TEACHER,
  BUILDER_VISUAL,
  DIGITAL_BUILDER,
  BUILDER_QUALITY,
  QUALITY_CHECKS,
} from './data/builder-blocks.js';
import { PROFILES, labelOf } from './data/taxonomy.js';
import { DIGITAL_FORMAT, DIGITAL_TECH } from './data/digital.js';

const joinList = (items) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} i ${items.at(-1)}`;

const defaultIds = (list) => list.filter((i) => i.default).map((i) => i.id);
const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);

/** Configuració inicial del generador. */
export const builderDefaults = () => ({
  action: 'adaptar',
  format: 'fitxa',
  profiles: [],
  stage: '',
  area: '',
  topic: '',
  goal: '',
  duration: 'auto',
  dua: DUA_PRINCIPLES.map((d) => d.id),
  levels: '3',
  levelStyle: 'simbols',
  levelMode: 'paralel',
  scaffolds: defaultIds(BUILDER_SCAFFOLDS),
  exercises: defaultIds(BUILDER_EXERCISES),
  count: 'auto',
  bloom: BLOOM_LEVELS.map((b) => b.id),
  teacher: defaultIds(BUILDER_TEACHER),
  visual: defaultIds(BUILDER_VISUAL),
  quality: defaultIds(BUILDER_QUALITY),
  digital: false,
  notes: '',
});

/** Nivells que s'aplicaran (cap si el format no té activitats o només n'hi ha un). */
export function levelsFor(opts) {
  const n = Math.min(4, Math.max(1, Number.parseInt(opts.levels, 10) || 1));
  const style = LEVEL_STYLES.find((s) => s.id === opts.levelStyle) ?? LEVEL_STYLES[0];
  const tiers = n > 1 ? LEVEL_TIERS.slice(0, n) : [];
  return { tiers, style, tags: tiers.map((t) => t[style.key]) };
}

/**
 * @param {object} opts  vegeu builderDefaults(); els camps que faltin prenen el valor per defecte.
 * @returns {{ title: string, text: string, actions: string[], profiles: string[], formats: string[], digital: boolean }}
 */
export function buildPrompt(opts = {}) {
  const o = { ...builderDefaults(), ...opts };
  const list = (v) => (Array.isArray(v) ? v : []);
  const action = BUILDER_ACTIONS.find((a) => a.id === o.action) ?? BUILDER_ACTIONS[0];
  const formatId = Object.hasOwn(BUILDER_FORMATS, o.format) ? o.format : 'fitxa';
  const format = BUILDER_FORMATS[formatId];
  const isDigital = formatId === DIGITAL_FORMAT;
  const addon = o.digital === true && !isDigital;
  const anyDigital = isDigital || addon;

  const universal = list(o.profiles).includes(UNIVERSAL_PROFILE.id);
  const profiles = list(o.profiles).filter((p) => Object.hasOwn(BUILDER_PROFILES, p));
  const applies = (item) =>
    (!item.onlyFor || item.onlyFor === action.id) && (!item.activities || format.activities) && !(item.paper && isDigital);
  const choose = (items, ids) => items.filter((i) => list(ids).includes(i.id) && applies(i));

  const dua = choose(DUA_PRINCIPLES, o.dua);
  const scaffolds = choose(BUILDER_SCAFFOLDS, o.scaffolds);
  const exercises = format.activities ? choose(BUILDER_EXERCISES, o.exercises) : [];
  const bloom = format.activities ? choose(BLOOM_LEVELS, o.bloom) : [];
  const teacher = choose(BUILDER_TEACHER, o.teacher);
  const visual = choose(BUILDER_VISUAL, o.visual);
  const quality = choose(BUILDER_QUALITY, o.quality);
  const { tiers, style, tags } = format.activities ? levelsFor(o) : { tiers: [], tags: [] };
  const mode = LEVEL_MODES.find((m) => m.id === o.levelMode) ?? LEVEL_MODES[0];
  const count = BUILDER_COUNTS.find((c) => c.id === String(o.count) && c.id !== 'auto');
  const duration = BUILDER_DURATIONS.find((d) => d.id === o.duration);

  const stage = o.stage?.trim() || '[etapa i curs]';
  const area = o.area?.trim();
  const topic = o.topic?.trim() || (action.id === 'crear' ? '[tema]' : '');
  const goal = o.goal?.trim() || (action.id === 'crear' ? '[objectiu d’aprenentatge]' : '');

  // Cada línia apareix un sol cop en tot el prompt.
  const seen = new Set();
  const fresh = (lines) =>
    lines.filter((l) => {
      if (!l || seen.has(l)) return false;
      seen.add(l);
      return true;
    });
  const bullets = (lines) => fresh(lines).map((l) => `- ${l}`);
  const sections = [];
  const section = (title, body) => {
    const lines = body.filter(Boolean);
    if (lines.length) sections.push([`## ${title}`, ...lines].join('\n'));
  };

  // Rol i encàrrec
  const profileLabels = [
    ...(universal ? [UNIVERSAL_PROFILE.label] : []),
    ...profiles.map((p) => labelOf(PROFILES, p)),
  ];
  const subject = [area, topic].filter(Boolean).join(' — ');
  const intro = `${BUILDER_ROLE} ${area ? `de ${area}` : 'de l’àrea'}.`;
  section('Encàrrec', [
    `${action.task} per a alumnat de ${stage}.`,
    ...bullets([
      subject && `Àrea i tema: ${subject}.`,
      goal && `Objectiu d’aprenentatge: ${goal}.`,
      `Format de sortida: ${format.name}.`,
      duration?.line,
      profileLabels.length && `Perfil de l’alumnat: ${profileLabels.join(', ')}.`,
    ]),
  ]);

  // Alumnat
  const learners = [];
  if (universal) {
    learners.push(UNIVERSAL_PROFILE.intro, ...bullets(UNIVERSAL_PROFILE.groups.map(([k, v]) => `${k}: ${v}`)));
  }
  for (const p of profiles) {
    const lines = bullets(BUILDER_PROFILES[p]);
    if (lines.length) learners.push(`${universal ? 'Reforça especialment' : 'Per a'} ${labelOf(PROFILES, p)}:`, ...lines);
  }
  section('Alumnat i barreres a eliminar', learners);

  // DUA
  section(
    'Disseny Universal per a l’Aprenentatge (pautes DUA 3.0)',
    dua.flatMap((d) => {
      const lines = bullets(d.lines);
      return lines.length ? [`${d.label}:`, ...lines] : [];
    }),
  );

  // Criteris generals del material
  section('Criteris del material', bullets([...action.lines, ...format.lines]));

  // Nivells
  if (tiers.length) {
    section(`Nivells progressius (${tiers.length})`, [
      `Organitza les activitats en ${tiers.length} nivells:`,
      ...tiers.map((t) => `- ${t[style.key]} ${style.key === 'symbol' ? t.name : ''}`.trimEnd() + ` — ${t.desc}.`),
      ...bullets([
        mode.line,
        'Tots els nivells comparteixen l’objectiu essencial, el tema i l’aparença (mateixa estructura i maquetació), i acaben amb una tasca comuna per a la posada en comú.',
        `Identifica els nivells amb ${style.note}; l’alumne pot canviar de nivell en qualsevol moment.`,
      ]),
    ]);
  }

  // Bastides
  section('Bastides', [
    ...bullets(scaffolds.map((s) => s.line)),
    ...(scaffolds.length && tiers.length
      ? bullets(['Gradua les bastides segons el nivell: completes al primer, opcionals als intermedis i mínimes al més alt.'])
      : []),
  ]);

  // Activitats
  if (format.activities) {
    const higher = bloom.some((b) => BLOOM_HIGHER.includes(b.id));
    section('Activitats', [
      ...bullets([
        count &&
          `Nombre d’activitats: ${count.label}${tiers.length && mode.id === 'paralel' ? ' (cadascuna amb la seva versió per a cada nivell)' : ''}.`,
        exercises.length
          ? `Combina aquestes tipologies, adequant cadascuna a l’objectiu: ${joinList(exercises.map((e) => e.desc))}.`
          : 'Varia les tipologies d’activitat segons l’objectiu (tancades, semiobertes i obertes).',
        bloom.length &&
          `Gradua la demanda cognitiva segons la taxonomia de Bloom revisada (Anderson i Krathwohl, 2001), de menys a més complexitat: ${bloom.map((b) => `${b.label} (${b.verbs})`).join(' → ')}.`,
        bloom.length && 'Fes servir verbs operatius a les consignes. El nivell de Bloom de cada activitat només ha de constar a la versió del docent.',
        higher && tiers.length && 'Inclou tasques d’ordre superior a tots els nivells, amb més suport als inicials: el pensament complex no és exclusiu del nivell més alt.',
        'Cada activitat amb una consigna clara, un exemple quan el tipus de tasca sigui nou i un espai de resposta adequat.',
      ]),
    ]);
  }

  // Presentació visual
  section('Presentació visual', bullets(visual.map((v) => v.line)));

  // Material digital (format digital o versió afegida)
  const digitalLines = anyDigital
    ? [
        DIGITAL_TECH,
        DIGITAL_BUILDER.structure,
        format.activities || addon ? DIGITAL_BUILDER.activities : '',
        tags.length ? DIGITAL_BUILDER.levels(tags.join(' ')) : '',
        DIGITAL_BUILDER.design,
        DIGITAL_BUILDER.theme,
        DIGITAL_BUILDER.a11y,
        DIGITAL_BUILDER.progress,
        teacher.length ? DIGITAL_BUILDER.teacher : '',
      ]
    : [];
  if (isDigital) section('Especificacions del material digital', bullets(digitalLines));

  // Qualitat i indicacions de l'usuari
  section('Altres indicacions', bullets([...quality.map((q) => q.line), o.notes?.trim()]));

  // Lliurament
  // Al format digital, els nivells ja són al selector del fitxer.
  const student = `${format.deliver}${tiers.length && !isDigital ? `, amb els ${tiers.length} nivells` : ''}`;
  const deliver = teacher.length
    ? [
        'Lliura, amb separadors clars i en aquest ordre:',
        `1. Material de l’alumne: ${student}.`,
        `2. Versió del docent${isDigital ? ' (dins del fitxer, a la vista docent)' : ', separada del material de l’alumne'}:`,
        ...teacher.map((t) => `   - ${t.line}`),
      ]
    : [`Lliura ${student}.`];
  section('Lliurament', deliver);

  // Autorevisió
  if (quality.some((q) => q.id === 'revisio')) {
    section('Abans de lliurar, comprova', [
      ...bullets([
        ...QUALITY_CHECKS.base,
        tiers.length && QUALITY_CHECKS.levels,
        tiers.length && bloom.some((b) => BLOOM_HIGHER.includes(b.id)) && QUALITY_CHECKS.higher,
        teacher.some((t) => t.id === 'solucions') && QUALITY_CHECKS.solutions,
      ]),
    ]);
  }

  // Versió digital afegida a un material en paper
  if (addon) {
    sections.push(
      [
        '## Versió digital interactiva (a més del material anterior)',
        `Crea també el material com a ${lowerFirst(DIGITAL_TECH)}`,
        ...bullets(digitalLines.slice(1)),
        '- Aplica-hi totes les adaptacions indicades abans.',
        'Lliura el codi complet en un sol bloc, sense parts omeses.',
      ].join('\n'),
    );
  }

  const text = [intro, ...sections].join('\n\n');

  const verb = action.id === 'crear' ? 'Crear' : 'Adaptar';
  const title = `${verb}: ${format.name}${profileLabels.length ? ` (${profileLabels.join(', ')})` : ''}`;

  return {
    title,
    text,
    actions: [action.id],
    // El perfil universal es desa amb totes les etiquetes perquè aparegui a tots els filtres.
    profiles: universal ? PROFILES.map((p) => p.id) : profiles,
    formats: [formatId],
    // Si el text encara no inclou la versió digital, es podrà afegir des de la biblioteca.
    digital: !anyDigital,
  };
}
