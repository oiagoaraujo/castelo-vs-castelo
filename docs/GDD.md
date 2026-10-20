# GDD v1 — Castelo contra Castelo

Cópia em arquivo do documento de design (a versão com desenhos fica no Claude Docs). Itens marcados
**(proposta)** são sugestões, não decisões do dono.

## Visão

Tower defense para uma pessoa. Você defende o seu castelo de hordas inimigas combinando flechas,
modificadores e soldados a cada estágio. Seu castelo fica no canto inferior esquerdo e o inimigo no
canto superior direito. 2D, câmera parada, feito para celular e publicado como link no navegador.

## Decisões travadas

| Tema | Decisão |
| --- | --- |
| Nome | "Castelo" (provisório) |
| Gênero | Tower defense com elementos de roguelike e RPG |
| Jogadores | Um jogador, 2D, câmera parada |
| Formato | Retrato (vertical), tela cheia, ponto de vista parecido com Clash Royale |
| Castelos | O seu no canto inferior esquerdo, o inimigo no canto superior direito |
| Inimigos | Hordas de soldados saem do castelo inimigo e marcham até o seu |
| Arma básica | Flecha disparada do seu castelo; mira manual (arrastando o dedo) que fica no ângulo escolhido, com disparo automático repetido |
| Vitória | Eliminar todas as ondas de inimigos |
| Derrota | Se o seu castelo cair, a corrida acaba e começa um novo jogo |
| Progressão na partida | Combinar flechas, acumular modificadores passivos, soldados recrutados automaticamente do seu lado da tela |
| Roguelike e RPG | Loja (flechas, modificadores e soldados de tipos variados: guerreiros, arqueiros, catapulta e outros), personagens com poderes únicos (estilo Hearthstone), modificadores passivos |
| Progressão permanente | Desbloqueios entre corridas (novas flechas, personagens e modificadores) comprados com uma moeda permanente ganha no fim de cada corrida |
| Plataforma | Navegador, no celular e no PC (JavaScript; WebAssembly é opcional) |
| Bots | Simulam cerca de 1.000 partidas para testar o equilíbrio |
| Hospedagem | GitHub Pages, publicado pelo GitHub Actions; HostGator fora do escopo inicial |
| Ativos | Provisórios; arte, música e falas ficam para depois |

## Loop da partida

1. As tropas inimigas saem do castelo inimigo em ondas e marcham até o seu.
2. Seu castelo dispara flechas. A mira é manual e fica no ângulo escolhido; o disparo se repete automaticamente.
3. Você ajusta o ângulo, escolhe o tipo de flecha e usa o poder do seu personagem (proposta). Os soldados são recrutados automaticamente do seu lado.
4. Ao eliminar todas as ondas, você ganha ouro, passa pela loja e escolhe modificadores.
5. O próximo estágio é mais difícil. Se o seu castelo cair, a corrida acaba.

## Flechas, fusões e modificadores

- Tipos base (proposta): comum, fogo, gelo e raio.
- Duas flechas combinadas geram uma terceira com os efeitos das duas.
- Modificadores passivos acumulam na corrida: mais dano, disparo mais rápido, mais alcance (proposta).

## Tropas

- Inimigos provisórios (proposta): infantaria equilibrada, corredor rápido e frágil, pesado lento e resistente; chefe nos estágios finais.
- Soldados recrutados: surgem automaticamente do seu lado, marcham até o castelo inimigo e lutam no caminho. Os tipos são comprados na loja.
- Visual provisório: formas coloridas.

## Arquitetura e testes

Três camadas: `core` (regras, sem tela), `view` (tela e toques), `data` (números em JSON).
Phaser + TypeScript + Vite; testes unitários com Vitest (sorteio com semente fixa); teste de fumaça
com Playwright entra no M1; CI no GitHub Actions; todo bug vira um teste.

## Marcos

1. **M0:** repositório, testes automáticos e uma página publicada no Pages.
2. **M1:** tela em retrato com os dois castelos, câmera fixa e uma tropa inimiga andando (+ teste de fumaça).
3. **M2:** mira manual com disparo automático repetido, dano, vida dos castelos e fim de partida.
4. **M3:** ondas, ouro e três tipos de inimigo.
5. **M4:** tipos de flecha, combinação, modificadores e escolhas entre estágios.
6. **M5:** loja, soldados recrutados automaticamente e um personagem com poder único.
7. **M6:** bots de simulação e ajuste de equilíbrio.

Depois: desbloqueios permanentes, mais personagens, chefes, tutorial e, por último, arte, música e falas.
