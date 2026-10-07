// Exportació i importació de les dades de l'usuari en JSON.

import { SCHEMA_VERSION, sanitizeState } from './store.js';

export const EXPORT_APP = 'inclusia';

export function buildExport(state) {
  return {
    app: EXPORT_APP,
    version: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    prompts: state.prompts,
    favorites: state.favorites,
    stats: state.stats,
  };
}

/** Llegeix un fitxer d'exportació. Llança un Error amb missatge per a l'usuari si no és vàlid. */
export function parseImport(json) {
  let data;
  try {
    data = JSON.parse(json);
  } catch {
    throw new Error('El fitxer no és un JSON vàlid.');
  }
  // També acceptem una llista simple de prompts.
  if (Array.isArray(data)) data = { app: EXPORT_APP, prompts: data };
  if (!data || data.app !== EXPORT_APP) {
    throw new Error('Aquest fitxer no és una exportació d’Inclusia.');
  }
  const clean = sanitizeState(data);
  if (!clean.prompts.length && !clean.favorites.length) {
    throw new Error('El fitxer no conté cap prompt vàlid.');
  }
  return clean;
}

/**
 * Fusiona les dades importades amb les actuals.
 * mode 'merge': afegeix i, si hi ha el mateix id, es queda amb la versió més recent.
 * mode 'replace': substitueix prompts, preferits i estadístiques.
 * Retorna { state, added, updated } sense modificar l'estat original.
 */
export function applyImport(state, imported, mode = 'merge') {
  if (mode === 'replace') {
    const next = { ...state, prompts: imported.prompts, favorites: imported.favorites, stats: imported.stats };
    return { state: next, added: imported.prompts.length, updated: 0 };
  }
  const byId = new Map(state.prompts.map((p) => [p.id, p]));
  let added = 0;
  let updated = 0;
  for (const p of imported.prompts) {
    const current = byId.get(p.id);
    if (!current) {
      byId.set(p.id, p);
      added += 1;
    } else if (p.updatedAt > current.updatedAt) {
      byId.set(p.id, p);
      updated += 1;
    }
  }
  // Només una versió modificada per prompt inclòs: la més recent.
  const byBase = new Map();
  for (const p of byId.values()) {
    if (!p.baseId) continue;
    const other = byBase.get(p.baseId);
    if (!other || p.updatedAt > other.updatedAt) byBase.set(p.baseId, p);
  }
  const prompts = [...byId.values()].filter((p) => !p.baseId || byBase.get(p.baseId) === p);
  const stats = { ...state.stats };
  for (const [k, v] of Object.entries(imported.stats)) stats[k] = Math.max(stats[k] ?? 0, v);
  const next = {
    ...state,
    prompts,
    favorites: [...new Set([...state.favorites, ...imported.favorites])],
    stats,
  };
  return { state: next, added, updated };
}
