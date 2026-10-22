// Blocs per al generador de prompts. Cada bloc aporta línies concretes, verificables
// i combinables. El generador les agrupa per seccions i n'elimina les repetides.
// Els ids es desen a la configuració del generador (localStorage): no els canviïs.

export const BUILDER_ROLE =
  'Actua com a especialista en disseny de materials educatius inclusius, Disseny Universal per a l’Aprenentatge (DUA) i didàctica';

export const BUILDER_ACTIONS = [
  {
    id: 'adaptar',
    label: 'Adaptar material',
    task: 'Adapta el material adjunt',
    lines: [
      'Mantén els objectius d’aprenentatge i els continguts essencials; canvia només el que calgui per eliminar barreres d’accés, de comprensió, d’expressió o d’implicació.',
      'Si el material original té errors, ambigüitats o informació obsoleta, corregeix-ho i indica-ho.',
    ],
  },
  {
    id: 'crear',
    label: 'Crear de zero',
    task: 'Crea un material nou',
    lines: [
      'Continguts rigorosos, actualitzats i adequats al currículum vigent de l’etapa.',
      'Situa l’aprenentatge en un context proper i significatiu per a l’alumnat (situació d’aprenentatge).',
    ],
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

export const BUILDER_DURATIONS = [
  { id: 'auto', label: 'Sense indicar' },
  { id: 'breu', label: 'Activitat breu (15-30 min)', line: 'Durada prevista: una activitat breu de 15-30 minuts.' },
  { id: 'sessio', label: 'Una sessió (50-60 min)', line: 'Durada prevista: una sessió de 50-60 minuts.' },
  {
    id: 'sequencia',
    label: 'Seqüència (2-4 sessions)',
    line: 'Durada prevista: una seqüència de 2-4 sessions; organitza el material per sessions amb inici, desenvolupament i tancament.',
  },
];

// `activities`: el format conté activitats (s'hi apliquen nivells, tipologies i Bloom).
export const BUILDER_FORMATS = {
  digital: {
    name: 'material digital interactiu (un sol fitxer HTML)',
    activities: true,
    lines: [],
    deliver: 'el codi complet del fitxer HTML en un sol bloc, sense parts omeses',
  },
  text: {
    name: 'text o lectura',
    activities: true,
    lines: [
      'Organitza el text en apartats curts amb títols informatius (millor en forma de pregunta) i una idea principal per paràgraf.',
      'Afegeix preguntes de comprensió de diferent demanda: literals, inferencials i crítiques.',
    ],
    deliver: 'el text amb les activitats',
  },
  fitxa: {
    name: 'fitxa d’activitats',
    activities: true,
    lines: [
      'Ordena i numera les activitats de menys a més dificultat.',
      'Consignes amb el verb al principi i una sola acció per consigna.',
    ],
    deliver: 'la fitxa',
  },
  examen: {
    name: 'examen o prova',
    activities: true,
    lines: [
      'Instruccions inicials amb el temps, el material permès i com es puntua.',
      'Una demanda per pregunta, puntuació visible, preguntes ben separades i espai suficient per respondre.',
      'Ordena les preguntes de menys a més dificultat i avalua els criteris de manera clara, sense paranys.',
    ],
    deliver: 'l’examen',
  },
  presentacio: {
    name: 'presentació de diapositives',
    activities: true,
    lines: [
      'Una idea per diapositiva, títol descriptiu i màxim 3-4 punts curts.',
      'Intercala diapositives d’activitat o de comprovació de la comprensió.',
      'Notes del docent per a cada diapositiva i text alternatiu per a cada imatge.',
    ],
    deliver: 'la presentació diapositiva per diapositiva',
  },
  esquema: {
    name: 'esquema o mapa conceptual',
    lines: [
      'Concepte central i màxim 5-7 idees principals, amb nodes d’1-4 paraules i connexions etiquetades.',
      'Afegeix una versió en llista jeràrquica i 3 preguntes de repàs.',
    ],
    deliver: 'l’esquema',
  },
  visual: {
    name: 'suport visual (seqüència o targetes)',
    lines: ['Cada element amb un text breu (màx. 4 paraules) i el pictograma ARASAAC suggerit (paraula a cercar).'],
    deliver: 'el suport visual en forma de taula (text · pictograma)',
  },
  historia: {
    name: 'història social',
    lines: [
      'Segueix les pautes de Carol Gray: frases descriptives en primera persona i en present, poques frases directives.',
      'Una o dues frases per pàgina, amb imatge suggerida.',
    ],
    deliver: 'la història pàgina per pàgina',
  },
  rubrica: {
    name: 'rúbrica o llista de control',
    lines: [
      'Criteris observables en primera persona i 4 nivells amb descriptors curts i progressius.',
      'Afegeix una versió en llista de control (☐).',
    ],
    deliver: 'la rúbrica i la llista de control',
  },
  joc: {
    name: 'joc, dinàmica o projecte',
    activities: true,
    lines: ['Rols clars i accessibles per a tothom, normes curtes (màx. 4), materials concrets i un producte final definit.'],
    deliver: 'la proposta pas a pas',
  },
  document: {
    name: 'document per al docent o la família',
    lines: ['Llenguatge clar i directe, organitzat en apartats curts.'],
    deliver: 'el document',
  },
};

/* ───────── Alumnat ───────── */

// Perfil universal: un grup heterogeni real, sense etiquetar ningú.
export const UNIVERSAL_PROFILE = {
  id: 'universal',
  label: 'Universal (tota la diversitat)',
  intro:
    'Dissenya per a un grup heterogeni real que pot incloure, sense etiquetar ningú, alumnat amb TEA, TDAH, dislèxia, discalcúlia, TDL, discapacitat intel·lectual, discapacitat visual, auditiva o motriu, altes capacitats, malestar emocional i alumnat nouvingut. Les mesures han de ser útils per a tothom i opcionals per a qui no les necessiti.',
  groups: [
    ['Accés i percepció', 'informació en més d’un format (text, imatge, esquema i, en digital, àudio); text alternatiu a les imatges; res que depengui només del color, la posició o el so; compatible amb lector de pantalla i macrotipus.'],
    ['Llenguatge i lectura', 'frases curtes en ordre subjecte-verb-complement, vocabulari freqüent, termes clau en negreta amb glossari i sempre la mateixa paraula per al mateix concepte; sense llenguatge figurat no explicat; menys càrrega lectora i escrita quan no siguin l’objectiu.'],
    ['Atenció i funcions executives', 'tasques fragmentades en passos curts amb objectiu, temps orientatiu i casella ☐; una consigna per pas; checklist de revisió final; alternança de tipus d’activitat.'],
    ['Previsibilitat i comunicació social', 'estructura idèntica a cada activitat, indicador de progrés, anticipació de què es farà i de com s’acaba; consignes explícites i literals; rols definits en el treball en grup.'],
    ['Comprensió i raonament', 'activació de coneixements previs, exemples resolts, organitzadors gràfics i ajudes graduades que es retiren progressivament, amb transferència a contextos funcionals.'],
    ['Càlcul i matemàtiques', 'si n’hi ha, suports visuals i manipulatius, guia de resolució per passos i calculadora quan el càlcul no sigui l’objectiu.'],
    ['Expressió i motricitat', 'diverses maneres de respondre (escrit, oral, gràfic, marcar, digital), espais de resposta amplis i cap tasca de precisió motriu imprescindible.'],
    ['Llengua d’aprenentatge', 'glossari visual, inicis de frase i opció de traduir els termes clau a [llengües familiars del grup], reduint la dificultat lingüística però no el nivell cognitiu, amb un to adequat a l’edat.'],
    ['Repte i altes capacitats', 'ampliacions en profunditat (analitzar, avaluar, crear) i opcions d’elecció, no més quantitat.'],
    ['Benestar emocional', 'to positiu i validant, inici amb èxit assegurat, l’error com a oportunitat d’aprenentatge i opció de demanar ajuda o una pausa.'],
  ],
};

export const BUILDER_PROFILES = {
  dua: [
    'Pensa el material per a tot el grup des de l’inici, no com una adaptació posterior.',
    'Ofereix la informació en més d’un format (text, imatge, esquema, àudio).',
    'Dona opcions per respondre (escrit, oral, gràfic o digital) i per triar part de les activitats.',
    'Incorpora bastides opcionals i visibles per a tothom, sense assenyalar ningú.',
  ],
  tea: [
    'Llenguatge literal i concret: sense metàfores, ironies, dobles sentits ni preguntes retòriques; si cal llenguatge figurat, explica’l.',
    'Estructura previsible i idèntica a cada activitat (títol · què he de fer · exemple · espai de resposta), amb indicador de progrés (ex.: «Activitat 2 de 5»).',
    'Anticipa què es farà, quant durarà, quan s’acaba i què ve després.',
    'Consignes explícites i seqüenciades, amb un suport visual per a cada consigna; evita demandes implícites com «comenta» sense dir com.',
    'Poca càrrega sensorial i visual; en el treball en grup, rols i torns definits.',
  ],
  tdah: [
    'Divideix la tasca en blocs curts (5-10 minuts), cadascun amb objectiu, temps orientatiu i casella ☐ per marcar.',
    'Una sola consigna per pas, amb el verb en negreta; elimina la informació accessòria i els distractors visuals.',
    'Alterna activitats curtes de resposta ràpida amb les més llargues i preveu pauses actives.',
    'Retroacció freqüent i immediata.',
    'Checklist final de revisió («He respost totes les preguntes?», «He revisat les unitats?»).',
  ],
  dislexia: [
    'Frases i paràgrafs curts; paraules clau en negreta (sense cursiva, subratllat ni majúscules seguides).',
    'Redueix l’escriptura i la lectura quan no siguin l’objectiu: opció múltiple, completar amb banc de paraules, relacionar o resposta oral.',
    'Enunciats curts, separats de les dades i ben numerats; preveu la lectura en veu alta dels enunciats.',
    'Format recomanat: lletra sense serifa de 12-14 pt, interlineat 1,5, text alineat a l’esquerra i fons sense textures.',
    'No penalitzis l’ortografia quan no sigui el criteri avaluat.',
  ],
  discalculia: [
    'Redueix el càlcul mecànic quan no sigui l’objectiu; permet calculadora, taules o formularis.',
    'Afegeix suports visuals i manipulatius per als números (recta numèrica, blocs, taula de valor posicional, dibuixos).',
    'Inclou una guia de resolució per passos (entenc · planifico · resolc · comprovo) amb un exemple resolt.',
    'Números grans i ben espaiats, una operació per línia i quadrícula per alinear.',
    'Explicita el vocabulari matemàtic («el doble», «la diferència») amb un exemple.',
  ],
  tdl: [
    'Frases en ordre subjecte-verb-complement, sense subordinades encadenades, passives ni llenguatge figurat.',
    'Treballa 6-8 paraules clau abans de la tasca (definició senzilla, exemple i imatge) i fes-les servir sempre igual, sense sinònims per variar.',
    'Consignes curtes en passos numerats, amb suport visual.',
    'Ofereix inicis de frase com a model de resposta i accepta respostes orals o amb suport gràfic.',
    'Comprova la comprensió literal abans de demanar inferències.',
  ],
  di: [
    'Centra’t en els aprenentatges essencials i funcionals, mantenint el tema i el context del grup.',
    'Llenguatge molt senzill (lectura fàcil), una consigna per activitat i un exemple resolt.',
    'Activitats concretes, visuals o manipulatives, amb ajudes que es van retirant.',
    'Repetició amb variació: el mateix aprenentatge en contextos diferents per afavorir la generalització.',
    'Indicadors d’èxit petits i observables, amb reforç positiu explícit.',
  ],
  nouvingut: [
    'Redueix la dificultat lingüística, no el nivell cognitiu: frases curtes (màx. 10 paraules), vocabulari freqüent i estructures repetides.',
    'Mantén els termes clau en català amb la traducció a [llengua] entre parèntesis.',
    'Suport visual per a cada concepte clau i exemples interculturals.',
    'Ofereix models de llengua (inicis de frase, banc de paraules) per respondre.',
    'To adequat a l’edat; no infantilitzis.',
  ],
  visual: [
    'Estructura amb títols, llistes i taules reals, navegables amb lector de pantalla i amb un ordre de lectura lògic.',
    'Descriu cada imatge o gràfic amb text alternatiu complet; no depenguis del color ni de la posició («la de la dreta»).',
    'Preveu una versió en macrotipus (lletra de 18-24 pt, alt contrast, una sola columna).',
    'Proposa alternatives a les activitats purament visuals (traçar fletxes, encerclar, interpretar imatges).',
    'Indica on caldria material tàctil o en relleu.',
  ],
  auditiva: [
    'Tota la informació oral (instruccions, vídeos, àudios) ha d’aparèixer també per escrit o en suport visual, amb subtítols i transcripcions.',
    'Sintaxi senzilla mantenint el vocabulari específic; afegeix un glossari visual previ.',
    'Esquemes i passos numerats per seguir la seqüència de la tasca.',
    'Evita les activitats basades només en l’escolta o ofereix-ne una alternativa visual.',
  ],
  motriu: [
    'Ofereix alternatives a l’escriptura manual: marcar, assenyalar, respondre oralment, amb teclat o per dictat.',
    'Evita tasques de precisió motriu (retallar, encerclar petit, arrossegar) i deixa espais de resposta grans.',
    'Menys quantitat d’escriptura amb la mateixa exigència cognitiva i sense límits de temps estrictes.',
    'Format compatible amb productes de suport (teclats adaptats, commutadors, ratolins alternatius).',
  ],
  altes: [
    'Augmenta la profunditat, l’abstracció i la complexitat, no la quantitat.',
    'Inclou reptes oberts que demanin analitzar, avaluar o crear, amb criteris d’èxit clars.',
    'Ofereix opcions d’elecció (tema, recorregut, format del producte) i autonomia.',
    'Connecta amb altres àrees, problemes reals i fonts expertes.',
    'Evita repetir tasques ja dominades (compactació del currículum).',
  ],
  emocional: [
    'To positiu, proper i validant; presenta l’error com a part de l’aprenentatge.',
    'Comença amb una tasca curta d’èxit assegurat i augmenta la dificultat de manera gradual.',
    'Preveu l’opció de demanar una pausa o ajuda amb un senyal acordat.',
    'Anticipa els continguts que puguin ser sensibles i evita exemples que ho siguin sense necessitat.',
  ],
};

/* ───────── DUA (pautes 3.0, CAST 2024) ───────── */

export const DUA_PRINCIPLES = [
  {
    id: 'implicacio',
    label: 'Implicació (el perquè)',
    lines: [
      'Connecta amb interessos i contextos reals i explica per a què serveix el que s’aprèn.',
      'Ofereix opcions d’elecció (activitats, ordre, format de resposta) i reptes ajustables.',
      'Fomenta l’autoregulació: objectiu visible a l’inici, autoavaluació i reflexió sobre el procés.',
      'Preveu la col·laboració amb rols definits i un clima segur on l’error forma part de l’aprenentatge.',
    ],
  },
  {
    id: 'representacio',
    label: 'Representació (el què)',
    lines: [
      'Presenta cada idea clau almenys en dos formats (text, imatge, esquema, exemple o àudio).',
      'Clarifica el vocabulari, els símbols i les estructures, i activa els coneixements previs.',
      'Destaca els patrons, les idees principals i les relacions, i afavoreix la transferència.',
    ],
  },
  {
    id: 'accio',
    label: 'Acció i expressió (el com)',
    lines: [
      'Ofereix diverses maneres de respondre i de demostrar l’aprenentatge (escrit, oral, gràfic, digital o manipulatiu).',
      'Proporciona eines per planificar i fer el seguiment de la tasca (checklists, plantilles, models).',
      'Dona retroacció formativa que indiqui com millorar, no només si és correcte.',
    ],
  },
];

/* ───────── Nivells progressius ───────── */

export const LEVEL_TIERS = [
  { symbol: '●', name: 'Inicial', metaphor: 'Camp base', desc: 'màxim suport: exemple resolt, bastides completes, llenguatge més senzill i menys ítems, amb el mateix objectiu essencial' },
  { symbol: '■', name: 'Intermedi', metaphor: 'Refugi', desc: 'l’objectiu de l’etapa, amb suports puntuals i opcionals' },
  { symbol: '▲', name: 'Avançat', metaphor: 'Cim', desc: 'més abstracció i transferència a contextos nous, amb menys bastides' },
  { symbol: '◆', name: 'Expert', metaphor: 'Expedició', desc: 'repte obert d’alta complexitat (avaluar i crear), amb elecció del producte' },
];

export const LEVEL_COUNTS = [
  { id: '1', label: 'Un sol nivell' },
  { id: '2', label: '2' },
  { id: '3', label: '3' },
  { id: '4', label: '4' },
];

export const LEVEL_STYLES = [
  { id: 'simbols', label: 'Símbols (● ■ ▲ ◆)', key: 'symbol', note: 'símbols discrets, sense números ni noms que comparin l’alumnat' },
  { id: 'noms', label: 'Noms (Inicial, Intermedi…)', key: 'name', note: 'noms neutres, mai «fàcil» o «difícil»' },
  { id: 'metafora', label: 'Metàfora (Camp base, Refugi…)', key: 'metaphor', note: 'una metàfora de progrés (ascensió a una muntanya)' },
];

export const LEVEL_MODES = [
  {
    id: 'paralel',
    label: 'Versions paral·leles',
    line: 'Cada activitat té una versió per nivell, amb el mateix contingut i diferent grau de suport i complexitat: tot el grup treballa alhora la mateixa activitat.',
  },
  {
    id: 'escala',
    label: 'Escala progressiva',
    line: 'Les activitats formen una escala de dificultat creixent per nivells: tothom comença pel primer graó i avança fins on pugui, amb punts de control entre nivells.',
  },
  {
    id: 'menu',
    label: 'Menú d’elecció',
    line: 'Menú d’activitats agrupades per nivell: l’alumne tria, amb orientació del docent, un mínim d’activitats i pot combinar nivells.',
  },
];

/* ───────── Bastides ───────── */

export const BUILDER_SCAFFOLDS = [
  { id: 'previs', label: 'Activació de coneixements previs', line: 'Activitat inicial breu per activar els coneixements previs i el vocabulari necessari.' },
  { id: 'model', label: 'Exemple resolt', line: 'Exemple resolt al principi de cada tipus d’activitat, amb el procés explicat pas a pas.', default: true },
  { id: 'pensament', label: 'Pensament en veu alta', line: 'Modelatge del pensament: com raonaria una persona experta per resoldre-ho («Primer miro…, després…»).' },
  { id: 'passos', label: 'Passos i checklist', line: 'Tasques complexes desglossades en passos numerats amb casella ☐.' },
  { id: 'organitzador', label: 'Organitzadors gràfics', line: 'Organitzadors gràfics (taula, diagrama de Venn, línia del temps, mapa) per estructurar la informació i la resposta.', default: true },
  { id: 'banc', label: 'Banc de paraules', line: 'Banc de paraules clau per completar o redactar.' },
  { id: 'inicis', label: 'Inicis de frase', line: 'Inicis de frase i connectors com a model de resposta («Crec que… perquè…», «En primer lloc…»).', default: true },
  { id: 'pistes', label: 'Pistes graduades', line: 'Pistes graduades en 2-3 nivells (de més general a més concreta), separades de la consigna perquè s’usin només si cal.', default: true },
  { id: 'preguntes', label: 'Preguntes guia', line: 'Preguntes guia que orientin el raonament sense donar la resposta.' },
  { id: 'glossari', label: 'Glossari', line: 'Glossari de 8-10 paraules clau amb una definició senzilla i un exemple.' },
  { id: 'visuals', label: 'Suports visuals', line: 'Suport visual (imatge, esquema o icona) per a les consignes i els conceptes clau.' },
  { id: 'manipulatiu', label: 'Material manipulatiu', line: 'Proposa material manipulatiu o concret quan ajudi a comprendre.' },
  { id: 'retirada', label: 'Retirada progressiva', line: 'Retirada progressiva de les ajudes: model → pràctica guiada → pràctica autònoma.' },
  { id: 'autoregulacio', label: 'Objectiu i autoavaluació', line: 'Objectiu visible a l’inici («Avui aprendré a…») i autoavaluació breu al final (semàfor o 3 ítems).', default: true },
];

/* ───────── Activitats ───────── */

export const BUILDER_EXERCISES = [
  { id: 'multiple', label: 'Opció múltiple', desc: 'opció múltiple amb distractors plausibles', default: true },
  { id: 'vf', label: 'Vertader o fals justificat', desc: 'vertader o fals amb justificació' },
  { id: 'relacionar', label: 'Relacionar', desc: 'relacionar conceptes, imatges o definicions', default: true },
  { id: 'completar', label: 'Completar', desc: 'completar (amb banc de paraules al nivell amb més suport)', default: true },
  { id: 'ordenar', label: 'Ordenar o seqüenciar', desc: 'ordenar passos, fets o idees' },
  { id: 'classificar', label: 'Classificar', desc: 'classificar en categories' },
  { id: 'curta', label: 'Resposta curta', desc: 'resposta curta', default: true },
  { id: 'imatges', label: 'Interpretar imatges i gràfics', desc: 'interpretació d’imatges, taules o gràfics' },
  { id: 'problema', label: 'Resolució de problemes', desc: 'resolució de problemes contextualitzats' },
  { id: 'error', label: 'Troba l’error', desc: 'detecció i correcció d’errors' },
  { id: 'comparar', label: 'Comparar i contrastar', desc: 'comparar i contrastar' },
  { id: 'cas', label: 'Anàlisi de casos', desc: 'anàlisi d’un cas o d’una situació real' },
  { id: 'argumentar', label: 'Argumentació', desc: 'resposta oberta argumentada', default: true },
  { id: 'crear', label: 'Producte creatiu', desc: 'creació d’un producte (text, esquema, proposta o disseny)', default: true },
  { id: 'cooperativa', label: 'Cooperativa', desc: 'activitat cooperativa amb rols' },
  { id: 'metacognicio', label: 'Metacognició', desc: 'reflexió sobre el propi aprenentatge' },
];

export const BUILDER_COUNTS = [
  { id: 'auto', label: 'Que ho decideixi la IA' },
  { id: '4', label: '4' },
  { id: '6', label: '6' },
  { id: '8', label: '8' },
  { id: '10', label: '10' },
  { id: '12', label: '12' },
  { id: '15', label: '15' },
];

// Taxonomia de Bloom revisada (Anderson i Krathwohl, 2001).
export const BLOOM_LEVELS = [
  { id: 'recordar', label: 'Recordar', verbs: 'identificar, anomenar, definir' },
  { id: 'comprendre', label: 'Comprendre', verbs: 'explicar, resumir, posar exemples' },
  { id: 'aplicar', label: 'Aplicar', verbs: 'utilitzar, resoldre, calcular' },
  { id: 'analitzar', label: 'Analitzar', verbs: 'comparar, distingir, relacionar causes' },
  { id: 'avaluar', label: 'Avaluar', verbs: 'justificar, valorar, argumentar' },
  { id: 'crear', label: 'Crear', verbs: 'dissenyar, proposar, elaborar' },
];
export const BLOOM_HIGHER = ['analitzar', 'avaluar', 'crear'];

/* ───────── Versió del docent ───────── */

// `activities`: només per a formats amb activitats. `onlyFor`: només per a aquesta acció.
export const BUILDER_TEACHER = [
  {
    id: 'solucions',
    label: 'Solucionari',
    line: 'Solucionari complet de cada activitat i de cada nivell; a les preguntes obertes, una resposta model i els criteris de correcció.',
    activities: true,
    default: true,
  },
  {
    id: 'guia',
    label: 'Guia didàctica',
    line: 'Guia didàctica breu: objectius, temporització orientativa, agrupaments, com introduir i tancar la sessió i com fer servir els nivells i les bastides a l’aula.',
    default: true,
  },
  {
    id: 'errors',
    label: 'Errors previsibles',
    line: 'Errors i dificultats previsibles en cada activitat, com detectar-los i quina ajuda oferir en cada cas.',
  },
  {
    id: 'bloom',
    label: 'Resum de Bloom',
    line: 'Taula resum de la taxonomia de Bloom: activitat · nivell de Bloom · verb operatiu · nivell de suport · criteri d’avaluació, amb el recompte d’activitats per nivell de Bloom per comprovar-ne l’equilibri.',
    activities: true,
  },
  {
    id: 'dua',
    label: 'Mapa DUA',
    line: 'Mapa de les mesures DUA aplicades: quin principi i quina pauta cobreix cada element i quina barrera elimina.',
  },
  {
    id: 'avaluacio',
    label: 'Criteris i rúbrica',
    line: 'Criteris d’avaluació alineats amb els objectius i una rúbrica breu de 4 nivells o una llista de control.',
  },
  {
    id: 'curriculum',
    label: 'Vincle curricular',
    line: 'Relació amb el currículum: competències específiques, criteris d’avaluació i sabers implicats (si no els coneixes amb seguretat, indica’ls de manera genèrica i marca-ho amb [?]).',
  },
  {
    id: 'seguiment',
    label: 'Graella de seguiment',
    line: 'Graella d’observació per registrar el nivell triat, les ajudes utilitzades i el progrés de cada alumne (amb codis, sense noms).',
  },
  {
    id: 'canvis',
    label: 'Llista de canvis',
    line: 'Llista breu dels canvis fets respecte de l’original i el motiu de cadascun.',
    onlyFor: 'adaptar',
    default: true,
  },
];

/* ───────── Presentació visual ───────── */

// `paper`: només per a materials no digitals (el format digital té el seu propi disseny).
export const BUILDER_VISUAL = [
  {
    id: 'minimal',
    label: 'Disseny minimalista',
    line: 'Disseny net i minimalista: jerarquia tipogràfica clara (títol, subtítol, consigna), molt d’espai en blanc, una sola columna de lectura i cap element decoratiu que no aporti informació.',
    paper: true,
    default: true,
  },
  {
    id: 'consignes',
    label: 'Consignes destacades',
    line: 'Cada consigna en un requadre, amb el verb en negreta i separada de la informació i de l’espai de resposta.',
    default: true,
  },
  {
    id: 'icones',
    label: 'Icones per tipus de tasca',
    line: 'Un símbol constant per a cada tipus de tasca (📖 llegeix · ✏️ escriu · 🗣️ explica · 🧩 relaciona · 🔍 analitza), sempre al mateix lloc.',
  },
  {
    id: 'pictos',
    label: 'Pictogrames ARASAAC',
    line: 'Proposa un pictograma (ARASAAC) o una imatge per a cada consigna o concepte clau, indicant la paraula a cercar.',
  },
  {
    id: 'tipografia',
    label: 'Tipografia accessible',
    line: 'Lletra sense serifa de 12-14 pt, interlineat 1,5, text alineat a l’esquerra i sense cursives ni majúscules seguides.',
    paper: true,
  },
  {
    id: 'color',
    label: 'Codi de color redundant',
    line: 'Codi de color suau i coherent (màxim 2-3 colors), sempre acompanyat de text o d’un símbol: mai només color.',
  },
  {
    id: 'imprimir',
    label: 'Llest per imprimir (A4)',
    line: 'Maquetació llesta per imprimir en A4: marges amplis, sense fons de color, salts de pàgina lògics i espais de resposta proporcionats.',
    paper: true,
  },
];

// Especificacions del format digital (o de la versió digital afegida).
export const DIGITAL_BUILDER = {
  structure: 'Estructura: inici amb l’objectiu i com fer-lo servir · apunts amb el contingut clau · activitats · tancament amb resum i autoavaluació.',
  levels: (tags) =>
    `Selector de nivell (${tags}) discret i sempre visible, que canviï consignes, ajudes i dificultat sense canviar el tema, i que es pugui canviar en qualsevol moment.`,
  activities:
    'Activitats autocorrectives amb retroacció immediata que expliqui l’error, pistes desplegables graduades i opció de tornar-ho a provar; les preguntes obertes, amb espai de resposta desat.',
  design:
    'Disseny visual minimalista i professional: una columna de lectura (màx. 70 caràcters per línia), un sol color d’accent amb neutres, tipografia del sistema de 18 px amb interlineat 1,6, molt d’espai en blanc, targetes amb vores subtils, icones SVG senzilles i cap imatge o efecte decoratiu.',
  theme: 'Tema clar i fosc (segons la preferència del sistema i amb commutador) i animacions mínimes que respectin prefers-reduced-motion.',
  a11y:
    'Accessibilitat (WCAG 2.2 AA): HTML semàntic, tot operable amb teclat i focus visible, contrast suficient, mida de lletra ajustable, botó per escoltar el text (síntesi de veu del navegador), text alternatiu a les imatges i informació que no depengui només del color.',
  progress: 'Progrés desat al navegador, barra de progrés i botó per imprimir una versió neta.',
  teacher:
    'Vista docent separada i oculta per defecte (botó discret «Docent» al peu) amb la versió del docent; les solucions no es mostren a la interfície de l’alumne fins que respon.',
};

/* ───────── Qualitat ───────── */

export const BUILDER_QUALITY = [
  { id: 'noInventar', label: 'No inventar i marcar dubtes', line: 'No inventis contingut, dades ni fonts. Marca amb [?] el que s’hagi de revisar.', default: true },
  {
    id: 'inclusiu',
    label: 'Llenguatge inclusiu',
    line: 'Llenguatge inclusiu i no sexista; exemples i imatges diversos (gènere, orígens, capacitats, models de família) i sense estereotips.',
    default: true,
  },
  { id: 'revisio', label: 'Autorevisió final', default: true },
];

// Comprovacions de la secció final («Abans de lliurar, comprova»).
export const QUALITY_CHECKS = {
  base: [
    'Cada consigna té un sol verb d’acció i es pot entendre sense l’ajuda del docent.',
    'La informació important és accessible en més d’un format.',
    'Totes les necessitats de l’alumnat indicades estan ateses.',
  ],
  levels: 'Els nivells comparteixen objectiu, tema i aparença, i cap no és infantil ni estigmatitzador.',
  higher: 'Hi ha tasques d’ordre superior (analitzar, avaluar o crear) a tots els nivells.',
  solutions: 'Les solucions corresponen exactament a les activitats i als nivells.',
};

/* ───────── Configuracions ràpides ───────── */

// Cada configuració s'aplica sobre els valors per defecte i conserva etapa, àrea, tema i objectiu.
export const BUILDER_PRESETS = [
  {
    id: 'universal',
    label: 'Fitxa universal DUA',
    hint: 'Per a tot el grup: 3 nivells, DUA complet, activitats variades i versió del docent completa.',
    config: {
      action: 'crear',
      format: 'fitxa',
      profiles: ['universal'],
      levels: '3',
      scaffolds: ['previs', 'model', 'organitzador', 'banc', 'inicis', 'pistes', 'retirada', 'autoregulacio'],
      teacher: ['solucions', 'guia', 'errors', 'bloom', 'dua', 'avaluacio'],
      visual: ['minimal', 'consignes', 'icones'],
    },
  },
  {
    id: 'digital',
    label: 'Unitat digital multinivell',
    hint: 'Un sol fitxer HTML interactiu, minimalista i accessible, amb nivells i vista docent.',
    config: {
      action: 'crear',
      format: 'digital',
      profiles: ['universal'],
      levels: '3',
      teacher: ['solucions', 'guia', 'bloom'],
    },
  },
  {
    id: 'rapida',
    label: 'Adaptació ràpida',
    hint: 'Adapta el material adjunt sense nivells, amb les bastides essencials.',
    config: {
      action: 'adaptar',
      format: 'fitxa',
      levels: '1',
      dua: ['representacio', 'accio'],
      scaffolds: ['model', 'pistes', 'inicis'],
      exercises: [],
      bloom: [],
      teacher: ['solucions', 'canvis'],
    },
  },
  {
    id: 'examen',
    label: 'Examen accessible',
    hint: 'Prova adaptada amb dos nivells de suport, criteris clars i solucionari.',
    config: {
      action: 'adaptar',
      format: 'examen',
      levels: '2',
      scaffolds: ['passos', 'banc', 'inicis'],
      exercises: ['multiple', 'relacionar', 'completar', 'curta', 'problema', 'argumentar'],
      teacher: ['solucions', 'avaluacio', 'canvis'],
      visual: ['minimal', 'consignes', 'tipografia'],
    },
  },
  {
    id: 'repte',
    label: 'Repte d’ampliació',
    hint: 'Per a altes capacitats: profunditat, elecció i pensament d’ordre superior.',
    config: {
      action: 'crear',
      format: 'fitxa',
      profiles: ['altes'],
      levels: '1',
      dua: ['implicacio', 'accio'],
      scaffolds: ['preguntes', 'autoregulacio'],
      exercises: ['cas', 'comparar', 'error', 'argumentar', 'crear', 'metacognicio'],
      bloom: ['analitzar', 'avaluar', 'crear'],
      teacher: ['solucions', 'guia', 'bloom', 'avaluacio'],
    },
  },
];
