import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeState,
  sanitizePrompt,
  mergePrompts,
  upsertPrompt,
  removePrompt,
  loadState,
  saveState,
  emptyState,
  STORAGE_KEY,
} from '../assets/js/store.js';

const memoryStorage = () => {
  const data = new Map();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, String(v)) };
};

test('sanitizePrompt descarta prompts sense títol o text i filtra etiquetes invàlides', () => {
  assert.equal(sanitizePrompt({ title: '', text: 'x' }), null);
  assert.equal(sanitizePrompt({ title: 'x', text: '  ' }), null);
  const p = sanitizePrompt({ title: 'T', text: 'X', profiles: ['tea', 'inventat', 'tea'], actions: 'adaptar' });
  assert.deepEqual(p.profiles, ['tea']);
  assert.deepEqual(p.actions, []);
  assert.match(p.id, /^u-/);
});

test('sanitizeState tolera dades corruptes', () => {
  assert.deepEqual(sanitizeState(null), emptyState());
  const s = sanitizeState({
    prompts: [{ id: 'a', title: 'A', text: 'x' }, { id: 'a', title: 'B', text: 'y' }, 5],
    favorites: ['a', 3],
    stats: { a: 2, b: -1 },
    settings: { theme: 'neon' },
  });
  assert.equal(s.prompts.length, 1);
  assert.deepEqual(s.favorites, ['a']);
  assert.deepEqual(s.stats, { a: 2 });
  assert.equal(s.settings.theme, 'auto');
});

test('loadState i saveState fan el viatge d’anada i tornada', () => {
  const storage = memoryStorage();
  const state = emptyState();
  upsertPrompt(state, { title: 'T', text: 'X' });
  assert.equal(saveState(state, storage), true);
  assert.equal(loadState(storage).prompts[0].title, 'T');
  storage.setItem(STORAGE_KEY, '{malformat');
  assert.deepEqual(loadState(storage), emptyState());
});

test('mergePrompts substitueix el prompt inclòs per la versió modificada', () => {
  const builtins = [{ id: 'b1', title: 'Original', text: 'x', actions: [], profiles: [], formats: [] }];
  const user = [
    { id: 'u-1', baseId: 'b1', title: 'Meu', text: 'y', actions: [], profiles: [], formats: [] },
    { id: 'u-2', title: 'Nou', text: 'z', actions: [], profiles: [], formats: [] },
  ];
  const merged = mergePrompts(builtins, user);
  assert.deepEqual(
    merged.map((p) => [p.id, p.source]),
    [
      ['u-1', 'modified'],
      ['u-2', 'user'],
    ],
  );
  assert.equal(merged[0].original.id, 'b1');
});

test('upsertPrompt actualitza mantenint createdAt i removePrompt neteja preferits', () => {
  const state = emptyState();
  const p = upsertPrompt(state, { title: 'T', text: 'X' });
  const again = upsertPrompt(state, { ...p, title: 'T2', createdAt: 'altre' });
  assert.equal(state.prompts.length, 1);
  assert.equal(again.title, 'T2');
  assert.equal(state.prompts[0].createdAt, p.createdAt);
  state.favorites.push(p.id);
  state.stats[p.id] = 3;
  removePrompt(state, p.id);
  assert.deepEqual(state, emptyState());
});

test('sanitizeState conserva les recomanacions aplicades', () => {
  const s = sanitizeState({ applied: ['aula-soroll', 'aula-soroll', 7] });
  assert.deepEqual(s.applied, ['aula-soroll']);
});
