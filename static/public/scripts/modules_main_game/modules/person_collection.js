define(["require", "exports", "./person", ".//furniture"], function (require, exports, person_1, furniture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collection = void 0;
    var Collection = (function () {
        function Collection(data, mode) {
            if (mode === void 0) { mode = "person"; }
            this.collection = data.map(function (elem) {
                if (mode == "person") {
                    return new person_1.Person(elem);
                }
                else {
                    return new furniture_1.Furniture(elem);
                }
            });
        }
        Collection.prototype.getCollection = function () {
            return this.collection;
        };
        Collection.prototype.addPerson = function (elem) {
            this.collection.push(elem);
        };
        Collection.prototype.checkFreeCoord = function (coord) {
            var res = true;
            this.collection.forEach(function (element) {
                if (element.x == coord.x && element.y == coord.y) {
                    if (!element.isNotDied()) {
                        res = false;
                    }
                }
            });
            return res;
        };
        Collection.prototype.getPersonById = function (id) {
            return this.collection.filter(function (elem) {
                if (!elem.isNotDied() && elem.person.id == id) {
                    return elem;
                }
            });
        };
        Collection.prototype.getAiArchers = function () {
            return this.collection.filter(function (elem) {
                if (elem.person.evil && elem.person.class == "archer") {
                    return elem;
                }
            });
        };
        Collection.prototype.updateElement = function (unit) {
            this.collection = this.collection.map(function (elem) {
                if (unit.getId() == elem.getId()) {
                    return unit;
                }
                else {
                    return elem;
                }
            });
        };
        return Collection;
    }());
    exports.Collection = Collection;
});
