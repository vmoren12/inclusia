import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildExport, parseImport, applyImport } from '../assets/js/io.js';
import { emptyState, upsertPrompt } from '../assets/js/store.js';

const prompt = (fields) => ({ actions: [], profiles: [], formats: [], text: 'x', ...fields });

test('exportació i importació són compatibles', () => {
  const state = emptyState();
  upsertPrompt(state, { title: 'T', text: 'X', profiles: ['tea'] });
  state.favorites.push('adaptar-dislexia');
  const imported = parseImport(JSON.stringify(buildExport(state)));
  assert.equal(imported.prompts[0].title, 'T');
  assert.deepEqual(imported.favorites, ['adaptar-dislexia']);
});

test('parseImport rebutja fitxers que no són d’Inclusia', () => {
  assert.throws(() => parseImport('no és json'), /JSON/);
  assert.throws(() => parseImport('{"app":"altra"}'), /Inclusia/);
  assert.throws(() => parseImport('{"app":"inclusia","prompts":[]}'), /dades vàlides/);
});

test('parseImport accepta una llista simple de prompts', () => {
  assert.equal(parseImport('[{"title":"A","text":"x"}]').prompts.length, 1);
});

test('merge conserva la versió més recent i no duplica', () => {
  const state = emptyState();
  state.prompts = [prompt({ id: 'u-1', title: 'Vell', updatedAt: '2024-01-01' })];
  const imported = {
    ...emptyState(),
    prompts: [
      prompt({ id: 'u-1', title: 'Nou', updatedAt: '2025-01-01' }),
      prompt({ id: 'u-2', title: 'Altre', updatedAt: '2024-01-01' }),
    ],
    favorites: ['u-2'],
  };
  const { state: next, added, updated } = applyImport(state, imported, 'merge');
  assert.equal(added, 1);
  assert.equal(updated, 1);
  assert.deepEqual(next.prompts.map((p) => p.title), ['Nou', 'Altre']);
  assert.deepEqual(next.favorites, ['u-2']);
  assert.equal(state.prompts[0].title, 'Vell', 'no modifica l’estat original');
});

test('merge només conserva una versió modificada per prompt inclòs', () => {
  const state = emptyState();
  state.prompts = [prompt({ id: 'u-1', baseId: 'b', title: 'A', updatedAt: '2024-01-01' })];
  const imported = { ...emptyState(), prompts: [prompt({ id: 'u-9', baseId: 'b', title: 'B', updatedAt: '2025-01-01' })] };
  const { state: next } = applyImport(state, imported, 'merge');
  assert.deepEqual(next.prompts.map((p) => p.id), ['u-9']);
});

test('replace substitueix les dades', () => {
  const state = emptyState();
  upsertPrompt(state, { title: 'A', text: 'x' });
  const imported = { ...emptyState(), prompts: [prompt({ id: 'u-5', title: 'B' })] };
  assert.deepEqual(applyImport(state, imported, 'replace').state.prompts.map((p) => p.id), ['u-5']);
});
