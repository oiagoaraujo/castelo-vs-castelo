import { describe, expect, it } from "vitest";
import { ARENA, criarSorteio, posicoesDosCastelos } from "./game";

describe("posições dos castelos", () => {
  it("seu castelo fica embaixo à esquerda e o inimigo no alto à direita", () => {
    const { seu, inimigo } = posicoesDosCastelos();
    expect(seu.x).toBeLessThan(ARENA.largura / 2);
    expect(seu.y).toBeGreaterThan(ARENA.altura / 2);
    expect(inimigo.x).toBeGreaterThan(ARENA.largura / 2);
    expect(inimigo.y).toBeLessThan(ARENA.altura / 2);
  });
});

describe("sorteio com semente fixa", () => {
  it("a mesma semente gera a mesma sequência", () => {
    const a = criarSorteio(42);
    const b = criarSorteio(42);
    const seqA = Array.from({ length: 5 }, () => a());
    const seqB = Array.from({ length: 5 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it("sementes diferentes geram sequências diferentes", () => {
    const a = criarSorteio(1);
    const b = criarSorteio(2);
    expect(a()).not.toBe(b());
  });

  it("os valores ficam entre 0 e 1", () => {
    const r = criarSorteio(7);
    for (let i = 0; i < 100; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
