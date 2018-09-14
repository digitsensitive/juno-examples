/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Spr example
 *
 * A small example to show how to use the api.spr() function.
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
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Spr",
      instance: this
    });
  }

  init(): void {
    this.api.load("sprites", "./src/assets/", 8);
  }

  update(): void {}

  render(): void {
    this.api.cls(1);

    this.api.print("HELLO JUNO!", 16.1, 30.1, 4);
    this.api.print("HELLO JUNO!", 16, 30, 12);
    let i = 0;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.api.spr(i, x * 8, y * 8);
        i++;
      }
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
