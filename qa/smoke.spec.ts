import { test, expect, type Page } from "@playwright/test";

/**
 * Suíte mínima de regressão (QA Baseline § 14, adaptada a site estático dual-mode).
 * Roda contra o `out/` servido com os headers de produção (inclui a CSP da Task 21),
 * então uma violação de CSP viraria erro de console e reprovaria o smoke.
 *
 * Armadilha § 14: o route announcer do Next usa aria-live/`role="alert"` — por isso
 * não usamos getByRole("alert"); os locators são escopados por role/id/texto.
 */

// Coleta erros de console e exceções de página durante um teste.
function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

test.describe("Smoke — site DJ Gleib", () => {
  test("home: status < 400, H1 visível e zero erro de console", async ({ page }) => {
    const errors = collectErrors(page);
    const resp = await page.goto("/");
    expect(resp?.status(), "status HTTP da home").toBeLessThan(400);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(errors, `erros no console: ${errors.join(" | ")}`).toEqual([]);
  });

  test("dual-mode: default é Eventos e a aba troca para Balada", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-mode", "eventos");
    await page.getByRole("tab", { name: "Modo Balada" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-mode", "balada");
  });

  test("deep-link: /?modo=balada carrega direto em Balada", async ({ page }) => {
    await page.goto("/?modo=balada");
    await expect(page.locator("html")).toHaveAttribute("data-mode", "balada");
    await expect(page.getByRole("tab", { name: "Modo Balada" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("links de contato: WhatsApp (wa.me com mensagem) e Instagram (@gleibdj)", async ({ page }) => {
    await page.goto("/");
    const wa = page.locator('a[href*="wa.me/5511956481998"]').first();
    await expect(wa).toBeVisible();
    expect(await wa.getAttribute("href"), "WhatsApp deve levar mensagem pré-preenchida").toContain(
      "text=",
    );
    await expect(page.locator('a[href="https://instagram.com/gleibdj"]').first()).toBeVisible();
  });

  test("integridade de texto: headlines e assinatura aprovadas intactas", async ({ page }) => {
    await page.goto("/");
    // Hero (comum aos dois modos) + CTA + assinatura do rodapé.
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Eu comando o momento");
    await expect(page.getByRole("heading", { name: /Você não contrata uma aposta/ })).toBeVisible();
    await expect(page.getByText("No comando do seu momento.")).toBeVisible();
    // Bloco Eventos visível por padrão; ao trocar, o headline do Balada aparece.
    await expect(page.getByRole("heading", { name: /Eu administro seu dia/ })).toBeVisible();
    await page.getByRole("tab", { name: "Modo Balada" }).click();
    await expect(page.getByRole("heading", { name: /A euforia é da pista/ })).toBeVisible();
  });

  test("graceful-empty: galeria, vídeos e depoimentos ausentes com config vazio", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#portfolio")).toHaveCount(0);
    await expect(page.locator("#videos")).toHaveCount(0);
    await expect(page.locator("#depoimentos")).toHaveCount(0);
  });
});
