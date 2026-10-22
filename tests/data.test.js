import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BUILTIN_PROMPTS } from '../assets/js/data/prompts.js';
import { ACTIONS, PROFILES, FORMATS } from '../assets/js/data/taxonomy.js';
import {
  BUILDER_FORMATS,
  BUILDER_PROFILES,
  DUA_PRINCIPLES,
  BUILDER_SCAFFOLDS,
  BUILDER_EXERCISES,
  BLOOM_LEVELS,
  BUILDER_TEACHER,
  BUILDER_VISUAL,
  BUILDER_QUALITY,
  BUILDER_PRESETS,
} from '../assets/js/data/builder-blocks.js';
import { builderDefaults } from '../assets/js/builder.js';
import { sanitizePrompt } from '../assets/js/store.js';

const ids = (list) => new Set(list.map((x) => x.id));

test('els prompts inclosos tenen ids únics', () => {
  const seen = new Set();
  for (const p of BUILTIN_PROMPTS) {
    assert.ok(!seen.has(p.id), `id duplicat: ${p.id}`);
    seen.add(p.id);
  }
});

test('els prompts inclosos són complets i fan servir etiquetes vàlides', () => {
  const valid = { actions: ids(ACTIONS), profiles: ids(PROFILES), formats: ids(FORMATS) };
  for (const p of BUILTIN_PROMPTS) {
    assert.ok(p.title && p.description && p.text, `${p.id}: falten camps`);
    assert.ok(!p.id.startsWith('u-'), `${p.id}: el prefix u- és per als prompts d’usuari`);
    for (const key of Object.keys(valid)) {
      assert.ok(p[key].length > 0, `${p.id}: cal almenys un valor a ${key}`);
      for (const v of p[key]) assert.ok(valid[key].has(v), `${p.id}: ${key} invàlid «${v}»`);
    }
    assert.match(p.text, /\nLliura/, `${p.id}: ha d’indicar què cal lliurar`);
    assert.equal(sanitizePrompt(p)?.text, p.text.trim(), `${p.id}: no supera la validació`);
  }
});

test('cada etiqueta té almenys un prompt', () => {
  for (const [key, list] of [
    ['actions', ACTIONS],
    ['profiles', PROFILES],
    ['formats', FORMATS],
  ]) {
    for (const item of list) {
      assert.ok(BUILTIN_PROMPTS.some((p) => p[key].includes(item.id)), `cap prompt amb ${key}=${item.id}`);
    }
  }
});

test('el generador cobreix tots els perfils i formats', () => {
  for (const p of PROFILES) assert.ok(BUILDER_PROFILES[p.id], `perfil sense blocs: ${p.id}`);
  for (const f of FORMATS) assert.ok(BUILDER_FORMATS[f.id], `format sense blocs: ${f.id}`);
});

test('les opcions del generador tenen ids únics i les plantilles en fan servir de vàlids', () => {
  const groups = {
    dua: DUA_PRINCIPLES,
    scaffolds: BUILDER_SCAFFOLDS,
    exercises: BUILDER_EXERCISES,
    bloom: BLOOM_LEVELS,
    teacher: BUILDER_TEACHER,
    visual: BUILDER_VISUAL,
    quality: BUILDER_QUALITY,
  };
  for (const [key, list] of Object.entries(groups)) {
    assert.equal(ids(list).size, list.length, `ids duplicats a ${key}`);
  }
  const defaults = builderDefaults();
  for (const preset of BUILDER_PRESETS) {
    for (const [key, value] of Object.entries(preset.config)) {
      assert.ok(key in defaults, `${preset.id}: clau desconeguda «${key}»`);
      if (groups[key]) for (const v of value) assert.ok(ids(groups[key]).has(v), `${preset.id}: ${key} invàlid «${v}»`);
    }
  }
});
