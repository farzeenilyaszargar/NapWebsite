import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, mkdtempSync, rmSync } from "node:fs";
import { resolve, basename } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const config = JSON.parse(readFileSync(resolve(root, "release-config.json"), "utf8"));
const version = process.env.RELEASE_VERSION || config.version;
const build = process.env.RELEASE_BUILD || config.build;
if (!/^\d+\.\d+\.\d+$/.test(version) || !/^\d+$/.test(build)) throw new Error("Invalid release version/build");
const out = resolve(root, "dist/releases", version);
const sdk = resolve(root, "vendor", `Sparkle-${config.sparkleVersion}`);
const base = `${config.publicBaseUrl}/${config.prefix}`;
const action = process.argv[2];
const work = mkdtempSync(resolve(tmpdir(), "nap-r2-publish-"));
const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
function exec(program, args, capture = false) {
  const output = execFileSync(program, args, { cwd: tmpdir(),
    stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit", timeout: 180_000 });
  return capture ? output.toString().trim() : "";
}
async function response(url, method = "GET") {
  return fetch(url, { method, cache: "no-store", signal: AbortSignal.timeout(30_000) });
}
async function put(key, file, type, immutable = false) {
  exec("npx", ["--yes", "wrangler@4.157.0", "r2", "object", "put", `${config.bucket}/${key}`,
    "--file", file, "--remote", "--content-type", type,
    "--cache-control", immutable ? "public, max-age=31536000, immutable" : "no-cache, max-age=0, must-revalidate"]);
}
async function verify(url, file) {
  const r = await response(`${url}?verify=${Date.now()}`);
  if (!r.ok) throw new Error(`Uploaded object is not reachable: ${r.status} ${url}`);
  const hash = createHash("sha256").update(Buffer.from(await r.arrayBuffer())).digest("hex");
  if (hash !== sha256(file)) throw new Error(`Public download checksum mismatch: ${url}`);
}
async function immutable(key, file, type) {
  const url = `${config.publicBaseUrl}/${key}`;
  const r = await response(url, "HEAD");
  if (r.status === 404) await put(key, file, type, true);
  else if (!r.ok) throw new Error(`Cannot check existing release: ${r.status}`);
  await verify(url, file);
  return url;
}
function jsonFile(name, value) {
  const file = resolve(work, name);
  writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
  return file;
}
function verifyKey() {
  const key = exec(resolve(sdk, "bin/generate_keys"), ["--account", config.sparkleKeyAccount, "-p"], true);
  if (key !== config.sparklePublicKey) throw new Error("Sparkle Keychain key does not match configured public key");
}

try {
  if (!["init", "candidate", "release"].includes(action)) throw new Error("Usage: node publish-r2.mjs init|candidate|release");
  exec("npx", ["--yes", "wrangler@4.157.0", "r2", "bucket", "info", config.bucket]);
  if (action === "init") {
    const r = await response(`${base}/appcast.xml`, "HEAD");
    if (r.ok) { console.log("An update feed already exists; leaving it unchanged."); }
    else {
      if (r.status !== 404) throw new Error(`Cannot check existing feed: ${r.status}`);
      verifyKey();
      const feed = resolve(work, "appcast.xml");
      copyFileSync(resolve(root, "empty-appcast.xml"), feed);
      exec(resolve(sdk, "bin/sign_update"), ["--account", config.sparkleKeyAccount, feed]);
      exec(resolve(sdk, "bin/sign_update"), ["--account", config.sparkleKeyAccount, "--verify", feed]);
      await put(`${config.prefix}/appcast.xml`, feed, "application/xml; charset=utf-8");
      await verify(`${base}/appcast.xml`, feed);
      console.log(`Signed initial update feed: ${base}/appcast.xml`);
    }
  } else if (action === "candidate") {
    const file = resolve(out, `Nap-Signing-Test-${version}-UNNOTARIZED.dmg`);
    exec("codesign", ["--verify", "--verbose=2", file]);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const key = `${config.prefix}/candidates/${version}/${stamp}/${basename(file)}`;
    const url = await immutable(key, file, "application/x-apple-diskimage");
    const record = { version, build, downloadUrl: url, sha256: sha256(file), verified: false,
      notice: "Signed test candidate. NOT notarized. Not eligible for automatic updates. Do not bypass Gatekeeper." };
    const metadata = jsonFile("candidate.json", record);
    await put(`${config.prefix}/latest-candidate.json`, metadata, "application/json");
    mkdirSync(out, { recursive: true });
    copyFileSync(metadata, resolve(out, "r2-candidate.json"));
    console.log(JSON.stringify(record, null, 2));
  } else {
    const file = resolve(out, `Nap-Signing-Test-${version}.dmg`);
    const app = resolve(out, "Nap Signing Test.app");
    const info = JSON.parse(exec("plutil", ["-convert", "json", "-o", "-", resolve(app, "Contents/Info.plist")], true));
    if (info.CFBundleVersion !== build || info.CFBundleShortVersionString !== version ||
      info.SUPublicEDKey !== config.sparklePublicKey || info.SUFeedURL !== `${base}/appcast.xml`) {
      throw new Error("Built app version, feed, or signing public key does not match release configuration");
    }
    for (const stage of ["app", "dmg"]) {
      const receipt = JSON.parse(readFileSync(resolve(out, `${stage}-notarization.json`), "utf8"));
      if (receipt.status !== "Accepted") throw new Error(`${stage}: Apple has not accepted this release`);
    }
    for (const target of [app, file]) {
      exec("codesign", ["--verify", "--deep", "--strict", target]);
      exec("xcrun", ["stapler", "validate", target]);
    }
    exec("spctl", ["--assess", "--type", "execute", app]);
    exec("spctl", ["--assess", "--type", "open", "--context", "context:primary-signature", file]);
    const hash = sha256(file);
    if (!readFileSync(`${file}.sha256`, "utf8").startsWith(hash + " ")) throw new Error("Final DMG changed after verification");
    const latest = await response(`${base}/latest.json`);
    if (latest.ok) {
      const previous = await latest.json();
      if (Number(previous.build) > Number(build)) throw new Error("Refusing to roll back the published update feed");
    } else if (latest.status !== 404) throw new Error(`Cannot check published release: ${latest.status}`);
    verifyKey();
    const updates = resolve(root, "dist/updates");
    mkdirSync(updates, { recursive: true });
    copyFileSync(file, resolve(updates, basename(file)));
    exec(resolve(sdk, "bin/generate_appcast"), ["--account", config.sparkleKeyAccount,
      "--download-url-prefix", `${base}/releases/`, "--link", "https://www.nap.cx/signing-test",
      "--maximum-deltas", "0", updates]);
    const feed = resolve(updates, "appcast.xml");
    exec(resolve(sdk, "bin/sign_update"), ["--account", config.sparkleKeyAccount, "--verify", feed]);
    for (const name of readdirSync(updates).filter(name => name.endsWith(".dmg"))) {
      await immutable(`${config.prefix}/releases/${name}`, resolve(updates, name), "application/x-apple-diskimage");
    }
    // Publish the feed only after its versioned downloads have passed a public checksum check.
    await put(`${config.prefix}/appcast.xml`, feed, "application/xml; charset=utf-8");
    await verify(`${base}/appcast.xml`, feed);
    const manifest = { version, build, downloadUrl: `${base}/releases/${basename(file)}`, sha256: hash,
      verified: true, feedUrl: `${base}/appcast.xml` };
    const metadata = jsonFile("latest.json", manifest);
    await put(`${config.prefix}/latest.json`, metadata, "application/json");
    await verify(`${base}/latest.json`, metadata);
    console.log("Verified R2 release published:", manifest.downloadUrl);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
