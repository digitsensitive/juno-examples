/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Game Examples: Pong
 * @license      Digitsensitive
 */

import * as Juno from "../../../juno/lib/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 10,
  css: {
    borderWidth: "2rem",
    borderStyle: "solid",
    borderColor: "#567184",
    borderRadius: "0px",
  },
};

export class Game extends Juno.Game {
  // variables
  private go = false;

  // objects
  private b = {
    x: this.graphics.ggw() / 2,
    y: this.graphics.ggh() / 2,
    vx: -2,
    vy: -1,
    w: 1,
    h: 1,
  }; // ball

  private p1 = {
    x: 6,
    y: this.graphics.ggh() / 2 - 3,
    vy: 1,
    w: 1,
    h: 6,
  }; // player one

  private p2 = {
    x: 56,
    y: this.graphics.ggh() / 2 - 3,
    vy: 1,
    w: 1,
    h: 6,
  }; // player two

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startLoop();
  }

  init(): void {}

  update(): void {
    if (!this.go) {
      // update ball position
      this.b.x += this.b.vx * 0.2;
      this.b.y += this.b.vy * 0.2;

      // check ball border collisions
      if (
        this.b.x < 0 ||
        this.b.x > this.graphics.ggw() - this.b.w ||
        this.graphics.rrc(this.p1, this.b) ||
        this.graphics.rrc(this.p2, this.b)
      ) {
        this.b.vx *= -1;
      }
      if (this.b.y < 0 || this.b.y > this.graphics.ggh() - this.b.h) {
        this.b.vy *= -1;
      }

      // PLAYER ONE
      // input player one
      if (this.graphics.key(0)) {
        this.p1.vy -= 0.2;
      } else if (this.graphics.key(1)) {
        this.p1.vy += 0.2;
      } else {
        this.p1.vy = 0;
      }

      if (this.p1.vy > 1) {
        this.p1.vy = 1;
      }

      if (this.p1.vy < -1) {
        this.p1.vy = -1;
      }

      // update player one
      this.p1.y += this.p1.vy;

      // check player one wall collisions
      if (this.p1.y < 0) {
        this.p1.y = 0;
      }

      if (this.p1.y > this.graphics.ggh() - this.p1.h) {
        this.p1.y = this.graphics.ggh() - this.p1.h;
      }

      // PLAYER TWO
      // input player two
      if (this.graphics.key(2)) {
        this.p2.vy -= 0.2;
      } else if (this.graphics.key(3)) {
        this.p2.vy += 0.2;
      } else {
        this.p2.vy = 0;
      }

      if (this.p2.vy > 1) {
        this.p2.vy = 1;
      }

      if (this.p2.vy < -1) {
        this.p2.vy = -1;
      }

      // update player two
      this.p2.y += this.p2.vy;

      // check player two wall collisions
      if (this.p2.y < 0) {
        this.p2.y = 0;
      }

      if (this.p2.y > this.graphics.ggh() - this.p2.h) {
        this.p2.y = this.graphics.ggh() - this.p2.h;
      }
    }
  }

  render(): void {
    this.graphics.cls(0);
    for (let y = 0; y < this.graphics.ggh(); y += 2) {
      this.graphics.rect(this.graphics.ggw() / 2, y, 1, 1, 14);
    }
    this.graphics.rect(this.b.x, this.b.y, this.b.w, this.b.h, 12);
    this.graphics.rect(this.p1.x, this.p1.y, this.p1.w, this.p1.h, 12);
    this.graphics.rect(this.p2.x, this.p2.y, this.p2.w, this.p2.h, 12);
  }
}

window.onload = () => {
  var game = new Game(config);
};
