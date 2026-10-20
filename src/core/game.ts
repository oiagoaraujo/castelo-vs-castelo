// Camada CORE: regras do jogo. Não pode importar Phaser nem nada de tela.
// Bots e testes chamam este código direto, sem abrir o navegador.

/** Tamanho lógico da arena em retrato (proporção de celular). */
export const ARENA = { largura: 360, altura: 640 } as const;

export interface Ponto {
  x: number;
  y: number;
}

/** Seu castelo fica embaixo à esquerda; o inimigo no alto à direita. */
export function posicoesDosCastelos(): { seu: Ponto; inimigo: Ponto } {
  return {
    seu: { x: ARENA.largura * 0.22, y: ARENA.altura * 0.88 },
    inimigo: { x: ARENA.largura * 0.78, y: ARENA.altura * 0.12 },
  };
}

/** Sorteio com semente fixa (mulberry32): mesma semente, mesma sequência. */
export function criarSorteio(semente: number): () => number {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
