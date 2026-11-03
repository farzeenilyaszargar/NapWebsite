/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS fixtures exercise the macOS shell workflow. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function fixture(t, status) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'nap-release-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dist = path.join(root, 'dist/releases/0.2.0');
  const bin = path.join(root, 'bin');
  fs.mkdirSync(path.join(dist, 'Nap Signing Test.app'), { recursive: true });
  fs.mkdirSync(bin);
  fs.copyFileSync(path.join(__dirname, '../tools/macos-signing-test/release.sh'), path.join(root, 'release.sh'));
  for (const name of ['config.sh', 'release-config.json']) {
    fs.copyFileSync(path.join(__dirname, '../tools/macos-signing-test', name), path.join(root, name));
  }
  for (const stage of ['app', 'dmg']) {
    fs.writeFileSync(path.join(dist, `${stage}-notarization.json`), JSON.stringify({ id: `${stage}-saved-id`, status }));
  }
  fs.writeFileSync(path.join(dist, 'Nap-Signing-Test-0.2.0.dmg'), 'test artifact, not a real installer');
  const log = path.join(root, 'calls.jsonl');
  const helper = path.join(bin, 'mock.cjs');
  fs.writeFileSync(helper, `#!/usr/bin/env node
const fs = require('node:fs');
const name = require('node:path').basename(process.argv[1]);
const args = process.argv.slice(2);
fs.appendFileSync(process.env.TEST_CALLS, JSON.stringify({name, args}) + '\\n');
if (name === 'security') console.log('1) ABC "Developer ID Application: Signing Test (TESTTEAM)"');
if (name === 'xcrun' && args[1] === 'history') console.log('{}');
if (name === 'xcrun' && args[1] === 'submit') process.exit(99);
if (name === 'xcrun' && args[1] === 'wait') process.exit(124);
if (name === 'xcrun' && args[1] === 'info') console.log(JSON.stringify({id: args[2], status: 'In Progress'}));
`, { mode: 0o755 });
  for (const command of ['security', 'xcrun', 'codesign', 'spctl']) fs.symlinkSync(helper, path.join(bin, command));
  const result = spawnSync('bash', [path.join(root, 'release.sh'), '--resume'], {
    encoding: 'utf8',
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, TEST_CALLS: log,
      SIGNING_IDENTITY: 'Developer ID Application: Signing Test (TESTTEAM)', NOTARY_TIMEOUT: '1s' },
  });
  const calls = fs.readFileSync(log, 'utf8').trim().split('\n').map(line => JSON.parse(line));
  return { result, calls, dist };
}

test('resume preserves a pending submission without rebuilding or uploading again', { skip: process.platform !== 'darwin' }, t => {
  const { result, calls, dist } = fixture(t, 'In Progress');
  assert.equal(result.status, 75, result.stderr);
  assert.equal(JSON.parse(fs.readFileSync(path.join(dist, 'app-notarization.json'))).id, 'app-saved-id');
  assert.ok(calls.some(c => c.name === 'xcrun' && c.args[1] === 'wait' && c.args.includes('app-saved-id')));
  assert.ok(!calls.some(c => c.args.includes('submit') || c.args.includes('--force')));
  assert.ok(!fs.existsSync(path.join(dist, 'Nap-Signing-Test-0.2.0.dmg.sha256')));
});

test('resume of accepted submissions verifies and staples both artifacts before checksum', { skip: process.platform !== 'darwin' }, t => {
  const { result, calls, dist } = fixture(t, 'Accepted');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(calls.filter(c => c.name === 'codesign' && c.args.includes('--verify')).length, 2);
  assert.equal(calls.filter(c => c.name === 'xcrun' && c.args[0] === 'stapler' && c.args[1] === 'validate').length, 2);
  assert.equal(calls.filter(c => c.name === 'spctl').length, 2);
  assert.ok(!calls.some(c => c.args.includes('submit') || c.args.includes('--force')));
  assert.match(fs.readFileSync(path.join(dist, 'Nap-Signing-Test-0.2.0.dmg.sha256'), 'utf8'), /^[a-f0-9]{64} /);
});

test('resume refuses rejected submissions instead of retrying the upload', { skip: process.platform !== 'darwin' }, t => {
  const { result, calls } = fixture(t, 'Invalid');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Apple rejected submission/);
  assert.ok(!calls.some(c => c.args.includes('submit') || c.args.includes('wait')));
});
