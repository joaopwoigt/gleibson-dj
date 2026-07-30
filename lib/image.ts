// Deriva o srcset responsivo a partir do caminho do maior WebP, seguindo a
// convenção do pipeline de imagem (scripts/optimize-images.mjs): {name}-{width}.webp.
// Ex.: "/gallery/foo-1200.webp" -> "/gallery/foo-400.webp 400w, ...800w, ...1200w".
export const GALLERY_WIDTHS = [400, 800, 1200] as const;

export function gallerySrcSet(src: string): string {
  const match = src.match(/^(.*)-\d+\.webp$/);
  if (!match) return ""; // fora da convenção: sem srcset derivado (usa só o src)
  const stem = match[1];
  return GALLERY_WIDTHS.map((w) => `${stem}-${w}.webp ${w}w`).join(", ");
}
