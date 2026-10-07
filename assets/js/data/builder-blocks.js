// Blocs per al generador de prompts. Cada perfil i format aporta poques línies,
// concretes i combinables, perquè el prompt final sigui curt i clar.

import { DIGITAL_TECH, DIGITAL_FEATURES } from './digital.js';

export const BUILDER_ACTIONS = [
  {
    id: 'adaptar',
    label: 'Adaptar material',
    task: 'Adapta el material adjunt',
    lines: ['Mantén els objectius i el contingut; canvia només el que calgui per eliminar barreres.'],
  },
  {
    id: 'crear',
    label: 'Crear de zero',
    task: 'Crea un material nou',
    lines: ['Continguts rigorosos i adequats al currículum de l’etapa.'],
  },
];

export const BUILDER_STAGES = [
  'Educació infantil',
  'Primària · cicle inicial',
  'Primària · cicle mitjà',
  'Primària · cicle superior',
  'ESO · 1r-2n',
  'ESO · 3r-4t',
  'Batxillerat',
  'FP / PFI',
  'Persones adultes',
];

export const BUILDER_FORMATS = {
  digital: {
    name: 'material digital interactiu (un sol fitxer HTML)',
    lines: [DIGITAL_TECH, ...DIGITAL_FEATURES],
    deliver: 'el codi complet del fitxer HTML (en un sol bloc, sense parts omeses)',
  },
  text: {
    name: 'text o lectura',
    lines: ['Organitza el text en apartats curts amb títols clars.', 'Afegeix 3-4 preguntes de comprensió.'],
    deliver: 'el text',
  },
  fitxa: {
    name: 'fitxa d’activitats',
    lines: ['Ordena les activitats de menys a més dificultat.', 'Consignes amb el verb al principi i una sola acció per consigna.'],
    deliver: 'la fitxa',
  },
  examen: {
    name: 'examen o prova',
    lines: ['Avalua els criteris de manera clara: una demanda per pregunta, puntuació visible i molt d’espai per respondre.', 'Ordena les preguntes de menys a més dificultat.'],
    deliver: 'l’examen',
  },
  presentacio: {
    name: 'presentació de diapositives',
    lines: ['Una idea per diapositiva, títol descriptiu i màxim 3-4 punts curts.', 'Afegeix notes del docent i text alternatiu per a cada imatge.'],
    deliver: 'la presentació diapositiva per diapositiva',
  },
  esquema: {
    name: 'esquema o mapa conceptual',
    lines: ['Concepte central i màxim 5-7 idees principals, amb nodes d’1-4 paraules.', 'Afegeix una versió en llista jeràrquica.'],
    deliver: 'l’esquema',
  },
  visual: {
    name: 'suport visual (seqüència o targetes)',
    lines: ['Cada element amb un text breu (màx. 4 paraules) i el pictograma ARASAAC suggerit (paraula a cercar).'],
    deliver: 'el suport visual en forma de taula (text · pictograma)',
  },
  historia: {
    name: 'història social',
    lines: ['Segueix les pautes de Carol Gray: frases descriptives en primera persona i en present, poques frases directives.', 'Una o dues frases per pàgina, amb imatge suggerida.'],
    deliver: 'la història pàgina per pàgina',
  },
  rubrica: {
    name: 'rúbrica o llista de control',
    lines: ['Criteris observables en primera persona i 4 nivells amb descriptors curts.', 'Afegeix una versió en llista de control (☐).'],
    deliver: 'la rúbrica i la llista de control',
  },
  joc: {
    name: 'joc, dinàmica o projecte',
    lines: ['Rols clars i accessibles per a tothom, normes curtes (màx. 4) i materials concrets.'],
    deliver: 'la proposta pas a pas',
  },
  document: {
    name: 'document per al docent o la família',
    lines: ['Llenguatge clar i directe, organitzat en apartats curts.'],
    deliver: 'el document',
  },
};

export const BUILDER_PROFILES = {
  dua: [
    'Ofereix la informació en més d’un format (text, imatge, esquema).',
    'Dona opcions per respondre (escrit, oral o gràfic).',
  ],
  tea: [
    'Llenguatge literal i concret: sense metàfores, ironies ni ambigüitats.',
    'Estructura previsible i repetida, amb inici i final clars (ex.: «Activitat 2 de 5»).',
    'Poca càrrega visual i un suport visual per a cada consigna.',
  ],
  tdah: [
    'Divideix la tasca en blocs curts, cadascun amb un objectiu i una casella ☐ per marcar.',
    'Destaca en negreta el verb de cada consigna i elimina la informació accessòria.',
    'Indica el temps orientatiu de cada bloc.',
  ],
  dislexia: [
    'Frases i paràgrafs curts; paraules clau en negreta (sense cursiva ni majúscules seguides).',
    'Redueix l’escriptura: opció múltiple, completar amb banc de paraules o relacionar.',
    'Format recomanat: lletra sense serifa de 12-14 pt, interlineat 1,5 i text alineat a l’esquerra.',
  ],
  discalculia: [
    'Redueix el càlcul mecànic quan no sigui l’objectiu; permet calculadora o taules.',
    'Afegeix suports visuals per als números (recta numèrica, taules, dibuixos).',
    'Inclou una guia de resolució per passos per als problemes.',
  ],
  tdl: [
    'Frases en ordre subjecte-verb-complement, sense subordinades encadenades ni llenguatge figurat.',
    'Treballa 6-8 paraules clau amb definició senzilla i exemple; no facis servir sinònims per variar.',
    'Ofereix inicis de frase com a model de resposta.',
  ],
  di: [
    'Centra’t en els aprenentatges essencials i funcionals, mantenint el tema del grup.',
    'Llenguatge molt senzill, una consigna per activitat i un exemple resolt.',
    'Activitats visuals o manipulatives, amb ajudes que es van retirant.',
  ],
  nouvingut: [
    'Redueix la dificultat lingüística, no el nivell cognitiu: frases curtes (màx. 10 paraules) i vocabulari freqüent.',
    'Mantén els termes clau en català amb la traducció a [llengua] entre parèntesis.',
    'To adequat a l’edat; no infantilitzis.',
  ],
  visual: [
    'Estructura amb títols i llistes reals, navegables amb lector de pantalla.',
    'Descriu cada imatge o gràfic amb text alternatiu; no depenguis del color ni de la posició.',
    'Proposa alternatives a les activitats purament visuals.',
  ],
  auditiva: [
    'Tota la informació oral ha d’aparèixer també per escrit o en suport visual.',
    'Sintaxi senzilla mantenint el vocabulari específic; afegeix un glossari visual previ.',
  ],
  motriu: [
    'Ofereix alternatives a l’escriptura manual: marcar, assenyalar, respondre oralment o en digital.',
    'Evita tasques de precisió motriu (retallar, encerclar petit) i deixa espais de resposta grans.',
  ],
  altes: [
    'Augmenta la profunditat i la complexitat, no la quantitat.',
    'Inclou almenys una pregunta oberta que requereixi argumentar o crear.',
    'Ofereix opcions d’elecció i autonomia.',
  ],
  emocional: [
    'To positiu i proper; presenta els errors com a part de l’aprenentatge.',
    'Comença amb una tasca curta d’èxit assegurat i preveu l’opció de demanar una pausa.',
  ],
};

export const BUILDER_EXTRAS = [
  {
    id: 'pictos',
    label: 'Pictogrames ARASAAC',
    line: 'Proposa un pictograma (ARASAAC) o una imatge per a cada consigna o concepte clau, indicant la paraula a cercar.',
  },
  { id: 'exemple', label: 'Exemple resolt', line: 'Inclou un exemple resolt al principi.' },
  {
    id: 'glossari',
    label: 'Glossari',
    line: 'Afegeix un glossari de 8-10 paraules clau amb una definició senzilla.',
    deliver: 'el glossari',
  },
  { id: 'solucionari', label: 'Solucionari', deliver: 'el solucionari' },
  {
    id: 'digital',
    label: 'Versió digital (HTML)',
    addon: true,
    notForFormat: 'digital',
  },
  { id: 'autoavaluacio', label: 'Autoavaluació', line: 'Afegeix una autoavaluació breu de 3 ítems per a l’alumne.' },
  {
    id: 'imprimir',
    label: 'Llest per imprimir',
    line: 'Format net, llest per imprimir: molt espai en blanc i sense elements decoratius.',
  },
  {
    id: 'noInventar',
    label: 'No inventar i marcar dubtes',
    line: 'No inventis contingut. Marca amb [?] el que hagi de revisar.',
    default: true,
  },
  { id: 'canvis', label: 'Llista de canvis', deliver: 'una llista breu dels canvis principals', default: true, onlyFor: 'adaptar' },
];
