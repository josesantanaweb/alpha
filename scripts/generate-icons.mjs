import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/icons");

const jobs = [
  { src: "icon-source.svg", out: "icon-192.png", size: 192 },
  { src: "icon-source.svg", out: "icon-512.png", size: 512 },
  { src: "icon-maskable.svg", out: "icon-maskable-512.png", size: 512 },
  { src: "icon-source.svg", out: "apple-touch-icon.png", size: 180 },
];

await mkdir(OUT, { recursive: true });

for (const { src, out, size } of jobs) {
  await sharp(resolve(__dirname, src))
    .resize(size, size)
    .png()
    .toFile(resolve(OUT, out));
  console.log(`✓ ${out} (${size}x${size})`);
}