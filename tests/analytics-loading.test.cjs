/* eslint-disable @typescript-eslint/no-require-imports -- Exercise browser startup with deterministic event queues. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function startup({ readyState = 'loading', idle = true } = {}) {
  const listeners = [];
  const pending = [];
  let initialized = 0;
  const window = { addEventListener: (...args) => listeners.push(args) };
  if (idle) window.requestIdleCallback = (callback) => pending.push(callback);
  const source = fs.readFileSync(path.join(__dirname, '../instrumentation-client.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  new Function('exports', 'require', 'window', 'document', 'setTimeout', code)(
    {}, () => ({ initializeAnalytics: () => { initialized++; return Promise.resolve(); } }),
    window, { readyState }, (callback) => pending.push(callback),
  );
  return { listeners, pending, initialized: () => initialized };
}

test('background analytics wait for load and then idle', () => {
  const run = startup();
  assert.equal(run.initialized(), 0);
  assert.equal(run.pending.length, 0);
  assert.equal(run.listeners[0][0], 'load');
  assert.deepEqual(run.listeners[0][2], { once: true });
  run.listeners[0][1]();
  assert.equal(run.initialized(), 0);
  run.pending.shift()();
  assert.equal(run.initialized(), 1);
});

test('late hydration still schedules analytics when load already fired', () => {
  const run = startup({ readyState: 'complete' });
  assert.equal(run.listeners.length, 0);
  assert.equal(run.initialized(), 0);
  run.pending.shift()();
  assert.equal(run.initialized(), 1);
});

test('browsers without idle callbacks also wait for load', () => {
  const run = startup({ idle: false });
  assert.equal(run.pending.length, 0);
  run.listeners[0][1]();
  assert.equal(run.initialized(), 0);
  run.pending.shift()();
  assert.equal(run.initialized(), 1);
});
