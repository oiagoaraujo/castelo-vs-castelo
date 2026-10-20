// Camada VIEW: só desenha e recebe toques. As regras ficam em src/core.
import Phaser from "phaser";
import { ARENA } from "../core/game";
import { CenaArena } from "./CenaArena";

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#1b1f2a",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: ARENA.largura,
    height: ARENA.altura,
  },
  scene: [CenaArena],
});
