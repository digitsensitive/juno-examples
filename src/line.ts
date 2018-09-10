/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Line example
 *
 * A small example to show how to use the api.line() function.
 * This example was rewritten from the TIC-80 Line example writte in Lua:
 * https://github.com/nesbox/TIC-80/wiki/line
 *
 * @license      Digitsensitive
 */

import * as Juno from "../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  scale: 8
};

export class Game extends Juno.Game {
  private pi8: number = Math.PI / 4;
  private pi2: number = Math.PI * 2;
  private t: number = 0;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startGame("Line", this);
  }

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(3);

    for (let i = this.t % 8; i <= 63; i = i + 8) {
      this.api.line(i, 0, 0, 63 - i, 8);
      this.api.line(i, 63, 63, 63 - i, 6);
      this.t = this.t + 0.02;
    }

    for (let i = (this.t / 16) % this.pi8; i <= this.pi2; i += this.pi8) {
      let x = 32 + 15 * Math.cos(i);
      let y = 32 + 15 * Math.cos(i);
      this.api.line(63, 0, x, y, 15);
      this.api.line(0, 63, x, y, 15);
    }

    this.api.line(0, 0, 63, 0, 8);
    this.api.line(0, 0, 0, 63, 8);
    this.api.line(63, 0, 63, 63, 6);
    this.api.line(0, 63, 63, 63, 6);
  }
}

window.onload = () => {
  var game = new Game(config);
};
