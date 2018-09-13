/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Game Examples: Space Fighter
 * @license      Digitsensitive
 */

import * as Juno from "../../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 8
};

export class Game extends Juno.Game {
  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "SpaceFighter",
      instance: this
    });
  }

  init(): void {}

  update(): void {}

  render(): void {
    this.api.cls(3);
  }
}

window.onload = () => {
  var game = new Game(config);
};
