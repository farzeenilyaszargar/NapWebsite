/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node tests exercise the server-only manifest loader. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const config = require('../tools/macos-signing-test/release-config.json');

function load(fetcher) {
  const source = fs.readFileSync(path.join(__dirname, '../app/lib/signing-test.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const exports = {};
  new Function('exports', 'require', 'fetch', code)(exports, name => {
    assert.equal(name, '../../tools/macos-signing-test/release-config.json');
    return config;
  }, fetcher);
  return exports;
}
const manifest = {
  version: '0.2.0', verified: true, sha256: 'a'.repeat(64),
  downloadUrl: `${config.publicBaseUrl}/signing-test/releases/Nap-Signing-Test-0.2.0.dmg`,
};

test('only verified manifests for the exact configured release path enable downloads', () => {
  const { parseSigningTestRelease: parse } = load();
  assert.equal(parse(manifest).downloadUrl, manifest.downloadUrl);
  for (const value of [null, {}, { ...manifest, verified: false }, { ...manifest, verified: 'true' },
    { ...manifest, sha256: 'short' }, { ...manifest, version: '../bad' },
    { ...manifest, downloadUrl: 'https://example.com/installer.dmg' },
    { ...manifest, downloadUrl: 'javascript:alert(1)' },
    { ...manifest, downloadUrl: manifest.downloadUrl.replace('https://', 'https://user:password@') },
    { ...manifest, downloadUrl: manifest.downloadUrl + '?redirect=elsewhere' },
    { ...manifest, downloadUrl: manifest.downloadUrl.replace('/releases/', '/candidates/') }]) {
    assert.equal(parse(value), null);
  }
});

test('missing, invalid, or unavailable manifest keeps the test download disabled', async () => {
  for (const fetcher of [async () => new Response(null, { status: 404 }),
    async () => Response.json({ ...manifest, verified: false }),
    async () => new Response('not JSON'), async () => { throw new Error('Network unavailable'); }]) {
    const loader = load(fetcher);
    assert.equal((await loader.loadSigningTestRelease()).downloadUrl, null);
  }
});

test('verified release loads with a bounded timeout and short revalidation cache', async () => {
  const loader = load(async (url, options) => {
    assert.equal(url, `${config.publicBaseUrl}/signing-test/latest.json`);
    assert.equal(options.next.revalidate, 60);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json(manifest);
  });
  assert.equal((await loader.loadSigningTestRelease()).sha256, manifest.sha256);
});
