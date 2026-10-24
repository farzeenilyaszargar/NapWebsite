/* eslint-disable @typescript-eslint/no-require-imports -- Node tests transpile the route without a Next server. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function route({ env = { SUPABASE_URL: 'https://storage.example', SUPABASE_SERVICE_ROLE_KEY: 'server-secret' }, fetch = async () => Response.json([{ id: 'saved-signup' }], { status: 201 }), after = () => {}, sendXConversion = async () => true } = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../app/api/waitlist/route.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiled = { exports: {} };
  new Function('exports', 'process', 'fetch', 'require', code)(compiled.exports, { env }, fetch, (id) => id === 'next/server' ? { after } : { sendXConversion });
  return compiled.exports.POST;
}
function request(body, headers = {}) {
  return new Request('https://www.nap.cx/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.nap.cx', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
const signup = { name: ' Test   Builder ', email: ' Builder@Example.com ', website: '' };

test('waitlist validates inputs, origin, size, and honeypot before contacting storage', async () => {
  let calls = 0;
  const post = route({ fetch: async () => { calls++; throw new Error('Unexpected call'); } });
  for (const payload of [null, {}, { name: 'A', email: 'x@y.com' }, { name: 'Builder', email: 'invalid' }, { ...signup, website: 'spam' }]) assert.equal((await post(request(payload))).status, 400);
  assert.equal((await post(request('{'))).status, 400);
  assert.equal((await post(request(signup, { Origin: 'https://other.example' }))).status, 403);
  assert.equal((await post(request(signup, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal((await post(request(' '.repeat(4097)))).status, 413);
  assert.equal(calls, 0);
});

test('waitlist saves normalized signup and ignores duplicates without overwriting data', async () => {
  let calls = 0;
  const post = route({ fetch: async (url, options) => {
    calls++;
    assert.equal(url, 'https://storage.example/rest/v1/wishlist_saves?on_conflict=email&select=id');
    assert.equal(options.headers.Authorization, 'Bearer server-secret');
    assert.equal(options.headers.Prefer, 'resolution=ignore-duplicates,return=representation');
    assert.deepEqual(JSON.parse(options.body), { name: 'Test Builder', email: 'builder@example.com', source: 'waitlist', user_agent: null });
    assert.equal(options.cache, 'no-store');
    return Response.json(calls === 1 ? [{ id: 'saved-signup' }] : [], { status: 201 });
  } });
  for (let i = 0; i < 2; i++) {
    const response = await post(request(signup));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).message, 'You’re on the list.');
  }
});

test('missing configuration and database failures never claim signup success or expose secrets', async () => {
  for (const options of [{ env: {} }, { fetch: async () => new Response('private database error', { status: 500 }) }, { fetch: async () => { throw new Error('private server-secret'); } }]) {
    const response = await route(options)(request(signup));
    assert.equal(response.status, 503);
    const text = await response.text();
    assert.ok(!text.includes('private') && !text.includes('server-secret'));
    assert.ok(JSON.parse(text).error);
  }
});


test('only confirmed new signups schedule conversions, after the response', async () => {
  const tasks = [], conversions = [];
  let calls = 0;
  const post = route({
    env: { SUPABASE_URL: 'https://storage.example', SUPABASE_SERVICE_ROLE_KEY: 'secret', X_PIXEL_TOKEN: 'x-token', X_WAITLIST_EVENT_ID: 'tw-rhsuk-test' },
    fetch: async () => Response.json(++calls === 1 ? [{ id: 'saved-id' }] : []),
    after: (task) => tasks.push(task),
    sendXConversion: async (event) => { conversions.push(event); return false; },
  });
  assert.equal((await post(request(signup))).status, 200);
  assert.equal(tasks.length, 1);
  assert.equal(conversions.length, 0);
  await tasks[0]();
  assert.equal(conversions[0].eventId, 'tw-rhsuk-test');
  assert.equal(conversions[0].conversionId, 'waitlist-saved-id');
  assert.equal(conversions[0].email, 'builder@example.com');
  assert.ok(Number.isFinite(Date.parse(conversions[0].conversionTime)));
  assert.equal((await post(request(signup))).status, 200);
  assert.equal(tasks.length, 1, 'duplicate email must not convert again');
});

test('unconfigured conversions and failed storage do not schedule X calls', async () => {
  for (const options of [
    {},
    { env: { SUPABASE_URL: 'https://storage.example', SUPABASE_SERVICE_ROLE_KEY: 'secret', X_PIXEL_TOKEN: 'x-token' } },
    { env: { SUPABASE_URL: 'https://storage.example', SUPABASE_SERVICE_ROLE_KEY: 'secret', X_PIXEL_TOKEN: 'x-token', X_WAITLIST_EVENT_ID: 'tw-rhsuk-test' }, fetch: async () => new Response(null, { status: 500 }) },
  ]) {
    let scheduled = false;
    await route({ ...options, after: () => { scheduled = true; } })(request(signup));
    assert.equal(scheduled, false);
  }
});
