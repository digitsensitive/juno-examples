/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Game Examples: Space Fighter
 * @license      Digitsensitive
 */

import * as Juno from "../../node_modules/juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 8,
  css: {
    borderWidth: "2rem",
    borderStyle: "solid",
    borderColor: "#a0f072",
    borderRadius: "20px"
  }
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
    x: this.api.rnd(0, this.api.ggw() - 8),
    y: -20,
    w: 8,
    h: 8
  }; // enemies
  private exp = { x: 0, y: 0, r: 0 }; // explosion

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "SpaceFighter",
      instance: this
    });
  }

  init(): void {
    // load space fighter spritesheet
    this.api.load("sprites", "./assets/examples/space-fighter/", 8);

    // init stars
    for (let i = 0; i < this.ns; i++) {
      this.s.push({
        x: this.api.rnd(1, this.api.ggw()),
        y: this.api.rnd(1, this.api.ggh()),
        c: this.api.rnd(13, 14)
      });
    }
  }

  update(): void {
    if (!this.go && this.sc >= 0) {
      // handle player input
      if (this.api.key(2) && this.p.x > 0) {
        this.p.x -= 1;
      } else if (this.api.key(3) && this.p.x < this.api.ggw() - 8) {
        this.p.x += 1;
      }

      // update stars
      for (let i = this.ns - 1; i >= 0; i--) {
        if (this.s[i].y < this.api.ggh()) {
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
      if (this.e.y < this.api.ggh() && this.a < 0) {
        if (this.sc % 1000 === 0) {
          this.es += 0.1;
        }
        this.e.y += this.es;
      } else {
        this.e.x = this.api.rnd(0, this.api.ggw() - 8);
        this.e.y = -100;
      }

      if (this.api.rrc(this.e, this.p)) {
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
      this.api.cls(12);

      // draw title screen
      if (this.a > 0) {
        this.api.print("Space Fighter", 10.1, 20.1, 15, this.a, 1.2);
        this.api.print("Space Fighter", 10, 20, 5, this.a, 1.2);
      }

      // draw background with stars
      let l = this.s.length;
      for (let i = 0; i < l; i++) {
        this.api.pix(this.s[i].x, this.s[i].y, this.s[i].c);
      }

      // if end reached
      if (this.sc < 0) {
        this.api.circ(31, this.ps, 50, 2);
        this.api.circb(31, this.ps + 1, 50, 1);
        this.api.print("Home reached!", 10, 20.1, 12, 1, 1.2);

        this.p.y -= this.pfs;
        this.api.spr(0, this.p.x, this.p.y);
        if (this.ps < 9) {
          this.ps += 0.1;
        }
      } else {
        // draw player
        this.api.anim(this.p, 0, 3, 10);

        // draw enemy
        this.api.anim(this.e, 3, 1, 10);

        // draw score
        this.api.print("" + this.sc, 2, 2, 15);
      }
    } else {
      // clear screen
      this.api.cls(0);
      this.api.print("Game Over", 16.1, 20.1, 15, 1, 1.2);
      this.api.print("Game Over", 16, 20, 5, 1, 1.2);
      this.api.circb(this.exp.x, this.exp.y, this.exp.r, 4);
      this.api.circb(this.exp.x, this.exp.y, this.exp.r - 2, 3);
      this.api.circb(this.exp.x, this.exp.y, this.exp.r - 4, 2);
      this.exp.r += 0.3;
      this.api.print("" + this.sc, 2, 2, 5);
    }
  }
}

window.onload = () => {
  var game = new Game(config);
};
