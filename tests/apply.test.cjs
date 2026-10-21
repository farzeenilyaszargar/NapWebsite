/* eslint-disable @typescript-eslint/no-require-imports -- Node tests transpile the route without a Next server. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function route({ env = { SUPABASE_URL: 'https://storage.example', SUPABASE_SERVICE_ROLE_KEY: 'server-secret' }, fetch = async () => new Response(null, { status: 201 }) } = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../app/api/apply/route.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiled = { exports: {} };
  new Function('exports', 'process', 'fetch', code)(compiled.exports, { env }, fetch);
  return compiled.exports.POST;
}
function request(body, headers = {}) {
  return new Request('https://www.nap.cx/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.nap.cx', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
const application = { fullName: ' Test   Builder ', email: ' Builder@Example.com ', roleWanted: 'Engineering', aboutSelf: 'I build native software and care about making complex workflows feel simple.', website: '' };

test('applications reject invalid fields, unsafe links, spam, and cross-origin requests before storage', async () => {
  let calls = 0;
  const post = route({ fetch: async () => { calls++; throw new Error('Unexpected call'); } });
  for (const payload of [null, {}, { ...application, fullName: 'A' }, { ...application, email: 'invalid' }, { ...application, roleWanted: '' }, { ...application, aboutSelf: 'Too short' }, { ...application, graduationYear: 'abc' }, { ...application, degree: {} }, { ...application, portfolioUrl: 'javascript:alert(1)' }, { ...application, githubUrl: 'https://user:password@example.com' }, { ...application, website: 'spam' }]) assert.equal((await post(request(payload))).status, 400);
  assert.equal((await post(request('{'))).status, 400);
  assert.equal((await post(request(application, { Origin: 'https://other.example' }))).status, 403);
  assert.equal((await post(request(application, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal((await post(request(' '.repeat(16385)))).status, 413);
  assert.equal(calls, 0);
});

test('applications save normalized details with optional education and work links', async () => {
  const post = route({ fetch: async (url, options) => {
    assert.equal(url, 'https://storage.example/rest/v1/internship_applications');
    assert.equal(options.headers.Authorization, 'Bearer server-secret');
    assert.equal(options.headers.Prefer, 'return=minimal');
    assert.deepEqual(JSON.parse(options.body), { full_name: 'Test Builder', email: 'builder@example.com', role_wanted: 'Engineering', about_self: application.aboutSelf, degree: null, graduation_year: '', portfolio_url: 'https://example.com/work', github_url: null, linkedin_url: null, source: 'team_application', user_agent: null });
    assert.equal(options.cache, 'no-store');
    return new Response(null, { status: 201 });
  } });
  const response = await post(request({ ...application, portfolioUrl: 'https://example.com/work' }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).message, 'Application submitted.');
});

test('duplicate applications are not overwritten or reported as a new success', async () => {
  const response = await route({ fetch: async () => new Response(null, { status: 409 }) })(request(application));
  assert.equal(response.status, 409);
  assert.match((await response.json()).error, /original application has been kept/);
});

test('unavailable storage never claims application success or exposes server details', async () => {
  for (const options of [{ env: {} }, { fetch: async () => new Response('private database error', { status: 500 }) }, { fetch: async () => { throw new Error('private server-secret'); } }]) {
    const response = await route(options)(request(application));
    assert.equal(response.status, 503);
    const text = await response.text();
    assert.ok(!text.includes('private') && !text.includes('server-secret'));
    assert.ok(JSON.parse(text).error);
  }
});
