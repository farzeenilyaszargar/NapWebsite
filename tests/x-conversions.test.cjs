/* eslint-disable @typescript-eslint/no-require-imports -- Test server-only helper with mocked credentials and fetch. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const crypto = require('node:crypto');
function helper(env, fetch, warnings = []) {
  const code = ts.transpileModule(fs.readFileSync(require('node:path').join(__dirname, '../app/lib/x-conversions.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  new Function('exports', 'require', 'process', 'fetch', 'console', code)(exports,
    (id) => id === 'node:crypto' ? crypto : {}, { env }, fetch, { warn: (...args) => warnings.push(args) });
  return exports.sendXConversion;
}
const event = { eventId: 'tw-rhsuk-example', conversionId: 'waitlist-test-id', conversionTime: '2026-10-24T00:00:00.000Z', email: '  Builder@Example.com ', eventSourceUrl: 'https://www.nap.cx/waitlist' };
test('X request uses supplied endpoint, server token, normalized SHA-256 email and stable conversion ID', async () => {
  let called = false;
  const send = helper({ X_PIXEL_TOKEN: 'test-token' }, async (url, options) => {
    called = true;
    assert.equal(url, 'https://ads-api.x.com/12/measurement/conversions/rhsuk');
    assert.equal(options.headers['X-Pixel-Token'], 'test-token');
    assert.equal(options.method, 'POST');
    assert.equal(options.cache, 'no-store');
    const payload = JSON.parse(options.body).conversions[0];
    assert.equal(payload.event_id, event.eventId);
    assert.equal(payload.conversion_id, event.conversionId);
    assert.equal(payload.conversion_time, event.conversionTime);
    assert.equal(payload.event_source_url, event.eventSourceUrl);
    assert.deepEqual(payload.identifiers, [{ hashed_email: crypto.createHash('sha256').update('builder@example.com').digest('hex') }]);
    assert.ok(!options.body.includes('Builder@') && !options.body.includes('builder@example.com') && !options.body.includes('test-token'));
    return new Response('{}', { status: 200 });
  });
  assert.equal(await send(event), true);
  assert.ok(called);
});
test('missing token, mismatched pixel event and empty identifier never send', async () => {
  const unexpected = async () => { throw new Error('Must not call'); };
  assert.equal(await helper({}, unexpected)(event), false);
  assert.equal(await helper({ X_PIXEL_TOKEN: 'test' }, unexpected)({ ...event, eventId: 'tw-other-example' }), false);
  assert.equal(await helper({ X_PIXEL_TOKEN: 'test' }, unexpected)({ ...event, email: ' ' }), false);
});
test('X rejection and timeouts fail safely without logging token or identifiers', async () => {
  for (const fetch of [async () => new Response('sensitive upstream details', { status: 401 }), async () => { throw new Error('test-token builder@example.com'); }]) {
    const warnings = [];
    assert.equal(await helper({ X_PIXEL_TOKEN: 'test-token' }, fetch, warnings)(event), false);
    const text = JSON.stringify(warnings);
    assert.ok(warnings.length);
    assert.ok(!text.includes('test-token') && !text.includes('builder@example.com') && !text.includes('sensitive'));
  }
});
