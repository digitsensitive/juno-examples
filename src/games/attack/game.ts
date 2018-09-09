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

  private circle = {
    r: 1
  };

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startGame("MainGame", this);
  }

  private update(dt: number): void {
    this.pyr.x += 0.2;
    this.pyr.y += 0.1;
    this.circle.r += 1;

    if (this.circle.r > 30) {
      this.circle.r = 1;
    }
  }

  private render(dt: number): void {
    this.api.cls(3);
    this.api.pix(this.pyr.x, this.pyr.y, 11);
    this.api.circb(30, 30, this.circle.r, 1, 6);
  }
}

window.onload = () => {
  var game = new Game(config);
};
