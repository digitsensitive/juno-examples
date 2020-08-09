/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Game Examples: Space Fighter
 * @license      Digitsensitive
 */

import * as Juno from "../../../juno/lib/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 8,
  antialias: false,
  css: {
    borderWidth: "2rem",
    borderStyle: "solid",
    borderColor: "#a0f072",
    borderRadius: "20px",
  },
};

export class Game extends Juno.Game {
  // variables
  private ns = 10; // number of stars
  private a = 1; // alpha value for title text
  private sc = 5000; // time to travel
  private es = 1.5; // enemy speed
  private go = false; // game over
  private ps = -20; // planet speed
  private pfs = 0.4; // player finish speed

  // objects
  private p = { x: 28, y: 52, w: 8, h: 8 }; // player
  private s = []; // stars
  private e = {
    x: this.graphics.rnd(0, this.graphics.ggw() - 8),
    y: -20,
    w: 8,
    h: 8,
  }; // enemies
  private exp = { x: 0, y: 0, r: 0 }; // explosion

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.startLoop();
  }

  init(): void {
    // load space fighter spritesheet
    this.graphics.load(
      "sprites",
      "./assets/examples/space-fighter/sprites.png",
      8
    );

    // init stars
    for (let i = 0; i < this.ns; i++) {
      this.s.push({
        x: this.graphics.rnd(1, this.graphics.ggw()),
        y: this.graphics.rnd(1, this.graphics.ggh()),
        c: this.graphics.rnd(13, 14),
      });
    }
  }

  update(): void {
    if (!this.go && this.sc >= 0) {
      // handle player input
      if (this.graphics.key(2) && this.p.x > 0) {
        this.p.x -= 1;
      } else if (this.graphics.key(3) && this.p.x < this.graphics.ggw() - 8) {
        this.p.x += 1;
      }

      // update stars
      for (let i = this.ns - 1; i >= 0; i--) {
        if (this.s[i].y < this.graphics.ggh()) {
          if (this.s[i].c === 14) {
            this.s[i].y += 2 + this.es - 1.5;
          } else {
            this.s[i].y += 1 + this.es - 1.5;
          }
        } else {
          this.s[i].y = -5;
        }
      }

      // update enemy
      if (this.e.y < this.graphics.ggh() && this.a < 0) {
        if (this.sc % 1000 === 0) {
          this.es += 0.1;
        }
        this.e.y += this.es;
      } else {
        this.e.x = this.graphics.rnd(0, this.graphics.ggw() - 8);
        this.e.y = -100;
      }

      if (this.graphics.rrc(this.e, this.p)) {
        this.go = true;
        this.exp.x = this.p.x;
        this.exp.y = this.p.y;
      }

      this.sc -= 1;

      // update alpha value
      this.a -= 0.004;
    }
  }

  render(): void {
    if (!this.go) {
      // clear screen
      this.graphics.cls(12);

      // draw title screen
      if (this.a > 0) {
        this.graphics.print("Space Fighter", 10.1, 20.1, 15, this.a, 1.2);
        this.graphics.print("Space Fighter", 10, 20, 5, this.a, 1.2);
      }

      // draw background with stars
      let l = this.s.length;
      for (let i = 0; i < l; i++) {
        this.graphics.pix(this.s[i].x, this.s[i].y, this.s[i].c);
      }

      // if end reached
      if (this.sc < 0) {
        this.graphics.circ(31, this.ps, 50, 2);
        this.graphics.circb(31, this.ps + 1, 50, 1);
        this.graphics.print("Home reached!", 10, 20.1, 12, 1, 1.2);

        this.p.y -= this.pfs;
        this.graphics.spr(0, this.p.x, this.p.y);
        if (this.ps < 9) {
          this.ps += 0.1;
        }
      } else {
        // draw player
        this.graphics.anim(this.p, 0, 3, 10);

        // draw enemy
        this.graphics.anim(this.e, 3, 1, 10);

        // draw score
        this.graphics.print("" + this.sc, 2, 2, 15);
      }
    } else {
      // clear screen
      this.graphics.cls(0);
      this.graphics.print("Game Over", 16.1, 20.1, 15, 1, 1.2);
      this.graphics.print("Game Over", 16, 20, 5, 1, 1.2);
      this.graphics.circb(this.exp.x, this.exp.y, this.exp.r, 4);
      this.graphics.circb(this.exp.x, this.exp.y, this.exp.r - 2, 3);
      this.graphics.circb(this.exp.x, this.exp.y, this.exp.r - 4, 2);
      this.exp.r += 0.3;
      this.graphics.print("" + this.sc, 2, 2, 5);
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
