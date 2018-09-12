"use strict";
/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Juno Core: Input Class
 * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Input = /** @class */ (function () {
    function Input(cr) {
        this.cr = cr;
        this.mouse = {};
        this.registerEvents();
    }
    Input.prototype.registerEvents = function () {
        var _this = this;
        if (this.cr.options.inputs.mouse) {
            this.cr.canvas.addEventListener("mousemove", function (e) {
                var rect = _this.cr.canvas.getBoundingClientRect();
                _this.mouse.x = (e.x - rect.left) / _this.cr.options.scaleFactor;
                _this.mouse.y = (e.y - rect.top) / _this.cr.options.scaleFactor;
            });
            // TODO: Add more event listener f.e. mousedown, mouseup ...
        }
        if (this.cr.options.inputs.keyboard) {
            window.addEventListener("keydown", function (e) {
                _this.lastKeyPressed = e.keyCode;
            });
            window.addEventListener("keyup", function (e) {
                _this.lastKeyPressed = undefined;
            });
        }
    };
    Input.prototype.getMousePosition = function () {
        return this.mouse;
    };
    Input.prototype.getLastPressedKey = function () {
        return this.lastKeyPressed;
    };
    Input.prototype.justDown = function (key) {
        if (key === this.lastKeyPressed) {
            return true;
        }
        else {
            return false;
        }
    };
    return Input;
}());
exports.Input = Input;
