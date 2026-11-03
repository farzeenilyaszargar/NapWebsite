#!/bin/bash
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG="$ROOT/release-config.json"
config() { plutil -extract "$1" raw -o - "$CONFIG"; }
VERSION="${RELEASE_VERSION:-$(config version)}"
BUILD_NUMBER="${RELEASE_BUILD:-$(config build)}"
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ || ! "$BUILD_NUMBER" =~ ^[0-9]+$ ]]; then
  printf '%s\n' 'Use a numeric release version (for example 0.2.1) and an incrementing numeric build.' >&2
  exit 1
fi
BUCKET="$(config bucket)"
PUBLIC_BASE="$(config publicBaseUrl)"
PREFIX="$(config prefix)"
KEY_ACCOUNT="$(config sparkleKeyAccount)"
SDK="$ROOT/vendor/Sparkle-$(config sparkleVersion)"
OUT="$ROOT/dist/releases/$VERSION"
APP="$OUT/Nap Signing Test.app"
DMG="$OUT/Nap-Signing-Test-$VERSION.dmg"
ARCHIVE="$OUT/Nap-Signing-Test.zip"
UPDATES="$ROOT/dist/updates"
