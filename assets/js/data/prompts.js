// Biblioteca de prompts inclosa amb l'aplicació.
// Convencions:
//  - Els camps a omplir van entre claudàtors: [camp]. Si hi ha opcions, separa-les amb " / ".
//  - [?] no és un camp: és la marca que demanem a la IA per assenyalar dubtes.
//  - Estructura: tasca + dades (omple) + instruccions numerades + què ha de lliurar.

export const BUILTIN_PROMPTS = [
  // ───────────────────────── ADAPTAR MATERIAL ─────────────────────────
  {
    id: 'adaptar-nouvingut-adolescent',
    title: 'Adaptar material per a alumnat nouvingut adolescent',
    description: 'Per a alumnes que no entenen català ni castellà i tenen un anglès molt bàsic.',
    actions: ['adaptar'],
    profiles: ['nouvingut'],
    formats: ['text', 'fitxa'],
    text: `Adapta el material adjunt per a un alumne nouvingut adolescent que no entén català ni castellà i té un anglès molt bàsic.

Dades de l'alumne (omple):
- Llengua materna: [llengua] · Alfabet: [llatí / no llatí]
- Anglès: [nul / A1] · Edat i etapa: [ex.: 16 anys, PFI]

Instruccions:
1. Mantén el contingut i el nivell cognitiu; redueix només la dificultat lingüística.
2. Llengua de sortida: [llengua materna / anglès simple / bilingüe llengua materna + català]. Si l'alfabet no és llatí, afegeix transliteració.
3. Frases curtes (màx. 10 paraules), una idea per frase, ordre subjecte-verb-complement, imperatius i passos numerats. Sense passives, subordinades ni frases fetes.
4. Vocabulari d'alta freqüència. Mantén els termes tècnics clau en català amb la traducció entre parèntesis.
5. Suports visuals: proposa un pictograma (ARASAAC), icona o esquema per a cada pas o concepte clau, indicant on col·locar-lo i quina paraula cercar. Converteix el text en taula, seqüència o mapa conceptual quan sigui possible.
6. Afegeix un glossari de 8-10 paraules clau (català · traducció · pictograma).
7. To respectuós i adequat a un adolescent; no infantilitzis.
8. No inventis contingut. Marca amb [?] les traduccions tècniques dubtoses perquè les pugui revisar.

Lliura el material adaptat llest per imprimir o projectar, el glossari i una llista de dues línies amb els canvis principals.`,
  },
  {
    id: 'adaptar-lectura-facil',
    title: 'Convertir un text a lectura fàcil',
    description: 'Aplica les pautes de lectura fàcil a qualsevol text sense perdre la informació essencial.',
    actions: ['adaptar'],
    profiles: ['di', 'tdl', 'nouvingut', 'dua'],
    formats: ['text'],
    text: `Adapta el text adjunt a lectura fàcil per a alumnat de [etapa i curs] amb [perfil: ex. discapacitat intel·lectual lleu].

Instruccions:
1. Conserva les idees essencials del text. Elimina la informació secundària i indica-la al final, en una llista, perquè jo decideixi si la recupero.
2. Una idea per frase. Frases de 15 paraules com a màxim, en present i en veu activa.
3. Fes servir paraules d'ús freqüent. Si cal un terme tècnic, explica'l la primera vegada amb un exemple quotidià.
4. Evita metàfores, ironies, xifres romanes, percentatges i abreviatures.
5. Ordena la informació de manera cronològica o lògica, amb títols curts que funcionin com a preguntes (ex.: «Què és…?», «Per què…?»).
6. Una frase per línia i paràgrafs de 3-4 línies com a màxim.
7. Proposa un pictograma o imatge (ARASAAC) per a cada títol, indicant la paraula a cercar.
8. No inventis informació. Marca amb [?] qualsevol simplificació que pugui canviar el significat.

Lliura: el text en lectura fàcil, 3 preguntes de comprensió literal amb resposta i la llista d'informació eliminada.`,
  },
  {
    id: 'adaptar-dislexia',
    title: 'Adaptar un text o fitxa per a alumnat amb dislèxia',
    description: 'Format amigable, menys càrrega lectora i consignes clares, mantenint el nivell.',
    actions: ['adaptar'],
    profiles: ['dislexia'],
    formats: ['text', 'fitxa'],
    text: `Adapta el material adjunt per a un alumne de [etapa i curs] amb dislèxia.

Instruccions:
1. Mantén els objectius i el nivell de contingut; redueix només la càrrega lectora i d'escriptura.
2. Frases curtes i directes. Paràgrafs de 3-4 línies. Llistes amb pics en lloc de text continu quan sigui possible.
3. Destaca en negreta les paraules clau (màxim 2 per paràgraf). No facis servir cursiva, majúscules seguides ni subratllat.
4. Consignes: una acció per consigna, numerades, amb el verb al principi (ex.: «Encercla…», «Relaciona…»).
5. Redueix la producció escrita: substitueix part de les respostes llargues per opció múltiple, completar buits amb banc de paraules, relacionar o respondre amb esquemes.
6. Recomanacions de format per al document final: lletra sense serifa de 12-14 pt, interlineat 1,5, text alineat a l'esquerra (no justificat) i fons crema o blanc trencat.
7. Indica quines activitats es poden fer oralment o amb lector de veu.

Lliura el material adaptat i, al final, una llista breu dels canvis que has fet.`,
  },
  {
    id: 'adaptar-fitxa-tea',
    title: 'Adaptar una fitxa d’activitats per a alumnat amb TEA',
    description: 'Estructura previsible, llenguatge literal i suports visuals.',
    actions: ['adaptar'],
    profiles: ['tea'],
    formats: ['fitxa'],
    text: `Adapta la fitxa adjunta per a un alumne de [etapa i curs] amb TEA.

Dades de l'alumne (omple):
- Nivell de lectura: [lector autònom / lectura amb suport / no lector]
- Interessos que el motiven: [ex.: trens, dinosaures, Minecraft]

Instruccions:
1. Llenguatge literal i concret: sense metàfores, ironies, dobles sentits ni preguntes obertes ambigües.
2. Estructura previsible: el mateix format per a totes les activitats (títol, què he de fer, exemple resolt, espai de resposta).
3. Una sola consigna per activitat, numerada, amb un exemple resolt al principi.
4. Indica quantes activitats hi ha i quan s'acaba la tasca (ex.: «Activitat 2 de 5»; «Quan acabis, avisa el docent»).
5. Proposa un pictograma (ARASAAC) per a cada consigna, indicant la paraula a cercar.
6. Si és possible, contextualitza alguns exemples amb els seus interessos sense canviar l'objectiu de l'activitat.
7. Evita la sobrecàrrega visual: molt espai en blanc, sense decoracions, una activitat per bloc.
8. No canviïs el contingut curricular. Marca amb [?] qualsevol activitat que creguis que no es pot adaptar sense canviar l'objectiu.

Lliura la fitxa adaptada llesta per imprimir i un resum de 2 línies dels canvis.`,
  },
  {
    id: 'adaptar-tasca-tdah',
    title: 'Fragmentar una tasca llarga per a alumnat amb TDAH',
    description: 'Divideix la tasca en blocs curts amb checklist, temps i pauses.',
    actions: ['adaptar'],
    profiles: ['tdah'],
    formats: ['fitxa', 'rubrica'],
    text: `Adapta la tasca adjunta per a un alumne de [etapa i curs] amb TDAH.

Instruccions:
1. Divideix la tasca en blocs curts de [5-10] minuts, cadascun amb un objectiu clar i visible.
2. Afegeix una casella de verificació (☐) al final de cada bloc perquè l'alumne marqui el que ha fet.
3. Posa la consigna més important al principi i elimina la informació accessòria.
4. Destaca en negreta el verb de cada consigna (ex.: **Subratlla**, **Calcula**).
5. Indica el temps orientatiu de cada bloc i proposa una pausa activa breu (1-2 min) entre blocs.
6. Afegeix un exemple resolt de la primera activitat.
7. Inclou un mini-checklist final de revisió («He respost totes les preguntes?», «He revisat els càlculs?»).
8. Mantén el contingut i el nivell; no redueixis l'exigència si no t'ho demano.

Lliura la tasca fragmentada llesta per imprimir i una versió en una sola línia per a la pissarra amb els passos.`,
  },
  {
    id: 'adaptar-mates-discalculia',
    title: 'Adaptar problemes de matemàtiques per a discalcúlia',
    description: 'Problemes amb suport visual, passos guiats i càrrega de càlcul reduïda.',
    actions: ['adaptar'],
    profiles: ['discalculia'],
    formats: ['fitxa', 'examen'],
    text: `Adapta els problemes de matemàtiques adjunts per a un alumne de [etapa i curs] amb discalcúlia.

Instruccions:
1. Mantén el raonament matemàtic que es vol treballar; redueix la càrrega de càlcul mecànic.
2. Enunciats curts, amb les dades destacades en negreta i la pregunta en una línia separada.
3. Afegeix una guia de resolució de 4 passos per a cada problema: Què em demanen? · Quines dades tinc? · Quina operació faig? · Comprovo el resultat.
4. Proposa un suport visual per a cada problema (recta numèrica, taula, dibuix, regletes, diagrama de barres) i descriu-lo perquè el pugui fer.
5. Fes servir números més petits o arrodonits quan el càlcul no sigui l'objectiu.
6. Indica on es pot fer servir calculadora o taula de multiplicar.
7. Ordena els problemes de més fàcil a més difícil i comença amb un exemple resolt.

Lliura els problemes adaptats, el solucionari amb els passos i una llista dels canvis.`,
  },
  {
    id: 'adaptar-examen',
    title: 'Adaptar un examen sense rebaixar els objectius',
    description: 'Adaptació d’accés: format, enunciats i tipus de resposta.',
    actions: ['adaptar', 'avaluar'],
    profiles: ['dislexia', 'tdah', 'tea', 'tdl', 'dua'],
    formats: ['examen'],
    text: `Adapta l'examen adjunt per a un alumne de [etapa i curs] amb [perfil: ex. dislèxia / TDAH / TEA].

Instruccions:
1. Avalua els mateixos criteris i continguts; canvia només el format i l'accés (adaptació d'accés, no curricular).
2. Una pregunta per bloc, numerada, amb molt d'espai per respondre.
3. Enunciats curts, amb el verb d'acció al principi i en negreta. Una sola demanda per pregunta: si n'hi ha diverses, separa-les en apartats a), b), c).
4. Substitueix part de les preguntes obertes llargues per formats equivalents: opció múltiple, relacionar, completar amb banc de paraules, verdader/fals justificat o esquema.
5. Indica la puntuació de cada pregunta i ordena-les de més fàcil a més difícil.
6. Afegeix a l'inici 2 línies amb instruccions clares sobre el temps i el material permès.
7. Proposa mesures d'aplicació: temps extra, lectura en veu alta dels enunciats, divisió en dues sessions o resposta oral.
8. No inventis preguntes noves. Marca amb [?] qualsevol pregunta que, en adaptar-la, pugui deixar d'avaluar el mateix criteri.

Lliura l'examen adaptat, el solucionari i una taula que relacioni cada pregunta original amb l'adaptada.`,
  },
  {
    id: 'adaptar-enunciats',
    title: 'Reescriure enunciats i consignes de manera clara',
    description: 'Només reformula les consignes: ràpid i útil per a qualsevol material.',
    actions: ['adaptar'],
    profiles: ['dua', 'tdl', 'dislexia', 'tea', 'nouvingut'],
    formats: ['fitxa', 'examen'],
    text: `Reescriu només els enunciats i les consignes del material adjunt perquè siguin clars per a alumnat de [etapa i curs], especialment per a alumnes amb dificultats de comprensió lectora.

Instruccions:
1. Una acció per consigna. Si una consigna en demana diverses, divideix-la en passos numerats.
2. Comença sempre amb el verb en imperatiu i en negreta (ex.: **Llegeix**, **Escriu**, **Encercla**).
3. Frases curtes, en veu activa, sense dobles negacions ni subordinades.
4. Concreta què s'espera: quantitat («escriu 3 exemples»), format («en una frase») i lloc («a la taula de sota»).
5. Fes servir sempre la mateixa paraula per a la mateixa acció en tot el material.
6. No modifiquis els continguts ni les respostes.

Lliura una taula amb dues columnes: consigna original · consigna nova.`,
  },
  {
    id: 'adaptar-visual',
    title: 'Adaptar material per a alumnat amb discapacitat visual',
    description: 'Accessible amb lector de pantalla, macrotipus i descripcions d’imatges.',
    actions: ['adaptar'],
    profiles: ['visual'],
    formats: ['text', 'fitxa', 'document'],
    text: `Adapta el material adjunt per a un alumne de [etapa i curs] amb discapacitat visual que fa servir [lector de pantalla / macrotipus / braille].

Instruccions:
1. Estructura el document amb títols jeràrquics reals (Títol 1, Títol 2…) i llistes, perquè es pugui navegar amb lector de pantalla.
2. Substitueix cada imatge, gràfic o esquema per una descripció textual breu i precisa (text alternatiu) que transmeti la mateixa informació.
3. Converteix les taules complexes en taules simples amb capçaleres o en llistes.
4. Elimina la informació que depèn només del color o de la posició («la casella vermella», «a la dreta»).
5. Consignes autònomes: que es puguin entendre sense veure la pàgina sencera.
6. Per a macrotipus: recomana lletra sense serifa de [18-24] pt, alt contrast i una sola columna.
7. Proposa alternatives per a les activitats purament visuals (ex.: relacionar amb fletxes → escriure parelles).

Lliura el material adaptat i una llista de les imatges descrites per si en vull revisar alguna.`,
  },
  {
    id: 'adaptar-auditiva',
    title: 'Adaptar material per a alumnat amb discapacitat auditiva',
    description: 'Compensa la informació oral amb suport escrit i visual.',
    actions: ['adaptar'],
    profiles: ['auditiva'],
    formats: ['text', 'fitxa', 'presentacio'],
    text: `Adapta el material o l'explicació adjunta per a un alumne de [etapa i curs] amb discapacitat auditiva ([usuari de llengua de signes / audiòfons o implant / lectura labial]).

Instruccions:
1. Tota la informació que es dona oralment ha d'aparèixer també per escrit o en un suport visual.
2. Simplifica la sintaxi (frases curtes, ordre directe) però manté el vocabulari específic de la matèria.
3. Crea un glossari previ de 8-10 termes clau amb definició breu i imatge o pictograma suggerit.
4. Converteix les explicacions llargues en esquemes, seqüències numerades o mapes conceptuals.
5. Si hi ha vídeos o àudios, crea'n la transcripció adaptada i indica on cal subtitulat.
6. Afegeix 3 preguntes de comprensió visual (imatge + pregunta curta) per comprovar que ho ha entès.
7. Inclou 3 recomanacions pràctiques per al docent a l'aula (posició, il·luminació, torns de paraula…).

Lliura el material adaptat, el glossari i les recomanacions.`,
  },
  {
    id: 'adaptar-tdl',
    title: 'Adaptar material per a alumnat amb TDL',
    description: 'Redueix la complexitat lingüística i reforça el vocabulari i la comprensió.',
    actions: ['adaptar'],
    profiles: ['tdl'],
    formats: ['text', 'fitxa'],
    text: `Adapta el material adjunt per a un alumne de [etapa i curs] amb trastorn del desenvolupament del llenguatge (TDL).

Instruccions:
1. Mantén el contingut; simplifica l'estructura de les frases: ordre subjecte-verb-complement, frases curtes, sense subordinades encadenades.
2. Evita el llenguatge figurat, les frases fetes i les inferències implícites; fes-les explícites.
3. Identifica 6-8 paraules clau. Per a cadascuna: definició senzilla, exemple i pictograma suggerit (ARASAAC).
4. Presenta la informació amb suport visual: seqüències numerades, taules o esquemes.
5. Repeteix les paraules clau de manera consistent (no facis servir sinònims per variar).
6. Afegeix activitats de vocabulari previ (abans de llegir) i de comprensió amb opció múltiple o resposta guiada.
7. Proposa un model de resposta oral o escrita amb inicis de frase (ex.: «Primer…, després…, al final…»).

Lliura el material adaptat, el vocabulari clau i les activitats.`,
  },
  {
    id: 'adaptar-di',
    title: 'Adaptar una activitat per a alumnat amb discapacitat intel·lectual',
    description: 'Prioritza aprenentatges essencials, funcionals i amb molt suport.',
    actions: ['adaptar'],
    profiles: ['di'],
    formats: ['fitxa', 'text'],
    text: `Adapta l'activitat adjunta per a un alumne de [etapa i curs] amb discapacitat intel·lectual [lleu / moderada] que té un nivell de competència aproximat de [ex.: 2n de primària].

Instruccions:
1. Identifica l'aprenentatge essencial de l'activitat i centra-hi l'adaptació, mantenint el mateix tema que la resta del grup.
2. Formula 1-2 objectius concrets i observables per a l'alumne.
3. Llenguatge senzill i concret, frases molt curtes, una consigna per activitat i un exemple resolt.
4. Relaciona el contingut amb situacions quotidianes i funcionals (casa, botiga, transport…).
5. Proposa activitats manipulatives o visuals: classificar, relacionar, ordenar imatges, completar amb suport.
6. Inclou suports graduats: primer amb molta ajuda (model), després amb menys ajuda.
7. Suggereix pictogrames (ARASAAC) per a les consignes i paraules clau.

Lliura: objectius, activitat adaptada llesta per imprimir i una proposta d'avaluació senzilla (3-4 indicadors).`,
  },
  {
    id: 'adaptar-motriu',
    title: 'Adaptar activitats per a alumnat amb discapacitat motriu',
    description: 'Alternatives de resposta sense escriptura manual i accés a l’activitat.',
    actions: ['adaptar'],
    profiles: ['motriu'],
    formats: ['fitxa', 'examen'],
    text: `Adapta les activitats adjuntes per a un alumne de [etapa i curs] amb discapacitat motriu que [no pot escriure a mà / escriu lentament / fa servir ordinador, commutador o comunicador].

Instruccions:
1. Mantén els objectius i el contingut; canvia només la manera de respondre i d'accedir a l'activitat.
2. Substitueix l'escriptura llarga per: marcar opcions, assenyalar, respondre oralment, arrossegar en digital o dictat per veu.
3. Redueix els elements que requereixen precisió motriu (retallar, dibuixar, encerclar petit) i proposa'n alternatives.
4. Deixa espais de resposta grans i separats, amb una activitat per pàgina o pantalla.
5. Proposa una versió digital accessible (formulari, document editable) i indica com es pot fer servir amb [teclat / commutador / pantalla tàctil].
6. Indica una estimació de temps addicional per a cada activitat.

Lliura les activitats adaptades i una llista de recursos o eines suggerides.`,
  },
  {
    id: 'ampliar-altes-capacitats',
    title: 'Enriquir una activitat per a alumnat d’altes capacitats',
    description: 'Més profunditat i complexitat, no més quantitat.',
    actions: ['adaptar'],
    profiles: ['altes'],
    formats: ['fitxa', 'joc'],
    text: `Enriqueix l'activitat adjunta per a un alumne de [etapa i curs] amb altes capacitats, interessat en [interessos].

Instruccions:
1. No afegeixis més exercicis del mateix tipus: augmenta la profunditat i la complexitat cognitiva.
2. Proposa 3 extensions graduades segons la taxonomia de Bloom (analitzar, avaluar, crear).
3. Inclou almenys una pregunta oberta sense resposta única que requereixi argumentar.
4. Connecta el contingut amb un altre àmbit (ciència, art, història, tecnologia) o amb un problema real.
5. Dona-li opcions d'elecció (tema, format del producte final) i autonomia en el procés.
6. Proposa un producte final concret (ex.: infografia, debat, prototip, petita recerca) amb criteris d'èxit.
7. Indica com pot compartir el resultat amb el grup per enriquir l'aula.

Lliura les extensions, el producte final amb criteris d'èxit i una estimació de temps.`,
  },
  {
    id: 'adaptar-multinivell',
    title: 'Crear tres nivells d’una mateixa activitat (DUA)',
    description: 'Una activitat, tres versions: suport, estàndard i ampliació.',
    actions: ['adaptar', 'crear'],
    profiles: ['dua', 'di', 'altes', 'nouvingut'],
    formats: ['fitxa'],
    text: `A partir de l'activitat adjunta, crea'n tres versions per a un grup de [etapa i curs] amb alumnat divers, perquè tothom treballi el mateix contingut alhora.

Instruccions:
1. Mateix tema, mateix objectiu i mateixa estructura visual a les tres versions, perquè no es noti qui fa cada nivell.
2. Nivell 1 (amb suport): consignes molt guiades, exemple resolt, banc de paraules, opció múltiple i suport visual.
3. Nivell 2 (estàndard): l'activitat original amb consignes clarificades.
4. Nivell 3 (ampliació): més complexitat, preguntes obertes, aplicació a una situació nova o creació.
5. Identifica cada versió amb un símbol neutre (●, ■, ▲), no amb números ni noms de nivell.
6. Afegeix una pregunta final comuna per a tothom, que es pugui posar en comú.
7. Indica com l'alumne pot passar d'un nivell a l'altre si ho necessita.

Lliura les tres versions llestes per imprimir i el solucionari de cadascuna.`,
  },
  {
    id: 'adaptar-presentacio',
    title: 'Fer accessible una presentació de diapositives',
    description: 'Diapositives clares, llegibles i amb guió del docent.',
    actions: ['adaptar'],
    profiles: ['dua', 'tea', 'tdah', 'dislexia', 'visual', 'auditiva'],
    formats: ['presentacio'],
    text: `Revisa i adapta la presentació adjunta perquè sigui accessible per a un grup de [etapa i curs] amb alumnat divers.

Instruccions:
1. Una idea per diapositiva, amb un títol únic i descriptiu.
2. Màxim 3-4 punts per diapositiva i 6-8 paraules per punt. Passa el text sobrant a les notes del docent.
3. Proposa una imatge, icona o pictograma rellevant per a cada idea clau (no decoratiu) i escriu-ne el text alternatiu.
4. Recomanacions de disseny: lletra sense serifa de 28 pt o més, alt contrast, sense fons carregats ni animacions innecessàries.
5. No transmetis informació només amb color.
6. Afegeix una diapositiva inicial amb l'agenda de la sessió i una de final amb un resum de 3 idees.
7. Inclou 2 preguntes de comprovació de la comprensió al llarg de la presentació.

Lliura la presentació diapositiva per diapositiva (títol, contingut, suggeriment visual, text alternatiu i notes del docent).`,
  },

  // ───────────────────────── CREAR DE ZERO ─────────────────────────
  {
    id: 'crear-text-lectura-facil',
    title: 'Crear un text expositiu en lectura fàcil',
    description: 'Text breu sobre un tema curricular amb activitats de comprensió.',
    actions: ['crear'],
    profiles: ['di', 'tdl', 'nouvingut', 'dua'],
    formats: ['text'],
    text: `Crea un text expositiu en lectura fàcil sobre [tema] per a alumnat de [etapa i curs] amb [perfil: ex. discapacitat intel·lectual / nouvingut / TDL].

Instruccions:
1. Extensió: [150-250] paraules, dividides en 3-5 apartats amb títols en forma de pregunta.
2. Una idea per frase, frases de 15 paraules com a màxim, en present i en veu activa.
3. Vocabulari freqüent. Inclou com a màxim 5 termes tècnics i explica'ls amb un exemple quotidià.
4. Continguts rigorosos i adequats al currículum de [àrea].
5. Proposa una imatge o pictograma (ARASAAC) per a cada apartat, indicant la paraula a cercar.
6. Afegeix 4 activitats de comprensió: 2 literals, 1 d'ordenar o relacionar i 1 de vocabulari.

Lliura el text, les activitats i el solucionari.`,
  },
  {
    id: 'crear-historia-social',
    title: 'Crear una història social',
    description: 'Per anticipar una situació nova o treballar una conducta (TEA).',
    actions: ['crear'],
    profiles: ['tea', 'di', 'emocional'],
    formats: ['historia', 'visual'],
    text: `Crea una història social per a un alumne de [edat] anys amb TEA sobre la situació següent: [ex.: la sortida al museu / quan canvia el mestre / esperar el torn].

Dades (omple):
- Nivell de lectura: [lector / lectura amb suport / no lector]
- El que més li costa d'aquesta situació: [descripció]

Instruccions:
1. Segueix les pautes de Carol Gray: majoria de frases descriptives (què passa, on, qui, per què) i poques frases directives.
2. Escriu en primera persona i en present (ex.: «Jo vaig a…»).
3. Llenguatge literal i positiu. Fes servir «normalment» o «a vegades» en lloc d'afirmacions absolutes.
4. Explica què sentiran o pensaran les altres persones i per què.
5. Inclou què pot fer si se sent nerviós o necessita ajuda.
6. 6-10 pàgines curtes, una frase o dues per pàgina.
7. Per a cada pàgina, proposa una imatge o pictograma (ARASAAC) i la paraula a cercar.

Lliura la història pàgina per pàgina (text + suggeriment d'imatge) i 2 consells per llegir-la amb l'alumne.`,
  },
  {
    id: 'crear-agenda-visual',
    title: 'Crear una agenda visual o seqüència de passos',
    description: 'Seqüència pictogràfica d’una rutina, sessió o tasca.',
    actions: ['crear'],
    profiles: ['tea', 'di', 'tdl', 'tdah'],
    formats: ['visual'],
    text: `Crea una seqüència visual de passos per a [rutina o tasca: ex. entrar a classe / rentar-se les mans / fer un experiment] per a alumnat de [etapa] amb [perfil].

Instruccions:
1. Divideix la tasca en [5-8] passos concrets i observables, en l'ordre real.
2. Per a cada pas: número, verb en infinitiu o imperatiu + objecte (màx. 4 paraules) i pictograma suggerit d'ARASAAC (paraula exacta a cercar).
3. Marca clarament l'inici i el final («Comencem» / «Acabat»).
4. Afegeix un pas de demanar ajuda si n'hi ha un de difícil.
5. Proposa la disposició: [horitzontal d'esquerra a dreta / vertical de dalt a baix] i mida de les targetes.

Lliura la seqüència en forma de taula (núm. · text · pictograma) i una versió de text breu per a la pissarra.`,
  },
  {
    id: 'crear-fitxa-graduada',
    title: 'Crear una fitxa d’activitats graduada',
    description: 'Fitxa de zero, de més fàcil a més difícil, amb solucionari.',
    actions: ['crear'],
    profiles: ['dua'],
    formats: ['fitxa'],
    text: `Crea una fitxa d'activitats sobre [tema] per a [etapa i curs], àrea de [àrea], pensada perquè tot l'alumnat hi pugui participar.

Instruccions:
1. Objectiu d'aprenentatge en una frase al principi de la fitxa, adreçat a l'alumne («Avui aprendré a…»).
2. [6-8] activitats ordenades de menys a més dificultat: reconèixer → comprendre → aplicar → crear.
3. Combina tipus de resposta: opció múltiple, relacionar, completar, resposta curta i una de creativa.
4. Consignes amb el verb al principi, una acció per consigna i un exemple a la primera activitat.
5. Inclou un repte final opcional per a qui acabi abans.
6. Afegeix una autoavaluació de 3 ítems amb emoticones (😀 😐 🙁).
7. Format net: espai per respondre, sense decoracions.

Lliura la fitxa llesta per imprimir i el solucionari.`,
  },
  {
    id: 'crear-glossari-visual',
    title: 'Crear un glossari visual bilingüe',
    description: 'Vocabulari clau d’una unitat amb traducció i pictograma.',
    actions: ['crear'],
    profiles: ['nouvingut', 'tdl', 'auditiva', 'di'],
    formats: ['visual', 'fitxa'],
    text: `Crea un glossari visual del vocabulari clau de la unitat [tema / unitat] de [àrea], [etapa i curs], per a alumnat que parla [llengua].

Instruccions:
1. Selecciona les [12-15] paraules imprescindibles per seguir la unitat, ordenades per temes o per ordre d'aparició.
2. Per a cada paraula: català (amb article) · traducció a [llengua] (amb transliteració si l'alfabet no és llatí) · definició molt senzilla en català (màx. 8 paraules) · pictograma ARASAAC suggerit.
3. Afegeix una frase d'exemple curta i útil per a cada paraula.
4. Marca amb [?] les traduccions de les quals no estiguis segur.
5. Proposa 2 activitats ràpides per practicar el vocabulari (ex.: memory, relacionar paraula-imatge).

Lliura el glossari en forma de taula llesta per imprimir i les dues activitats.`,
  },
  {
    id: 'crear-esquema',
    title: 'Crear un esquema o mapa conceptual d’un tema',
    description: 'Organitza la informació visualment per estudiar o repassar.',
    actions: ['crear', 'adaptar'],
    profiles: ['dua', 'tdah', 'dislexia', 'tdl', 'tea'],
    formats: ['esquema'],
    text: `Crea un esquema o mapa conceptual sobre [tema / el text adjunt] per a alumnat de [etapa i curs].

Instruccions:
1. Concepte central al principi i com a màxim [5-7] idees principals connectades.
2. Cada node amb 1-4 paraules. Les connexions amb verbs curts que expliquin la relació (ex.: «és», «provoca», «té»).
3. Màxim 3 nivells de profunditat.
4. Suggereix una icona o pictograma per a cada idea principal i un color per a cada branca (que no sigui l'única manera de distingir-les).
5. Afegeix una versió en text: llista jeràrquica amb sagnats, per a qui no pugui fer servir el mapa visual.
6. Inclou 3 preguntes per repassar a partir de l'esquema.

Lliura el mapa en format de llista jeràrquica (o en sintaxi Mermaid si t'ho demano), la versió en text i les preguntes.`,
  },
  {
    id: 'crear-presentacio',
    title: 'Crear una presentació accessible',
    description: 'Diapositives clares amb guió del docent i suports visuals.',
    actions: ['crear'],
    profiles: ['dua', 'auditiva', 'tdah', 'tea'],
    formats: ['presentacio'],
    text: `Crea una presentació de [8-12] diapositives sobre [tema] per a [etapa i curs], àrea de [àrea], accessible per a tot l'alumnat.

Instruccions:
1. Diapositiva 1: títol i agenda de la sessió. Última diapositiva: resum de 3 idees clau.
2. Una idea per diapositiva, títol descriptiu, màxim 3-4 punts curts.
3. Per a cada diapositiva, proposa una imatge, esquema o pictograma rellevant amb el text alternatiu.
4. Inclou 2-3 diapositives d'interacció (pregunta, votació ràpida o activitat breu).
5. Defineix els termes nous la primera vegada que apareixen.
6. Notes del docent: què dir, exemples i possibles dificultats.

Lliura la presentació diapositiva per diapositiva (títol, contingut, suggeriment visual, text alternatiu i notes del docent).`,
  },
  {
    id: 'crear-examen-accessible',
    title: 'Crear un examen accessible des de zero',
    description: 'Prova clara i equitativa, alineada amb els criteris d’avaluació.',
    actions: ['crear', 'avaluar'],
    profiles: ['dua', 'dislexia', 'tdah', 'tea'],
    formats: ['examen'],
    text: `Crea un examen sobre [tema] per a [etapa i curs], àrea de [àrea], accessible per a tot l'alumnat.

Criteris d'avaluació que ha de cobrir (omple): [criteris o sabers]

Instruccions:
1. [8-10] preguntes ordenades de menys a més dificultat, cadascuna vinculada a un criteri.
2. Enunciats curts, amb el verb al principi i en negreta, i una sola demanda per pregunta.
3. Combina formats: opció múltiple, relacionar, completar, resposta curta i una pregunta de desenvolupament breu amb guia (inicis de frase).
4. Puntuació visible a cada pregunta.
5. Format net: una pregunta per bloc, molt d'espai per respondre, sense elements decoratius.
6. Inclou 2 línies d'instruccions inicials (temps, material permès).

Lliura l'examen, el solucionari amb criteris de correcció i una taula pregunta · criteri.`,
  },
  {
    id: 'crear-rubrica',
    title: 'Crear una rúbrica o llista de control en llenguatge clar',
    description: 'Comprensible per a l’alumne i útil per a l’autoavaluació.',
    actions: ['crear', 'avaluar'],
    profiles: ['dua', 'tea', 'tdah', 'di'],
    formats: ['rubrica'],
    text: `Crea una rúbrica per avaluar [tasca o producte: ex. una exposició oral] de [etapa i curs], comprensible per a tot l'alumnat.

Instruccions:
1. [3-5] criteris observables, formulats en primera persona («Explico…», «Faig servir…»).
2. 4 nivells d'assoliment amb noms positius: [Començo / Avanço / Ho aconsegueixo / Ho domino].
3. Descriptors curts i concrets (màx. 15 paraules), amb exemples observables, sense termes ambigus com «adequat» o «correcte».
4. Afegeix una icona o emoticona per a cada nivell.
5. Crea també una versió en llista de control (☐) per a l'autoavaluació, amb frases de sí/no.
6. Afegeix una versió amb pictogrames suggerits per a alumnat no lector o amb dificultats de comprensió.

Lliura la rúbrica en forma de taula, la llista de control i la versió amb pictogrames.`,
  },
  {
    id: 'crear-guia-lectura',
    title: 'Crear una guia de lectura amb preguntes per nivells',
    description: 'Preguntes literals, inferencials i crítiques amb suports.',
    actions: ['crear'],
    profiles: ['dua', 'dislexia', 'tdah', 'tdl'],
    formats: ['text', 'fitxa'],
    text: `Crea una guia de lectura per al text adjunt (o per a [títol del llibre / capítol]) per a [etapa i curs].

Instruccions:
1. Abans de llegir: 2 preguntes per activar coneixements previs i 5 paraules clau explicades.
2. Durant la lectura: divideix el text en [3-4] fragments i, per a cada un, una pregunta guia breu.
3. Després de llegir: 9 preguntes en tres nivells, identificats amb símbols neutres:
   ● literals (la resposta és al text) · ■ inferencials (cal deduir) · ▲ crítiques o creatives (opinió argumentada).
4. Per a les preguntes inferencials i crítiques, afegeix inicis de frase opcionals.
5. Inclou una activitat final de síntesi visual (ex.: completar un esquema o una línia del temps).

Lliura la guia llesta per imprimir i les respostes orientatives.`,
  },
  {
    id: 'crear-tauler-comunicacio',
    title: 'Crear un tauler de comunicació (SAAC)',
    description: 'Vocabulari bàsic per comunicar-se en una activitat concreta.',
    actions: ['crear'],
    profiles: ['tea', 'tdl', 'motriu', 'di', 'nouvingut'],
    formats: ['visual'],
    text: `Crea el contingut d'un tauler de comunicació per a [activitat o context: ex. hora del pati / taller de cuina / classe de plàstica] per a un alumne de [edat] amb [perfil] que es comunica amb [pictogrames / poques paraules / comunicador].

Instruccions:
1. Selecciona [20-30] cel·les de vocabulari útil per a aquesta activitat.
2. Organitza-les per categories amb el codi de colors Fitzgerald: persones (groc), verbs (verd), descriptius (blau), substantius (taronja), socials (rosa), preguntes (lila).
3. Inclou sempre: sí, no, ajuda, prou / acabat, no ho entenc, vull, m'agrada, no m'agrada.
4. Per a cada cel·la: paraula i paraula exacta a cercar a ARASAAC.
5. Proposa una distribució en graella ([5x6]) amb el vocabulari més freqüent a la part superior esquerra.
6. Afegeix 3 frases model que es puguin construir amb el tauler.

Lliura el tauler en forma de taula (fila, columna, paraula, categoria, pictograma) i les frases model.`,
  },
  {
    id: 'crear-checklist-tasca',
    title: 'Crear instruccions pas a pas amb checklist',
    description: 'Guia d’autonomia per fer una tasca o projecte sense perdre’s.',
    actions: ['crear'],
    profiles: ['tdah', 'tea', 'di', 'dua'],
    formats: ['rubrica', 'visual'],
    text: `Crea una guia pas a pas perquè alumnat de [etapa i curs] pugui fer de manera autònoma la tasca següent: [descripció de la tasca o projecte].

Instruccions:
1. Divideix la tasca en [5-10] passos, amb un verb d'acció al principi de cada pas.
2. Per a cada pas: què he de fer, material que necessito, temps orientatiu i casella ☐ per marcar.
3. Afegeix punts de control («Ensenya-ho al docent abans de continuar») als passos clau.
4. Indica què fer si m'encallo (ex.: tornar a llegir l'exemple, preguntar a un company, demanar ajuda).
5. Inclou un exemple del resultat final o una descripció clara de com ha de ser.
6. Afegeix una llista de revisió final de 3-4 ítems.

Lliura la guia llesta per imprimir en una sola pàgina.`,
  },
  {
    id: 'crear-projecte-altes-capacitats',
    title: 'Dissenyar un repte o projecte d’aprofundiment',
    description: 'Projecte obert i motivador per a alumnat d’altes capacitats.',
    actions: ['crear'],
    profiles: ['altes'],
    formats: ['joc'],
    text: `Dissenya un repte d'aprofundiment sobre [tema] per a un alumne de [etapa i curs] amb altes capacitats, interessat en [interessos].

Instruccions:
1. Planteja una pregunta motriu oberta i real, sense resposta única.
2. Durada: [nombre] sessions. Divideix el projecte en fases (investigar, analitzar, crear, comunicar) amb fites.
3. Inclou tasques de pensament d'ordre superior: comparar fonts, avaluar arguments, proposar solucions.
4. Ofereix almenys 3 opcions de producte final (ex.: podcast, prototip, assaig, infografia, debat).
5. Proposa 3-5 fonts o recursos fiables per començar (indica si cal verificar-los).
6. Rúbrica breu amb 4 criteris que valori la profunditat, la creativitat i el rigor.
7. Indica com pot compartir-ho amb el grup i com connecta amb el currículum de [àrea].

Lliura el projecte amb fases, productes, rúbrica i recursos.`,
  },
  {
    id: 'crear-joc-cooperatiu',
    title: 'Crear un joc o dinàmica cooperativa inclusiva',
    description: 'Activitat en grup on tothom té un rol i pot participar.',
    actions: ['crear'],
    profiles: ['dua', 'tea', 'tdah', 'nouvingut', 'motriu'],
    formats: ['joc'],
    text: `Crea una dinàmica cooperativa de [durada] minuts per treballar [contingut] amb un grup de [etapa i curs] on hi ha alumnat amb [perfils].

Instruccions:
1. Grups de [3-4] alumnes amb rols definits i rotatius (ex.: portaveu, secretari, cercador, controlador del temps). Descriu cada rol en una frase.
2. Tots els rols són necessaris i accessibles: indica com pot participar cada perfil present a l'aula.
3. Normes clares i poques (màx. 4), amb suport visual.
4. Interdependència positiva: el grup només acaba si tothom hi ha contribuït.
5. Inclou materials concrets i un exemple d'una ronda de joc.
6. Proposa una variant amb menys exigència sensorial (menys soroll, menys moviment).
7. Tanca amb una reflexió breu de 2 preguntes sobre el treball en equip.

Lliura la dinàmica pas a pas, els materials i les targetes de rol.`,
  },
  {
    id: 'crear-regulacio-emocional',
    title: 'Crear un recurs de regulació emocional',
    description: 'Termòmetre emocional, racó de calma o pla d’autoregulació.',
    actions: ['crear'],
    profiles: ['emocional', 'tea', 'tdah'],
    formats: ['visual', 'historia'],
    text: `Crea un [termòmetre emocional / pla de calma personal / targetes d'estratègies] per a alumnat de [etapa i edat] amb dificultats per regular les emocions.

Instruccions:
1. Defineix 4-5 nivells d'intensitat (de calma a molt alterat), amb un color, una paraula i un pictograma per a cada nivell.
2. Per a cada nivell: com em noto (senyals al cos), què puc fer (2-3 estratègies concretes) i a qui puc demanar ajuda.
3. Estratègies realistes per fer a l'aula: respirar, comptar, demanar una pausa, fer servir una targeta, anar al racó de calma.
4. Llenguatge positiu, en primera persona i adequat a l'edat; sense culpabilitzar.
5. Afegeix una frase o targeta que l'alumne pugui ensenyar per demanar una pausa sense parlar.
6. Inclou 3 orientacions breus per al docent per utilitzar-lo.

Lliura el recurs llest per imprimir (amb suggeriments de pictogrames ARASAAC) i les orientacions.`,
  },

  // ───────────────────────── AVALUAR ─────────────────────────
  {
    id: 'avaluar-instruments-alternatius',
    title: 'Proposar formes d’avaluació alternatives',
    description: 'Diferents maneres de demostrar el mateix aprenentatge.',
    actions: ['avaluar', 'planificar'],
    profiles: ['dua', 'dislexia', 'tea', 'tdah', 'motriu', 'nouvingut'],
    formats: ['document', 'rubrica'],
    text: `Proposa formes alternatives d'avaluar [criteri o aprenentatge] a [etapa i curs], àrea de [àrea], per a un alumne amb [perfil].

Instruccions:
1. Proposa [4-5] instruments diferents que avaluïn exactament el mateix criteri (ex.: exposició oral, portafoli, mapa conceptual, producte digital, observació, prova adaptada).
2. Per a cada instrument: descripció breu, per què és adequat per a aquest perfil i quines barreres elimina.
3. Indica les evidències concretes que s'han de recollir.
4. Proposa una rúbrica breu (3 criteris × 4 nivells) vàlida per a tots els instruments.
5. Assenyala els riscos de cada opció (ex.: més temps de correcció) i com minimitzar-los.

Lliura una taula comparativa dels instruments i la rúbrica.`,
  },
  {
    id: 'avaluar-feedback',
    title: 'Redactar un retorn (feedback) comprensible per a l’alumne',
    description: 'Retorn concret, motivador i fàcil d’entendre.',
    actions: ['avaluar'],
    profiles: ['dua', 'tea', 'tdah', 'emocional', 'di'],
    formats: ['document'],
    text: `Redacta un retorn per a un alumne de [etapa i curs] amb [perfil] sobre la tasca adjunta (o aquesta descripció: [descripció de la tasca i el resultat]).

Instruccions:
1. Estructura en 3 parts curtes: el que he fet bé (2 coses concretes) · el que puc millorar (1-2 coses) · el meu proper pas (1 acció concreta).
2. Adreça't a l'alumne en segona persona, amb frases curtes i to positiu i honest.
3. Sigues concret: cita parts de la tasca, no facis valoracions genèriques («molt bé», «cal millorar»).
4. Formula el que pot millorar com una acció possible, no com una crítica.
5. Si l'alumne té dificultats de lectura, proposa també una versió de 3 línies amb icones (✅ ⚠️ ➡️).

Lliura el retorn complet i la versió curta.`,
  },

  // ───────────────────────── PLANIFICAR I COMUNICAR ─────────────────────────
  {
    id: 'planificar-revisio-dua',
    title: 'Detectar barreres d’accessibilitat en un material',
    description: 'Revisió DUA del material abans d’adaptar-lo.',
    actions: ['planificar', 'adaptar'],
    profiles: ['dua'],
    formats: ['document'],
    text: `Analitza el material adjunt, pensat per a [etapa i curs], i detecta les barreres d'accés a l'aprenentatge segons els principis del Disseny Universal per a l'Aprenentatge (DUA).

Instruccions:
1. Revisa: llenguatge i comprensió, format visual, càrrega cognitiva, consignes, tipus de resposta, motivació i accessibilitat digital.
2. Per a cada barrera: on és (cita-la), quin alumnat pot afectar (ex.: dislèxia, TDAH, nouvingut, discapacitat visual) i una proposta de millora concreta.
3. Prioritza les barreres per impacte: alt, mitjà, baix.
4. Destaca 3 punts forts del material que cal mantenir.
5. No reescriguis el material sencer: només proposa canvis.

Lliura una taula (barrera · on · a qui afecta · proposta · prioritat) i les 3 millores més ràpides d'aplicar.`,
  },
  {
    id: 'planificar-mesures-aula',
    title: 'Proposar mesures i suports d’aula per a un perfil',
    description: 'Pautes pràctiques per al docent i l’equip.',
    actions: ['planificar'],
    profiles: ['dua', 'tea', 'tdah', 'dislexia', 'tdl', 'di', 'nouvingut', 'visual', 'auditiva', 'motriu', 'altes', 'emocional'],
    formats: ['document'],
    text: `Proposa mesures i suports d'aula per a un alumne de [etapa i curs] amb [perfil] a l'àrea de [àrea].

Context (omple): [punts forts, dificultats observades i interessos]

Instruccions:
1. Organitza les mesures en 5 blocs: organització de l'aula · presentació de la informació · tasques i materials · avaluació · relació i benestar.
2. Per a cada bloc, 3-4 mesures concretes, aplicables demà mateix, sense recursos extraordinaris.
3. Distingeix les mesures universals (beneficien tot el grup) de les específiques per a aquest alumne.
4. Basa't en els punts forts i els interessos de l'alumne, no només en les dificultats.
5. Llenguatge professional però directe, sense diagnosticar ni etiquetar.

Lliura les mesures en forma de llista per blocs i un resum de 5 mesures prioritàries per compartir amb l'equip docent.`,
  },
  {
    id: 'planificar-psi',
    title: 'Redactar l’apartat de mesures i suports d’un PSI',
    description: 'Esborrany clar i coherent per al pla de suport individualitzat.',
    actions: ['planificar'],
    profiles: ['dua', 'tea', 'tdah', 'dislexia', 'tdl', 'di', 'nouvingut', 'visual', 'auditiva', 'motriu', 'altes'],
    formats: ['document'],
    text: `Redacta un esborrany de l'apartat de mesures i suports del pla de suport individualitzat (PSI) d'un alumne de [etapa i curs].

Dades (omple, sense noms ni dades personals identificables):
- Necessitats: [perfil i necessitats educatives]
- Punts forts i interessos: [descripció]
- Àrees amb adaptació: [àrees]

Instruccions:
1. Mesures i suports: universals, addicionals i intensius, en el marc de l'escola inclusiva (Decret 150/2017).
2. Per a cada àrea adaptada: objectius prioritaris (2-3), criteris d'avaluació ajustats i metodologia.
3. Objectius redactats de manera concreta, observable i mesurable.
4. Suports personals i materials, i qui en fa el seguiment.
5. Proposa indicadors i calendari de seguiment (trimestral).
6. Llenguatge professional, clar i respectuós. No inventis dades: deixa [ ] on falti informació.

Lliura l'esborrany estructurat per apartats, llest per revisar i completar.`,
  },
  {
    id: 'comunicar-families',
    title: 'Redactar una comunicació clara per a les famílies',
    description: 'Missatge en lectura fàcil, amb opció de traducció.',
    actions: ['planificar'],
    profiles: ['nouvingut', 'dua'],
    formats: ['document'],
    text: `Redacta una comunicació per a les famílies sobre [tema: ex. sortida, reunió, material necessari, canvi d'horari] per a l'alumnat de [etapa i curs].

Informació a incloure (omple): [data, hora, lloc, què cal portar, cost, termini de resposta]

Instruccions:
1. Màxim 120 paraules, en lectura fàcil: frases curtes, una idea per frase, vocabulari quotidià.
2. Comença amb la informació més important (què, quan, on).
3. Destaca dates, hores i el que han de fer les famílies en una llista amb icones (📅 🕘 📍 🎒).
4. To proper i respectuós.
5. Afegeix la traducció a [llengües] amb el mateix format. Marca amb [?] les expressions dubtoses.
6. Proposa també una versió de 2-3 línies per enviar per missatgeria.

Lliura el missatge en català, les traduccions i la versió curta.`,
  },
];
