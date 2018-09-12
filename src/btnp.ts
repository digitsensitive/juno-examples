/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Btnp example
 *
 * A small example to show how to use the api.btnp() function.
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
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Btnp",
      instance: this
    });
  }

  private init() {}

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(1);
    this.api.rectb(22, 26, 20, 10, 6);
    if (this.api.btnp(0)) {
      this.api.print("Up", 25, 30, 6);
    } else if (this.api.btnp(1)) {
      this.api.print("Down", 25, 30, 6);
    } else if (this.api.btnp(2)) {
      this.api.print("Left", 25, 30, 6);
    } else if (this.api.btnp(3)) {
      this.api.print("Right", 25, 30, 6);
    } else if (this.api.btnp(4)) {
      this.api.print("A", 25, 30, 6);
    } else if (this.api.btnp(5)) {
      this.api.print("B", 25, 30, 6);
    } else if (this.api.btnp(6)) {
      this.api.print("X", 25, 30, 6);
    } else if (this.api.btnp(7)) {
      this.api.print("Y", 25, 30, 6);
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
