/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Game Examples: Space Fighter
 * @license      Digitsensitive
 */

import * as Juno from "../../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  allowedInputs: { keyboard: true },
  scale: 8
};

export class Game extends Juno.Game {
  private a: number = 0;
  private space: number = 10;

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "Circ",
      instance: this
    });
  }

  private init() {}

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(3);
    for (let i = 0; i < 200; i += this.space) {
      this.api.circb(
        15 + 10 * Math.sin(this.a),
        7 + 5 * Math.cos(this.a),
        i + ((performance.now() / 40) % this.space),
        8
      );
      this.api.circb(
        15 + 10 * Math.sin(this.a / 2),
        7 + 5 * Math.cos(this.a / 2),
        i + ((performance.now() / 40) % this.space),
        10
      );
    }
    this.a = this.a + Math.PI / 240;
  }
}

window.onload = () => {
  var game = new Game(config);
};
