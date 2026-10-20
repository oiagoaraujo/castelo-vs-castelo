import { describe, expect, it } from "vitest";
import inimigos from "../data/inimigos.json";
import { andarAte, atualizar, criarJogo, lancarTropaInimiga, removerTropasQueChegaram } from "./jogo";

describe("andarAte", () => {
  it("anda a distância pedida em direção ao destino", () => {
    const p = { x: 0, y: 0 };
    const chegou = andarAte(p, { x: 10, y: 0 }, 4);
    expect(chegou).toBe(false);
    expect(p).toEqual({ x: 4, y: 0 });
  });

  it("não passa do destino e avisa que chegou", () => {
    const p = { x: 0, y: 0 };
    const chegou = andarAte(p, { x: 3, y: 4 }, 100);
    expect(chegou).toBe(true);
    expect(p).toEqual({ x: 3, y: 4 });
  });
});

describe("tropa inimiga", () => {
  it("nasce no castelo inimigo", () => {
    const jogo = criarJogo();
    const t = lancarTropaInimiga(jogo);
    expect(t.x).toBe(jogo.casteloInimigo.x);
    expect(t.y).toBe(jogo.casteloInimigo.y);
    expect(jogo.tropas).toHaveLength(1);
  });

  it("cada tropa recebe um número diferente", () => {
    const jogo = criarJogo();
    const a = lancarTropaInimiga(jogo);
    const b = lancarTropaInimiga(jogo);
    expect(a.id).not.toBe(b.id);
  });

  it("anda na direção do seu castelo (para baixo e para a esquerda)", () => {
    const jogo = criarJogo();
    const t = lancarTropaInimiga(jogo);
    const antes = { x: t.x, y: t.y };
    atualizar(jogo, 1);
    expect(t.x).toBeLessThan(antes.x);
    expect(t.y).toBeGreaterThan(antes.y);
  });

  it("percorre exatamente velocidade x tempo", () => {
    const jogo = criarJogo();
    const t = lancarTropaInimiga(jogo);
    const antes = { x: t.x, y: t.y };
    atualizar(jogo, 2);
    const andou = Math.hypot(t.x - antes.x, t.y - antes.y);
    expect(andou).toBeCloseTo(inimigos.infantaria.velocidade * 2, 5);
  });

  it("remove só as tropas que já chegaram", () => {
    const jogo = criarJogo();
    const chegada = lancarTropaInimiga(jogo);
    chegada.chegou = true;
    const andando = lancarTropaInimiga(jogo);
    expect(removerTropasQueChegaram(jogo)).toBe(1);
    expect(jogo.tropas).toEqual([andando]);
  });

  it("chega ao seu castelo e para lá", () => {
    const jogo = criarJogo();
    const t = lancarTropaInimiga(jogo);
    for (let i = 0; i < 100; i++) atualizar(jogo, 1);
    expect(t.chegou).toBe(true);
    expect(t.x).toBe(jogo.seuCastelo.x);
    expect(t.y).toBe(jogo.seuCastelo.y);
  });
});
