import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RECOMMENDATIONS, AULA_AREAS, AULA_LEVELS, AULA_EFFORT, AULA_EVIDENCE } from '../assets/js/data/aula.js';
import { PROFILES } from '../assets/js/data/taxonomy.js';
import { AULA_FACETS, filterRecommendations, facetValues } from '../assets/js/aula.js';

const ids = (list) => new Set(list.map((x) => x.id));
const emptyFilters = () => ({
  query: '',
  facets: Object.fromEntries(AULA_FACETS.map(({ key }) => [key, new Set()])),
  status: 'all',
});

test('les recomanacions tenen ids únics i ASCII', () => {
  const seen = new Set();
  for (const r of RECOMMENDATIONS) {
    assert.match(r.id, /^[a-z0-9-]+$/, r.id);
    assert.ok(!seen.has(r.id), `id duplicat: ${r.id}`);
    seen.add(r.id);
  }
});

test('les recomanacions són completes i fan servir valors vàlids', () => {
  const valid = { areas: ids(AULA_AREAS), profiles: ids(PROFILES) };
  for (const r of RECOMMENDATIONS) {
    for (const f of ['title', 'summary', 'why', 'source']) assert.ok(r[f]?.trim(), `${r.id}: falta ${f}`);
    assert.ok(r.how.length >= 2, `${r.id}: calen almenys 2 passos`);
    for (const key of ['areas', 'profiles']) {
      assert.ok(r[key].length > 0, `${r.id}: cal almenys un valor a ${key}`);
      for (const v of r[key]) assert.ok(valid[key].has(v), `${r.id}: ${key} invàlid «${v}»`);
    }
    assert.ok(ids(AULA_LEVELS).has(r.level), `${r.id}: level invàlid`);
    assert.ok(ids(AULA_EFFORT).has(r.effort), `${r.id}: effort invàlid`);
    assert.ok(ids(AULA_EVIDENCE).has(r.evidence), `${r.id}: evidence invàlid`);
    if (r.kind) assert.equal(r.kind, 'evita');
  }
});

test('cada àmbit té recomanacions', () => {
  for (const a of AULA_AREAS) assert.ok(RECOMMENDATIONS.some((r) => r.areas.includes(a.id)), a.id);
});

test('filtres: facetes combinades, estat i cerca sense accents', () => {
  const f = emptyFilters();
  assert.equal(filterRecommendations(RECOMMENDATIONS, f, new Set()).length, RECOMMENDATIONS.length);

  f.facets.areas.add('espai');
  f.facets.evidence.add('solida');
  const list = filterRecommendations(RECOMMENDATIONS, f, new Set());
  assert.ok(list.length > 0);
  assert.ok(list.every((r) => r.areas.includes('espai') && r.evidence === 'solida'));

  const first = list[0].id;
  const pending = filterRecommendations(RECOMMENDATIONS, { ...f, status: 'pending' }, new Set([first]));
  assert.ok(!pending.some((r) => r.id === first));
  const applied = filterRecommendations(RECOMMENDATIONS, { ...f, status: 'applied' }, new Set([first]));
  assert.deepEqual(applied.map((r) => r.id), [first]);

  const q = emptyFilters();
  q.query = 'SOROLL fons';
  assert.ok(filterRecommendations(RECOMMENDATIONS, q, new Set()).some((r) => r.id === 'aula-soroll'));
});

test('el tipus «evita» es pot filtrar', () => {
  const f = emptyFilters();
  f.facets.kind.add('evita');
  const list = filterRecommendations(RECOMMENDATIONS, f, new Set());
  assert.ok(list.length >= 1);
  assert.ok(list.every((r) => facetValues(r, 'kind')[0] === 'evita'));
});
