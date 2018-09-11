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

interface IRectangles {
  x: number;
  y: number;
  w: number;
  h: number;
  c: number;
}

export class Game extends Juno.Game {
  private t: number = 0;
  private rectArray: IRectangles[] = [];

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startGame("Rect", this);
  }

  private init() {
    for (let x = 0; x < 20; x++) {
      this.rectArray.push({ x: x * 3, y: 5, w: 2, h: 2, c: 2 });
    }
  }

  private update(dt: number): void {}

  private render(dt: number): void {
    this.api.cls(13);

    for (let i of this.rectArray) {
      this.api.rect(i.x, i.y, i.w, i.h, i.c);
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
