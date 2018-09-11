/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Print example
 *
 * A small example to show how to use the api.print() function.
 *
 * @license      Digitsensitive
 */

import * as Juno from "../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  scale: 10
};

export class Game extends Juno.Game {
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startGame("Print", this);
  }

  private init() {}

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(3);

    this.api.print("Great job Eric!", 10, 30, 9, 1);
  }
}

window.onload = () => {
  var game = new Game(config);
};
