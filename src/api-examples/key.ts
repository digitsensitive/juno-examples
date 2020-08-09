/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Key example
 *
 * A small example to show how to use the api.key() function.
 *
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
    this.graphics.cls(1);
    this.graphics.rectb(22, 26, 20, 10, 6);
    if (this.graphics.key(0)) {
      this.graphics.print("Up", 25, 30, 6);
    } else if (this.graphics.key(1)) {
      this.graphics.print("Down", 25, 30, 6);
    } else if (this.graphics.key(2)) {
      this.graphics.print("Left", 25, 30, 6);
    } else if (this.graphics.key(3)) {
      this.graphics.print("Right", 25, 30, 6);
    } else if (this.graphics.key(4)) {
      this.graphics.print("A", 25, 30, 6);
    } else if (this.graphics.key(5)) {
      this.graphics.print("B", 25, 30, 6);
    } else if (this.graphics.key(6)) {
      this.graphics.print("X", 25, 30, 6);
    } else if (this.graphics.key(7)) {
      this.graphics.print("Y", 25, 30, 6);
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
