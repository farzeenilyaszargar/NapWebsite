/* eslint-disable @typescript-eslint/no-require-imports -- Node tests transpile the route without a Next server. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

test('closed applications reject submissions without contacting storage', async () => {
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../app/api/apply/route.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiled = { exports: {} };
  let calls = 0;
  new Function('exports', 'fetch', code)(compiled.exports, async () => { calls++; throw new Error('Storage must not be called'); });
  const response = await compiled.exports.POST(new Request('https://www.nap.cx/api/apply', { method: 'POST', body: JSON.stringify({ fullName: 'Test Builder', email: 'builder@example.com' }) }));
  assert.equal(response.status, 410);
  assert.deepEqual(await response.json(), { error: 'Applications are closed at the moment.' });
  assert.equal(calls, 0);
});
