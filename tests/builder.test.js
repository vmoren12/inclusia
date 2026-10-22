import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt, builderDefaults } from '../assets/js/builder.js';
import { PROFILES } from '../assets/js/data/taxonomy.js';
import { findPlaceholders } from '../assets/js/placeholders.js';

test('compon un prompt d’adaptació per seccions, amb perfils i versió del docent', () => {
  const r = buildPrompt({
    action: 'adaptar',
    format: 'fitxa',
    profiles: ['tea', 'tdah'],
    stage: '2n d’ESO',
    teacher: ['solucions', 'canvis'],
  });
  assert.match(r.text, /^Actua com a especialista/);
  assert.match(r.text, /## Encàrrec\nAdapta el material adjunt per a alumnat de 2n d’ESO\./);
  assert.match(r.text, /Perfil de l’alumnat: TEA, TDAH\./);
  assert.match(r.text, /Per a TEA:\n- Llenguatge literal/);
  assert.match(r.text, /2\. Versió del docent, separada del material de l’alumne:\n {3}- Solucionari/);
  assert.match(r.text, /Llista breu dels canvis/);
  assert.deepEqual(r.profiles, ['tea', 'tdah']);
  assert.deepEqual(r.formats, ['fitxa']);
});

test('crear sense dades deixa camps per omplir i ignora opcions no aplicables', () => {
  const r = buildPrompt({ action: 'crear', format: 'text', teacher: ['canvis'] });
  assert.match(r.text, /\[etapa i curs\]/);
  assert.match(r.text, /Àrea i tema: \[tema\]\./);
  assert.match(r.text, /\[objectiu d’aprenentatge\]/);
  assert.doesNotMatch(r.text, /canvis fets/);
  assert.match(r.text, /## Lliurament\nLliura el text amb les activitats, amb els 3 nivells\./, 'sense versió del docent aplicable');
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
  const r = buildPrompt({ action: 'x', format: 'y', profiles: ['z'], levels: 'n' });
  assert.deepEqual(r.actions, ['adaptar']);
  assert.deepEqual(r.formats, ['fitxa']);
  assert.deepEqual(r.profiles, []);
  assert.doesNotMatch(r.text, /Nivells progressius/);
});

test('el perfil universal cobreix tota la diversitat i s’etiqueta amb tots els perfils', () => {
  const r = buildPrompt({ profiles: ['universal', 'tea'] });
  assert.match(r.text, /grup heterogeni real/);
  assert.match(r.text, /- Atenció i funcions executives: /);
  assert.match(r.text, /Reforça especialment TEA:/);
  assert.deepEqual(r.profiles, PROFILES.map((p) => p.id));
});

test('nivells progressius configurables', () => {
  const r = buildPrompt({ levels: '4', levelStyle: 'metafora', levelMode: 'escala' });
  assert.match(r.text, /## Nivells progressius \(4\)/);
  assert.match(r.text, /- Camp base — /);
  assert.match(r.text, /- Expedició — /);
  assert.match(r.text, /escala de dificultat creixent/);

  const symbols = buildPrompt({ levels: '2' });
  assert.match(symbols.text, /- ● Inicial — /);
  assert.doesNotMatch(symbols.text, /▲/);
});

test('bastides, tipologies, nombre d’activitats i Bloom', () => {
  const r = buildPrompt({ scaffolds: ['banc'], exercises: ['error', 'cas'], count: '8', bloom: ['aplicar', 'crear'] });
  assert.match(r.text, /## Bastides\n- Banc de paraules/);
  assert.match(r.text, /detecció i correcció d’errors i anàlisi d’un cas/);
  assert.match(r.text, /Nombre d’activitats: 8 \(cadascuna amb la seva versió per a cada nivell\)\./);
  assert.match(r.text, /Aplicar \(utilitzar, resoldre, calcular\) → Crear/);
  assert.match(r.text, /tasques d’ordre superior a tots els nivells/);
});

test('el resum de Bloom per al docent és opcional', () => {
  assert.doesNotMatch(buildPrompt({}).text, /Taula resum de la taxonomia de Bloom/);
  assert.match(buildPrompt({ teacher: ['bloom'] }).text, /Taula resum de la taxonomia de Bloom/);
});

test('els formats sense activitats no inclouen nivells, tipologies ni Bloom', () => {
  const r = buildPrompt({ action: 'crear', format: 'historia', teacher: ['bloom', 'solucions', 'guia'] });
  assert.doesNotMatch(r.text, /Nivells progressius|## Activitats|Bloom|Solucionari/);
  assert.match(r.text, /Guia didàctica/);
});

test('sense versió del docent, el lliurament és d’una sola línia', () => {
  const r = buildPrompt({ teacher: [], levels: '1' });
  assert.match(r.text, /## Lliurament\nLliura la fitxa\./);
});

test('l’autorevisió afegeix comprovacions coherents amb les opcions', () => {
  const r = buildPrompt({});
  assert.match(r.text, /## Abans de lliurar, comprova/);
  assert.match(r.text, /Les solucions corresponen exactament/);
  assert.doesNotMatch(buildPrompt({ quality: [] }).text, /Abans de lliurar/);
});

test('l’únic camp a omplir per defecte és l’etapa', () => {
  const keys = findPlaceholders(buildPrompt({}).text).map((f) => f.key);
  assert.deepEqual(keys, ['etapa i curs']);
});

test('els valors per defecte són independents entre crides', () => {
  const a = builderDefaults();
  a.scaffolds.push('x');
  assert.ok(!builderDefaults().scaffolds.includes('x'));
});
