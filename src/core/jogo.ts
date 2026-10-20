// Estado e regras da partida. CORE: sem Phaser e sem tela.
import inimigos from "../data/inimigos.json";
import { posicoesDosCastelos, type Ponto } from "./game";

export type TipoInimigo = keyof typeof inimigos;

export interface Tropa {
  id: number;
  tipo: TipoInimigo;
  x: number;
  y: number;
  /** Chegou ao castelo do jogador. */
  chegou: boolean;
}

export interface Jogo {
  seuCastelo: Ponto;
  casteloInimigo: Ponto;
  tropas: Tropa[];
  proximoId: number;
}

export function criarJogo(): Jogo {
  const { seu, inimigo } = posicoesDosCastelos();
  return { seuCastelo: seu, casteloInimigo: inimigo, tropas: [], proximoId: 1 };
}

/** Faz uma tropa inimiga sair do castelo inimigo. */
export function lancarTropaInimiga(jogo: Jogo, tipo: TipoInimigo = "infantaria"): Tropa {
  const tropa: Tropa = {
    id: jogo.proximoId++,
    tipo,
    x: jogo.casteloInimigo.x,
    y: jogo.casteloInimigo.y,
    chegou: false,
  };
  jogo.tropas.push(tropa);
  return tropa;
}

/** Anda `distancia` em linha reta até o destino, sem passar dele. Devolve true se chegou. */
export function andarAte(p: Ponto, destino: Ponto, distancia: number): boolean {
  const dx = destino.x - p.x;
  const dy = destino.y - p.y;
  const falta = Math.hypot(dx, dy);
  if (falta <= distancia) {
    p.x = destino.x;
    p.y = destino.y;
    return true;
  }
  p.x += (dx / falta) * distancia;
  p.y += (dy / falta) * distancia;
  return false;
}

/** Tira da partida as tropas que já chegaram ao castelo. Devolve quantas saíram. */
export function removerTropasQueChegaram(jogo: Jogo): number {
  const antes = jogo.tropas.length;
  jogo.tropas = jogo.tropas.filter((t) => !t.chegou);
  return antes - jogo.tropas.length;
}

/** Avança a partida `dt` segundos. */
export function atualizar(jogo: Jogo, dt: number): void {
  for (const tropa of jogo.tropas) {
    if (tropa.chegou) continue;
    const velocidade = inimigos[tropa.tipo].velocidade;
    tropa.chegou = andarAte(tropa, jogo.seuCastelo, velocidade * dt);
  }
}
