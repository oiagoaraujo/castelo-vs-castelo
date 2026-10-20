import Phaser from "phaser";
import inimigos from "../data/inimigos.json";
import { atualizar, criarJogo, lancarTropaInimiga, removerTropasQueChegaram, type Jogo } from "../core/jogo";

declare global {
  interface Window {
    /** Só para o teste de fumaça olhar o que está acontecendo. */
    __castelo?: { tropas: () => { id: number; x: number; y: number }[] };
  }
}

/** Visual provisório (M1): formas e texto simples, sem arte final. */
export class CenaArena extends Phaser.Scene {
  private jogo!: Jogo;
  private desenhoTropas = new Map<number, Phaser.GameObjects.Arc>();

  constructor() {
    super("arena");
  }

  create(): void {
    this.jogo = criarJogo();
    lancarTropaInimiga(this.jogo);

    this.desenharCastelo(this.jogo.seuCastelo, 0x3b82f6, "Seu castelo");
    this.desenharCastelo(this.jogo.casteloInimigo, 0xef4444, "Inimigo");

    window.__castelo = {
      tropas: () => this.jogo.tropas.map((t) => ({ id: t.id, x: t.x, y: t.y })),
    };
  }

  update(_tempo: number, delta: number): void {
    // Limita o passo para a tropa não "pular" se a aba ficar parada.
    const dt = Math.min(delta / 1000, 0.05);
    atualizar(this.jogo, dt);

    // Provisório (M1): quando a tropa chega, sai uma nova para a demonstração continuar.
    if (removerTropasQueChegaram(this.jogo) > 0) lancarTropaInimiga(this.jogo);

    this.sincronizarTropas();
  }

  private desenharCastelo(pos: { x: number; y: number }, cor: number, nome: string): void {
    this.add.rectangle(pos.x, pos.y, 90, 60, cor);
    this.add
      .text(pos.x, pos.y, nome, { fontFamily: "sans-serif", fontSize: "14px", color: "#ffffff" })
      .setOrigin(0.5);
  }

  /** Cria, move e apaga os círculos para acompanhar o estado do jogo. */
  private sincronizarTropas(): void {
    const vivas = new Set<number>();
    for (const t of this.jogo.tropas) {
      vivas.add(t.id);
      let forma = this.desenhoTropas.get(t.id);
      if (!forma) {
        forma = this.add.circle(t.x, t.y, inimigos[t.tipo].raio, 0xfacc15);
        this.desenhoTropas.set(t.id, forma);
      }
      forma.setPosition(t.x, t.y);
    }
    for (const [id, forma] of this.desenhoTropas) {
      if (!vivas.has(id)) {
        forma.destroy();
        this.desenhoTropas.delete(id);
      }
    }
  }
}
