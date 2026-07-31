// Servidor estático mínimo (sem deps) para o QA rodar contra o build de produção
// `out/` — reproduz produção melhor que o dev server. Aplica os MESMOS headers do
// vercel.json (inclui a CSP da Task 21), então o smoke pega regressão de CSP no
// console. Playwright sobe e derruba este processo (ver playwright.config.ts).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "out");
const PORT = Number(process.env.QA_PORT) || 4400;

if (!existsSync(ROOT)) {
  console.error("[qa/serve] out/ não existe. Rode `npm run build` antes (ou use `npm run qa`).");
  process.exit(1);
}

// Reaproveita os headers do vercel.json para servir sob as regras de produção.
const vercel = JSON.parse(await readFile(join(__dirname, "..", "vercel.json"), "utf8"));
const prodHeaders = Object.fromEntries(
  (vercel.headers?.[0]?.headers ?? []).map((h) => [h.key, h.value]),
);

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".mjs": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".txt": "text/plain", ".woff2": "font/woff2", ".woff": "font/woff",
};

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  let file = join(ROOT, p);
  if (!extname(file)) file += ".html"; // rotas sem extensão → export .html
  try {
    const buf = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream", ...prodHeaders });
    res.end(buf);
  } catch {
    try {
      const nf = await readFile(join(ROOT, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", ...prodHeaders });
      res.end(nf);
    } catch {
      res.writeHead(404); res.end("404");
    }
  }
});

server.listen(PORT, () =>
  console.log(`[qa/serve] out/ em http://127.0.0.1:${PORT} (headers de produção aplicados)`),
);
