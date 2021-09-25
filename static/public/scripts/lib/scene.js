define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = (function () {
        function Scene() {
            console.log("init 1111111111");
            this.start();
        }
        Scene.prototype.start = function () {
            console.log("start ");
        };
        return Scene;
    }());
    exports.Scene = Scene;
});
