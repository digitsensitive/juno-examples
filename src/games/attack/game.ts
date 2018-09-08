/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Attack
 * @license      Digitsensitive
 */

import * as Juno from "../../../node_modules/juno-console";

const config = {
  name: "game",
  scale: 8
};

export class Game extends Juno.Game {
  constructor(config) {
    super(config);

    for (let x = 0; x < 64; x++) {
      for (let y = 0; y < 64; y++) {
        this.pix(x, y);
      }
    }

    this.start(this);
    this.on("start", function() {
      console.log("started", this);
    });
    this.emit("start");
  }
}

window.onload = () => {
  var game = new Game(config);
};
