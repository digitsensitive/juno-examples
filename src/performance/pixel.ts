/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Performance: Pixels
 * @license      Digitsensitive
 */

import * as Juno from "../../../juno/lib/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 8,
  css: {
    borderWidth: "2rem",
    borderStyle: "solid",
    borderColor: "#a0f072",
    borderRadius: "20px",
  },
};

export class Game extends Juno.Game {
  private pixels: any[] = [];

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startLoop();
  }

  init(): void {
    for (let i = 0; i < 4096; i++) {
      this.pixels.push({
        x: this.graphics.rnd(0, 64),
        y: this.graphics.rnd(0, 64),
      });
    }
  }

  update(): void {}

  render(): void {
    this.graphics.cls(12);
    let l = this.pixels.length;
    for (let i = 0; i < l; i++) {
      this.graphics.pix(this.pixels[i].x, this.pixels[i].y, 4);
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
