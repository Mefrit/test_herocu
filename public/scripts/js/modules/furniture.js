var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./person"], function (require, exports, person_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Furniture = void 0;
    var Furniture = (function (_super) {
        __extends(Furniture, _super);
        function Furniture(furniture) {
            var _this = _super.call(this, furniture) || this;
            _this.furniture = furniture;
            _this.x = furniture.x;
            _this.y = furniture.y;
            return _this;
        }
        return Furniture;
    }(person_1.Person));
    exports.Furniture = Furniture;
});
