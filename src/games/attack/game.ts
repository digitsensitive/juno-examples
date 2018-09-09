/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Attack
 * @license      Digitsensitive
 */

import * as Juno from "../../../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  scale: 8
};

export class Game extends Juno.Game {
  private pyr = {
    x: 10,
    y: 10
  };

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startGame("MainGame", this);
  }

  private update(dt: number): void {
    this.pyr.x += 0.2;
    this.pyr.y += 0.1;
  }

  private render(dt: number): void {
    this.api.cls(10);
    for (let i = 0; i < 100; i++) {
      this.api.pix(
        Math.floor(Math.random() * 64) + 1,
        Math.floor(Math.random() * 64) + 1,
        Math.floor(Math.random() * 15) + 1
      );
    }
    this.api.pix(this.pyr.x, this.pyr.y, 8);
    this.api.circb(10, 10, 10, 1, 4);
  }
}

window.onload = () => {
  var game = new Game(config);
};
