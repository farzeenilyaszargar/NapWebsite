/* eslint-disable @typescript-eslint/no-require-imports -- Node tests verify the committed image encodings. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const sharp = require('sharp');
const images = require('../app/lib/image-assets.json');

for (const [source, asset] of Object.entries(images)) {
  test(`${source}: same dimensions and visible pixels, cache-safe URL, no size regression`, async () => {
    const original = fs.readFileSync(path.join(__dirname, '../public', source));
    const optimized = fs.readFileSync(path.join(__dirname, '../public', asset.src));
    const before = await sharp(original).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const after = await sharp(optimized).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(after.info.width, before.info.width);
    assert.equal(after.info.height, before.info.height);
    assert.equal(asset.width, before.info.width);
    assert.equal(asset.height, before.info.height);
    assert.equal(asset.bytes, optimized.length);
    assert.ok(optimized.length <= original.length);
    assert.ok(asset.src.includes(createHash('sha256').update(optimized).digest('hex').slice(0, 8)));
    if (before.data.equals(after.data)) return;
    for (let i = 0; i < before.data.length; i += 4) {
      assert.equal(after.data[i + 3], before.data[i + 3], `alpha at ${i}`);
      if (before.data[i + 3] > 0) {
        assert.equal(after.data[i], before.data[i], `red at ${i}`);
        assert.equal(after.data[i + 1], before.data[i + 1], `green at ${i}`);
        assert.equal(after.data[i + 2], before.data[i + 2], `blue at ${i}`);
      }
    }
  });
}
