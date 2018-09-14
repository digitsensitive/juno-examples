/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Print example
 *
 * A small example to show how to use the api.print() function.
 *
 * @license      Digitsensitive
 */

import * as Juno from "../../node_modules/juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 10
};

export class Game extends Juno.Game {
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Print",
      instance: this
    });
  }

  init(): void {}

  update(): void {}

  render(): void {
    this.api.cls(1);

    this.api.print("HELLO JUNO!", 16.1, 30.1, 4);
    this.api.print("HELLO JUNO!", 16, 30, 12);
  }
}

window.onload = () => {
  var game = new Game(config);
};
