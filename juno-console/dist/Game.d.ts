/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Game Class
 * @license      Digitsensitive
 */
export interface IGameConfig {
    name: string;
    scale: number;
    width?: number;
    height?: number;
}
export declare class Game {
    private canvas;
    private renderer;
    private scaleFactor;
    private gameLoop;
    private gameStates;
    constructor(config: IGameConfig);
    /**
     * This function starts the game.
     * You have to define a name for the state and
     * send the reference to the current game state.
     * @param name      [the name of the game state]
     * @param state     [the reference to the game state]
     */
    startGame(name: string, state: any): void;
    pix(x: number, y: number): void;
}
