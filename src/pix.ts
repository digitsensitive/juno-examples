/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Pix example
 *
 * A small example to show how to use the api.pix() function.
 *
 * @license      Digitsensitive
 */

import * as Juno from "../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  allowedInputs: { keyboard: true },
  scale: 8
};

export class Game extends Juno.Game {
  private t: number = 0;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Pix",
      instance: this
    });
  }

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(13);
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 20; y++) {
        this.api.pix(
          15 + x * 1.5 + Math.sin(this.t) * 5,
          15 + y * 1.5 + Math.cos(this.t) * 5,
          14
        );
      }
    }
    this.t += 0.05;
  }
}

window.onload = () => {
  var game = new Game(config);
};
