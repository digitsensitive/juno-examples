/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Core: Input Class
 * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}
 */

import { ICanvasRenderer } from "../interfaces/canvas-renderer.interface";
import { IMouseCoordinates } from "../interfaces/mouse-coordinates.interface";

export class Input {
  private mouse: IMouseCoordinates = {} as IMouseCoordinates;
  private lastKeyPressed: number;

  constructor(private cr: ICanvasRenderer) {
    this.registerEvents();
  }

  private registerEvents(): void {
    if (this.cr.options.inputs.mouse) {
      this.cr.canvas.addEventListener("mousemove", e => {
        var rect = this.cr.canvas.getBoundingClientRect();
        this.mouse.x = (e.x - rect.left) / this.cr.options.scaleFactor;
        this.mouse.y = (e.y - rect.top) / this.cr.options.scaleFactor;
      });
      // TODO: Add more event listener f.e. mousedown, mouseup ...
    }

    if (this.cr.options.inputs.keyboard) {
      window.addEventListener("keydown", e => {
        this.lastKeyPressed = e.keyCode;
      });
      window.addEventListener("keyup", e => {
        this.lastKeyPressed = undefined;
      });
    }
  }

  public getMousePosition(): IMouseCoordinates {
    return this.mouse;
  }

  public getLastPressedKey(): number {
    return this.lastKeyPressed;
  }

  public justDown(key: number): boolean {
    if (key === this.lastKeyPressed) {
      return true;
    } else {
      return false;
    }
  }
}
