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

import * as Juno from "../../../juno/lib/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { mouse: true },
  scale: 12,
};

export class Game extends Juno.Game {
  private x: number;
  private y: number;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startLoop();
  }

  init(): void {}

  update(): void {
    this.x = this.graphics.mouse().x;
    this.y = this.graphics.mouse().y;
  }

  render(): void {
    this.graphics.cls(3);

    this.graphics.line(this.x, 0, this.x, 136, 7);
    this.graphics.line(0, this.y, 240, this.y, 7);
  }
}

window.onload = () => {
  var game = new Game(config);
};
