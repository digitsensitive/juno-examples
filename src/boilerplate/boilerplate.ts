/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Boilerplate
 * @license      Digitsensitive
 */

import * as Juno from "../../../juno/lib/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 8,
};

export class Game extends Juno.Game {
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startLoop();
  }

  init(): void {}

  update(): void {}

  render(): void {
    this.graphics.cls(8);
    this.graphics.line(5, 5, 8, 20, 10);
    this.graphics.line(2, 2, 2, 20, 10);
    this.graphics.line(30, 30, 50, 30, 10);
  }
}

window.onload = () => {
  var game = new Game(config);
};
