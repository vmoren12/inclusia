// Facetes per classificar i filtrar els prompts.
// Els ids s'emmagatzemen als prompts i a les exportacions: no els canviïs.

export const ACTIONS = [
  { id: 'adaptar', label: 'Adaptar material' },
  { id: 'crear', label: 'Crear de zero' },
  { id: 'avaluar', label: 'Avaluar' },
  { id: 'planificar', label: 'Planificar i comunicar' },
];

export const PROFILES = [
  { id: 'dua', label: 'Tot l’alumnat (DUA)' },
  { id: 'tea', label: 'TEA' },
  { id: 'tdah', label: 'TDAH' },
  { id: 'dislexia', label: 'Dislèxia' },
  { id: 'discalculia', label: 'Discalcúlia' },
  { id: 'tdl', label: 'TDL (llenguatge)' },
  { id: 'di', label: 'Discapacitat intel·lectual' },
  { id: 'nouvingut', label: 'Nouvingut' },
  { id: 'visual', label: 'Discapacitat visual' },
  { id: 'auditiva', label: 'Discapacitat auditiva' },
  { id: 'motriu', label: 'Discapacitat motriu' },
  { id: 'altes', label: 'Altes capacitats' },
  { id: 'emocional', label: 'Benestar emocional' },
];

export const FORMATS = [
  { id: 'text', label: 'Text / lectura' },
  { id: 'fitxa', label: 'Fitxa d’activitats' },
  { id: 'examen', label: 'Examen / prova' },
  { id: 'presentacio', label: 'Presentació' },
  { id: 'esquema', label: 'Esquema / mapa' },
  { id: 'visual', label: 'Suport visual' },
  { id: 'historia', label: 'Història social' },
  { id: 'rubrica', label: 'Rúbrica / checklist' },
  { id: 'joc', label: 'Joc / projecte' },
  { id: 'document', label: 'Document docent' },
];

export const FACETS = [
  { key: 'actions', title: 'Què vols fer', items: ACTIONS },
  { key: 'profiles', title: 'Perfil de l’alumnat', items: PROFILES },
  { key: 'formats', title: 'Format', items: FORMATS },
];

export const labelOf = (items, id) => items.find((i) => i.id === id)?.label ?? id;
