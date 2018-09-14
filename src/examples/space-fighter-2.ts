/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Game Examples: Space Fighter II
 * @license      Digitsensitive
 */

import * as Juno from "../../juno-console/dist/index";

const config: Juno.IGameConfig = {
  name: "game",
  input: { keyboard: true },
  scale: 4,
  width: 240,
  height: 136,
  css: {
    borderWidth: "1rem",
    borderStyle: "solid",
    borderColor: "#4fa4f7",
    borderRadius: "10px"
  }
};

export class Game extends Juno.Game {
  // attack waves
  private AW = [
    {
      t: 100,
      n: 10,
      e: {
        sp: 16,
        health: 1,
        x: 80,
        y: 0,
        w: 8,
        h: 8,
        dx: 0,
        dy: 0.2,
        dc: Math.PI / 50
      }
    },
    {
      t: 100,
      n: 1,
      e: {
        sp: 18,
        health: 10,
        x: 80,
        y: 0,
        w: 8,
        h: 8,
        dx: 0,
        dy: 0.05,
        dc: Math.PI / 30
      }
    },
    {
      t: 400,
      n: 4,
      e: {
        sp: 16,
        health: 1,
        x: 40,
        y: 0,
        w: 8,
        h: 8,
        dx: 0,
        dy: 0.5,
        dc: -1
      }
    },
    {
      t: 800,
      n: 2,
      e: {
        sp: 16,
        health: 1,
        x: 80,
        y: 0,
        w: 8,
        h: 8,
        dx: 0,
        dy: 0.5,
        dc: -1
      }
    },
    {
      t: 1200,
      n: 3,
      e: {
        sp: 16,
        health: 1,
        x: 20,
        y: 0,
        w: 8,
        h: 8,
        dx: 0.5,
        dy: 0.5,
        dc: -1
      }
    },
    {
      t: 1400,
      n: 4,
      e: {
        sp: 16,
        health: 1,
        x: 180,
        y: 0,
        w: 8,
        h: 8,
        dx: -0.5,
        dy: 0.5,
        dc: -1
      }
    }
  ];

  private ship = {
    sp: 0,
    x: 100,
    y: 120,
    w: 8,
    h: 8,
    health: 3,
    l: 1,
    d: 1,
    s: 1,
    p: 0
  };

  private bullets: any[] = [];
  private enemies: any[] = [];
  private explosionCircles: any[] = [];
  private pickups: any[] = [];
  private stars: any[] = [];

  // pick-ups
  private superBombCircle: any = {};
  private laserLine: any = {};
  private defensiveShieldCircle: any = {};

  constructor(config: Juno.IGameConfig) {
    super(config);
    this.addState({
      name: "SpaceFighter2",
      instance: this
    });
  }

  init(): void {
    this.api.load("sprites", "./src/assets/", 8);
    this.addBackground();
  }

  update(): void {
    this.api.cls(0);
    this.handleInput();
    this.updateAttackWaves();
  }

  render(): void {
    this.drawObjects();
    this.drawUI();
  }

  handleInput(): void {
    if (this.api.key(0)) {
      this.ship.y -= 1;
    }
    if (this.api.key(1)) {
      this.ship.y += 1;
    }
    if (this.api.key(2)) {
      this.ship.x -= 2;
    }
    if (this.api.key(3)) {
      this.ship.x += 2;
    }
    if (this.api.keyp(4)) {
      if (this.ship.s !== 0) {
        this.ship.s--;
        this.superBomb();
      }
    }
    if (this.api.keyp(5)) {
      this.fire();
    }
    if (this.api.keyp(6)) {
      if (this.ship.l !== 0) {
        this.ship.l--;
        this.laserAttack();
      }
    }
    if (this.api.keyp(7)) {
      if (this.ship.d !== 0) {
        this.ship.d--;
        this.defensiveShield();
      }
    }
  }

  updateAttackWaves(): void {
    for (let w of this.AW) {
      if (w.t === this.api.ticks()) {
        this.createEnemies(w);
      }
    }
  }

  drawObjects(): void {
    // draw background with stars
    this.stars.forEach((s, i) => {
      s.y += s.s;
      this.api.pix(s.x, s.y, Math.floor(Math.random() * 10));
      if (s.y > this.api.ggh()) {
        s.y = 0;
      }
    });

    // draw our player
    this.api.anim(this.ship, 0, 2, 4);

    // bullets
    this.bullets.forEach((b, i) => {
      if (!this.bulletOfScreen(b)) {
        b.x += b.dx;
        b.y += b.dy;
        this.api.spr(b.sp, b.x, b.y);

        this.enemies.forEach((e, index) => {
          if (this.api.rrc(b, e)) {
            e.health -= 1;
            this.bullets.splice(i, 1);
            this.createCircleExplosion(e, 1);
            if (e.health === 0) {
              this.ship.p += 10;
              if (Math.floor(Math.random() * 10) === 3) {
                this.dropPickup(e);
              }
              this.createCircleExplosion(e, 3);
              this.enemies.splice(index, 1);
            }
          }
        });
      } else {
        this.bullets.splice(i, 1);
      }
    });

    // enemies
    this.enemies.forEach((e, i) => {
      if (!this.enemyOfScreen(e)) {
        if (e.c !== -1) {
          e.x += Math.cos(e.c) + e.dx;
          e.y += Math.sin(e.c) + e.dy;
          e.c += e.dc;
        } else {
          e.x += e.dx;
          e.y += e.dy;
        }

        this.api.anim(e, e.sp, 2, 4);

        if (this.api.crc(this.superBombCircle, e)) {
          this.ship.p += 10;
          this.enemies.splice(i, 1);
          this.createCircleExplosion(e, 3);
        }

        if (this.api.rrc(e, this.laserLine)) {
          this.ship.p += 10;
          this.enemies.splice(i, 1);
          this.createCircleExplosion(e, 3);
        }

        if (this.api.rrc(e, this.ship)) {
          this.ship.p += 10;
          this.enemies.splice(i, 1);
          this.playerDying();
          this.createCircleExplosion(e, 3);
        }
      } else {
        this.enemies.splice(i, 1);
      }
    });

    // explosion circles
    this.explosionCircles.forEach((c, i) => {
      if (c.r < 30) {
        this.api.circb(c.x, c.y, c.r, c.c);
        c.r += 1;
      } else {
        this.explosionCircles.splice(i, 1);
      }
    });

    // pickups
    this.pickups.forEach((p, i) => {
      p.y += 1;
      this.api.spr(p.t, p.x, p.y);
      if (p.y > this.api.ggh()) {
        this.pickups.splice(i, 1);
      }

      if (this.api.rrc(p, this.ship)) {
        this.pickups.splice(i, 1);
        switch (p.t) {
          case 32: {
            this.ship.l += 1;
            break;
          }
          case 33: {
            this.ship.d += 1;
            break;
          }
          case 34: {
            this.ship.s += 1;
            break;
          }
          case 35: {
            this.ship.health += 1;
            break;
          }
        }
      }
    });

    if (this.superBombCircle) {
      if (this.superBombCircle.r < 200) {
        this.api.circb(
          this.superBombCircle.x,
          this.superBombCircle.y,
          this.superBombCircle.r,
          this.superBombCircle.c
        );
        this.superBombCircle.r += 2;
      } else {
        this.superBombCircle = {};
      }
    }

    if (this.laserLine) {
      this.laserLine.d--;
      this.laserLine.x = this.ship.x + 3;
      this.laserLine.y = 0;
      this.laserLine.h = this.api.ggh() - (this.api.ggh() - this.ship.y - 1);
      if (this.laserLine.d > 0) {
        this.api.rect(
          this.laserLine.x,
          this.laserLine.y,
          this.laserLine.w,
          this.laserLine.h,
          Math.floor(Math.random() * 16)
        );
      } else {
        this.laserLine = {};
      }
    }

    if (this.defensiveShieldCircle) {
      this.defensiveShieldCircle.d--;
      if (this.defensiveShieldCircle.d > 0) {
        this.api.circb(
          this.ship.x + 3,
          this.ship.y + 3,
          this.defensiveShieldCircle.r,
          Math.floor(Math.random() * 16)
        );
      } else {
        this.defensiveShieldCircle = {};
      }
    }
  }

  drawUI(): void {
    // draw player lives
    for (let i = 1; i < 4; i++) {
      if (this.ship.health < i) {
        this.api.spr(4, 200 + i * 10, 10);
      } else {
        this.api.spr(3, 200 + i * 10, 10);
      }
    }

    // draw player pickup status
    this.api.spr(32, 10, this.api.ggh() - 30);
    this.api.print("x" + this.ship.d, 16, this.api.ggh() - 33, 10, 2);
    this.api.spr(33, 10, this.api.ggh() - 20);
    this.api.print("x" + this.ship.l, 16, this.api.ggh() - 23, 10, 2);
    this.api.spr(35, 10, this.api.ggh() - 10);
    this.api.print("x" + this.ship.s, 16, this.api.ggh() - 13, 10, 2);

    // draw player score
    this.api.print("Score: " + this.ship.p, 5, 5, 10, 2);
  }

  addBackground(): void {
    for (let i = 0; i < 10; i++) {
      let s = {
        x: Math.floor(Math.random() * this.api.ggw()) + 1,
        y: Math.floor(Math.random() * this.api.ggw()) + 1,
        s: 2,
        c: 10
      };
      this.stars.push(s);
    }
  }

  fire(): void {
    let b = {
      sp: 2,
      x: this.ship.x,
      y: this.ship.y - 2,
      w: 8,
      h: 8,
      dx: 0,
      dy: -3
    };
    this.bullets.push(b);
  }

  bulletOfScreen(b): boolean {
    if (b.y < 0) {
      return true;
    } else {
      return false;
    }
  }

  enemyOfScreen(e): boolean {
    if (e.y > this.api.ggh()) {
      return true;
    } else {
      return false;
    }
  }

  createCircleExplosion(pos, numb): void {
    for (let n = 0; n < numb; n++) {
      this.explosionCircles.push({
        x: pos.x,
        y: pos.y,
        r: n * 4,
        t: 1,
        c: Math.floor(Math.random() * 16)
      });
    }
  }
  createEnemies(w): void {
    for (let i = 1; i <= w.n; i++) {
      let enemy = {
        sp: w.e.sp,
        x: w.e.x + i * 20,
        y: -10,
        w: w.e.h,
        h: w.e.w,
        dx: w.e.dx,
        dy: w.e.dy,
        c: 0,
        dc: w.e.dc,
        health: w.e.health
      };
      this.enemies.push(enemy);
    }
  }

  playerDying(): void {
    this.ship.health -= 1;
    if (this.ship.health > 0) {
      this.resetPlayer();
    } else {
      // game over screen
      console.log("gameover");
    }
  }

  resetPlayer(): void {
    this.ship.x = 100;
    this.ship.y = 120;
  }

  superBomb(): void {
    this.superBombCircle = {
      x: this.ship.x,
      y: this.ship.y,
      r: 4,
      t: 1,
      c: Math.floor(Math.random() * 16)
    };
  }

  laserAttack(): void {
    this.laserLine = {
      x: this.ship.x + 3,
      y: this.ship.y - 1,
      w: 2,
      h: this.api.ggh() - this.ship.y,
      t: 2,
      c: 3,
      d: 100
    };
  }

  defensiveShield(): void {
    this.defensiveShieldCircle = {
      x: this.ship.x,
      y: this.ship.y,
      r: 8,
      t: 2,
      c: Math.floor(Math.random() * 16),
      d: 100
    };
  }

  // function that drops a random pickup when an enemy is killed
  dropPickup(o): void {
    // random number between 0 and 3
    let r = Math.floor(Math.random() * 3) + 0;

    // create new pickup
    let p = {
      x: o.x,
      y: o.y,
      w: 8,
      h: 8,
      t: 32 + r
    };

    // add pickup to array
    this.pickups.push(p);
  }
}

window.onload = () => {
  var game = new Game(config);
};
