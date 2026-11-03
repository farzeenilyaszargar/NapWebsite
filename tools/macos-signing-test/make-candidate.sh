#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/config.sh"
: "${SIGNING_IDENTITY:?Set your Developer ID Application signing identity.}"
codesign --verify --deep --strict "$APP"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/nap-candidate.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
ditto "$APP" "$WORK/Nap Signing Test.app"
ln -s /Applications "$WORK/Applications"
CANDIDATE="$OUT/Nap-Signing-Test-$VERSION-UNNOTARIZED.dmg"
hdiutil create -volname 'Nap Test - UNNOTARIZED' -srcfolder "$WORK" -ov -format UDZO "$CANDIDATE"
codesign --force --sign "$SIGNING_IDENTITY" --timestamp "$CANDIDATE"
codesign --verify --verbose=2 "$CANDIDATE"
printf '\nCandidate ONLY, not notarized: %s\nDo not publish this in the update feed or disable Gatekeeper to run it.\n' "$CANDIDATE"
