#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
IDENTITY="${SIGNING_IDENTITY:-}"
PROFILE="${NOTARY_PROFILE:-nap-signing-test}"
TIMEOUT="${NOTARY_TIMEOUT:-10m}"
MODE="${1:-}"
if [[ -n "$MODE" && "$MODE" != '--resume' ]]; then
  printf 'Usage: bash %s [--resume]\n' "$0" >&2
  exit 1
fi
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
APP="$ROOT/dist/Nap Signing Test.app"
DMG="$ROOT/dist/Nap-Signing-Test-0.1.0.dmg"
ARCHIVE="$ROOT/dist/Nap-Signing-Test.zip"
if [[ "$MODE" == '--resume' ]]; then
  if [[ ! -d "$APP" || ! -s "$ROOT/dist/app-notarization.json" ]]; then
    printf '%s\n' 'No saved app submission to resume. Run without --resume for a new release.' >&2
    exit 1
  fi
else
  bash "$ROOT/build.sh"
  rm -f "$ROOT/dist/app-notarization.json" "$ROOT/dist/dmg-notarization.json" "$DMG.sha256"
  codesign --force --sign "$IDENTITY" --timestamp --options runtime "$APP"
  ditto -c -k --keepParent "$APP" "$ARCHIVE"
fi
WORK="$(mktemp -d "${TMPDIR:-/tmp}/nap-signing-release.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT

notarize() {
  local FILE="$1" LOG="$2" ID STATUS
  if [[ ! -s "$LOG" ]]; then
    xcrun notarytool submit "$FILE" --keychain-profile "$PROFILE" --output-format json > "$WORK/submission.json"
    plutil -extract id raw -o - "$WORK/submission.json" >/dev/null
    cp "$WORK/submission.json" "$LOG"
  fi
  ID="$(plutil -extract id raw -o - "$LOG")"
  STATUS="$(plutil -extract status raw -o - "$LOG" 2>/dev/null || true)"
  if [[ "$STATUS" == 'Invalid' || "$STATUS" == 'Rejected' ]]; then
    printf 'Apple rejected submission %s. Fetch its log before submitting a new build.\n' "$ID" >&2
    exit 1
  fi
  if [[ "$STATUS" != 'Accepted' ]]; then
    printf 'Waiting for Apple submission %s (up to %s).\n' "$ID" "$TIMEOUT"
    if ! xcrun notarytool wait "$ID" --keychain-profile "$PROFILE" --timeout "$TIMEOUT" --output-format json > "$WORK/result.json"; then
      if xcrun notarytool info "$ID" --keychain-profile "$PROFILE" --output-format json > "$WORK/info.json"; then
        cp "$WORK/info.json" "$LOG"
      fi
      printf 'Apple has not completed a successful review. Saved submission: %s\nResume with the same command plus --resume; do not rebuild/resubmit.\n' "$ID" >&2
      exit 75
    fi
    cp "$WORK/result.json" "$LOG"
  fi
  if [[ "$(plutil -extract status raw -o - "$LOG")" != 'Accepted' ]]; then
    printf 'Notarization was not accepted. See %s and fetch the submission log with notarytool log.\n' "$LOG" >&2
    exit 1
  fi
}

codesign --verify --deep --strict --verbose=2 "$APP"
notarize "$ARCHIVE" "$ROOT/dist/app-notarization.json"
xcrun stapler staple "$APP"
xcrun stapler validate "$APP"
spctl --assess --type execute --verbose=2 "$APP"

if [[ ! -s "$ROOT/dist/dmg-notarization.json" ]]; then
  mkdir -p "$WORK/disk"
  ditto "$APP" "$WORK/disk/Nap Signing Test.app"
  ln -s /Applications "$WORK/disk/Applications"
  hdiutil create -volname 'Nap Signing Test' -srcfolder "$WORK/disk" -ov -format UDZO "$DMG"
  codesign --force --sign "$IDENTITY" --timestamp "$DMG"
fi
codesign --verify --verbose=2 "$DMG"
notarize "$DMG" "$ROOT/dist/dmg-notarization.json"
xcrun stapler staple "$DMG"
xcrun stapler validate "$DMG"
spctl --assess --type open --context context:primary-signature --verbose=2 "$DMG"
shasum -a 256 "$DMG" > "$DMG.sha256"
printf '\nVerified release: %s\nDo not modify this DMG after signing/notarization.\n' "$DMG"
