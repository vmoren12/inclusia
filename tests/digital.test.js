import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DIGITAL_ADDON,
  DIGITAL_HINT,
  DIGITAL_SPECS,
  digitalAddonFor,
  digitalHintFor,
  supportsDigitalAddon,
  withDigitalAddon,
} from '../assets/js/data/digital.js';
import { BUILTIN_PROMPTS } from '../assets/js/data/prompts.js';
import { buildPrompt } from '../assets/js/builder.js';
import { findPlaceholders } from '../assets/js/placeholders.js';
import { sanitizePrompt } from '../assets/js/store.js';

test('el complement digital no afegeix camps a omplir', () => {
  assert.deepEqual(findPlaceholders(DIGITAL_ADDON), []);
  assert.match(DIGITAL_ADDON, /únic fitxer HTML autònom/);
});

test('només s’ofereix als prompts marcats que encara no són digitals', () => {
  assert.equal(supportsDigitalAddon({ digital: true, formats: ['fitxa'] }), true);
  assert.equal(supportsDigitalAddon({ digital: true, formats: ['digital'] }), false);
  assert.equal(supportsDigitalAddon({ formats: ['fitxa'] }), false);
});

test('withDigitalAddon afegeix el bloc al final', () => {
  assert.equal(withDigitalAddon('Hola\n'), `Hola\n\n${DIGITAL_ADDON}`);
});

test('els prompts digitals específics no es marquen amb el complement', () => {
  const digital = BUILTIN_PROMPTS.filter((p) => p.formats.includes('digital'));
  assert.ok(digital.length >= 3);
  for (const p of digital) assert.notEqual(p.digital, true, p.id);
  assert.ok(BUILTIN_PROMPTS.some(supportsDigitalAddon));
});

test('el marcador digital es conserva en desar prompts d’usuari', () => {
  assert.equal(sanitizePrompt({ title: 'T', text: 'X', digital: true }).digital, true);
  assert.equal('digital' in sanitizePrompt({ title: 'T', text: 'X', digital: 'sí' }), false);
});

test('generador: format digital i complement digital', () => {
  const asFormat = buildPrompt({ action: 'crear', format: 'digital', digital: true });
  assert.match(asFormat.text, /Format de sortida: material digital interactiu/);
  assert.match(asFormat.text, /## Especificacions del material digital\n- Un únic fitxer HTML autònom/);
  assert.match(asFormat.text, /Selector de nivell \(● ■ ▲\)/);
  assert.match(asFormat.text, /Disseny visual minimalista/);
  assert.match(asFormat.text, /Vista docent separada/);
  assert.match(asFormat.text, /Versió del docent \(dins del fitxer, a la vista docent\)/);
  assert.doesNotMatch(asFormat.text, /Versió digital interactiva/, 'no duplica el bloc');
  assert.doesNotMatch(asFormat.text, /Llest per imprimir|A4/, 'sense opcions només de paper');
  assert.equal(asFormat.digital, false);

  const withAddon = buildPrompt({ action: 'adaptar', format: 'fitxa', digital: true });
  assert.match(withAddon.text, /## Versió digital interactiva \(a més del material anterior\)\nCrea també el material com a un únic fitxer HTML/);
  assert.ok(withAddon.text.endsWith('Lliura el codi complet en un sol bloc, sense parts omeses.'));
  assert.deepEqual(findPlaceholders(withAddon.text).map((f) => f.key), ['etapa i curs']);
  assert.equal(withAddon.digital, false);

  assert.equal(buildPrompt({ action: 'adaptar', format: 'fitxa' }).digital, true);
});
