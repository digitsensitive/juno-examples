/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  pget example
 *
 * A small example to show how to use the api.pget() function.
 *
 * @license      Digitsensitive
 */

import * as Juno from "../../../juno/lib/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 8,
  css: {
    borderWidth: "2rem",
    borderStyle: "solid",
    borderColor: "#ffd079",
    borderRadius: "20px",
  },
};

export class Game extends Juno.Game {
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startLoop();
  }

  init(): void {}

  update(): void {}

  render(): void {
    this.graphics.cls(0);
    this.graphics.pix(20, 20, 3);
    this.graphics.pix(25, 20, 5);
    this.graphics.pix(30, 20, 11);
    this.graphics.print(this.graphics.pget(20, 20) + "", 20, 30, 3);
    this.graphics.print(this.graphics.pget(25, 20) + "", 25, 30, 5);
    this.graphics.print(this.graphics.pget(30, 20) + "", 30, 30, 11);
  }
}

window.onload = () => {
  var game = new Game(config);
};
