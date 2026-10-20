import { defineConfig } from "vite";

// base "./" faz o build funcionar em qualquer endereço, inclusive no GitHub Pages
// (https://<usuario>.github.io/castelo-vs-castelo/).
export default defineConfig({
  base: "./",
  build: {
    chunkSizeWarningLimit: 2000,
  },
  test: {
    // A lógica (src/core) roda sem tela, então os testes não precisam de navegador.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
