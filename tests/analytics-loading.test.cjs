/* eslint-disable @typescript-eslint/no-require-imports -- Exercise browser startup with deterministic event queues. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');

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

function analytics({ scheduler = false, configured = true } = {}) {
  const pending = [];
  const events = [];
  let imports = 0;
  let initialized = 0;
  const sdk = { init: () => initialized++, capture: (event) => events.push(event) };
  const context = {
    exports: {},
    require: () => { imports++; return { default: sdk }; },
    process: { env: configured ? { NEXT_PUBLIC_POSTHOG_KEY: 'test', NEXT_PUBLIC_POSTHOG_HOST: 'https://example.test' } : {} },
    setTimeout: (callback) => pending.push({ callback }),
  };
  if (scheduler) context.scheduler = {
    postTask: (callback, options) => new Promise((resolve) => pending.push({ callback: () => resolve(callback()), options })),
  };
  const source = fs.readFileSync(path.join(__dirname, '../app/lib/analytics.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, context);
  return { api: context.exports, pending, events, imports: () => imports, initialized: () => initialized };
}

for (const scheduler of [true, false]) {
  test(`SDK initialization yields after import (${scheduler ? 'background task' : 'timer fallback'})`, async () => {
    const run = analytics({ scheduler });
    const first = run.api.initializeAnalytics();
    assert.equal(first, run.api.initializeAnalytics());
    await new Promise(setImmediate);
    assert.equal(run.imports(), 1);
    assert.equal(run.initialized(), 0);
    assert.equal(run.pending.length, 1);
    if (scheduler) assert.equal(run.pending[0].options.priority, 'background');
    run.pending.shift().callback();
    await first;
    assert.equal(run.initialized(), 1);
    await run.api.captureWaitlistSignup();
    assert.deepEqual(run.events, ['waitlist_joined']);
  });
}

test('missing analytics configuration does not import or schedule the SDK', () => {
  const run = analytics({ configured: false });
  assert.equal(run.api.initializeAnalytics(), undefined);
  assert.equal(run.imports(), 0);
  assert.equal(run.pending.length, 0);
});
