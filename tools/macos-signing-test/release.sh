#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
IDENTITY="${SIGNING_IDENTITY:-}"
PROFILE="${NOTARY_PROFILE:-nap-signing-test}"
if [[ -z "$IDENTITY" ]]; then
  printf '%s\n' 'Set SIGNING_IDENTITY to your installed Developer ID Application certificate name.' >&2
  exit 1
fi
if ! security find-identity -v -p codesigning | grep -F -- "$IDENTITY" | grep -q 'Developer ID Application:'; then
  printf '%s\n' 'No matching valid Developer ID Application signing identity. Install the certificate AND its private key first.' >&2
  exit 1
fi

# Validate authentication before building or changing generated artifacts.
xcrun notarytool history --keychain-profile "$PROFILE" --output-format json >/dev/null
bash "$ROOT/build.sh"
APP="$ROOT/dist/Nap Signing Test.app"
DMG="$ROOT/dist/Nap-Signing-Test-0.1.0.dmg"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/nap-signing-release.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT

notarize() {
  local FILE="$1" LOG="$2"
  xcrun notarytool submit "$FILE" --keychain-profile "$PROFILE" --wait --output-format json > "$LOG"
  if [[ "$(plutil -extract status raw -o - "$LOG")" != 'Accepted' ]]; then
    printf 'Notarization was not accepted. See %s and fetch the submission log with notarytool log.\n' "$LOG" >&2
    exit 1
  fi
}

codesign --force --sign "$IDENTITY" --timestamp --options runtime "$APP"
codesign --verify --deep --strict --verbose=2 "$APP"
ditto -c -k --keepParent "$APP" "$WORK/Nap-Signing-Test.zip"
notarize "$WORK/Nap-Signing-Test.zip" "$ROOT/dist/app-notarization.json"
xcrun stapler staple "$APP"
xcrun stapler validate "$APP"
spctl --assess --type execute --verbose=2 "$APP"

mkdir -p "$WORK/disk"
ditto "$APP" "$WORK/disk/Nap Signing Test.app"
ln -s /Applications "$WORK/disk/Applications"
hdiutil create -volname 'Nap Signing Test' -srcfolder "$WORK/disk" -ov -format UDZO "$DMG"
codesign --force --sign "$IDENTITY" --timestamp "$DMG"
codesign --verify --verbose=2 "$DMG"
notarize "$DMG" "$ROOT/dist/dmg-notarization.json"
xcrun stapler staple "$DMG"
xcrun stapler validate "$DMG"
spctl --assess --type open --context context:primary-signature --verbose=2 "$DMG"
shasum -a 256 "$DMG" > "$DMG.sha256"
printf '\nVerified release: %s\nDo not modify this DMG after signing/notarization.\n' "$DMG"
