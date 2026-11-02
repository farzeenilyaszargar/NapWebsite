#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/dist"
APP="$OUT/Nap Signing Test.app"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/nap-signing-build.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT

mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources" "$WORK/AppIcon.iconset"
for ARCH in arm64 x86_64; do
  xcrun clang -arch "$ARCH" -mmacosx-version-min=12.0 -fobjc-arc -O2 \
    -framework Cocoa "$ROOT/main.m" -o "$WORK/NapSigningTest-$ARCH"
done
xcrun lipo -create "$WORK/NapSigningTest-arm64" "$WORK/NapSigningTest-x86_64" \
  -output "$APP/Contents/MacOS/NapSigningTest"
cp "$ROOT/Info.plist" "$APP/Contents/Info.plist"

ICON="$ROOT/../../public/nap-ghost-icon-512.png"
for SIZE in 16 32 128 256 512; do
  sips -z "$SIZE" "$SIZE" "$ICON" --out "$WORK/AppIcon.iconset/icon_${SIZE}x${SIZE}.png" >/dev/null
  DOUBLE=$((SIZE * 2))
  sips -z "$DOUBLE" "$DOUBLE" "$ICON" --out "$WORK/AppIcon.iconset/icon_${SIZE}x${SIZE}@2x.png" >/dev/null
done
iconutil -c icns "$WORK/AppIcon.iconset" -o "$APP/Contents/Resources/AppIcon.icns"
plutil -lint "$APP/Contents/Info.plist"
xcrun lipo -info "$APP/Contents/MacOS/NapSigningTest"
printf '\nBuilt: %s\nLOCAL TEST ONLY: not Developer ID signed or notarized yet.\n' "$APP"
