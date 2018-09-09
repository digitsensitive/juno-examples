"use strict";
/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno: API functions
 *
 * Here you will find the core functions of Juno.
 *
 * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}
 */
Object.defineProperty(exports, "__esModule", { value: true });
var API = /** @class */ (function () {
    function API(canvas, renderer, scaleFactor) {
        this.canvas = canvas;
        this.renderer = renderer;
        this.scaleFactor = scaleFactor;
        this.cnvArray = [];
    }
    /**
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
     * @param palette [The color palette]
     */
    API.prototype.initPalette = function (palette) {
        this.palette = [];
        var fromPositionInString = 0;
        while (fromPositionInString < 96) {
            this.palette.push(palette.substr(fromPositionInString, 6));
            fromPositionInString += 6;
        }
    };
    API.prototype.cls = function (color) {
        this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderer.fillStyle = "#" + this.palette[color];
        this.renderer.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.cnvArray = [];
    };
    API.prototype.pix = function (x0, y0, color) {
        /*let cnv = document.createElement("canvas");
        let ctx = cnv.getContext("2d");
        ctx.scale(this.scaleFactor, this.scaleFactor);*/
        var x = x0 * this.scaleFactor;
        var y = y0 * this.scaleFactor;
        /*
        var id = this.renderer.createImageData(this.scaleFactor, this.scaleFactor);
        var d = id.data;
        d[0] = this.palette[color].substr(0, 02);
        d[1] = this.palette[color].substr(2, 2);
        d[2] = this.palette[color].substr(4, 2);
        d[3] = "FF";
        this.renderer.fillStyle = "#" + this.palette[color];
        this.renderer.putImageData(id, xPos, yPos);*/
        this.renderer.fillStyle = "#" + this.palette[color];
        this.renderer.fillRect(x, y, this.scaleFactor, this.scaleFactor);
        //let newElement = this.canvas.appendChild(cnv);
        //this.cnvArray.push(newElement);
        //return newElement;
    };
    /**
     * Create a circle outline with the midpoint circle algorithm
     * @param  x         [x coordinate of the center of the circle]
     * @param  y         [y coordinate of the center of the circle]
     * @param  r         [Radius of the circle]
     * @param  thickness [Thickness of the circle outline]
     * @param  color     [Index of the color in the palette]
     */
    API.prototype.circb = function (x0, y0, r, thickness, color) {
        var x = r - 1;
        var y = 0;
        var dx = 1;
        var dy = 1;
        var diameter = r * 2;
        var decisionOver2 = dx - diameter;
        while (x >= y) {
            this.pix(x + x0, y + y0, color);
            this.pix(y + x0, x + y0, color);
            this.pix(-x + x0, y + y0, color);
            this.pix(-y + x0, x + y0, color);
            this.pix(-x + x0, -y + y0, color);
            this.pix(-y + x0, -x + y0, color);
            this.pix(x + x0, -y + y0, color);
            this.pix(y + x0, -x + y0, color);
            if (decisionOver2 <= 0) {
                y++;
                decisionOver2 += dy; // Change in decision criterion for y -> y+1
                dy += 2;
            }
            if (decisionOver2 > 0) {
                x--;
                dx += 2;
                decisionOver2 += -diameter + dx; // Change for y -> y+1, x -> x-1
            }
        }
    };
    /**
     * Create a circle outline with the Bresenham's circle algorithm
     * @param  x         [x coordinate of the center of the circle]
     * @param  y         [y coordinate of the center of the circle]
     * @param  r         [Radius of the circle]
     * @param  thickness [Thickness of the circle outline]
     * @param  color     [Index of the color in the palette]
     */
    API.prototype.circb2 = function (x0, y0, r, thickness, color) {
        var x = 0;
        var y = r;
        var p = 3 - 2 * r;
        this.pixel(x0, y0, x, y, color);
        while (x < y) {
            if (p < 0) {
                x++;
                p = p + 4 * x + 6;
            }
            else {
                x++;
                y--;
                p = p + 4 * (x - y) + 10;
            }
            this.pixel(x0, y0, x, y, color);
        }
    };
    API.prototype.pixel = function (xc, yc, x, y, color) {
        this.pix(xc + x, yc + y, color);
        this.pix(xc + x, yc - y, color);
        this.pix(xc - x, yc + y, color);
        this.pix(xc - x, yc - y, color);
        this.pix(xc + y, yc + x, color);
        this.pix(xc + y, yc - x, color);
        this.pix(xc - y, yc + x, color);
        this.pix(xc - y, yc - x, color);
    };
    return API;
}());
exports.API = API;
