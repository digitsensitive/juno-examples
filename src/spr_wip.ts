/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Spr example
 *
 * A small example to show how to use the api.spr() function.
 *
 * @license      Digitsensitive
 */

import * as Juno from "../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  scale: 8
};

export class Game extends Juno.Game {
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Spr",
      instance: this
    });
  }

  private init() {
    this.api.load("sprites", "./src/assets/");
  }

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(1);

    this.api.print("HELLO JUNO!", 16.1, 30.1, 4);
    this.api.print("HELLO JUNO!", 16, 30, 12);

    this.api.spr(1, 16, 35);
  }
}

window.onload = () => {
  var game = new Game(config);
};
