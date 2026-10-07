import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt } from '../assets/js/builder.js';

test('compon un prompt d’adaptació amb perfils i lliurables', () => {
  const r = buildPrompt({
    action: 'adaptar',
    format: 'fitxa',
    profiles: ['tea', 'tdah'],
    stage: '2n d’ESO',
    extras: ['solucionari', 'canvis', 'noInventar'],
  });
  assert.match(r.text, /^Adapta el material adjunt per a alumnat de 2n d’ESO\./);
  assert.match(r.text, /Perfil de l’alumnat: TEA, TDAH\./);
  assert.match(r.text, /\n1\. Mantén els objectius/);
  assert.match(r.text, /Lliura la fitxa, el solucionari i una llista breu dels canvis principals\.$/);
  assert.deepEqual(r.profiles, ['tea', 'tdah']);
  assert.deepEqual(r.formats, ['fitxa']);
});

test('crear sense dades deixa camps per omplir i ignora extres no aplicables', () => {
  const r = buildPrompt({ action: 'crear', format: 'text', profiles: [], extras: ['canvis'] });
  assert.match(r.text, /\[etapa i curs\]/);
  assert.match(r.text, /Àrea i tema: \[tema\]\./);
  assert.doesNotMatch(r.text, /canvis/);
});

test('no repeteix instruccions duplicades', () => {
  const r = buildPrompt({
    action: 'adaptar',
    format: 'fitxa',
    profiles: ['nouvingut'],
    notes: 'To adequat a l’edat; no infantilitzis.',
  });
  assert.equal(r.text.split('no infantilitzis').length - 1, 1);
});

test('valors desconeguts recorren als valors per defecte', () => {
  const r = buildPrompt({ action: 'x', format: 'y', profiles: ['z'] });
  assert.deepEqual(r.actions, ['adaptar']);
  assert.deepEqual(r.formats, ['fitxa']);
  assert.deepEqual(r.profiles, []);
});
