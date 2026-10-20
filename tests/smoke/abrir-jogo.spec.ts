import { expect, test } from "@playwright/test";

interface Castelo {
  tropas: () => { id: number; x: number; y: number }[];
}
const lerTropas = () => (window as unknown as { __castelo?: Castelo }).__castelo?.tropas() ?? [];

test("o jogo abre no celular, sem erros, e a tropa inimiga anda", async ({ page }) => {
  const erros: string[] = [];
  page.on("pageerror", (e) => erros.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") erros.push(m.text());
  });

  await page.goto("/");

  // A tela aparece e está em retrato (mais alta do que larga).
  const canvas = page.locator("#game canvas");
  await expect(canvas).toBeVisible();
  const caixa = await canvas.boundingBox();
  expect(caixa).not.toBeNull();
  expect(caixa!.height).toBeGreaterThan(caixa!.width);

  // Existe uma tropa inimiga e ela anda em direção ao seu castelo (para baixo).
  await page.waitForFunction(() => {
    const c = (window as unknown as { __castelo?: Castelo }).__castelo;
    return !!c && c.tropas().length > 0;
  });
  const antes = (await page.evaluate(lerTropas))[0];
  await expect
    .poll(async () => {
      const agora = (await page.evaluate(lerTropas)).find((t) => t.id === antes.id);
      return agora ? agora.y - antes.y : 0;
    })
    .toBeGreaterThan(0);

  expect(erros).toEqual([]);
});
