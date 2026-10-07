// Estat persistent de l'usuari (localStorage).
// Els prompts de l'usuari poden ser nous o versions modificades d'un prompt inclòs (baseId).

import { ACTIONS, PROFILES, FORMATS } from './data/taxonomy.js';

export const STORAGE_KEY = 'inclusia.v1';
export const SCHEMA_VERSION = 1;

const VALID = {
  actions: new Set(ACTIONS.map((a) => a.id)),
  profiles: new Set(PROFILES.map((p) => p.id)),
  formats: new Set(FORMATS.map((f) => f.id)),
};

const LIMITS = { title: 200, description: 500, text: 20000 };

export function emptyState() {
  return { version: SCHEMA_VERSION, prompts: [], favorites: [], stats: {}, settings: { theme: 'auto' } };
}

export function createId() {
  const rand = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `u-${rand}`;
}

const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
const ids = (v, valid) => (Array.isArray(v) ? [...new Set(v.filter((x) => valid.has(x)))] : []);

/** Valida i normalitza un prompt d'usuari. Retorna null si no és vàlid. */
export function sanitizePrompt(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const title = str(raw.title, LIMITS.title).trim();
  const text = str(raw.text, LIMITS.text).trim();
  if (!title || !text) return null;
  const now = new Date().toISOString();
  const prompt = {
    id: typeof raw.id === 'string' && /^[\w-]{1,80}$/.test(raw.id) ? raw.id : createId(),
    title,
    description: str(raw.description, LIMITS.description).trim(),
    actions: ids(raw.actions, VALID.actions),
    profiles: ids(raw.profiles, VALID.profiles),
    formats: ids(raw.formats, VALID.formats),
    text,
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : now,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : now,
  };
  if (typeof raw.baseId === 'string' && raw.baseId) prompt.baseId = raw.baseId;
  return prompt;
}

/** Normalitza un estat qualsevol (localStorage o importació). */
export function sanitizeState(raw) {
  const state = emptyState();
  if (!raw || typeof raw !== 'object') return state;
  const seen = new Set();
  for (const p of Array.isArray(raw.prompts) ? raw.prompts : []) {
    const clean = sanitizePrompt(p);
    if (clean && !seen.has(clean.id)) {
      seen.add(clean.id);
      state.prompts.push(clean);
    }
  }
  if (Array.isArray(raw.favorites)) {
    state.favorites = [...new Set(raw.favorites.filter((f) => typeof f === 'string'))];
  }
  if (raw.stats && typeof raw.stats === 'object') {
    for (const [k, v] of Object.entries(raw.stats)) {
      if (Number.isFinite(v) && v > 0) state.stats[k] = Math.floor(v);
    }
  }
  if (raw.settings && ['auto', 'light', 'dark'].includes(raw.settings.theme)) {
    state.settings.theme = raw.settings.theme;
  }
  return state;
}

export function loadState(storage = globalThis.localStorage) {
  try {
    const json = storage?.getItem(STORAGE_KEY);
    return json ? sanitizeState(JSON.parse(json)) : emptyState();
  } catch {
    return emptyState();
  }
}

/** Retorna true si s'ha pogut desar. */
export function saveState(state, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/**
 * Combina els prompts inclosos amb els de l'usuari.
 * Una versió d'usuari amb baseId substitueix l'original a la mateixa posició.
 */
export function mergePrompts(builtins, userPrompts) {
  const overrides = new Map(userPrompts.filter((p) => p.baseId).map((p) => [p.baseId, p]));
  const builtinIds = new Set(builtins.map((b) => b.id));
  const merged = builtins.map((b) =>
    overrides.has(b.id)
      ? { ...overrides.get(b.id), source: 'modified', original: b }
      : { ...b, source: 'builtin' },
  );
  for (const p of userPrompts) {
    if (!p.baseId || !builtinIds.has(p.baseId)) merged.push({ ...p, source: 'user' });
  }
  return merged;
}

/** Desa (crea o actualitza) un prompt d'usuari dins l'estat. */
export function upsertPrompt(state, prompt) {
  const clean = sanitizePrompt({ ...prompt, updatedAt: new Date().toISOString() });
  if (!clean) return null;
  const i = state.prompts.findIndex((p) => p.id === clean.id);
  if (i >= 0) state.prompts[i] = { ...clean, createdAt: state.prompts[i].createdAt };
  else state.prompts.push(clean);
  return clean;
}

export function removePrompt(state, id) {
  state.prompts = state.prompts.filter((p) => p.id !== id);
  state.favorites = state.favorites.filter((f) => f !== id);
  delete state.stats[id];
}
