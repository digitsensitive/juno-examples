/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Rect example
 *
 * A small example to show how to use the api.rect() function.
 * This example was rewritten from the TIC-80 Line example writte in Lua:
 * https://github.com/nesbox/TIC-80/wiki/rectb
 *
 * @license      Digitsensitive
 */

import * as Juno from "../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  scale: 8
};

export class Game extends Juno.Game {
  private x: number = 50;
  private y: number = 30;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Rect",
      instance: this
    });
  }

  private init() {}

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(13);

    for (let s = 280; s > 0; s -= 4) {
      let s2 = s / 2;
      let sd = 100 / s;
      this.x = sd * Math.sin(performance.now() / 1000);
      this.y = sd * Math.cos(performance.now() / 1000);
      this.api.rectb(30 + this.x - s2, 30 + this.y - s2 / 2, s, s2, 8);
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
