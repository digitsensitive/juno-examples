/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Core: API functions
 *
 * Here you will find the core functions of Juno.
 *
 * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}
 */

import { ICanvasRenderer } from "../interfaces/canvas-renderer.interface";
import { Input } from "./input";
import { IMouseCoordinates } from "../interfaces/mouse-coordinates.interface";

export class API {
  private palette: string[];
  private spritesheets: any[] = [];

  constructor(private cr: ICanvasRenderer, private inputs: Input) {}

  /********************************************************************
   * Init color palette with chain hex color string
   * Total 16 colors: 6 * 16 = 96 (string length)
   * Examples:
   * TIC-80 (DB16):
   * 140C1C44243430346D4E4A4F854C30346524D04648757161597DCED27D2C8595A16DAA2CD2AA996DC2CADAD45EDEEED6
   * COMMODORE VIC-20 PALETTE
   * 000000ffffffa8734ae9b287772d26b6686285d4dcc5ffffa85fb4e99df5559e4a92df8742348b7e70cabdcc71ffffb0
   * STILL LIFE PALETTE
   * 3f28117a2222d13b27e07f8a5d853a68c127b3e868122615513155286fb89b8bffa8e4d4cc8218c7b581000000ffffff
   * JAPANESE MACHINE PALETTE
   * 00000019102846af45a1d685453e787664fe8331299ec2e8dc534be18d79d6b97be9d8a1216c4bd365c8afaab9f5f4eb
   * CGARNE PALETTE
   * 0000005e606e2234d10c7e455c2e78b5b5b5FFFFFFffd93f7be2f98a36224c81fb44aacceb8a60aa5c3d6cd947e23d69
   * PSYGNOSIA PALETTE
   * 0000001b1e29362747443f4152524c64647c73615077785b9ea4a7cbe8f7e08b79a2324e003308084a3c546a00516cbf
   * COLOR GRAPHICS ADAPTER PALETTE
   * 000000555555AAAAAAFFFFFF0000AA5555FF00AA0055FF5500AAAA55FFFFAA0000FF5555AA00AAFF55FFAA5500FFFF55
   * EROGE COPPER PALETTE
   * 0d080d4f2b24825b31c59154f0bd77fbdf9bfff9e4bebbb27bb24e74adbb4180a032535f2a23497d3840c16c5be89973
   * EASTER ISLAND PALETTE
   * f6f6bfe6d1d1868691794765f5e17aedc38dcc8d86ca657e39d4b98dbcd28184ab6860869dc0857ea788567864051625
   * PICO-8 PALETTE
   * 0000001D2B537E255383769CAB5236008751FF004D5F574FFF77A8FFA300C2C3C700E436FFCCAA29ADFFFFEC27FFF1E8
   * GRAYSCALE
   * 000000111111222222333333444444555555666666777777888888999999aaaaaabbbbbbccccccddddddeeeeeeffffff
   *
   * @param palette [index of the color in the palette]
   ********************************************************************/
  public ipal(palette: string): void {
    this.palette = [];
    let fromPositionInString = 0;
    while (fromPositionInString < 96) {
      this.palette.push(palette.substr(fromPositionInString, 6));
      fromPositionInString += 6;
    }
  }

  /********************************************************************
   * Clear the screen with a specified color.
   * @param color [index of the color in the palette]
   /********************************************************************/
  public cls(c: number): void {
    // evaluate runtime errors
    this.colorRangeError(c);

    this.cr.renderer.clearRect(
      0,
      0,
      this.cr.canvas.width,
      this.cr.canvas.height
    );
    this.cr.renderer.fillStyle = "#" + this.palette[c];
    this.cr.renderer.fillRect(
      0,
      0,
      this.cr.canvas.width,
      this.cr.canvas.height
    );
  }

  /********************************************************************
   * Draw one pixel at a specific 2D location (x and y).
   * @param x0    [x coordinate of the pixel]
   * @param y0    [y coordinate of the pixel]
   * @param color [index of the color in the palette]
   ********************************************************************/
  public pix(x0: number, y0: number, c: number): void {
    // evaluate runtime errors
    this.colorRangeError(c);

    this.cr.renderer.fillStyle = "#" + this.palette[c];
    this.cr.renderer.fillRect(
      x0 * this.cr.options.scaleFactor,
      y0 * this.cr.options.scaleFactor,
      this.cr.options.scaleFactor,
      this.cr.options.scaleFactor
    );
  }

  /********************************************************************
   * Create a circle outline with the Bresenham's circle algorithm.
   * @param  x        [x coordinate of the center of the circle]
   * @param  y        [y coordinate of the center of the circle]
   * @param  r        [radius of the circle]
   * @param  c        [index of the color in the palette]
   ********************************************************************/
  public circb(x0: number, y0: number, r: number, c: number): void {
    // evaluate runtime errors
    this.colorRangeError(c);

    let x = 0;
    let y = r;
    let p = 3 - 2 * r;
    this.circbPixGroup(x0, y0, x, y, c);

    while (x < y) {
      if (p < 0) {
        x++;
        p = p + 4 * x + 6;
      } else {
        x++;
        y--;
        p = p + 4 * (x - y) + 10;
      }
      this.circbPixGroup(x0, y0, x, y, c);
    }
  }

  /********************************************************************
   * [pixel description]
   * @param xc [description]
   * @param yc [description]
   * @param x  [description]
   * @param y  [description]
   * @param c  [description]
   ********************************************************************/
  private circbPixGroup(
    x0: number,
    y0: number,
    x: number,
    y: number,
    c: number
  ): void {
    this.pix(x0 + x, y0 + y, c);
    this.pix(x0 + x, y0 - y, c);
    this.pix(x0 - x, y0 + y, c);
    this.pix(x0 - x, y0 - y, c);
    this.pix(x0 + y, y0 + x, c);
    this.pix(x0 + y, y0 - x, c);
    this.pix(x0 - y, y0 + x, c);
    this.pix(x0 - y, y0 - x, c);
  }

  /********************************************************************
   * Create a filled circle with the Bresenham's circle algorithm.
   * @param  x         [x coordinate of the center of the circle]
   * @param  y         [y coordinate of the center of the circle]
   * @param  r         [radius of the circle]
   * @param  c         [index of the color in the palette]
   ********************************************************************/
  public circ(x0: number, y0: number, r: number, c: number): void {
    // evaluate runtime errors
    this.colorRangeError(c);

    let x = 0;
    let y = r;
    let p = 3 - 2 * r;
    this.circPixGroup(x0, y0, x, y, c);

    while (x < y) {
      if (p < 0) {
        x++;
        p = p + 4 * x + 6;
      } else {
        x++;
        y--;
        p = p + 4 * (x - y) + 10;
      }
      this.circPixGroup(x0, y0, x, y, c);
    }
  }

  /********************************************************************
   * [pixel description]
   * @param xc [description]
   * @param yc [description]
   * @param x  [description]
   * @param y  [description]
   * @param c  [description]
   ********************************************************************/
  private circPixGroup(
    x0: number,
    y0: number,
    x: number,
    y: number,
    c: number
  ): void {
    this.line(x0 - x, y0 + y, x0 + x, y0 + y, c);
    this.line(x0 + x, y0 - y, x0 - x, y0 - y, c);
    this.line(x0 + x, y0 + y, x0 - x, y0 + y, c);
    this.line(x0 + x, y0 - y, x0 - x, y0 - y, c);
  }

  /********************************************************************
   * Create a line with the Bresenham's line algorithm.
   * @param x0 [the starting x position]
   * @param y0 [the starting y position]
   * @param x1 [the ending x position]
   * @param y1 [the ending y position]
   * @param c  [index of the color in the palette]
   ********************************************************************/
  public line(x0: number, y0: number, x1: number, y1: number, c: number): void {
    // evaluate runtime errors
    this.colorRangeError(c);

    x0 = Math.ceil(x0);
    y0 = Math.ceil(y0);
    x1 = Math.ceil(x1);
    y1 = Math.ceil(y1);
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    for (let x = 0; x <= dx; x++) {
      for (let y = 0; y <= dy; y++) {
        this.pix(x0, y0, c);
        if (x0 == x1 && y0 == y1) {
          break;
        }
        let e2 = 2 * err;
        if (e2 >= -dy) {
          err -= dy;
          x0 += sx;
        }
        if (e2 < dx) {
          err += dx;
          y0 += sy;
        }
      }
    }
  }

  /********************************************************************
   * Draw a filled rectangle.
   * @param x0    [the x position of the rectangle]
   * @param y0    [the y position of the rectangle]
   * @param w     [the width of the rectangle]
   * @param h     [the height of the rectangle]
   * @param c [index of the color in the palette]
   ********************************************************************/
  public rect(x0: number, y0: number, w: number, h: number, c: number): void {
    // evaluate runtime errors
    if (w <= 0) {
      throw new RangeError("The width of a rectangle must be > 0. ");
    } else if (h <= 0) {
      throw new RangeError("The height of a rectangle must be > 0. ");
    }
    this.colorRangeError(c);

    this.cr.renderer.fillStyle = "#" + this.palette[c];
    this.cr.renderer.fillRect(
      x0 * this.cr.options.scaleFactor,
      y0 * this.cr.options.scaleFactor,
      w * this.cr.options.scaleFactor,
      h * this.cr.options.scaleFactor
    );
  }

  /********************************************************************
   * Draw a rectangle outline.
   * @param x0    [the x position of the rectangle]
   * @param y0    [the y position of the rectangle]
   * @param w     [the width of the rectangle]
   * @param h     [the height of the rectangle]
   * @param c     [index of the color in the palette]
   ********************************************************************/
  public rectb(x0: number, y0: number, w: number, h: number, c: number): void {
    // evaluate runtime errors
    if (w <= 0) {
      throw new RangeError("The width of a rectangle must be > 0. ");
    } else if (h <= 0) {
      throw new RangeError("The height of a rectangle must be > 0. ");
    }
    this.colorRangeError(c);

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
          this.pix(x0 + x, y0 + y, c);
        }
      }
    }
  }

  /********************************************************************
   * Print text.
   * @param s  [string to print]
   * @param x  [x position of the text]
   * @param y  [y position of the text]
   * @param c  [index of the color in the palette]
   * @param sc [scale factor of the text]
   ********************************************************************/
  public print(
    s: string,
    x0: number,
    y0: number,
    c: number,
    sc?: number
  ): void {
    // evaluate runtime errors
    if (sc !== undefined && sc < 1) {
      throw new RangeError("The font size cannot be smaller than 1. ");
    } else if (s.length === 0) {
      throw new RangeError("The font length must be longer than 0. ");
    }
    this.colorRangeError(c);

    let size =
      sc * 3 * this.cr.options.scaleFactor || 3 * this.cr.options.scaleFactor;
    this.cr.renderer.font = size + "px Juno";
    this.cr.renderer.fillStyle = "#" + this.palette[c];
    this.cr.renderer.fillText(
      s,
      x0 * this.cr.options.scaleFactor,
      y0 * this.cr.options.scaleFactor + size
    );
  }

  /********************************************************************
   * Trace a string or a number => Alternative to console.log().
   * @param s [the string or number to trace]
   ********************************************************************/
  public trace(s: string | number): void {
    if (typeof s === "number") {
      s = s.toString();
    }
    this.print(s, 0, 0, 12);
  }

  public load(n: string, p: string): void {
    let image = new Image();

    let nameWithPNG = n + ".png";
    let fullPath = p + nameWithPNG;

    image.src = fullPath;
    this.spritesheets.push(image);
  }

  public spr(s: number, x0: number, y0: number): void {
    //this.canvas.style.imageRendering = "pixelated";

    /*-moz-crisp-edges;
            image-rendering: -webkit-crisp-edges;
            image-rendering: pixelated;
            image-rendering: crisp-edges;*/
    this.cr.renderer.drawImage(
      this.spritesheets[0],
      0,
      0,
      8,
      8,
      x0 * this.cr.options.scaleFactor,
      y0 * this.cr.options.scaleFactor,
      8 * this.cr.options.scaleFactor,
      8 * this.cr.options.scaleFactor
    );
  }

  /********************************************************************
   * Return the mouse coordinates.
   * @param  e [description]
   * @return   [The mouse coordinates]
   ********************************************************************/
  public mouse(): IMouseCoordinates {
    return this.inputs.getMousePosition();
  }

  /********************************************************************
   * Get the game width in pixels
   * @return [game width]
   ********************************************************************/
  public ggw(): number {
    return this.cr.canvas.width / this.cr.options.scaleFactor;
  }

  /********************************************************************
   * Get the game height in pixels
   * @return [game height]
   ********************************************************************/
  public ggh(): number {
    return this.cr.canvas.height / this.cr.options.scaleFactor;
  }

  /********************************************************************
   * [colorRangeError description]
   * @param color [description]
   ********************************************************************/
  private colorRangeError(color: number): void {
    if (color < 0 || color > 15) {
      throw new RangeError(
        "You have selected an incorrect color index. The color must be between 0-15"
      );
    }
  }
}
