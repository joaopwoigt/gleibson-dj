// Pipeline de imagem da galeria (Task 12). O export estatico desliga o
// next/image, entao geramos WebP responsivo (srcset) com o P&B contrastado da
// marca aqui, no build/manual — nao em runtime. Uso: npm run images
//
// Fluxo: foto crua em assets-raw/ -> npm run images -> registrar em config/content.ts
import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, extname, basename, resolve } from "path";

const RAW_DIR = resolve("assets-raw");
const OUT_DIR = resolve("public/gallery");
const WIDTHS = [400, 800, 1200];
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

if (!existsSync(RAW_DIR)) {
  console.error(`Pasta ${RAW_DIR} nao existe. Crie-a e coloque as fotos cruas la.`);
  process.exit(1);
}
await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(RAW_DIR)).filter((f) => EXT.has(extname(f).toLowerCase()));
if (files.length === 0) {
  console.log("Nenhuma imagem em assets-raw/. Nada a fazer.");
  process.exit(0);
}

console.log(`Processando ${files.length} imagem(ns) -> ${WIDTHS.join("/")}px WebP P&B\n`);

for (const file of files) {
  const name = basename(file, extname(file));
  const input = join(RAW_DIR, file);
  const meta = await sharp(input).metadata();
  const generated = [];

  for (const w of WIDTHS) {
    if (meta.width && w > meta.width) continue; // nao faz upscale
    const outName = `${name}-${w}.webp`;
    const info = await sharp(input)
      .resize(w) // mantem proporcao
      .grayscale() // P&B: a cor vive no accent, nunca na foto (regra da marca)
      .linear(1.08, -10.24) // contraste ~1.08 (equivale ao CSS filter contrast(1.08))
      .webp({ quality: 80 })
      .toFile(join(OUT_DIR, outName));
    generated.push({ w, h: info.height, path: `/gallery/${outName}`, kb: Math.round(info.size / 1024) });
  }

  const biggest = generated[generated.length - 1];
  const srcset = generated.map((g) => `${g.path} ${g.w}w`).join(", ");
  console.log(`# ${file} (origem ${meta.width}x${meta.height})`);
  generated.forEach((g) => console.log(`  ${g.path}  ${g.w}x${g.h}  ${g.kb}KB`));
  console.log(`  config: { src: "${biggest.path}", alt: "TODO", mode: "eventos" }`);
  console.log(`  srcset: "${srcset}"\n`);
}

console.log("OK. Registre os que for usar em config/content.ts (array gallery[]).");
