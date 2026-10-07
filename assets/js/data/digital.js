// Complement "versió digital interactiva": un bloc estàndard que s'afegeix al final
// dels prompts que ho admeten (camp `digital: true`) per obtenir també un únic fitxer HTML.

export const DIGITAL_FORMAT = 'digital';

// Requisits tècnics comuns a tots els materials digitals.
export const DIGITAL_TECH =
  'Un únic fitxer HTML autònom (HTML, CSS i JavaScript en el mateix fitxer, sense llibreries externes ni connexió) que s’obri amb doble clic i funcioni en ordinador, tauleta i mòbil.';

export const DIGITAL_FEATURES = [
  'Seccions clares: Apunts (contingut clau amb exemples), Activitats i Autoavaluació.',
  'Multinivell DUA: selector de nivell (● amb suport · ■ estàndard · ▲ ampliació) que ajusti consignes, ajudes i dificultat sense canviar el tema.',
  'Activitats autocorrectives variades (opció múltiple, relacionar, completar, ordenar, verdader/fals) amb retroacció immediata que expliqui l’error, pistes graduades i opció de tornar-ho a provar.',
  'Test final autocorrectiu amb puntuació i resum del que cal repassar.',
  'Accessibilitat: botó per escoltar el text (síntesi de veu del navegador), mida de lletra ajustable, alt contrast, navegació amb teclat, text alternatiu a les imatges i informació que no depengui només del color.',
  'Progrés desat al navegador i botó per imprimir.',
];

export const DIGITAL_ADDON = [
  'Versió digital interactiva (a més del material anterior):',
  `Crea també el material com a ${DIGITAL_TECH.charAt(0).toLowerCase()}${DIGITAL_TECH.slice(1)}`,
  ...DIGITAL_FEATURES.map((f) => `- ${f}`),
  '- Aplica-hi totes les adaptacions indicades abans.',
  'Lliura el codi complet en un sol bloc, sense parts omeses.',
].join('\n');

/** El prompt admet el complement digital (i encara no és un prompt digital). */
export const supportsDigitalAddon = (p) => p?.digital === true && !p.formats?.includes(DIGITAL_FORMAT);

export const withDigitalAddon = (text) => `${text.trimEnd()}\n\n${DIGITAL_ADDON}`;
