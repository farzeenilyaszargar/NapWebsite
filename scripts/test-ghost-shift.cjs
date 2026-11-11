const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText, file);
const { GhostShift, position, allFloor } = require('../app/ghost-shift/model.ts');
const { key, neighbor, vectors, walkable, playerStart, powerCells } = require('../app/ghost-shift/map.ts');
let checks = 0;
function test(name, run) { run(); checks++; console.log(`PASS ${name}`); }
const step = (g, seconds) => { for (let i = 0; i < Math.ceil(seconds * 60); i++) g.update(1 / 60); };
function playing() { const g = new GhostShift(); g.phase = 'playing'; g.ghosts.forEach(x => x.cooldown = 999); return g; }
test('all floors and collectibles reachable, including tunnels', () => {
  const seen = new Set([key(playerStart)]), queue = [playerStart];
  for (const p of queue) for (const d of Object.keys(vectors)) { const n = neighbor(p, d); if (n && !seen.has(key(n))) { seen.add(key(n)); queue.push(n); } }
  assert.equal(seen.size, allFloor.length);
});
test('movement collects once and respects walls', () => { const g = playing(); step(g, 2.2); assert.ok(g.score > 0); assert.ok(walkable(g.player.cell)); const score = g.score; g.steer('down'); step(g, .5); assert.equal(g.score, score); });
test('mid-cell reversal is continuous', () => { const g = playing(); step(g, .09); const before = position(g.player); g.steer('right'); assert.ok(Math.abs(position(g.player).x - before.x) < .00001); step(g, .05); assert.ok(position(g.player).x > before.x); });
test('buffered turn waits for a valid junction', () => { const g = playing(); step(g, .1); g.steer('up'); step(g, .4); assert.equal(g.player.direction, 'left'); step(g, 1); assert.equal(g.player.cell.x, 6); assert.equal(g.player.direction, 'up'); assert.equal(g.player.cell.y, 14); });
test('tunnel wraps', () => { const g = playing(); g.player.cell = { x: 0, y: 8 }; g.steer('left'); step(g, .2); assert.equal(g.player.cell.x, 24); });
test('power dots enable eating rivals', () => { const g = playing(); g.player.cell = { x: 2, y: 1 }; g.steer('left'); step(g, .19); assert.ok(g.powerLeft > 6); assert.ok(!g.powers.has(powerCells[0])); const r = g.ghosts[0]; r.cell = { ...g.player.cell }; r.target = null; r.cooldown = 0; const score = g.score; g.update(.001); assert.ok(g.score >= score + 200); assert.ok(r.cooldown > 2); assert.equal(g.lives, 3); });
test('collision costs one life and preserves progress', () => { const g = playing(); g.ghosts[0].cell = { ...g.player.cell }; g.ghosts[0].cooldown = 0; g.update(.001); assert.equal(g.phase, 'dying'); assert.equal(g.lives, 2); const count = g.dots.size; step(g, .9); assert.equal(g.phase, 'ready'); assert.equal(g.dots.size, count); });
test('last life ends game', () => { const g = playing(); g.lives = 1; g.ghosts[0].cell = { ...g.player.cell }; g.ghosts[0].cooldown = 0; g.update(.001); step(g, 1); assert.equal(g.phase, 'over'); });
test('board clear wins and next shift preserves score', () => { const g = playing(); g.dots = new Set([key({ x: 11, y: 15 })]); g.powers.clear(); step(g, .2); assert.equal(g.phase, 'won'); const next = g.nextLevel(); assert.equal(next.level, 2); assert.equal(next.score, g.score); assert.equal(next.lives, g.lives); assert.ok(next.dots.size > 100); });
test('AI stays on valid cells over sustained play', () => { const g = new GhostShift(); g.lives = 100; for (let i = 0; i < 12000; i++) { if (i % 41 === 0) g.steer(Object.keys(vectors)[Math.floor(i / 41) % 4]); g.update(1 / 60); for (const a of [g.player, ...g.ghosts]) { assert.ok(walkable(a.cell)); if (a.target) assert.ok(walkable(a.target)); assert.ok(Number.isFinite(position(a).x)); } } assert.ok(g.elapsed > 100); });
console.log(`${checks} gameplay checks passed.`);
