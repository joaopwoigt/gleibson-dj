import { defineConfig, devices } from "@playwright/test";

/**
 * QA smoke do site do DJ Gleib (Task 22 / QA Baseline § 14, adaptado a site
 * estático). Roda contra o build `out/` servido por `qa/serve.mjs` (com os
 * headers de produção do vercel.json), não contra o dev server — reproduz
 * produção. Pré-requisito: `out/` existir (`npm run build`); o script `npm run
 * qa` já builda antes.
 */
const PORT = Number(process.env.QA_PORT) || 4400;

export default defineConfig({
  testDir: "./qa",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node qa/serve.mjs",
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
