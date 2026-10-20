import { defineConfig, devices } from "@playwright/test";

// Teste de fumaça: abre o jogo já compilado (npm run build) num celular simulado.
export default defineConfig({
  testDir: "tests/smoke",
  timeout: 30_000,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173",
    ...devices["Pixel 7"],
  },
  webServer: {
    command: "npm run preview -- --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
