# Inclusia

**Prompts d'IA per crear i adaptar materials educatius inclusius.**

👉 **App:** https://vmoren12.github.io/inclusia/

Inclusia és una web/app per a docents que recull prompts curts, específics i ben estructurats per fer servir amb qualsevol IA (ChatGPT, Claude, Gemini, Copilot…) i:

- **adaptar** materials que ja tens (textos, fitxes, exàmens, presentacions),
- **crear** materials de zero (lectura fàcil, històries socials, agendes visuals, glossaris, rúbriques…),
- **avaluar** i **planificar** (instruments alternatius, retorn a l'alumne, mesures d'aula, PSI, comunicació amb famílies),

per a qualsevol perfil: TEA, TDAH, dislèxia, discalcúlia, TDL, discapacitat intel·lectual, alumnat nouvingut, discapacitat visual, auditiva o motriu, altes capacitats, benestar emocional i DUA.

## Funcionalitats

- **Biblioteca** amb filtres combinables (què vols fer · perfil · format), cerca sense accents, preferits i ordenació.
- **Omplir camps**: els camps entre `[claudàtors]` es poden omplir abans de copiar. Si un camp té opcions (`[llatí / no llatí]`), es mostren com a suggeriments.
- **Copiar amb un clic** des de la targeta o des del detall.
- **Generador**: combina acció, perfils, format, etapa i opcions, i construeix un prompt estructurat al moment.
- **Prompts propis**: crea, edita, duplica i elimina. Si edites un prompt inclòs, es desa com a versió teva i pots restaurar l'original.
- **Exportar i importar** en JSON (afegint o substituint).
- **Tot en local** (`localStorage`): sense comptes, sense servidor, sense seguiment.
- **Accessible i responsive**: tipografia Atkinson Hyperlegible, navegació amb teclat, tema clar/fosc, funciona sense connexió (service worker).

## Com escriure un bon prompt per a Inclusia

Els prompts inclosos segueixen la mateixa estructura (vegeu l'exemple d'alumnat nouvingut a la biblioteca):

1. **Tasca** en una frase: què cal fer i per a qui.
2. **Dades (omple)**: camps entre claudàtors, curts.
3. **Instruccions numerades**: 5-8 punts concrets i verificables.
4. **Lliura…**: què ha de retornar la IA.

Convencions: `[camp]` és un camp a omplir; `[opció A / opció B]` ofereix opcions; `[?]` és la marca que demanem a la IA per assenyalar dubtes (no és un camp).

## Desenvolupament

HTML, CSS i JavaScript (mòduls ES) sense dependències ni pas de compilació.

```bash
npm start      # servidor local a http://localhost:8080
npm test       # proves unitàries (node --test, Node 20+)
```

```
index.html                 Estructura de la pàgina
assets/css/styles.css      Estils (tokens, tema clar/fosc, responsive)
assets/js/main.js          Interfície i esdeveniments
assets/js/store.js         Estat i localStorage (validació de dades)
assets/js/io.js            Exportació / importació
assets/js/placeholders.js  Detecció i emplenament de camps [..]
assets/js/builder.js       Generador de prompts
assets/js/data/            Prompts, facetes i blocs del generador
sw.js                      Funcionament sense connexió
tests/                     Proves unitàries
```

### Afegir o millorar prompts

Edita [`assets/js/data/prompts.js`](assets/js/data/prompts.js). Cada prompt necessita un `id` únic (no el canviïs un cop publicat: s'hi associen preferits i versions dels usuaris), `title`, `description`, `actions`, `profiles`, `formats` i `text`. Les proves validen que les etiquetes existeixin a [`taxonomy.js`](assets/js/data/taxonomy.js).

Si afegeixes fitxers nous, inclou-los a la llista `ASSETS` de [`sw.js`](sw.js) i incrementa `VERSION`.

### Publicació

Cada `push` a `main` executa les proves i publica la web a GitHub Pages amb GitHub Actions ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)).

## Privacitat

Les dades es guarden només al navegador de cada usuari. No introdueixis mai noms ni dades personals de l'alumnat als prompts, i revisa sempre el resultat de la IA abans de fer-lo servir.

## Llicència

Codi sota llicència [MIT](LICENSE). Tipografia [Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont/) sota [SIL Open Font License](assets/fonts/OFL.txt). Els pictogrames suggerits són d'[ARASAAC](https://arasaac.org) (Govern d'Aragó, CC BY-NC-SA).
