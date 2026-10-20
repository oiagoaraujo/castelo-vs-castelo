# Decisões

Uma linha por decisão: data, o que foi decidido e por quê.

- 2026-10-20 — **Phaser + TypeScript + Vite** (fixados em 3.90.0 / 5.9.3 / 7.3.7). Roda no navegador por link, é só código em texto (bom para o Claude Code e para testes) e separa regras de tela.
- 2026-10-20 — **Retrato, tela cheia**, castelo do jogador embaixo à esquerda, inimigo no alto à direita (decisão do dono).
- 2026-10-20 — **GitHub Pages** (repositório público, plano gratuito) com deploy pelo GitHub Actions; HostGator fora do escopo inicial.
- 2026-10-20 — **Arquitetura em três camadas** (`core`, `view`, `data`) para a mecânica poder mudar sem refazer arte e interface, e para bots rodarem sem tela.
- 2026-10-20 — **Typecheck no lugar de linter** por enquanto, para manter o M0 simples. Reavaliar se o código crescer.
- 2026-10-20 — **Teste de fumaça (Playwright) entra no M1**: abre o jogo num Pixel 7 simulado, confere tela em retrato, ausência de erros e que a tropa anda. Roda no CI e bloqueia a publicação se falhar.
- 2026-10-20 — **Velocidade e tamanho dos inimigos em `src/data/inimigos.json`**, para ajustar equilíbrio sem mexer no código.
- 2026-10-20 — **Demonstração do M1**: quando a tropa chega ao seu castelo, sai outra do castelo inimigo, só para o movimento continuar visível. Sai no M2, quando houver dano e ondas.
