/* eslint-disable @typescript-eslint/no-require-imports -- Browser pixel startup is tested without making tracking requests. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function pixel(existing) {
  const window = existing ? { twq: existing } : {};
  const scripts = [];
  const document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  const source = fs.readFileSync(path.join(__dirname, '../app/lib/x-pixel.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  new Function('exports', 'window', 'document', code)(exports, window, document);
  return { window, scripts, initialize: exports.initializeXPixel };
}

test('pixel preserves the existing tracking ID, async SDK, and bootstrap queue', () => {
  const run = pixel();
  assert.equal(run.scripts.length, 0);
  run.initialize();
  assert.equal(run.scripts.length, 1);
  assert.equal(run.scripts[0].src, 'https://static.ads-twitter.com/uwt.js');
  assert.equal(run.scripts[0].async, true);
  assert.deepEqual(run.window.twq.queue, [['config', 'rhsuk']]);
  run.initialize();
  assert.equal(run.scripts.length, 1);
  assert.equal(run.window.twq.queue.length, 1);
  const calls = [];
  run.window.twq.exe = (...args) => calls.push(args);
  run.window.twq('event', 'example');
  assert.deepEqual(calls, [['event', 'example']]);
});

test('an existing SDK is configured once without adding a duplicate script', () => {
  const calls = [];
  const run = pixel((...args) => calls.push(args));
  run.initialize();
  run.initialize();
  assert.equal(run.scripts.length, 0);
  assert.deepEqual(calls, [['config', 'rhsuk']]);
});
