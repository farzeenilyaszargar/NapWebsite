# Nap Signing Test

A native, universal (Apple Silicon + Intel) macOS 12+ app for testing Developer ID signing, notarization, R2 distribution, Gatekeeper, and Sparkle updates. This is deliberately not the Nap product. It contacts its update feed but does not collect personal data. Normal Nap download links are unchanged.

Public test configuration is in `release-config.json`: bucket `nap-download`, a test-only `r2.dev` origin, version/build, pinned Sparkle version and SHA-256, and the public Ed25519 key. The private update key stays in the Mac's login Keychain under account `cx.nap.signingtest`; never export it into this repo. The framework and generated artifacts are ignored by Git. Sparkle's license is included in the built app.

## 1. Obtain the correct certificate

You need an active Apple Developer Program membership and permission to create a Developer ID certificate (normally the Account Holder).

1. Open Keychain Access on the Mac that will sign the app.
2. Choose Certificate Assistant > Request a Certificate From a Certificate Authority. Enter your email and name, select Saved to disk, and save the CSR. Keep the generated private key in your Keychain.
3. In https://developer.apple.com/account/resources/certificates/list, create a **Developer ID Application** certificate using that CSR. This signs apps and DMGs distributed outside the App Store; Developer ID Installer is for PKG installers, not this workflow.
4. Download and open the `.cer` file to import it into the same Mac's Keychain. It must appear in My Certificates with an associated private key. A certificate file without its matching private key cannot sign the app.
5. Check `security find-identity -v -p codesigning`. It should list `Developer ID Application: Your Name (TEAMID)` as a valid identity.

Do not share Apple passwords, app-specific passwords, private keys, `.p12` files, or API keys in chat or commit them to Git. If the identity is missing, check that the correct keychain is unlocked and the certificate chain is valid; do not force certificate trust to Always Trust or revoke existing certificates as a troubleshooting shortcut.

Apple certificate instructions: https://developer.apple.com/help/account/certificates/create-developer-id-certificates

## 2. Build a local app

From the website repository:

```sh
bash tools/macos-signing-test/build.sh
open 'tools/macos-signing-test/dist/releases/0.2.0/Nap Signing Test.app'
```

This requires Apple's Command Line Tools and the configured Sparkle update key in Keychain. `setup-updater.sh` downloads the pinned upstream framework and verifies its SHA-256. On this Mac the key is already created. To transfer the pipeline to a new Mac, restore the existing private key securely; do not generate a different key silently. A local build is NOT a Developer ID/notarization test yet. A successful local launch does not prove Gatekeeper will accept a downloaded app.

## 3. Save notarization credentials locally

Create an app-specific password at https://account.apple.com, then run the following with your Apple ID and Team ID. The command prompts for the password and stores it in Keychain. Do not put the password into this command, a script, or chat.

```sh
xcrun notarytool store-credentials nap-signing-test \
  --apple-id 'YOUR_APPLE_ID_EMAIL' \
  --team-id 'YOUR_TEAM_ID'
```

Notarization instructions: https://developer.apple.com/documentation/technotes/tn3147-migrating-to-the-latest-notarization-tool

## 4. Produce and verify a distributable DMG

```sh
SIGNING_IDENTITY='Developer ID Application: Your Name (TEAMID)' \
  bash tools/macos-signing-test/release.sh
```

The script validates the identity and saved credentials, builds both architectures, signs Sparkle's nested helpers inside out and then the app with hardened runtime and a secure timestamp, notarizes and staples the app, packages it with an Applications shortcut, signs/notarizes/staples the DMG, and checks Gatekeeper assessments. Each notarization must return Accepted. The final SHA-256 is calculated after stapling. No private key or secret is embedded in source; public signing certificates and the update public key are included in the app.

Apple processing can take longer than the default ten-minute wait. Submission IDs are saved before waiting. If the script exits with code 75, Apple continues reviewing the existing upload. Resume without rebuilding or duplicating the submission:

```sh
SIGNING_IDENTITY='Developer ID Application: Your Name (TEAMID)' \
  bash tools/macos-signing-test/release.sh --resume
```

Set `NOTARY_TIMEOUT=30m` to wait longer. Do not modify the signed artifacts between submission and resume. Rejected submissions require inspecting the Apple log and fixing the issue, not retrying the same upload blindly.

Outputs (ignored by Git):

- `dist/releases/0.2.0/Nap Signing Test.app`
- `dist/releases/0.2.0/Nap-Signing-Test-0.2.0.dmg`
- `dist/releases/0.2.0/Nap-Signing-Test-0.2.0.dmg.sha256`
- `dist/releases/0.2.0/app-notarization.json` and `dmg-notarization.json`

Each new version gets its own folder. The earlier pre-updater 0.1.0 submission and artifacts remain untouched in `dist/`.

For a rejected submission, take the ID from its JSON response and run:

```sh
xcrun notarytool log SUBMISSION_ID --keychain-profile nap-signing-test
```

## 5. Publish to R2

Authenticate Wrangler through the browser, storing its credentials in the OS Keychain. Use a bucket-scoped R2 token for a production CI pipeline, stored only in the CI secret store, never in the website. This Mac is already authenticated.

```sh
npx wrangler login --use-keyring
node tools/macos-signing-test/publish-r2.mjs init
```

`init` only creates an empty, signed `signing-test/appcast.xml` if one does not exist. It never overwrites an existing feed.

For a deliberately unfinished upload test, create and upload a signed but UNNOTARIZED candidate:

```sh
SIGNING_IDENTITY='Developer ID Application: Your Name (TEAMID)' \
  bash tools/macos-signing-test/make-candidate.sh
node tools/macos-signing-test/publish-r2.mjs candidate
```

Candidates use unique `signing-test/candidates/` URLs and an explicit UNNOTARIZED filename. `latest-candidate.json` records `verified: false`. They are not advertised on the website or included in automatic updates. Do not bypass Gatekeeper to run a candidate; a successful upload/download alone does not validate notarization.

Only after `release.sh` completes successfully, publish the actual update:

```sh
node tools/macos-signing-test/publish-r2.mjs release
```

This rechecks Apple acceptance, signatures, stapled tickets, Gatekeeper, app version/feed/public-key configuration, and the final checksum. Sparkle generates and signs the appcast and archive signatures. Versioned DMGs are uploaded first and their public bytes verified by SHA-256. The feed is published afterward, followed by `signing-test/latest.json`. Mutable metadata uses no-cache; immutable versioned files cannot be silently replaced with different bytes. A newer published build cannot be rolled back by this script.

The separate `/signing-test` page is noindex and excluded from the sitemap/public navigation. It reads only verified `latest.json`, with a short server-side cache. It rejects candidate manifests, malformed hashes, and download URLs outside the configured versioned R2 path. It stays pending if the verified manifest is absent or unreachable, then enables the download after publishing without a website code change. Do not change the public product CTA for this test.

The app verifies signed feeds and Ed25519 archive signatures before extraction. Automatic checks use Sparkle's permission/preferences behavior; updates are not silently forced. It has a Check for Updates menu item and button. No web browser CORS configuration is required for a normal download or the native updater.

The current `r2.dev` endpoint is suitable for testing, not production: it is rate-limited. Connect `downloads.nap.cx` through R2 custom-domain settings before shipping the real app. Plan feed migration before changing an already-distributed app's feed URL; simply editing website configuration does not update an installed app's embedded URL.

References: https://sparkle-project.org/documentation/ and https://developers.cloudflare.com/r2/buckets/public-buckets/

## 6. Test the real downloaded experience

Use Safari to download the DMG over HTTPS, ideally on a second Mac or a clean VM/user environment. Mount it, drag the app into Applications, and launch normally. A standard first-open confirmation may still appear. A damaged-app, unidentified-developer, or Apple-cannot-check warning is a failure to investigate.

Do not remove quarantine, disable Gatekeeper, or use Open Anyway to make the test appear to pass. Validate both the final DMG and copied app with codesign, stapler, and spctl. A build made locally without quarantine is not equivalent to a browser download.

This test validates this particular binary and packaging pipeline, not a guarantee that a future app with different frameworks, helpers, or entitlements will pass.

## 7. Test a real version upgrade

An empty signed feed proves feed connectivity and verification, not that an app replacement has been tested. Install verified build 2 (0.2.0), then build and notarize a higher version with the SAME bundle ID and public update key:

```sh
RELEASE_VERSION=0.2.1 RELEASE_BUILD=3 \
  SIGNING_IDENTITY='Developer ID Application: Your Name (TEAMID)' \
  bash tools/macos-signing-test/release.sh
RELEASE_VERSION=0.2.1 RELEASE_BUILD=3 \
  node tools/macos-signing-test/publish-r2.mjs release
```

Run Check for Updates from the installed 0.2.0 app. Verify that the signed 0.2.1 update downloads, installs, relaunches, and displays its new version. Also test a normal browser download on another Mac and confirm the signature and notarization checks. This final upgrade test cannot pass until both builds have completed notarization.
