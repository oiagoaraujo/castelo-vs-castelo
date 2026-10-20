# Castelo — regras do projeto

Jogo de defesa de castelo (tower defense com elementos roguelike), para uma pessoa, 2D, câmera parada,
em **retrato** (celular na vertical). Trabalho de curso, sem fins comerciais. O dono do projeto é leigo em
programação: explique em português simples e sem siglas não explicadas.

Leia `docs/GDD.md` (design), `docs/STATUS.md` (onde estamos) e `docs/DECISIONS.md` (decisões e porquês)
antes de começar qualquer tarefa.

## Comandos

- `npm install` — instala dependências
- `npm run dev` — roda o jogo local
- `npm run typecheck` — verifica tipos
- `npm test` — testes unitários (Vitest)
- `npm run build` — verifica tipos e gera o build em `dist/`

## Arquitetura (regra de ouro)

- `src/core/` — regras do jogo. **Nunca** importa Phaser, DOM ou qualquer coisa de tela. Tem de rodar em Node puro.
- `src/view/` — desenha, anima, toca som e lê toques. **Nunca** contém regras de jogo.
- `src/data/` — números e conteúdo em JSON (inimigos, flechas, fusões, soldados, personagens). Equilíbrio se ajusta aqui.
- Sorteios sempre por `criarSorteio(semente)` (nunca `Math.random()` no core), para testes e bots serem repetíveis.

## Testes

- Toda regra nova no `core` ganha teste unitário.
- **Todo bug corrigido ganha um teste que o reproduz** antes ou junto da correção.
- Testar a lógica com entradas fixas, não simulando uma partida inteira na tela.

## Fluxo de trabalho

- Nunca commitar direto na `main`: branch por funcionalidade, Pull Request, CI verde.
- Uma tarefa por vez, em passos pequenos.
- Ao fim de cada sessão: atualizar `docs/STATUS.md` e, se houve decisão, `docs/DECISIONS.md`.
- Visual e som provisórios (formas e cores simples) até o jogo estar divertido. Arte, música e falas finais ficam por último.
- Não colocar senhas, chaves ou dados pessoais no repositório (ele é público).

## Decisões já tomadas (não reabrir sem o dono pedir)

Ver tabela "Decisões travadas" em `docs/GDD.md`.
