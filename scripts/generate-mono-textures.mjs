// Deterministic, pre-rendered one-bit textures: no runtime noise/filter work.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const matrix = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
function noise(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
async function texture(name, w, h, density) {
  const data = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    data[i] = 244; data[i + 1] = 240; data[i + 2] = 226;
    data[i + 3] = density(x, y) > (matrix[(y % 4) * 4 + x % 4] + noise(x, y) * 3) / 19 ? 255 : 0;
  }
  await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png({ palette: true, effort: 10 }).toFile(fileURLToPath(new URL('../public/' + name, import.meta.url)));
}
(async () => {
  await texture('mono-paper.png', 128, 128, (x, y) => noise(x, y) > .84 ? .7 : 0);
  await texture('mono-bloom.png', 1440, 960, (x, y) => {
    const nx = x / 1440, ny = y / 960;
    const dx = nx - .86, dy = ny - .47;
    const angle = Math.atan2(dy, dx);
    const radius = Math.hypot(dx, dy);
    const cloud = Math.sin(nx * 13 + Math.sin(ny * 9) * 2) * Math.cos(ny * 11 - nx * 3);
    const rays = Math.pow(Math.max(0, Math.cos(angle * 8 + radius * 10)), 20);
    const glow = Math.exp(-radius * 4.5);
    return Math.max(0, Math.min(.88, (glow * .75 + rays * glow * .85 + cloud * .13 - .12) * Math.min(1, nx * 2)));
  });
})();
