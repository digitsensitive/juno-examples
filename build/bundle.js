/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/rect.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./juno-console/dist/api.js":
/*!**********************************!*\
  !*** ./juno-console/dist/api.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @author       Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright    2018 Digitsensitive\n * @description  Juno: API functions\n *\n * Here you will find the core functions of Juno.\n *\n * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar API = /** @class */ (function () {\n    function API(canvas, renderer, scaleFactor) {\n        this.canvas = canvas;\n        this.renderer = renderer;\n        this.scaleFactor = scaleFactor;\n    }\n    /**\n     * Init color palette with chain hex color string\n     * Total 16 colors: 6 * 16 = 96 (string length)\n     * Examples:\n     * TIC-80 (DB16):\n     * 140C1C44243430346D4E4A4F854C30346524D04648757161597DCED27D2C8595A16DAA2CD2AA996DC2CADAD45EDEEED6\n     * COMMODORE VIC-20 PALETTE\n     * 000000ffffffa8734ae9b287772d26b6686285d4dcc5ffffa85fb4e99df5559e4a92df8742348b7e70cabdcc71ffffb0\n     * STILL LIFE PALETTE\n     * 3f28117a2222d13b27e07f8a5d853a68c127b3e868122615513155286fb89b8bffa8e4d4cc8218c7b581000000ffffff\n     * JAPANESE MACHINE PALETTE\n     * 00000019102846af45a1d685453e787664fe8331299ec2e8dc534be18d79d6b97be9d8a1216c4bd365c8afaab9f5f4eb\n     * CGARNE PALETTE\n     * 0000005e606e2234d10c7e455c2e78b5b5b5FFFFFFffd93f7be2f98a36224c81fb44aacceb8a60aa5c3d6cd947e23d69\n     * PSYGNOSIA PALETTE\n     * 0000001b1e29362747443f4152524c64647c73615077785b9ea4a7cbe8f7e08b79a2324e003308084a3c546a00516cbf\n     * COLOR GRAPHICS ADAPTER PALETTE\n     * 000000555555AAAAAAFFFFFF0000AA5555FF00AA0055FF5500AAAA55FFFFAA0000FF5555AA00AAFF55FFAA5500FFFF55\n     * EROGE COPPER PALETTE\n     * 0d080d4f2b24825b31c59154f0bd77fbdf9bfff9e4bebbb27bb24e74adbb4180a032535f2a23497d3840c16c5be89973\n     * EASTER ISLAND PALETTE\n     * f6f6bfe6d1d1868691794765f5e17aedc38dcc8d86ca657e39d4b98dbcd28184ab6860869dc0857ea788567864051625\n     * PICO-8 PALETTE\n     * 0000001D2B537E255383769CAB5236008751FF004D5F574FFF77A8FFA300C2C3C700E436FFCCAA29ADFFFFEC27FFF1E8\n     * GRAYSCALE\n     * 000000111111222222333333444444555555666666777777888888999999aaaaaabbbbbbccccccddddddeeeeeeffffff\n     *\n     * @param palette [index of the color in the palette]\n     */\n    API.prototype.ipal = function (palette) {\n        this.palette = [];\n        var fromPositionInString = 0;\n        while (fromPositionInString < 96) {\n            this.palette.push(palette.substr(fromPositionInString, 6));\n            fromPositionInString += 6;\n        }\n    };\n    /********************************************************************\n     * Clear the screen with a specified color.\n     * @param color [index of the color in the palette]\n     /********************************************************************/\n    API.prototype.cls = function (color) {\n        this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.renderer.fillStyle = \"#\" + this.palette[color];\n        this.renderer.fillRect(0, 0, this.canvas.width, this.canvas.height);\n    };\n    /********************************************************************\n     * Draw one pixel at a specific 2D location (x and y).\n     * @param x0    [x coordinate of the pixel]\n     * @param y0    [y coordinate of the pixel]\n     * @param color [index of the color in the palette]\n     ********************************************************************/\n    API.prototype.pix = function (x0, y0, color) {\n        this.renderer.fillStyle = \"#\" + this.palette[color];\n        this.renderer.fillRect(x0 * this.scaleFactor, y0 * this.scaleFactor, this.scaleFactor, this.scaleFactor);\n    };\n    /********************************************************************\n     * Create a circle outline with the Bresenham's circle algorithm.\n     * @param  x        [x coordinate of the center of the circle]\n     * @param  y        [y coordinate of the center of the circle]\n     * @param  r        [radius of the circle]\n     * @param  c        [index of the color in the palette]\n     ********************************************************************/\n    API.prototype.circb = function (x0, y0, r, c) {\n        var x = 0;\n        var y = r;\n        var p = 3 - 2 * r;\n        this.circbPixGroup(x0, y0, x, y, c);\n        while (x < y) {\n            if (p < 0) {\n                x++;\n                p = p + 4 * x + 6;\n            }\n            else {\n                x++;\n                y--;\n                p = p + 4 * (x - y) + 10;\n            }\n            this.circbPixGroup(x0, y0, x, y, c);\n        }\n    };\n    /********************************************************************\n     * [pixel description]\n     * @param xc [description]\n     * @param yc [description]\n     * @param x  [description]\n     * @param y  [description]\n     * @param c  [description]\n     ********************************************************************/\n    API.prototype.circbPixGroup = function (x0, y0, x, y, c) {\n        this.pix(x0 + x, y0 + y, c);\n        this.pix(x0 + x, y0 - y, c);\n        this.pix(x0 - x, y0 + y, c);\n        this.pix(x0 - x, y0 - y, c);\n        this.pix(x0 + y, y0 + x, c);\n        this.pix(x0 + y, y0 - x, c);\n        this.pix(x0 - y, y0 + x, c);\n        this.pix(x0 - y, y0 - x, c);\n    };\n    /********************************************************************\n     * Create a filled circle with the Bresenham's circle algorithm.\n     * @param  x         [x coordinate of the center of the circle]\n     * @param  y         [y coordinate of the center of the circle]\n     * @param  r         [radius of the circle]\n     * @param  c         [index of the color in the palette]\n     ********************************************************************/\n    API.prototype.circ = function (x0, y0, r, c) {\n        var x = 0;\n        var y = r;\n        var p = 3 - 2 * r;\n        this.circPixGroup(x0, y0, x, y, c);\n        while (x < y) {\n            if (p < 0) {\n                x++;\n                p = p + 4 * x + 6;\n            }\n            else {\n                x++;\n                y--;\n                p = p + 4 * (x - y) + 10;\n            }\n            this.circPixGroup(x0, y0, x, y, c);\n        }\n    };\n    /********************************************************************\n     * [pixel description]\n     * @param xc [description]\n     * @param yc [description]\n     * @param x  [description]\n     * @param y  [description]\n     * @param c  [description]\n     ********************************************************************/\n    API.prototype.circPixGroup = function (x0, y0, x, y, c) {\n        this.line(x0 - x, y0 + y, x0 + x, y0 + y, c);\n        this.pix(x0 + x, y0 + y, c);\n        this.pix(x0 + x, y0 - y, c);\n        this.pix(x0 - x, y0 + y, c);\n        this.pix(x0 - x, y0 - y, c);\n        this.pix(x0 + y, y0 + x, c);\n        this.pix(x0 + y, y0 - x, c);\n        this.pix(x0 - y, y0 + x, c);\n        this.pix(x0 - y, y0 - x, c);\n    };\n    /********************************************************************\n     * Create a line with the Bresenham's line algorithm.\n     * @param x0 [the starting x position]\n     * @param y0 [the starting y position]\n     * @param x1 [the ending x position]\n     * @param y1 [the ending y position]\n     * @param c  [index of the color in the palette]\n     ********************************************************************/\n    API.prototype.line = function (x0, y0, x1, y1, c) {\n        x0 = Math.ceil(x0);\n        y0 = Math.ceil(y0);\n        x1 = Math.ceil(x1);\n        y1 = Math.ceil(y1);\n        var dx = Math.abs(x1 - x0);\n        var dy = Math.abs(y1 - y0);\n        var sx = x0 < x1 ? 1 : -1;\n        var sy = y0 < y1 ? 1 : -1;\n        var err = dx - dy;\n        for (var x = 0; x <= dx; x++) {\n            for (var y = 0; y <= dy; y++) {\n                this.pix(x0, y0, c);\n                if (x0 == x1 && y0 == y1) {\n                    break;\n                }\n                var e2 = 2 * err;\n                if (e2 >= -dy) {\n                    err -= dy;\n                    x0 += sx;\n                }\n                if (e2 < dx) {\n                    err += dx;\n                    y0 += sy;\n                }\n            }\n        }\n    };\n    return API;\n}());\nexports.API = API;\n\n\n//# sourceURL=webpack:///./juno-console/dist/api.js?");

/***/ }),

/***/ "./juno-console/dist/game.js":
/*!***********************************!*\
  !*** ./juno-console/dist/game.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @author       Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright    2018 Digitsensitive\n * @description  Juno: Game Class\n *\n * This is the core game class of Juno.\n * It initialize the canvas, the renderer and the game loop.\n *\n * For the canvas we create the canvas element in this class and append it\n * with appendChild on the div element of the index.html.\n * An alternative would be to use\n * <HTMLCanvasElement>document.getElementById(config.name) and in the index.html\n * put <canvas>. The problem with that approach is, that I could not append\n * other canvas to the main canvas.\n *\n * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar api_1 = __webpack_require__(/*! ./api */ \"./juno-console/dist/api.js\");\nvar loop_1 = __webpack_require__(/*! ./loop */ \"./juno-console/dist/loop.js\");\nvar Game = /** @class */ (function () {\n    function Game(config) {\n        /**\n         * Init canvas\n         */\n        this.canvas = document.createElement(\"canvas\");\n        document.getElementById(config.name).appendChild(this.canvas);\n        /**\n         * Init renderer\n         */\n        this.renderer = this.canvas.getContext(\"2d\");\n        this.renderer.imageSmoothingEnabled = false;\n        this.scaleFactor = config.scale || 1;\n        this.renderer.scale(this.scaleFactor, this.scaleFactor);\n        /**\n         * Setup canvas\n         */\n        this.canvas.width =\n            config.width * this.scaleFactor || 64 * this.scaleFactor;\n        this.canvas.height =\n            config.height * this.scaleFactor || 64 * this.scaleFactor;\n        /**\n         * Init instance of game loop\n         */\n        this.gameLoop = new loop_1.GameLoop();\n        /**\n         * Init an API instance\n         */\n        this.api = new api_1.API(this.canvas, this.renderer, this.scaleFactor);\n        this.api.ipal(\"140C1C44243430346D4E4A4F854C30346524D04648757161597DCED27D2C8595A16DAA2CD2AA996DC2CADAD45EDEEED6\");\n        /**\n         * Array with the game states\n         */\n        this.gameStates = [];\n    }\n    Game.prototype.isJunoRunning = function () {\n        console.log(\"Juno's running smoothly!\");\n    };\n    /**\n     * This function starts the game.\n     * You have to define a name for the state and\n     * send the reference to the current game state.\n     * @param name      [the name of the game state]\n     * @param state     [the reference to the game state]\n     */\n    Game.prototype.startGame = function (name, state) {\n        // add the game state to the array\n        this.gameStates.push({ stateName: name, stateInstance: state });\n        // register events for the game state\n        this.gameLoop.on(\"update\", function (dt) {\n            state.update(dt);\n        }, state);\n        this.gameLoop.on(\"render\", function (dt) {\n            state.render(dt);\n        }, state);\n        // start the game loop with this state\n        this.gameLoop.start(name);\n    };\n    return Game;\n}());\nexports.Game = Game;\n\n\n//# sourceURL=webpack:///./juno-console/dist/game.js?");

/***/ }),

/***/ "./juno-console/dist/index.js":
/*!************************************!*\
  !*** ./juno-console/dist/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @author       Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright    2018 Digitsensitive\n * @description  Juno: Index\n * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}\n */\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./game */ \"./juno-console/dist/game.js\"));\n__export(__webpack_require__(/*! ./loop */ \"./juno-console/dist/loop.js\"));\n__export(__webpack_require__(/*! ./api */ \"./juno-console/dist/api.js\"));\n__export(__webpack_require__(/*! ./polyfills/performance.now */ \"./juno-console/dist/polyfills/performance.now.js\"));\n\n\n//# sourceURL=webpack:///./juno-console/dist/index.js?");

/***/ }),

/***/ "./juno-console/dist/loop.js":
/*!***********************************!*\
  !*** ./juno-console/dist/loop.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @author       Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright    2018 Digitsensitive\n * @description  Juno: Game Loop\n *\n * This is the core game loop of the juno html5 game framework.\n * Juno uses a fixed update time step with a variable rendering. This\n * means, that it updates with a fixed time step, but can drop rendering\n * frames to catch up.\n *\n * The Game Loop makes use of EventEmitter to communicate.\n *\n * Regarding Request Animation Frame Juno uses the most basic implementation.\n *\n * Regarding Time Juno uses the most basic implementation of performane.now\n * (see polyfills/performance.now.ts).\n *\n * References:\n * http://gameprogrammingpatterns.com/game-loop.html (Date: 2018-09-09)\n * https://gafferongames.com/post/fix_your_timestep (Date: 2018-09-09)\n * http://www.koonsolo.com/news/dewitters-gameloop (Date: 2018-09-09)\n * https://github.com/sethvincent/gameloop (Date: 2018-09-09)\n *\n * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}\n */\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar eventemitter3_1 = __webpack_require__(/*! ../node_modules/eventemitter3 */ \"./juno-console/node_modules/eventemitter3/index.js\");\nvar performance_now_1 = __webpack_require__(/*! ./polyfills/performance.now */ \"./juno-console/dist/polyfills/performance.now.js\");\nvar GameLoop = /** @class */ (function (_super) {\n    __extends(GameLoop, _super);\n    function GameLoop() {\n        var _this = _super.call(this) || this;\n        _this.fps = 60;\n        _this.paused = false;\n        _this.step = 1 / _this.fps;\n        return _this;\n    }\n    /**\n     * Start the game loop\n     * @param state [name of the state to start]\n     */\n    GameLoop.prototype.start = function (state) {\n        this.paused = false;\n        this.currentTime = performance_now_1.ElapsedTime();\n        this.accumulator = 0;\n        requestAnimationFrame(this.frame.bind(this));\n    };\n    /**\n     * Execution of one frame (= tick).\n     */\n    GameLoop.prototype.frame = function () {\n        if (!this.paused) {\n            var newTime = performance_now_1.ElapsedTime();\n            // it is important that frameTime is in seconds\n            // because this.step is also in seconds\n            var frameTime = (newTime - this.currentTime) / 1000;\n            this.currentTime = newTime;\n            this.accumulator += frameTime;\n            while (this.accumulator >= this.step) {\n                this.update(this.step);\n                this.accumulator -= this.step;\n            }\n            this.render(this.accumulator / this.step);\n            requestAnimationFrame(this.frame.bind(this));\n        }\n    };\n    /**\n     * Update the game\n     * @param interval [interval in seconds]\n     */\n    GameLoop.prototype.update = function (interval) {\n        this.emit(\"update\", interval);\n    };\n    /**\n     * Render the game\n     * @param delta [delta in seconds]\n     */\n    GameLoop.prototype.render = function (delta) {\n        this.emit(\"render\", delta);\n    };\n    return GameLoop;\n}(eventemitter3_1.EventEmitter));\nexports.GameLoop = GameLoop;\n\n\n//# sourceURL=webpack:///./juno-console/dist/loop.js?");

/***/ }),

/***/ "./juno-console/dist/polyfills/performance.now.js":
/*!********************************************************!*\
  !*** ./juno-console/dist/polyfills/performance.now.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @author       Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright    2018 Digitsensitive\n * @description  Juno: Performance Now\n *\n * The most basic implementation of getting the elapsed time in milliseconds\n * since time origin (time user has opened the browser window).\n *\n * References:\n * https://developer.mozilla.org/en-US/docs/Web/API/Performance/now (Date: 2018-09-09)\n * https://www.w3schools.com/jsref/jsref_gettime.asp (Date: 2018-09-09)\n * https://developers.google.com/web/updates/2012/08/When-milliseconds-are-not-enough-performance-now (Date: 2018-09-09)\n *\n * @license      {@link https://github.com/digitsensitive/juno-console/blob/master/license.txt|MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction ElapsedTime() {\n    if (window.performance && window.performance.now) {\n        return window.performance.now();\n    }\n    else {\n        return new Date().getTime();\n    }\n}\nexports.ElapsedTime = ElapsedTime;\n\n\n//# sourceURL=webpack:///./juno-console/dist/polyfills/performance.now.js?");

/***/ }),

/***/ "./juno-console/node_modules/eventemitter3/index.js":
/*!**********************************************************!*\
  !*** ./juno-console/node_modules/eventemitter3/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty\n  , prefix = '~';\n\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\nfunction Events() {}\n\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n  Events.prototype = Object.create(null);\n\n  //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n  if (!new Events().__proto__) prefix = false;\n}\n\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once)\n    , evt = prefix ? prefix + event : event;\n\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n  else emitter._events[evt] = [emitter._events[evt], listener];\n\n  return emitter;\n}\n\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();\n  else delete emitter._events[evt];\n}\n\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = []\n    , events\n    , name;\n\n  if (this._eventsCount === 0) return names;\n\n  for (name in (events = this._events)) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event\n    , handlers = this._events[evt];\n\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event\n    , listeners = this._events[evt];\n\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return false;\n\n  var listeners = this._events[evt]\n    , len = arguments.length\n    , args\n    , i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1: return listeners.fn.call(listeners.context), true;\n      case 2: return listeners.fn.call(listeners.context, a1), true;\n      case 3: return listeners.fn.call(listeners.context, a1, a2), true;\n      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;\n      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len -1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length\n      , j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1: listeners[i].fn.call(listeners[i].context); break;\n        case 2: listeners[i].fn.call(listeners[i].context, a1); break;\n        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;\n        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;\n        default:\n          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return this;\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (\n      listeners.fn === fn &&\n      (!once || listeners.once) &&\n      (!context || listeners.context === context)\n    ) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (\n        listeners[i].fn !== fn ||\n        (once && !listeners[i].once) ||\n        (context && listeners[i].context !== context)\n      ) {\n        events.push(listeners[i]);\n      }\n    }\n\n    //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n    else clearEvent(this, evt);\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n};\n\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n\n//\n// Expose the module.\n//\nif (true) {\n  module.exports = EventEmitter;\n}\n\n\n//# sourceURL=webpack:///./juno-console/node_modules/eventemitter3/index.js?");

/***/ }),

/***/ "./src/rect.ts":
/*!*********************!*\
  !*** ./src/rect.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * @author       Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright    2018 Digitsensitive\n * @description  Rect example\n *\n * A small example to show how to use the Juno.API.Rect() function.\n *\n * @license      Digitsensitive\n */\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    }\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Juno = __webpack_require__(/*! ../juno-console/dist/index */ \"./juno-console/dist/index.js\");\nvar config = {\n    name: \"game\",\n    scale: 8\n};\nvar Game = /** @class */ (function (_super) {\n    __extends(Game, _super);\n    function Game(config) {\n        var _this = _super.call(this, config) || this;\n        _this.startGame(\"Rect\", _this);\n        return _this;\n    }\n    Game.prototype.update = function (dt) { };\n    Game.prototype.render = function (dt) {\n        this.api.cls(3);\n    };\n    return Game;\n}(Juno.Game));\nexports.Game = Game;\nwindow.onload = function () {\n    var game = new Game(config);\n};\n\n\n//# sourceURL=webpack:///./src/rect.ts?");

/***/ })

/******/ });