/* eslint-disable @typescript-eslint/no-require-imports -- Tests load the shared TypeScript release constants. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

test("product downloads use the R2 release, not the signing-test candidate", () => {
  const source = fs.readFileSync(path.join(__dirname, "../app/lib/releases.ts"), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  new Function("exports", code)(exports);
  const url = new URL(exports.macDownloadUrl);
  assert.equal(url.origin, "https://pub-ab845f53d3fe41cca7cc63eb753149cd.r2.dev");
  assert.equal(url.pathname, "/releases/v0.0.4-notnap.3/NotNap-macos.dmg");
  assert(!url.pathname.includes("signing-test"));
});
