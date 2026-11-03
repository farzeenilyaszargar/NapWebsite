#!/bin/bash
set -euo pipefail

source "$(dirname "$0")/config.sh"
bash "$ROOT/setup-updater.sh"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/nap-signing-build.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT

mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources" "$APP/Contents/Frameworks" "$WORK/AppIcon.iconset"
ditto "$SDK/Sparkle.framework" "$APP/Contents/Frameworks/Sparkle.framework"
cp "$SDK/LICENSE" "$APP/Contents/Resources/Sparkle-LICENSE"
for ARCH in arm64 x86_64; do
  xcrun clang -arch "$ARCH" -mmacosx-version-min=12.0 -fobjc-arc -O2 \
    -framework Cocoa -F "$SDK" -framework Sparkle -Wl,-rpath,@executable_path/../Frameworks \
    "$ROOT/main.m" -o "$WORK/NapSigningTest-$ARCH"
done
xcrun lipo -create "$WORK/NapSigningTest-arm64" "$WORK/NapSigningTest-x86_64" \
  -output "$APP/Contents/MacOS/NapSigningTest"
cp "$ROOT/Info.plist" "$APP/Contents/Info.plist"
PLIST="$APP/Contents/Info.plist"
plutil -replace CFBundleShortVersionString -string "$VERSION" "$PLIST"
plutil -replace CFBundleVersion -string "$BUILD_NUMBER" "$PLIST"
plutil -insert SUFeedURL -string "$PUBLIC_BASE/$PREFIX/appcast.xml" "$PLIST"
plutil -insert SUPublicEDKey -string "$(config sparklePublicKey)" "$PLIST"
plutil -insert SURequireSignedFeed -bool true "$PLIST"
plutil -insert SUVerifyUpdateBeforeExtraction -bool true "$PLIST"

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
