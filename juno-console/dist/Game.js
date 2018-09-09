"use strict";
/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Game Class
 * @license      Digitsensitive
 */
Object.defineProperty(exports, "__esModule", { value: true });
var loop_1 = require("./loop");
var Game = /** @class */ (function () {
    function Game(config) {
        /**
         * Init canvas
         */
        this.canvas = document.getElementById(config.name);
        /**
         * Init renderer
         */
        this.renderer = this.canvas.getContext("2d");
        this.renderer.imageSmoothingEnabled = false;
        this.scaleFactor = config.scale || 1;
        this.renderer.scale(this.scaleFactor, this.scaleFactor);
        /**
         * Setup canvas
         */
        this.canvas.width =
            config.width * this.scaleFactor || 64 * this.scaleFactor;
        this.canvas.height =
            config.height * this.scaleFactor || 64 * this.scaleFactor;
        /**
         * Init instance of game loop
         */
        this.gameLoop = new loop_1.GameLoop();
        /**
         * Array with the game states
         */
        this.gameStates = [];
    }
    /**
     * This function starts the game.
     * You have to define a name for the state and
     * send the reference to the current game state.
     * @param name      [the name of the game state]
     * @param state     [the reference to the game state]
     */
    Game.prototype.startGame = function (name, state) {
        // add the game state to the array
        this.gameStates.push({ stateName: name, stateInstance: state });
        // register events for the game state
        this.gameLoop.on("update", function (dt) {
            state.update(dt);
        }, state);
        this.gameLoop.on("render", function (dt) {
            state.render(dt);
        }, state);
        // start the game loop with this state
        this.gameLoop.start(name);
    };
    Game.prototype.pix = function (x, y) {
        var rc = 55;
        var xPos = x * this.scaleFactor;
        var yPos = y * this.scaleFactor;
        this.renderer.fillStyle = "rgba(" + rc + ",0,0,1)";
        this.renderer.fillRect(xPos, yPos, this.scaleFactor, this.scaleFactor);
    };
    return Game;
}());
exports.Game = Game;
