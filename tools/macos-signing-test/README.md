# Nap Signing Test

A native, universal (Apple Silicon + Intel) macOS 12+ app for testing Developer ID signing, notarization, disk-image distribution, and Gatekeeper. This is deliberately not the Nap product. It does not access the network, collect personal data, or implement an auto-updater.

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
open 'tools/macos-signing-test/dist/Nap Signing Test.app'
```

This requires Apple's Command Line Tools. The local build is NOT a Developer ID/notarization test yet. A successful local launch does not prove Gatekeeper will accept a downloaded app.

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

The script validates the identity and saved credentials, builds both architectures, signs the app with hardened runtime and a secure timestamp, notarizes and staples the app, packages it with an Applications shortcut, signs/notarizes/staples the DMG, and checks Gatekeeper assessments. Each notarization must return Accepted. The final SHA-256 is calculated after stapling. No certificate or secret is embedded in source; the public signature/certificate chain is embedded by codesign.

Outputs (ignored by Git):

- `dist/Nap Signing Test.app`
- `dist/Nap-Signing-Test-0.1.0.dmg`
- `dist/Nap-Signing-Test-0.1.0.dmg.sha256`
- `dist/app-notarization.json` and `dist/dmg-notarization.json`

For a rejected submission, take the ID from its JSON response and run:

```sh
xcrun notarytool log SUBMISSION_ID --keychain-profile nap-signing-test
```

## 5. Publish only after verification

Upload the final, unchanged DMG to a dedicated test release on GitHub or the R2 downloads bucket once it exists. Keep signing material private. Use a clearly named asset; do not overwrite the actual Nap installer with a test app under the same product filename.

The website still uses the existing Nap download. After the DMG passes the checks and is hosted at a working HTTPS URL, update `app/lib/releases.ts` and the corresponding download assertion in `scripts/check-seo.mjs`. Clearly label the temporary download as a signing-test app wherever it is offered, rather than representing it as the functional Nap product; align the software metadata too. Alternatively, offer it on a dedicated test page to avoid replacing the public product CTA.

## 6. Test the real downloaded experience

Use Safari to download the DMG over HTTPS, ideally on a second Mac or a clean VM/user environment. Mount it, drag the app into Applications, and launch normally. A standard first-open confirmation may still appear. A damaged-app, unidentified-developer, or Apple-cannot-check warning is a failure to investigate.

Do not remove quarantine, disable Gatekeeper, or use Open Anyway to make the test appear to pass. Validate both the final DMG and copied app with codesign, stapler, and spctl. A build made locally without quarantine is not equivalent to a browser download.

This test validates this particular binary and packaging pipeline, not a guarantee that a future app with different frameworks, helpers, or entitlements will pass.
