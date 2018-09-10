/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Rect example
 *
 * A small example to show how to use the api.rect() function.
 *
 * @license      Digitsensitive
 */

import * as Juno from "../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  scale: 8
};

export class Game extends Juno.Game {
  private t: number = 0;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startGame("Rect", this);
  }

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(13);
  }
}

window.onload = () => {
  var game = new Game(config);
};
