import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPlaceholders, fillPlaceholders, tokenize } from '../assets/js/placeholders.js';

test('detecta camps únics i opcions', () => {
  const fields = findPlaceholders('Per a [etapa]. Alfabet: [llatí / no llatí]. Torna a [etapa].');
  assert.deepEqual(fields, [
    { key: 'etapa', options: [] },
    { key: 'llatí / no llatí', options: ['llatí', 'no llatí'] },
  ]);
});

test('ignora [?] i [ ]', () => {
  assert.deepEqual(findPlaceholders('Marca amb [?] i deixa [ ] buit.'), []);
});

test('omple només els camps amb valor', () => {
  const out = fillPlaceholders('A [x] i [y] i [?]', { x: ' ESO ', y: '' });
  assert.equal(out, 'A ESO i [y] i [?]');
});

test('tokenize separa text, camps i camps omplerts', () => {
  const tokens = tokenize('Hola [a] i [b].', { a: 'món' });
  assert.deepEqual(
    tokens.map((t) => t.type),
    ['text', 'filled', 'text', 'field', 'text'],
  );
  assert.equal(tokens.map((t) => t.value).join(''), 'Hola món i [b].');
});
