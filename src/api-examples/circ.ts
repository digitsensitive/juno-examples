/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Circ example
 *
 * A small example to show how to use the api.circ() function.
 * This example was rewritten from the TIC-80 Circ example writte in Lua:
 * https://github.com/nesbox/TIC-80/wiki/circb
 *
 * @license      Digitsensitive
 */

import * as Juno from "../../node_modules/juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 8
};

export class Game extends Juno.Game {
  private a: number = 0;
  private space: number = 10;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Circ",
      instance: this
    });
  }

  init(): void {}

  update(): void {}

  render(): void {
    this.api.cls(3);
    for (let i = 0; i < 200; i += this.space) {
      this.api.circb(
        15 + 10 * Math.sin(this.a),
        7 + 5 * Math.cos(this.a),
        i + ((performance.now() / 40) % this.space),
        8
      );
      this.api.circb(
        15 + 10 * Math.sin(this.a / 2),
        7 + 5 * Math.cos(this.a / 2),
        i + ((performance.now() / 40) % this.space),
        10
      );
    }
    this.a = this.a + Math.PI / 240;
  }
}

window.onload = () => {
  var game = new Game(config);
};
