import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FITXES } from '../assets/js/data/fitxes.js';
import { PROFILES } from '../assets/js/data/taxonomy.js';
import { sheetHTML, inline } from '../assets/js/fitxes.js';

const profileIds = new Set(PROFILES.map((p) => p.id));

test('les guies tenen ids únics i perfils vàlids', () => {
  const seen = new Set();
  for (const f of FITXES) {
    assert.match(f.id, /^[a-z0-9-]+$/, f.id);
    assert.ok(!seen.has(f.id), `id duplicat: ${f.id}`);
    seen.add(f.id);
    assert.ok(profileIds.has(f.profile), `${f.id}: perfil invàlid`);
  }
  for (const p of ['dislexia', 'discalculia', 'tdah', 'tea', 'di', 'altes']) assert.ok(seen.has(p), `falta ${p}`);
});

test('cada guia és completa i cap en una pàgina', () => {
  for (const f of FITXES) {
    for (const k of ['label', 'tagline', 'title', 'principle']) assert.ok(f[k]?.trim(), `${f.id}: falta ${k}`);
    assert.equal(f.sections.length, 4, `${f.id}: calen 4 blocs`);
    const items = f.sections.flatMap((s) => s.items);
    assert.ok(items.length >= 12 && items.length <= 19, `${f.id}: ${items.length} propostes`);
    assert.equal(f.avoid.length, 4, `${f.id}: calen 4 pràctiques a evitar`);
    assert.equal(f.keys.length, 4, `${f.id}: calen 4 claus`);
    assert.ok(f.refs.length > 0, `${f.id}: calen referències`);
    for (const it of [...items, ...f.avoid]) {
      assert.ok(it.text?.trim() && it.src?.trim(), `${f.id}: ítem incomplet`);
      assert.ok([1, 2, 3].includes(it.ev), `${f.id}: evidència invàlida a «${it.text.slice(0, 30)}»`);
    }
  }
});

test('el marcatge s’escapa i converteix negreta i cursiva', () => {
  assert.equal(inline('**a** i *b* <c>'), '<strong>a</strong> i <em>b</em> &lt;c&gt;');
  const html = sheetHTML(FITXES[0]);
  assert.match(html, /class="sheet"/);
  assert.ok(!html.includes('**'));
});
