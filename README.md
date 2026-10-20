# Castelo

Jogo de defesa de castelo (tower defense com elementos roguelike) para celular, feito como trabalho de curso.
Sem fins comerciais. Em desenvolvimento.

- Design: [`docs/GDD.md`](docs/GDD.md)
- Estado atual: [`docs/STATUS.md`](docs/STATUS.md)
- Decisões: [`docs/DECISIONS.md`](docs/DECISIONS.md)

## Rodar no computador

```bash
npm install
npm run dev
```

## Verificar

```bash
npm run typecheck
npm test
npm run build
```

Cada mudança enviada ao GitHub roda essas verificações automaticamente (GitHub Actions). Ao entrar na `main`,
o jogo é publicado no GitHub Pages.
