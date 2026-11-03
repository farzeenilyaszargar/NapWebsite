#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/config.sh"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/nap-sparkle-setup.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
if [[ ! -x "$SDK/bin/generate_keys" ]]; then
  VERSION_SDK="$(config sparkleVersion)"
  ARCHIVE_SDK="${SPARKLE_ARCHIVE:-$WORK/Sparkle.tar.xz}"
  if [[ -z "${SPARKLE_ARCHIVE:-}" ]]; then
    curl --fail --location --connect-timeout 15 --max-time 180 --retry 2 \
      "https://github.com/sparkle-project/Sparkle/releases/download/$VERSION_SDK/Sparkle-$VERSION_SDK.tar.xz" \
      --output "$ARCHIVE_SDK"
  fi
  ACTUAL="$(shasum -a 256 "$ARCHIVE_SDK" | cut -d ' ' -f 1)"
  [[ "$ACTUAL" == "$(config sparkleSha256)" ]] || { printf 'Sparkle checksum mismatch.\n' >&2; exit 1; }
  mkdir -p "$SDK"
  tar -xf "$ARCHIVE_SDK" -C "$SDK" ./Sparkle.framework ./bin ./LICENSE
fi
PUBLIC_KEY="$("$SDK/bin/generate_keys" --account "$KEY_ACCOUNT" -p)"
if [[ "$PUBLIC_KEY" != "$(config sparklePublicKey)" ]]; then
  printf '%s\n' 'The configured Sparkle public key does not match this Mac Keychain. Restore the correct key; do not silently generate a replacement.' >&2
  exit 1
fi
printf 'Sparkle %s and the update-signing Keychain key are ready.\n' "$(config sparkleVersion)"
