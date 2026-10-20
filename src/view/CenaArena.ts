import Phaser from "phaser";
import { ARENA, posicoesDosCastelos } from "../core/game";

/** Visual provisório (M0): retângulos e texto, sem arte final. */
export class CenaArena extends Phaser.Scene {
  constructor() {
    super("arena");
  }

  create(): void {
    const { seu, inimigo } = posicoesDosCastelos();

    this.add
      .text(ARENA.largura / 2, ARENA.altura / 2, "Castelo", {
        fontFamily: "sans-serif",
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add.rectangle(seu.x, seu.y, 90, 60, 0x3b82f6);
    this.add
      .text(seu.x, seu.y, "Seu castelo", { fontFamily: "sans-serif", fontSize: "14px", color: "#ffffff" })
      .setOrigin(0.5);

    this.add.rectangle(inimigo.x, inimigo.y, 90, 60, 0xef4444);
    this.add
      .text(inimigo.x, inimigo.y, "Inimigo", { fontFamily: "sans-serif", fontSize: "14px", color: "#ffffff" })
      .setOrigin(0.5);
  }
}
