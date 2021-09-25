define(["require", "exports", "./js/loader", "./js/modules/ai", "./js/modules/scene"], function (require, exports, loader_1, ai_1, scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var loader = new loader_1.Downloader();
    var arrPersons = [
        {
            url: "./src/images/hola_1.png",
            x: 11,
            y: 3,
            evil: false,
            class: "fighter",
            damage: 15,
            health: 95,
            id: 0,
        },
        {
            url: "./src/images/person1.png",
            x: 4,
            y: 3,
            evil: false,
            class: "fighter",
            damage: 15,
            health: 95,
            id: 1,
        },
    ];
    var arrFurniture = [
        {
            url: "./src/images/table.png",
            x: 11,
            y: 1,
            id: 0,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 0,
            y: 1,
            id: 46,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 2,
            y: 1,
            id: 44,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 0,
            y: 3,
            id: 41,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 10,
            y: 1,
            id: 42,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 0,
            y: 6,
            id: 5,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 0,
            y: 9,
            id: 1,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 2,
            y: 6,
            id: 5,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 2,
            y: 9,
            id: 1,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 5,
            y: 2,
            id: 1,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 5,
            y: 3,
            id: 1,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 6,
            y: 2,
            id: 1,
            type: "table",
        },
        {
            url: "./src/images/table.png",
            x: 6,
            y: 3,
            id: 1,
            type: "table",
        },
        {
            url: "./src/images/plita.png",
            x: 6,
            y: 9,
            id: 2,
            type: "kitchen",
        },
        {
            url: "./src/images/wardrobe.png",
            x: 5,
            y: 9,
            id: 3,
            type: "kitchen",
        },
        {
            url: "./src/images/wardrobe.png",
            x: 4,
            y: 9,
            id: 3,
            type: "kitchen",
        },
        {
            url: "./src/images/icebox_2.png",
            x: 7,
            y: 9,
            id: 33,
            type: "kitchen",
        },
        {
            url: "./src/images/icebox_1.png",
            x: 7,
            y: 8,
            id: 32,
            type: "kitchen",
        },
        {
            url: "./src/images/icebox_1.png",
            x: 7,
            y: 8,
            id: 32,
            type: "kitchen",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 9,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 8,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 6,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 5,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 2,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 1,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 3,
            y: 0,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 8,
            y: 0,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 8,
            y: 1,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls.png",
            x: 8,
            y: 2,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls_gor.png",
            x: 0,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls_gor.png",
            x: 1,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls_gor.png",
            x: 2,
            y: 4,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls_gor.png",
            x: 11,
            y: 3,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls_gor.png",
            x: 12,
            y: 3,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/walls_gor.png",
            x: 13,
            y: 3,
            id: 3,
            type: "wall",
        },
        {
            url: "./src/images/game_1.png",
            x: 13,
            y: 5,
            id: 3,
            type: "game",
        },
        {
            url: "./src/images/game_2.png",
            x: 13,
            y: 4,
            id: 3,
            type: "game",
        },
        {
            url: "./src/images/desck.png",
            x: 4,
            y: 0,
            id: 3,
            type: "desck",
        },
        {
            url: "./src/images/desck.png",
            x: 5,
            y: 0,
            id: 3,
            type: "desck",
        },
        {
            url: "./src/images/desck.png",
            x: 6,
            y: 0,
            id: 3,
            type: "desck",
        },
        {
            url: "./src/images/desck.png",
            x: 7,
            y: 0,
            id: 3,
            type: "desck",
        },
    ];
    var config_skins = [];
    var Director = (function () {
        function Director(loader, arrPersons) {
            var _this = this;
            this.startAI = function () {
                _this.ai.step();
            };
            this.ai = new ai_1.Ai([]);
            this.scene = new scene_1.Scene(loader, arrPersons, config_skins, arrFurniture);
            this.start();
        }
        Director.prototype.start = function () {
        };
        return Director;
    }());
    new Director(loader, arrPersons);
});
