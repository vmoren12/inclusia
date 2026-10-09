// Complement "versió digital interactiva": un bloc que s'afegeix al final dels prompts
// que ho admeten (camp `digital: true`) per obtenir també un únic fitxer HTML.
// Cada prompt inclòs té la seva especificació (DIGITAL_SPECS), coherent amb el propòsit
// del material; els prompts d'usuari i el generador fan servir el bloc genèric.

export const DIGITAL_FORMAT = 'digital';

// Requisits tècnics comuns a tots els materials digitals.
export const DIGITAL_TECH =
  'Un únic fitxer HTML autònom (HTML, CSS i JavaScript en el mateix fitxer, sense llibreries externes ni connexió) que s’obri amb doble clic i funcioni en ordinador, tauleta i mòbil.';

// Funcionalitats del bloc genèric (també les fa servir el generador per al format digital).
export const DIGITAL_FEATURES = [
  'Seccions clares: Apunts (contingut clau amb exemples), Activitats i Autoavaluació.',
  'Multinivell DUA: selector de nivell (● amb suport · ■ estàndard · ▲ ampliació) que ajusti consignes, ajudes i dificultat sense canviar el tema.',
  'Activitats autocorrectives variades (opció múltiple, relacionar, completar, ordenar, verdader/fals) amb retroacció immediata que expliqui l’error, pistes graduades i opció de tornar-ho a provar.',
  'Test final autocorrectiu amb puntuació i resum del que cal repassar.',
  'Accessibilitat: botó per escoltar el text (síntesi de veu del navegador), mida de lletra ajustable, alt contrast, navegació amb teclat, text alternatiu a les imatges i informació que no depengui només del color.',
  'Progrés desat al navegador i botó per imprimir.',
];

// Mínim d'accessibilitat que s'afegeix a totes les especificacions concretes.
const DIGITAL_A11Y =
  'Accessibilitat: navegació amb teclat, mida de lletra ajustable, alt contrast, text alternatiu a les imatges i informació que no depengui només del color.';

export const DIGITAL_HINT = 'Un sol fitxer amb apunts, activitats autocorrectives, nivells DUA i test final.';

const composeAddon = (features) =>
  [
    'Versió digital interactiva (a més del material anterior):',
    `Crea també el material com a ${DIGITAL_TECH.charAt(0).toLowerCase()}${DIGITAL_TECH.slice(1)}`,
    ...features.map((f) => `- ${f}`),
    '- Aplica-hi totes les adaptacions indicades abans.',
    'Lliura el codi complet en un sol bloc, sense parts omeses.',
  ].join('\n');

export const DIGITAL_ADDON = composeAddon(DIGITAL_FEATURES);

// Especificació digital de cada prompt inclòs: `hint` (text del commutador) i `features`.
export const DIGITAL_SPECS = {
  // ───────── Adaptar ─────────
  'adaptar-nouvingut-adolescent': {
    hint: 'Material bilingüe amb àudio, traducció desplegable, glossari de targetes i activitats de vocabulari.',
    features: [
      'Cada bloc de contingut en català amb un botó per mostrar o amagar la traducció a la llengua de sortida (i la transliteració, si cal).',
      'Botó per escoltar cada frase i cada paraula del glossari en català (síntesi de veu del navegador), amb velocitat ajustable.',
      'Glossari de targetes (paraula · traducció · espai per al pictograma) que es giren en tocar-les.',
      'Activitats autocorrectives que no depenguin de llegir molt català: relacionar paraula-imatge, ordenar els passos i opció múltiple amb icones.',
      'Retroacció breu i visual (✓ / ✗ amb icona) i una pista que mostri la traducció.',
      'Estètica adequada a un adolescent, sense elements infantils.',
    ],
  },
  'adaptar-lectura-facil': {
    hint: 'El text en lectura fàcil per apartats, amb lectura en veu alta, explicació de paraules i preguntes de comprensió.',
    features: [
      'Un apartat per pantalla, amb el títol en forma de pregunta i espai per al pictograma.',
      'Lectura en veu alta de cada apartat (síntesi de veu del navegador) que ressalti la frase que s’està llegint.',
      'Paraules difícils marcades: en tocar-les, apareix l’explicació amb l’exemple quotidià.',
      'Les 3 preguntes de comprensió com a activitats autocorrectives, amb retroacció que indiqui on és la resposta dins del text.',
      'Opcions de lectura: lletra grossa, interlineat ampli i línies curtes.',
    ],
  },
  'adaptar-dislexia': {
    hint: 'Lectura configurable (lletra, espaiat, fons, regle), àudio i respostes que demanen poca escriptura.',
    features: [
      'Panell de lectura configurable: mida de lletra, interlineat, espaiat entre lletres, color de fons (crema, blanc trencat, blau clar) i regle que ressalti la línia que s’està llegint.',
      'Botó per escoltar cada enunciat i cada paràgraf (síntesi de veu del navegador), amb velocitat ajustable.',
      'Activitats autocorrectives que redueixin l’escriptura: opció múltiple, relacionar, completar amb banc de paraules (clicar o arrossegar) i ordenar.',
      'Correcció que no penalitzi l’ortografia quan l’objectiu de l’activitat no és ortogràfic.',
      'Dictat per veu per a les respostes obertes, si el navegador ho permet.',
    ],
  },
  'adaptar-fitxa-tea': {
    hint: 'Una activitat per pantalla, sempre amb la mateixa estructura, progrés visible i retroacció literal.',
    features: [
      'Una activitat per pantalla, sempre amb la mateixa estructura: títol, què he de fer, exemple resolt i espai de resposta.',
      'Indicador «Activitat X de Y» sempre visible i pantalla final que digui clarament que la tasca s’ha acabat i què cal fer després.',
      'Retroacció literal i previsible (ex.: «Correcte.» / «Encara no. Mira l’exemple.»), sense animacions sorprenents.',
      'Espai per al pictograma de cada consigna, fàcil de substituir (paraula ARASAAC en un comentari del codi).',
      'Disseny calmat: pocs colors, molt d’espai en blanc, cap element en moviment i sons desactivats per defecte.',
    ],
  },
  'adaptar-tasca-tdah': {
    hint: 'Tasca en blocs amb checklist interactiu, temporitzador opcional, pauses actives i progrés visible.',
    features: [
      'Només es mostra el bloc actual, amb l’objectiu visible a dalt i el temps orientatiu; la resta queda plegada per evitar distraccions.',
      'Temporitzador opcional per bloc (es pot pausar o amagar) i avís suau de pausa activa entre blocs.',
      'Caselles ☐ interactives per marcar el que s’ha fet i barra de progrés de tota la tasca.',
      'Checklist final de revisió interactiu abans de donar la tasca per acabada.',
      'Progrés desat al navegador per poder continuar més tard.',
    ],
  },
  'adaptar-mates-discalculia': {
    hint: 'Problemes guiats pas a pas, amb manipulatius virtuals, calculadora integrada i correcció de cada pas.',
    features: [
      'Un problema per pantalla amb la guia de 4 passos: el pas següent no apareix fins que l’alumne valida l’anterior.',
      'Suports visuals interactius segons el problema: recta numèrica, blocs o regletes per moure, taula o diagrama de barres.',
      'Calculadora i taula de multiplicar desplegables en els problemes on el càlcul no és l’objectiu.',
      'Correcció de cada pas amb retroacció que expliqui l’error de raonament, no només el resultat, i pistes graduades.',
      'Botó per escoltar l’enunciat i números grans i ben espaiats.',
    ],
  },
  'adaptar-examen': {
    hint: 'Examen en pantalla, una pregunta per vista, amb lectura d’enunciats, temps flexible i resum per al docent.',
    features: [
      'Pantalla inicial amb les instruccions (temps i material permès).',
      'Una pregunta per pantalla amb la puntuació visible i un índex per anar i tornar a les preguntes pendents.',
      'Botó per escoltar cada enunciat (síntesi de veu del navegador) i dictat per veu per a les respostes obertes, si el navegador ho permet.',
      'Temporitzador configurable pel docent (amb temps extra) que l’alumne pot amagar.',
      'Sense retroacció durant la prova: les preguntes tancades es corregeixen en acabar i les obertes queden recollides per corregir-les a mà.',
      'Resum final imprimible amb les respostes de l’alumne.',
    ],
  },
  'adaptar-visual': {
    hint: 'HTML pensat per a lector de pantalla i macrotipus: tot es pot fer sense dependre de la vista.',
    features: [
      'HTML semàntic real (encapçalaments jeràrquics, regions, llistes i taules amb capçaleres) perquè es pugui navegar amb lector de pantalla.',
      'Totes les activitats es poden fer només amb teclat, sense arrossegar ni dependre de la posició; la retroacció s’anuncia amb regions aria-live.',
      'Mode macrotipus: lletra fins al 300 %, una sola columna, alt contrast clar i fosc i focus del teclat molt visible.',
      'Descripció de les imatges i els gràfics integrada al text, no només a l’atribut alt.',
      'Alternatives a les activitats visuals: escriure parelles en lloc de traçar fletxes, triar d’una llista en lloc de clicar sobre una imatge.',
    ],
  },
  'adaptar-auditiva': {
    hint: 'Tota la informació en text i imatge: glossari visual, subtítols i transcripcions, i cap avís només sonor.',
    features: [
      'Cap informació que depengui només del so: instruccions, avisos i retroacció sempre en text i icona.',
      'Glossari visual inicial (terme · definició breu · espai per a una imatge o un vídeo en llengua de signes).',
      'Explicacions convertides en esquemes i seqüències numerades que es despleguen pas a pas.',
      'Si hi ha vídeos o àudios, reproductor amb subtítols i transcripció desplegable al costat.',
      'Les preguntes de comprensió visual com a activitats autocorrectives (imatge + pregunta curta).',
    ],
  },
  'adaptar-tdl': {
    hint: 'Vocabulari previ amb àudio i imatge, text amb paraules clau consistents i respostes amb inicis de frase.',
    features: [
      'Recorregut fix en tres passos: Vocabulari (abans de llegir) · Text · Comprensió.',
      'Targetes de vocabulari clau amb definició senzilla, exemple, espai per al pictograma i botó per escoltar-les.',
      'Paraules clau ressaltades sempre igual al text; en tocar-les, es mostra la seva targeta.',
      'Activitats autocorrectives de vocabulari i comprensió (opció múltiple, relacionar paraula-imatge, ordenar la seqüència).',
      'Resposta guiada amb inicis de frase per clicar («Primer…», «Després…», «Al final…») que l’alumne completa.',
    ],
  },
  'adaptar-di': {
    hint: 'Activitats manipulatives en pantalla, amb ajudes graduades, àudio i reforç positiu.',
    features: [
      'Activitats manipulatives: classificar, relacionar, ordenar imatges i completar amb suport, amb botons grans per tocar.',
      'Ajudes graduades: primer un model resolt, després la mateixa activitat amb pista i, finalment, sense ajuda.',
      'Consignes molt curtes amb espai per al pictograma i botó per escoltar-les.',
      'Retroacció immediata, positiva i clara, amb una nova oportunitat si hi ha un error.',
      'Registre senzill dels indicadors d’avaluació assolits, consultable pel docent.',
    ],
  },
  'adaptar-motriu': {
    hint: 'Activitats que es fan amb un sol clic o tecla, compatibles amb commutador i sense escriure a mà.',
    features: [
      'Tot es pot respondre amb un sol clic o tecla: marcar opcions, triar d’una llista, botons de resposta grans (mínim 48 px) i ben separats.',
      'Res que requereixi arrossegar, doble clic, precisió o mantenir premut; si hi ha arrossegament, alternativa amb clic-clic.',
      'Mode d’escombratge per a commutador: el focus avança sol i Espai o Retorn selecciona, amb velocitat ajustable.',
      'Dictat per veu per a les respostes obertes, si el navegador ho permet, i sense límits de temps.',
      'Una activitat per pantalla i progrés desat automàticament per poder fer pauses.',
    ],
  },
  'ampliar-altes-capacitats': {
    hint: 'Recorregut d’extensions per triar, preguntes obertes, diari de procés i producte final amb criteris.',
    features: [
      'Tauler d’elecció amb les 3 extensions (analitzar · avaluar · crear): l’alumne tria el recorregut i el format del producte final.',
      'Preguntes obertes amb espai per argumentar i desar la resposta (no autocorrectives), amb els criteris d’èxit visibles.',
      'Secció de connexions amb altres àmbits o problemes reals, amb reptes opcionals per anar més lluny.',
      'Diari de procés per anotar idees, fonts i decisions, desat al navegador i imprimible.',
      'Autoavaluació final del producte amb els criteris d’èxit.',
    ],
  },
  'adaptar-multinivell': {
    hint: 'Les tres versions en un sol fitxer, amb selector de nivell discret (● ■ ▲) i pregunta final comuna.',
    features: [
      'Selector de nivell discret amb els símbols ●, ■ i ▲ (sense números ni noms) que canviï consignes, ajudes i dificultat i es pugui canviar en qualsevol moment.',
      'Mateixa aparença i estructura als tres nivells, perquè no es noti qui fa cada versió.',
      'Activitats autocorrectives a cada nivell, amb ajudes integrades al ● (exemple resolt, banc de paraules) i reptes oberts al ▲.',
      'Si l’alumne falla diverses vegades seguides, suggeriment amable de provar el nivell amb més suport (i a l’inrevés si encerta molt).',
      'Pregunta final comuna per a tothom, amb la resposta desada per a la posada en comú.',
    ],
  },

  // ───────── Crear ─────────
  'crear-text-lectura-facil': {
    hint: 'El text per apartats, amb lectura en veu alta, explicació de termes i les activitats autocorrectives.',
    features: [
      'Un apartat per pantalla, amb el títol en forma de pregunta i espai per al pictograma.',
      'Lectura en veu alta de cada apartat (síntesi de veu del navegador) que ressalti la frase que s’està llegint.',
      'Termes tècnics marcats: en tocar-los, apareix l’explicació amb l’exemple quotidià.',
      'Les 4 activitats de comprensió autocorrectives, amb retroacció que indiqui on és la resposta dins del text.',
      'Opcions de lectura: lletra grossa, interlineat ampli i línies curtes.',
    ],
  },
  'crear-historia-social': {
    hint: 'Llibre digital pàgina a pàgina, amb àudio, ritme controlat per l’alumne i sense sorpreses.',
    features: [
      'Format de llibre: una pàgina per pantalla (text + espai gran per a la imatge), botons grans «Enrere» i «Endavant» i indicador «Pàgina X de Y».',
      'Botó per escoltar cada pàgina (síntesi de veu del navegador) amb veu pausada.',
      'Sense temporitzadors, animacions ni sons inesperats: l’alumne controla el ritme.',
      'Imatges fàcils de substituir per fotos reals del lloc o de les persones (paraula ARASAAC en un comentari del codi).',
      'Pàgina final amb el que pot fer si se sent nerviós i un botó per demanar ajuda.',
      'Botó per imprimir-la com a llibret.',
    ],
  },
  'crear-agenda-visual': {
    hint: 'Targetes de passos amb àudio, botó «Fet» per a cada pas i un final clar.',
    features: [
      'Targetes de pas amb número, text curt i espai gran per al pictograma, en la disposició indicada (horitzontal o vertical).',
      'Botó per escoltar cada pas i botó «Fet» que el marqui com a completat i destaqui el següent.',
      'Indicador de progrés, pantalla «Acabat» ben clara i botó per tornar a començar.',
      'Pictogrames fàcils de substituir (paraula ARASAAC en un comentari del codi).',
      'Disseny tranquil: pocs colors, botons grans, sense animacions brusques ni sons inesperats.',
      'Botó per imprimir les targetes per retallar.',
    ],
  },
  'crear-fitxa-graduada': {
    hint: 'La fitxa en pantalla de menys a més dificultat, autocorrectiva, amb repte final i autoavaluació.',
    features: [
      'Pantalla inicial amb l’objectiu «Avui aprendré a…».',
      'Les activitats en ordre de dificultat i autocorrectives, amb retroacció que expliqui l’error, pistes graduades i opció de tornar-ho a provar.',
      'L’activitat creativa amb espai de resposta lliure, desat perquè el docent el pugui revisar.',
      'Repte final opcional que es desbloqueja en acabar les activitats.',
      'Autoavaluació amb emoticones (😀 😐 🙁) i resum final imprimible.',
    ],
  },
  'crear-glossari-visual': {
    hint: 'Glossari de targetes amb pronunciació, cercador i jocs de vocabulari (memory, relacionar).',
    features: [
      'Una targeta per paraula: català amb article, traducció (i transliteració), definició, frase d’exemple i espai per al pictograma.',
      'Botó per escoltar cada paraula i frase en català (síntesi de veu del navegador).',
      'Cercador, filtre per tema i opció d’amagar la traducció per practicar.',
      'Les 2 activitats de pràctica com a jocs autocorrectius (memory paraula-imatge, relacionar català-traducció).',
      'Botó per imprimir el glossari en forma de taula.',
    ],
  },
  'crear-esquema': {
    hint: 'Mapa conceptual navegable amb branques desplegables, versió en text i preguntes de repàs.',
    features: [
      'Mapa conceptual interactiu fet amb HTML i CSS o SVG, amb branques desplegables i connexions etiquetades.',
      'Commutador a la versió en llista jeràrquica, ben llegible amb lector de pantalla.',
      'En tocar un node, s’obre una explicació breu amb un exemple.',
      'Mode estudi: amagar nodes per intentar recordar-los i mostrar-los en tocar-los.',
      'Les 3 preguntes de repàs autocorrectives i botó per imprimir el mapa.',
    ],
  },
  'crear-examen-accessible': {
    hint: 'Examen en pantalla, una pregunta per vista, amb lectura d’enunciats, temps flexible i resum per al docent.',
    features: [
      'Pantalla inicial amb les instruccions (temps i material permès).',
      'Una pregunta per pantalla amb la puntuació visible i un índex per anar i tornar a les preguntes pendents.',
      'Botó per escoltar cada enunciat (síntesi de veu del navegador) i inicis de frase per clicar a la pregunta de desenvolupament.',
      'Temporitzador configurable pel docent (amb temps extra) que l’alumne pot amagar.',
      'Correcció automàtica de les preguntes tancades en acabar; les obertes queden recollides per corregir-les a mà amb els criteris.',
      'Resum final imprimible amb les respostes i el criteri de cada pregunta.',
    ],
  },
  'crear-rubrica': {
    hint: 'Rúbrica per autoavaluar-se clicant el nivell, amb versió checklist, versió amb pictogrames i resum.',
    features: [
      'Rúbrica interactiva: l’alumne clica el nivell de cada criteri, en veu el descriptor i hi pot afegir una evidència o un comentari.',
      'Commutador entre les tres versions: rúbrica, llista de control (☐) i versió amb pictogrames.',
      'Botó per escoltar criteris i descriptors (síntesi de veu del navegador).',
      'Resum visual final del nivell a cada criteri, amb un pas següent suggerit per millorar.',
      'Columna opcional per a la valoració del docent o d’un company, i botó per imprimir.',
    ],
  },
  'crear-guia-lectura': {
    hint: 'Guia en tres moments (abans, durant, després), preguntes per nivells, inicis de frase i síntesi visual.',
    features: [
      'Navegació en tres moments: Abans de llegir · Durant la lectura · Després de llegir.',
      'Paraules clau amb explicació desplegable i botó per escoltar-les.',
      'Preguntes filtrables per nivell (● ■ ▲): les literals autocorrectives; les inferencials i crítiques amb espai de resposta i inicis de frase per clicar.',
      'Activitat de síntesi interactiva (completar l’esquema o ordenar la línia del temps).',
      'Respostes desades al navegador, respostes orientatives ocultes per al docent i botó per imprimir.',
    ],
  },
  'crear-tauler-comunicacio': {
    hint: 'Tauler digital amb veu: en tocar les cel·les es construeix la frase i el navegador la pronuncia.',
    features: [
      'Graella de cel·les grans amb el codi de colors Fitzgerald, la paraula i espai per al pictograma (paraula ARASAAC en un comentari del codi).',
      'En tocar una cel·la, es pronuncia la paraula (síntesi de veu del navegador) i s’afegeix a una barra de frase, amb botons per escoltar la frase, esborrar l’última paraula i esborrar-ho tot.',
      'Paraules bàsiques (sí, no, ajuda, prou, no ho entenc) sempre visibles i les frases model com a accés ràpid.',
      'Les cel·les no canvien mai de lloc i es poden activar amb teclat, commutador (escombratge) o pantalla tàctil.',
      'És una eina de comunicació: sense puntuacions ni activitats.',
      'Botó per imprimir la graella.',
    ],
  },
  'crear-checklist-tasca': {
    hint: 'Guia pas a pas amb caselles interactives, punts de control amb el docent i ajuda quan m’encallo.',
    features: [
      'Cada pas amb què he de fer, material, temps orientatiu i casella ☐ interactiva, i barra de progrés.',
      'Punts de control que aturin l’avanç fins que es confirmi «Ho he ensenyat al docent».',
      'Botó «M’he encallat» sempre visible que mostri les estratègies d’ajuda.',
      'Exemple del resultat final consultable en qualsevol moment i llista de revisió final interactiva.',
      'Progrés desat al navegador i botó per imprimir la guia en una pàgina.',
    ],
  },
};

const specFor = (p) => (p && Object.hasOwn(DIGITAL_SPECS, p.id) ? DIGITAL_SPECS[p.id] : null);

/** Bloc digital adaptat al prompt (o el genèric si no en té cap d'específic). */
export const digitalAddonFor = (p) => {
  const spec = specFor(p);
  return spec ? composeAddon([...spec.features, DIGITAL_A11Y]) : DIGITAL_ADDON;
};

/** Text breu del commutador que descriu la versió digital d'aquest prompt. */
export const digitalHintFor = (p) => specFor(p)?.hint ?? DIGITAL_HINT;

/** El prompt admet el complement digital (i encara no és un prompt digital). */
export const supportsDigitalAddon = (p) => p?.digital === true && !p.formats?.includes(DIGITAL_FORMAT);

export const withDigitalAddon = (text, p) => `${text.trimEnd()}\n\n${digitalAddonFor(p)}`;
