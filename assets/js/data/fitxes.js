// Guies ràpides d'una pàgina (A4) per adaptar materials segons el perfil de l'alumnat.
// Cada guia:
//  - profile: perfil de taxonomy.js
//  - principle: idea clau (admet **negreta**)
//  - sections: 4 blocs de propostes; cada ítem té text (admet **negreta** i *cursiva*),
//    src (font breu) i ev: 3 = evidència sòlida (metanàlisis, revisions sistemàtiques),
//    2 = moderada (estudis experimentals), 1 = consens expert
//  - avoid: pràctiques sense evidència o contraproduents (ev = solidesa de l'evidència en contra)
//  - keys: 4 recordatoris finals
//  - refs: referències completes (abreujades)

export const FITXA_EVIDENCE = [
  { ev: 3, label: 'sòlida (metanàlisis, revisions sistemàtiques)' },
  { ev: 2, label: 'moderada (estudis experimentals)' },
  { ev: 1, label: 'consens expert' },
];

export const FITXES = [
  // ───────── DISLÈXIA ─────────
  {
    id: 'dislexia',
    profile: 'dislexia',
    label: 'Dislèxia',
    tagline: 'Lectura lenta i costosa',
    title: 'Adaptar materials per a alumnat amb dislèxia',
    principle:
      'en català (ortografia força transparent) la dislèxia es manifesta sobretot com a **lectura lenta i costosa**, més que no pas com a errors. L’objectiu és **reduir la càrrega lectora i el temps, no el nivell conceptual**. Són adaptacions d’accés: no modifiquen objectius ni criteris d’avaluació.',
    sections: [
      {
        title: 'Format i tipografia',
        items: [
          { text: '**Tipografia sense serifa** (Arial, Verdana, Calibri) a 12–14 pt; en pantalla, més gran. Evitar lletra condensada.', src: 'Rello & Baeza-Yates 2013; Rello et al. 2016', ev: 2 },
          { text: '**Espaiat entre lletres i paraules lleugerament ampliat**; interlineat 1,5. Millora velocitat i precisió lectora.', src: 'Zorzi et al. 2012', ev: 2 },
          { text: '**Línies curtes** (60–70 caràcters), alineació a l’esquerra, **sense justificar**.', src: 'Schneps et al. 2013', ev: 2 },
          { text: 'Destacar amb **negreta**; evitar cursiva, subratllat i paraules senceres en MAJÚSCULES.', src: 'BDA Style Guide 2023', ev: 1 },
          { text: 'Bon contrast, fons llis (sense text sobre imatges), molt d’espai en blanc.', src: 'BDA 2023', ev: 1 },
        ],
      },
      {
        title: 'Estructura i contingut',
        items: [
          { text: '**Pre-ensenyar el vocabulari clau** i els tecnicismes abans de llegir (glossari amb imatge). Efecte més gran en lectors amb dificultats.', src: 'Elleman et al. 2009', ev: 3 },
          { text: '**Organitzadors gràfics**: esquemes, mapes conceptuals, taules comparatives.', src: 'Kim et al. 2004; Dexter & Hughes 2011', ev: 3 },
          { text: '**Fragmentar**: paràgrafs curts, una idea per paràgraf, títols que anticipin el contingut.', src: 'Teoria de la càrrega cognitiva', ev: 2 },
          { text: '**Imatge + text rellevant, a prop** (doble codificació, contigüitat).', src: 'Mayer 2009', ev: 2 },
          { text: 'Enunciats curts: **una instrucció per frase**, verb d’acció en negreta i un **exemple resolt**.', src: 'Sweller et al. 2019', ev: 2 },
        ],
      },
      {
        title: 'Accés multimodal',
        items: [
          { text: '**Text a veu** (lector immersiu, audiollibres, lectura del docent): millora la comprensió (g ≈ 0,35).', src: 'Wood et al. 2018', ev: 3 },
          { text: '**Dictat per veu** per a produccions escrites llargues; corrector ortogràfic actiu.', src: 'Higgins & Raskind 2000; MacArthur 2009', ev: 2 },
          { text: '**Material digital editable**, perquè l’alumne ajusti mida, espaiat o l’escolti.', src: 'DUA / CAST', ev: 1 },
          { text: '**Donar apunts o esquemes** i evitar la còpia de la pissarra.', src: 'EEF 2020', ev: 1 },
        ],
      },
      {
        title: 'Tasques i avaluació',
        items: [
          { text: '**Temps addicional** (+25–33 %) *o* menys ítems amb els mateixos objectius.', src: 'Gregg & Nelson 2012', ev: 2 },
          { text: '**Llegir els enunciats en veu alta** a l’examen (o amb text a veu).', src: 'Buzick & Stone 2014', ev: 2 },
          { text: '**Avaluar el contingut, no l’ortografia**, fora de les matèries de llengua; permetre resposta oral o mixta.', src: 'EEF 2020', ev: 1 },
          { text: 'Exàmens nets: preguntes numerades, espai per respondre al costat, opcions en vertical.', src: 'BDA 2023', ev: 1 },
          { text: '**Instrucció explícita** i pas a pas, amb modelatge i retorn concret.', src: 'EEF 2020', ev: 3 },
        ],
      },
    ],
    avoid: [
      { text: '**Fonts «per a dislèxia»** (OpenDyslexic, Dyslexie): no milloren la lectura respecte d’Arial/Verdana. Si l’alumne la prefereix, es pot permetre.', src: 'Wery & Diliberto 2017; Kuster et al. 2018', ev: 3 },
      { text: '**Transparències o ulleres de colors**: sense efecte demostrat sobre la lectura.', src: 'Griffiths et al. 2016', ev: 3 },
      { text: '**Adaptar segons «estils d’aprenentatge»** (visual, auditiu…): no té suport empíric.', src: 'Pashler et al. 2008', ev: 3 },
      { text: '**Simplificar el contingut conceptual** o rebaixar expectatives, o fer llegir en veu alta davant del grup sense preparació.', src: 'EEF 2020', ev: 1 },
    ],
    keys: [
      { title: 'Per defecte, a tot el grup', text: 'Gairebé tots aquests ajustos beneficien tothom (DUA): incorporeu-los a la plantilla del departament.' },
      { title: 'Pregunteu a l’alumne', text: 'Proveu i acordeu amb ell/a quines adaptacions li funcionen; la resposta individual varia.' },
      { title: 'Coherència entre matèries', text: 'Mateixes mesures a totes les àrees i registrades (PI si escau) perquè hi hagi continuïtat.' },
      { title: 'Adaptar ≠ intervenir', text: 'L’accés no substitueix la intervenció en lectura (consciència fonològica, fluïdesa) dins el centre.' },
    ],
    refs: [
      'BDA (2023) *Dyslexia Style Guide*',
      'Buzick & Stone (2014) *Educ. Meas.*',
      'Dexter & Hughes (2011) *LDQ*',
      'EEF (2020) *SEND in Mainstream Schools*',
      'Elleman et al. (2009) *J. Res. Educ. Eff.*',
      'Gregg & Nelson (2012) *J. Learn. Disabil.*',
      'Griffiths et al. (2016) *Ophthalmic Physiol. Opt.*',
      'Higgins & Raskind (2000) *J. Spec. Educ. Technol.*',
      'Kim et al. (2004) *J. Learn. Disabil.*',
      'Kuster et al. (2018) *Ann. Dyslexia*',
      'MacArthur (2009) *LDRP*',
      'Mayer (2009) *Multimedia Learning*',
      'Pashler et al. (2008) *Psychol. Sci. Public Interest*',
      'Rello & Baeza-Yates (2013) *ASSETS*',
      'Rello et al. (2016) *CHI*',
      'Schneps et al. (2013) *PLoS ONE*',
      'Sweller et al. (2019) *Educ. Psychol. Rev.*',
      'Wery & Diliberto (2017) *Ann. Dyslexia*',
      'Wood et al. (2018) *J. Learn. Disabil.*',
      'Zorzi et al. (2012) *PNAS*',
    ],
  },

  // ───────── DISCALCÚLIA ─────────
  {
    id: 'discalculia',
    profile: 'discalculia',
    label: 'Discalcúlia',
    tagline: 'Sentit numèric i càlcul',
    title: 'Adaptar materials per a alumnat amb discalcúlia',
    principle:
      'la discalcúlia és una dificultat persistent en el **sentit numèric** i en la **recuperació de fets aritmètics** (comptatge lent, errors de valor posicional, ansietat). L’objectiu és **fer visible la quantitat i descarregar la memòria de treball**, no rebaixar el raonament matemàtic. Els suports d’accés conviuen amb una intervenció explícita.',
    sections: [
      {
        title: 'Representar la quantitat',
        items: [
          { text: 'Seqüència **concret → pictòric → abstracte**: manipular, dibuixar i després simbolitzar, enllaçant sempre les tres.', src: 'Fyfe et al. 2014; Carbonneau et al. 2013', ev: 3 },
          { text: '**Recta numèrica** com a model central (situar, comparar, sumar per salts); jocs de tauler lineals.', src: 'Siegler & Ramani 2009; Fuchs et al. 2021', ev: 2 },
          { text: '**Representacions estructurades**: marcs de 10, blocs de base 10, **model de barres** per als problemes.', src: 'Fuchs et al. 2021; Gersten et al. 2009', ev: 2 },
          { text: 'Mantenir els **manipulatius disponibles** tant temps com calgui, també a secundària.', src: 'Carbonneau et al. 2013', ev: 3 },
        ],
      },
      {
        title: 'Format dels materials',
        items: [
          { text: '**Pocs ítems per pàgina**, molt d’espai en blanc i **un sol tipus d’operació per bloc**.', src: 'Teoria de la càrrega cognitiva', ev: 1 },
          { text: '**Quadrícula o columnes guiades** (U, D, C) per alinear xifres; color constant per a cada ordre d’unitats.', src: 'Consens expert', ev: 1 },
          { text: 'Enunciats curts, **dades destacades** i un esquema buit per organitzar el problema.', src: 'Jitendra et al. 2015', ev: 2 },
          { text: '**Exemple resolt** al costat de cada tipus d’exercici, amb els passos numerats.', src: 'Sweller et al. 2019', ev: 3 },
        ],
      },
      {
        title: 'Instrucció i suports',
        items: [
          { text: '**Instrucció explícita i sistemàtica**: modelatge pensant en veu alta, pràctica guiada i retorn immediat.', src: 'Fuchs et al. 2021; Kroesbergen & Van Luit 2003', ev: 3 },
          { text: 'Ensenyar les **estructures de problemes** (canvi, combinació, comparació) i un pla de resolució fix.', src: 'Fuchs et al. 2021; Jitendra et al. 2015', ev: 3 },
          { text: '**Fets numèrics amb estratègies** (dobles, fer 10, propietat commutativa), en pràctica breu i freqüent.', src: 'Codding et al. 2011', ev: 2 },
          { text: '**Vocabulari matemàtic precís** i explícit (més que, diferència, cada…), amb glossari visual.', src: 'Fuchs et al. 2021', ev: 1 },
        ],
      },
      {
        title: 'Tasques i avaluació',
        items: [
          { text: '**Calculadora, taula o recta numèrica** quan l’objectiu no és el càlcul (problemes, geometria, ciències).', src: 'EEF 2017', ev: 1 },
          { text: '**Menys ítems amb els mateixos objectius** o temps addicional, sense pressió de temps.', src: 'Ashcraft & Krause 2007', ev: 2 },
          { text: '**Valorar el procediment i el raonament**, no només el resultat; permetre explicar-ho oralment.', src: 'EEF 2017', ev: 1 },
          { text: 'Clima d’**error segur** i retorn concret per reduir l’ansietat matemàtica.', src: 'Ashcraft & Krause 2007; Ramirez et al. 2018', ev: 2 },
        ],
      },
    ],
    avoid: [
      { text: '**Proves de càlcul cronometrades** com a avaluació o per «motivar»: augmenten l’ansietat i bloquegen la memòria de treball.', src: 'Ashcraft & Krause 2007', ev: 2 },
      { text: '**Entrenament cognitiu genèric** (jocs de memòria de treball) per millorar les matemàtiques: no es transfereix.', src: 'Melby-Lervåg & Hulme 2013', ev: 3 },
      { text: '**Més fitxes de repetició mecànica** sense comprensió del concepte ni representacions.', src: 'Fuchs et al. 2021', ev: 1 },
      { text: '**Retirar massa aviat els manipulatius** o considerar-los «infantils».', src: 'Carbonneau et al. 2013', ev: 2 },
    ],
    keys: [
      { title: 'Per defecte, a tot el grup', text: 'Representacions visuals i exemples resolts ajuden tot l’alumnat: feu-los part del material comú.' },
      { title: 'Comprensió abans que velocitat', text: 'La fluïdesa arriba després del sentit numèric; no avalueu la rapidesa.' },
      { title: 'Coherència entre cursos', text: 'Mateixos models (recta, barres, columnes) any rere any i registrats al PI si escau.' },
      { title: 'Adaptar ≠ intervenir', text: 'Cal intervenció específica en sentit numèric, en petit grup i amb seguiment del progrés.' },
    ],
    refs: [
      'Ashcraft & Krause (2007) *Psychon. Bull. Rev.*',
      'Carbonneau et al. (2013) *J. Educ. Psychol.*',
      'Codding et al. (2011) *LDRP*',
      'EEF (2017) *Improving Mathematics in KS2 and KS3*',
      'Fuchs et al. (2021) *Assisting Students Struggling with Mathematics*, IES/WWC',
      'Fyfe et al. (2014) *Educ. Psychol. Rev.*',
      'Gersten et al. (2009) *RtI in Mathematics*, IES',
      'Jitendra et al. (2015) *J. Learn. Disabil.*',
      'Kroesbergen & Van Luit (2003) *Remedial Spec. Educ.*',
      'Melby-Lervåg & Hulme (2013) *Dev. Psychol.*',
      'Ramirez et al. (2018) *Educ. Psychol.*',
      'Siegler & Ramani (2009) *J. Educ. Psychol.*',
      'Sweller et al. (2019) *Educ. Psychol. Rev.*',
    ],
  },

  // ───────── TDAH ─────────
  {
    id: 'tdah',
    profile: 'tdah',
    label: 'TDAH',
    tagline: 'Atenció i funcions executives',
    title: 'Adaptar materials per a alumnat amb TDAH',
    principle:
      'el TDAH no és una manca de coneixement sinó una dificultat de **funcions executives**: mantenir l’atenció, inhibir, retenir instruccions i gestionar el temps. L’objectiu és **externalitzar l’organització** (passos, temps, memòria) i **donar retorn freqüent**, mantenint els mateixos objectius.',
    sections: [
      {
        title: 'Format i presentació',
        items: [
          { text: '**Una tasca per bloc**, numerada, amb l’espai de resposta al costat i poc soroll visual.', src: 'DuPaul & Stoner 2014', ev: 1 },
          { text: 'Instruccions en **passos numerats**, verb d’acció en negreta i un exemple.', src: 'Sweller et al. 2019', ev: 2 },
          { text: '**Llista de comprovació** a la mateixa fitxa per marcar cada pas fet (autoregistre).', src: 'Reid et al. 2005', ev: 3 },
          { text: 'Indicar el **temps orientatiu** de cada part i on acaba la tasca.', src: 'DuPaul & Stoner 2014', ev: 1 },
        ],
      },
      {
        title: 'Estructura de la tasca',
        items: [
          { text: '**Fragmentar** les tasques llargues en blocs curts amb mini-objectius i lliuraments parcials.', src: 'DuPaul et al. 2012', ev: 3 },
          { text: '**Temporitzador visual** i rutines visibles; anticipar els canvis d’activitat.', src: 'Pfiffner & DuPaul 2015', ev: 1 },
          { text: '**Retorn immediat i reforç positiu específic**; targeta diària de seguiment (escola-família).', src: 'Fabiano et al. 2009; Fabiano et al. 2010', ev: 3 },
          { text: 'Escriptura amb **planificació guiada** (SRSD: esquema previ, autoinstruccions, revisió).', src: 'Graham et al. 2012; Reid & Lienemann 2006', ev: 3 },
        ],
      },
      {
        title: 'Accés i entorn',
        items: [
          { text: '**Ubicació** a prop del docent i lluny de portes, finestres i zones de pas.', src: 'DuPaul & Stoner 2014', ev: 1 },
          { text: '**Moviment permès** i pauses actives breus; encàrrecs que impliquin desplaçar-se.', src: 'Sarver et al. 2015', ev: 2 },
          { text: '**Instruccions orals sempre amb suport escrit** a la pissarra o a la fitxa.', src: 'Pfiffner & DuPaul 2015', ev: 1 },
          { text: '**Apunts o esquemes donats** i material digital amb agenda i recordatoris.', src: 'EEF 2020', ev: 1 },
        ],
      },
      {
        title: 'Avaluació',
        items: [
          { text: '**Proves fragmentades** en parts curtes, amb pauses; el temps addicional sol aportar menys que l’estructura.', src: 'Lovett 2010; Pariseau et al. 2010', ev: 2 },
          { text: 'Preguntes **d’una en una o per blocs**, de menys a més dificultat, i recordatori de revisar.', src: 'DuPaul & Stoner 2014', ev: 1 },
          { text: '**Avaluació contínua i variada** (oral, pràctica, projectes) en lloc d’una sola prova llarga.', src: 'EEF 2020', ev: 1 },
          { text: 'Espai amb **menys distraccions** quan calgui, sense que sigui un càstig.', src: 'Consens expert', ev: 1 },
        ],
      },
    ],
    avoid: [
      { text: '**Treure el pati o l’educació física** com a càstig: redueix el moviment i empitjora l’autoregulació.', src: 'Pfiffner & DuPaul 2015', ev: 1 },
      { text: '**Entrenament computeritzat de la memòria de treball** per millorar el rendiment acadèmic: no es transfereix.', src: 'Rapport et al. 2013; Melby-Lervåg & Hulme 2013', ev: 3 },
      { text: '**Atribuir la conducta al sucre** o fer dietes sense evidència com a solució.', src: 'Wolraich et al. 1995', ev: 3 },
      { text: '**Instruccions llargues només orals** o fer copiar enunciats i deures de la pissarra.', src: 'Consens expert', ev: 1 },
    ],
    keys: [
      { title: 'Externalitzar', text: 'Temps, passos i recordatoris han de ser visibles: no depengueu de la memòria de l’alumne.' },
      { title: 'Reforç abans que càstig', text: 'Feu explícit què ha fet bé; el retorn positiu i freqüent és el que més funciona.' },
      { title: 'Escola i família', text: 'Mateixos objectius i targeta de seguiment compartida; registreu-ho al PI si escau.' },
      { title: 'Adaptar ≠ intervenir', text: 'Les adaptacions no substitueixen el tractament ni l’ensenyament d’autoregulació.' },
    ],
    refs: [
      'DuPaul & Stoner (2014) *ADHD in the Schools*',
      'DuPaul et al. (2012) *School Psych. Rev.*',
      'EEF (2020) *SEND in Mainstream Schools*',
      'Fabiano et al. (2009) *Clin. Psychol. Rev.*',
      'Fabiano et al. (2010) *School Psych. Rev.*',
      'Graham et al. (2012) *J. Educ. Psychol.*',
      'Lovett (2010) *Rev. Educ. Res.*',
      'Melby-Lervåg & Hulme (2013) *Dev. Psychol.*',
      'Pariseau et al. (2010) *School Psych. Q.*',
      'Pfiffner & DuPaul (2015) a Barkley (ed.) *ADHD Handbook*',
      'Rapport et al. (2013) *Clin. Psychol. Rev.*',
      'Reid & Lienemann (2006) *Except. Child.*',
      'Reid et al. (2005) *Except. Child.*',
      'Sarver et al. (2015) *J. Abnorm. Child Psychol.*',
      'Sweller et al. (2019) *Educ. Psychol. Rev.*',
      'Wolraich et al. (1995) *JAMA*',
    ],
  },

  // ───────── TDL ─────────
  {
    id: 'tdl',
    profile: 'tdl',
    label: 'TDL',
    tagline: 'Comprensió i expressió oral',
    title: 'Adaptar materials per a alumnat amb TDL',
    principle:
      'el trastorn del desenvolupament del llenguatge afecta la **comprensió i l’expressió** (vocabulari, gramàtica, discurs) i, per tant, la lectura i les instruccions de totes les matèries. L’objectiu és **reduir la càrrega lingüística sense rebaixar el contingut** i **ensenyar el vocabulari de manera explícita**.',
    sections: [
      {
        title: 'Llenguatge dels materials',
        items: [
          { text: '**Frases curtes i directes** (subjecte-verb-complement), sense subordinades llargues, passives ni dobles negacions.', src: 'Starling et al. 2012', ev: 2 },
          { text: 'Mantenir el **mateix terme** per a cada concepte (no sinònims) i destacar-lo en negreta.', src: 'Consens expert', ev: 1 },
          { text: '**Glossari visual** de la unitat: paraula, definició amigable, imatge i exemple.', src: 'Marulis & Neuman 2010', ev: 3 },
          { text: 'Llenguatge figurat i expressions fetes **explicats** quan siguin necessaris.', src: 'Consens expert', ev: 1 },
        ],
      },
      {
        title: 'Vocabulari i comprensió',
        items: [
          { text: '**Pre-ensenyar el vocabulari clau** amb exposicions repetides i ús actiu en contextos diferents.', src: 'Beck et al. 2013; Marulis & Neuman 2010', ev: 3 },
          { text: '**Organitzadors gràfics** i esquemes del text (seqüència, causa-efecte, comparació).', src: 'Kim et al. 2004; Dexter & Hughes 2011', ev: 3 },
          { text: '**Preguntes de comprensió graduades**: primer literals, després inferencials amb suport.', src: 'Consens expert', ev: 1 },
          { text: '**Suport visual a la gramàtica** (colors o formes per a les parts de la frase).', src: 'Ebbels 2007; Ebbels 2014', ev: 2 },
        ],
      },
      {
        title: 'Comunicació a l’aula',
        items: [
          { text: 'Parlar **més a poc a poc**, amb pauses; **repetir i reformular** i comprovar la comprensió.', src: 'Starling et al. 2012', ev: 2 },
          { text: '**Instruccions orals amb suport escrit o visual** (passos numerats, pictogrames).', src: 'Consens expert', ev: 1 },
          { text: '**Temps d’espera** ampli abans de demanar resposta; avisar abans de preguntar.', src: 'Consens expert', ev: 1 },
          { text: '**Marcs de frase** («Primer…, després…», «Crec que… perquè…») per expressar-se.', src: 'Consens expert', ev: 1 },
        ],
      },
      {
        title: 'Tasques i avaluació',
        items: [
          { text: 'Enunciats curts amb vocabulari treballat; **llegir-los en veu alta** si cal.', src: 'Starling et al. 2012', ev: 2 },
          { text: 'Formats de resposta amb **menys exigència expressiva**: opcions, completar, relacionar, esquemes.', src: 'Consens expert', ev: 1 },
          { text: '**Avaluar el contingut, no la forma lingüística**, fora de les matèries de llengua.', src: 'EEF 2020', ev: 1 },
          { text: 'Permetre **demostrar el que sap** amb dibuixos, maquetes o resposta oral guiada.', src: 'DUA / CAST', ev: 1 },
        ],
      },
    ],
    avoid: [
      { text: '**Simplificar el contingut conceptual** en lloc del llenguatge: l’alumne té capacitat per aprendre’l.', src: 'Bishop et al. 2017', ev: 1 },
      { text: '**Corregir explícitament i en públic** els errors de parla: millor reformular-ho correctament (*recast*).', src: 'Cleave et al. 2015', ev: 2 },
      { text: '**Confondre TDL amb manca d’esforç** o de capacitat, o esperar que «ja parlarà».', src: 'Bishop et al. 2017', ev: 1 },
      { text: '**Adaptar segons «estils d’aprenentatge»**: no té suport empíric.', src: 'Pashler et al. 2008', ev: 3 },
    ],
    keys: [
      { title: 'Per defecte, a tot el grup', text: 'Llenguatge clar i vocabulari explícit beneficien tothom, i molt l’alumnat nouvingut.' },
      { title: 'Vocabulari a totes les àrees', text: 'Cada departament tria i treballa les paraules clau de la unitat.' },
      { title: 'Coordinació', text: 'Amb logopèdia i CREDA: mateixes estratègies i objectius registrats al PI si escau.' },
      { title: 'Adaptar ≠ intervenir', text: 'L’accés no substitueix la intervenció logopèdica específica.' },
    ],
    refs: [
      'Beck et al. (2013) *Bringing Words to Life*',
      'Bishop et al. (2017) *J. Child Psychol. Psychiatry* (CATALISE)',
      'Cleave et al. (2015) *Am. J. Speech Lang. Pathol.*',
      'Dexter & Hughes (2011) *LDQ*',
      'Ebbels (2007) *Child Lang. Teach. Ther.*',
      'Ebbels (2014) *Child Lang. Teach. Ther.*',
      'EEF (2020) *SEND in Mainstream Schools*',
      'Kim et al. (2004) *J. Learn. Disabil.*',
      'Marulis & Neuman (2010) *Rev. Educ. Res.*',
      'Pashler et al. (2008) *Psychol. Sci. Public Interest*',
      'Starling et al. (2012) *Int. J. Lang. Commun. Disord.*',
    ],
  },

  // ───────── TEA ─────────
  {
    id: 'tea',
    profile: 'tea',
    label: 'TEA',
    tagline: 'Predictibilitat i suport visual',
    title: 'Adaptar materials per a alumnat amb TEA',
    principle:
      'l’autisme implica diferències en la comunicació social, la flexibilitat i el processament sensorial, sovint amb un **bon processament visual i del detall**. L’objectiu és **fer explícit i predictible el que és implícit**, reduir la incertesa i la càrrega sensorial i **aprofitar els interessos**. Cada perfil és molt diferent.',
    sections: [
      {
        title: 'Estructura i predictibilitat',
        items: [
          { text: '**Agendes i horaris visuals**; anticipar els canvis i les novetats.', src: 'Hume et al. 2021; Knight et al. 2015', ev: 3 },
          { text: '**Estructura visual de la tasca**: què he de fer, quant, quan acabo i què ve després.', src: 'Virues-Ortega et al. 2013', ev: 2 },
          { text: '**Anàlisi de tasques**: dividir en passos seqüenciats i visibles.', src: 'Hume et al. 2021', ev: 3 },
          { text: '**Model del producte final** esperat i exemple resolt.', src: 'Consens expert', ev: 1 },
        ],
      },
      {
        title: 'Format i llenguatge',
        items: [
          { text: '**Suports visuals** (pictogrames, fotos, esquemes) per a instruccions i conceptes.', src: 'Hume et al. 2021', ev: 3 },
          { text: 'Instruccions **literals, concretes i completes**; explicitar l’extensió esperada de la resposta.', src: 'Kalandadze et al. 2018', ev: 2 },
          { text: 'Format **net i constant** en totes les fitxes, amb la informació essencial destacada.', src: 'Consens expert', ev: 1 },
          { text: 'Integrar els **interessos especials** als enunciats i exemples per motivar.', src: 'Gunn & Delafield-Butt 2016', ev: 2 },
        ],
      },
      {
        title: 'Comunicació i interacció',
        items: [
          { text: '**Treball entre iguals estructurat**, amb rols clars i guió de la tasca.', src: 'Hume et al. 2021', ev: 3 },
          { text: '**Vídeo-modelatge** per mostrar procediments i habilitats.', src: 'Hume et al. 2021', ev: 3 },
          { text: '**Històries socials** i guions per a situacions noves (sortides, exàmens, canvis).', src: 'Hume et al. 2021', ev: 2 },
          { text: '**Temps de resposta** ampli i opció de respondre per escrit o amb suport visual.', src: 'Consens expert', ev: 1 },
        ],
      },
      {
        title: 'Avaluació i entorn',
        items: [
          { text: '**Anticipar l’avaluació**: data, lloc, format i un exemple de preguntes.', src: 'Consens expert', ev: 1 },
          { text: 'Preguntes **concretes i tancades** o semiobertes amb pautes; evitar enunciats ambigus.', src: 'Consens expert', ev: 1 },
          { text: '**Reduir estímuls sensorials** (soroll, llum); espai de calma i auriculars si cal.', src: 'Fletcher-Watson & Happé 2019', ev: 1 },
          { text: '**Reforç** de l’esforç i la feina ben feta, explícit i adaptat als seus interessos.', src: 'Hume et al. 2021', ev: 3 },
        ],
      },
    ],
    avoid: [
      { text: '**Canvis sense avisar** d’horari, espai o persona de referència.', src: 'Consens expert', ev: 1 },
      { text: '**Forçar el contacte visual** com a condició per escoltar o participar: pot ser molt aversiu.', src: 'Trevisan et al. 2018', ev: 2 },
      { text: '**Llenguatge figurat, ironia o implícits** sense explicar-los.', src: 'Kalandadze et al. 2018', ev: 2 },
      { text: '**Pràctiques sense evidència o desaconsellades** (comunicació facilitada, dietes sense gluten ni caseïna).', src: 'ASHA 2018; Hume et al. 2021', ev: 3 },
    ],
    keys: [
      { title: 'Pregunteu a l’alumne i la família', text: 'Ells saben què el regula i què el desborda; cada perfil és únic.' },
      { title: 'Per defecte, a tot el grup', text: 'Agenda visual, instruccions clares i anticipació ajuden tota l’aula.' },
      { title: 'Coherència', text: 'Mateixos suports a totes les àrees i espais, i registrats al PI si escau.' },
      { title: 'Mirar la funció', text: 'Davant una conducta difícil, busqueu la causa sensorial o comunicativa abans de sancionar.' },
    ],
    refs: [
      'ASHA (2018) *Facilitated Communication* (posició)',
      'Fletcher-Watson & Happé (2019) *Autism: A New Introduction*',
      'Gunn & Delafield-Butt (2016) *Rev. Educ. Res.*',
      'Hume et al. (2021) *J. Autism Dev. Disord.* (NCAEP)',
      'Kalandadze et al. (2018) *Autism*',
      'Knight et al. (2015) *J. Autism Dev. Disord.*',
      'Trevisan et al. (2018) *Autism Res.*',
      'Virues-Ortega et al. (2013) *Clin. Psychol. Rev.*',
    ],
  },

  // ───────── DISCAPACITAT INTEL·LECTUAL LLEU ─────────
  {
    id: 'di',
    profile: 'di',
    label: 'DI lleu',
    tagline: 'Concret, funcional i estructurat',
    title: 'Adaptar materials per a alumnat amb discapacitat intel·lectual lleu',
    principle:
      'l’alumnat amb DI lleu aprèn a un **ritme més lent**, amb més dificultat en l’abstracció, la memòria de treball i la **generalització**. L’objectiu és oferir aprenentatges **funcionals, concrets i molt estructurats**, amb ajudes que es retiren progressivament. Aquí sí que pot caldre **ajustar objectius** (PI), mantenint el mateix tema que el grup.',
    sections: [
      {
        title: 'Format i llenguatge',
        items: [
          { text: '**Lectura fàcil**: frases curtes, una idea per frase, vocabulari freqüent i ordre lògic.', src: 'Inclusion Europe 2009; UNE 153101 EX', ev: 1 },
          { text: '**Imatge o pictograma** al costat del text i les paraules clau.', src: 'Browder et al. 2006', ev: 2 },
          { text: '**Pocs elements per pàgina** i el mateix format en totes les fitxes.', src: 'Consens expert', ev: 1 },
          { text: '**Organitzadors gràfics simples** (seqüències, classificacions amb imatges).', src: 'Kim et al. 2004', ev: 2 },
        ],
      },
      {
        title: 'Instrucció',
        items: [
          { text: '**Instrucció explícita**: «jo ho faig, ho fem junts, ho fas tu», amb molta pràctica guiada.', src: 'Hughes et al. 2017; Spooner et al. 2012', ev: 3 },
          { text: '**Anàlisi de tasques**: passos petits i seqüenciats, amb llista visual.', src: 'Spooner et al. 2012', ev: 3 },
          { text: '**Ajudes graduades** (model, gest, verbal) i **retirada progressiva** amb temps d’espera.', src: 'Browder et al. 2009', ev: 3 },
          { text: '**Repàs espaiat** i pràctica en contextos diferents per generalitzar.', src: 'Cepeda et al. 2006', ev: 3 },
        ],
      },
      {
        title: 'Adaptació del contingut',
        items: [
          { text: '**Prioritzar els aprenentatges essencials** de la unitat i ajustar-ne la complexitat.', src: 'Decret 150/2017', ev: 1 },
          { text: '**Mateix tema que el grup**, en una versió de lectura fàcil amb glossari visual.', src: 'Hehir et al. 2016', ev: 2 },
          { text: 'Ancorar en **situacions reals i funcionals** (diners, hores, receptes, entorn proper).', src: 'Spooner et al. 2012', ev: 2 },
          { text: '**Suports tecnològics**: text a veu, calculadora, plantilles i bancs de paraules.', src: 'Consens expert', ev: 1 },
        ],
      },
      {
        title: 'Avaluació',
        items: [
          { text: 'Avaluar segons els **objectius del PI**, amb el progrés respecte del punt de partida.', src: 'Decret 150/2017', ev: 1 },
          { text: 'Formats accessibles: **tria amb imatges**, relacionar, resposta oral o demostració pràctica.', src: 'Browder et al. 2006', ev: 2 },
          { text: 'Preguntes **concretes, una per línia**, sense dobles negacions ni enunciats compostos.', src: 'Inclusion Europe 2009', ev: 1 },
          { text: '**Avaluació freqüent i curta**, amb retorn immediat i reconeixement del progrés.', src: 'Hughes et al. 2017', ev: 2 },
        ],
      },
    ],
    avoid: [
      { text: '**Fitxes d’un tema diferent** al del grup o treball sempre fora de l’aula: aïlla i empobreix l’aprenentatge.', src: 'Hehir et al. 2016', ev: 2 },
      { text: '**Infantilitzar** els materials (imatges i temes infantils per a adolescents).', src: 'Consens expert', ev: 1 },
      { text: '**Tasques purament mecàniques** (copiar, pintar) com a única activitat; rebaixar expectatives.', src: 'EEF 2020', ev: 1 },
      { text: '**Mantenir les ajudes indefinidament**: genera dependència. Planifiqueu-ne la retirada.', src: 'Browder et al. 2009', ev: 2 },
    ],
    keys: [
      { title: 'Presumir competència', text: 'Partiu del que sap i espereu progrés: les expectatives altes compten.' },
      { title: 'Mateix tema, altre nivell', text: 'Participació real en la tasca del grup, amb els suports necessaris.' },
      { title: 'Generalitzar', text: 'Practiqueu el mateix aprenentatge a l’aula, al centre i a casa.' },
      { title: 'Coordinació i PI', text: 'Objectius compartits amb tot l’equip i la família, revisats periòdicament.' },
    ],
    refs: [
      'Browder et al. (2006) *Except. Child.*',
      'Browder et al. (2009) *Except. Child.*',
      'Cepeda et al. (2006) *Psychol. Bull.*',
      'Decret 150/2017, de l’atenció educativa a l’alumnat en el marc d’un sistema educatiu inclusiu',
      'EEF (2020) *SEND in Mainstream Schools*',
      'Hehir et al. (2016) *A Summary of the Evidence on Inclusive Education*',
      'Hughes et al. (2017) *LDRP*',
      'Inclusion Europe (2009) *Information for All*',
      'Kim et al. (2004) *J. Learn. Disabil.*',
      'Spooner et al. (2012) *Remedial Spec. Educ.*',
      'UNE 153101 EX (2018) *Lectura fácil*',
    ],
  },

  // ───────── ALTES CAPACITATS ─────────
  {
    id: 'altes',
    profile: 'altes',
    label: 'Altes capacitats',
    tagline: 'Profunditat, complexitat i ritme',
    title: 'Adaptar materials per a alumnat amb altes capacitats',
    principle:
      'l’alumnat amb altes capacitats no necessita **més del mateix**, sinó **més profunditat, complexitat i un ritme ajustat**. L’objectiu és **compactar el que ja domina** i oferir reptes amb sentit, atenent també el benestar emocional i l’autoregulació. També poden presentar doble excepcionalitat (amb TDAH, TEA, dislèxia…).',
    sections: [
      {
        title: 'Ajustar el ritme',
        items: [
          { text: '**Compactació curricular**: avaluació inicial i substitució del que ja domina per ampliació.', src: 'Reis et al. 1998', ev: 2 },
          { text: '**Acceleració** de matèria o de curs quan escau: efectes acadèmics positius i robustos.', src: 'Steenbergen-Hu et al. 2016', ev: 3 },
          { text: '**Agrupaments flexibles per nivell** en una matèria, amb currículum ajustat.', src: 'Steenbergen-Hu et al. 2016', ev: 3 },
        ],
      },
      {
        title: 'Disseny de la tasca',
        items: [
          { text: 'Ampliar en **profunditat i complexitat**: analitzar, avaluar i crear, no fer més exercicis.', src: 'VanTassel-Baska & Brown 2007', ev: 2 },
          { text: '**Tasques obertes** amb diversos camins i un **producte autèntic** (recerca, problema real).', src: 'Renzulli & Reis 2014', ev: 2 },
          { text: '**Menú d’elecció** o contracte d’aprenentatge amb criteris d’excel·lència.', src: 'Tomlinson 2014', ev: 1 },
          { text: 'Preguntes d’**ordre superior** i connexions interdisciplinàries explícites.', src: 'VanTassel-Baska & Brown 2007', ev: 2 },
        ],
      },
      {
        title: 'Suport i autonomia',
        items: [
          { text: '**Programes d’enriquiment** i mentoria, dins o fora de l’horari.', src: 'Kim 2016', ev: 3 },
          { text: 'Ensenyar **estratègies d’estudi i autoregulació**: sovint no les han necessitat.', src: 'Consens expert', ev: 1 },
          { text: '**Treball cooperatiu amb reptes propis**, entre iguals de nivell similar quan sigui possible.', src: 'Steenbergen-Hu et al. 2016', ev: 2 },
          { text: 'Atendre el **perfeccionisme**: valorar el procés, l’error i l’esforç.', src: 'Neihart et al. 2016', ev: 1 },
        ],
      },
      {
        title: 'Avaluació',
        items: [
          { text: '**Rúbriques amb nivells per sobre del màxim** estàndard (excel·lència, originalitat).', src: 'Tomlinson 2014', ev: 1 },
          { text: 'Permetre **demostrar el domini** abans de la unitat per avançar.', src: 'Reis et al. 1998', ev: 2 },
          { text: 'Valorar el **creixement individual**, no només l’assoliment dels mínims.', src: 'Consens expert', ev: 1 },
          { text: '**Autoavaluació** i establiment d’objectius propis amb el docent.', src: 'Consens expert', ev: 1 },
        ],
      },
    ],
    avoid: [
      { text: '**Donar més fitxes del mateix nivell** quan acaba abans: penalitza la rapidesa.', src: 'Reis et al. 1998', ev: 1 },
      { text: '**Fer-lo ajudant permanent** del docent o tutor dels companys en lloc d’aprendre.', src: 'Consens expert', ev: 1 },
      { text: '**Descartar l’acceleració** per por a efectes socials: la recerca no ho avala.', src: 'Neihart 2007; Assouline et al. 2015', ev: 2 },
      { text: '**Esperar que «ja se’n sortirà sol»**: risc de desmotivació i rendiment per sota de les possibilitats.', src: 'Assouline et al. 2015', ev: 1 },
    ],
    keys: [
      { title: 'Reptes per a tothom', text: 'Tasques obertes amb sostre alt (DUA) permeten que cadascú arribi on pugui.' },
      { title: 'Identificar i actuar', text: 'No cal un diagnòstic per ajustar el repte: observeu i proveu.' },
      { title: 'Doble excepcionalitat', text: 'Una dificultat pot amagar l’alta capacitat i a l’inrevés: mireu tot el perfil.' },
      { title: 'Coordinació i PI', text: 'Mesures d’ampliació o acceleració acordades i registrades al PI.' },
    ],
    refs: [
      'Assouline et al. (2015) *A Nation Empowered*',
      'Kim (2016) *Gifted Child Q.*',
      'Neihart (2007) *Gifted Child Q.*',
      'Neihart et al. (2016) *The Social and Emotional Development of Gifted Children*',
      'Reis et al. (1998) *Gifted Child Q.*',
      'Renzulli & Reis (2014) *The Schoolwide Enrichment Model*',
      'Steenbergen-Hu et al. (2016) *Rev. Educ. Res.*',
      'Tomlinson (2014) *The Differentiated Classroom*',
      'VanTassel-Baska & Brown (2007) *Gifted Child Q.*',
    ],
  },
];
