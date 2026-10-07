// Camps a omplir dins dels prompts: qualsevol text entre claudàtors, p. ex. [etapa i curs].
// Si el camp conté " / ", es tracta com una llista d'opcions: [llatí / no llatí].
// [?] i [ ] no són camps (són marques per a la IA o espais en blanc).

const PLACEHOLDER_RE = /\[([^[\]\n]+)\]/g;

const isField = (inner) => {
  const t = inner.trim();
  return t !== '' && t !== '?';
};

/** Llista de camps únics en ordre d'aparició. */
export function findPlaceholders(text) {
  const seen = new Map();
  for (const match of String(text).matchAll(PLACEHOLDER_RE)) {
    const key = match[1];
    if (!isField(key) || seen.has(key)) continue;
    const parts = key.split(' / ').map((s) => s.trim()).filter(Boolean);
    seen.set(key, { key, options: parts.length > 1 ? parts : [] });
  }
  return [...seen.values()];
}

/** Substitueix els camps omplerts; els buits es mantenen tal qual. */
export function fillPlaceholders(text, values = {}) {
  return String(text).replace(PLACEHOLDER_RE, (whole, key) => {
    const value = values[key];
    return isField(key) && typeof value === 'string' && value.trim() ? value.trim() : whole;
  });
}

/**
 * Divideix el text en fragments per poder-los pintar.
 * Retorna [{ type: 'text' | 'field' | 'filled', value, key? }].
 */
export function tokenize(text, values = {}) {
  const tokens = [];
  let last = 0;
  const source = String(text);
  for (const match of source.matchAll(PLACEHOLDER_RE)) {
    const [whole, key] = match;
    if (!isField(key)) continue;
    if (match.index > last) tokens.push({ type: 'text', value: source.slice(last, match.index) });
    const value = values[key];
    if (typeof value === 'string' && value.trim()) {
      tokens.push({ type: 'filled', value: value.trim(), key });
    } else {
      tokens.push({ type: 'field', value: whole, key });
    }
    last = match.index + whole.length;
  }
  if (last < source.length) tokens.push({ type: 'text', value: source.slice(last) });
  return tokens;
}
