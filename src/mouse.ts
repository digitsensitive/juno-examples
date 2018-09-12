/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Mouse example
 *
 * A small example to show how to use the api.mouse() function.
 * This example was rewritten from the TIC-80 Mouse example writte in Lua:
 * https://github.com/nesbox/TIC-80/wiki/mouse
 *
 * @license      Digitsensitive
 */

import * as Juno from "../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  allowedInputs: { mouse: true },
  scale: 12
};

export class Game extends Juno.Game {
  private x: number;
  private y: number;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Mouse",
      instance: this
    });
  }

  private init() {}

  private update(dt: number): void {
    this.x = this.api.mouse().x;
    this.y = this.api.mouse().y;
  }

  private render(dt: number): void {
    this.api.cls(3);

    this.api.line(this.x, 0, this.x, 136, 7);
    this.api.line(0, this.y, 240, this.y, 7);
  }
}

window.onload = () => {
  var game = new Game(config);
};
