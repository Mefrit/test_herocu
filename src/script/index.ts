// import * as React from "react";
// import * as ReactDOM from "react-dom";
import { Downloader } from "./js/loader";
import { Ai } from "./js/modules/ai";
import { Scene } from "./js/modules/scene";
// import { Persons } from './js/modules/personsController';
// import { Module } from "./components/modules/module";

let loader = new Downloader();
// to json
// FIX ME низя 1 фотку вставлять в несколько изображений

let arrPersons = [
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
let arrFurniture = [
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
// wardrobe
let config_skins = [];

class Director {
    scene: any;
    ai: any;
    persController: any;
    constructor(loader, arrPersons) {
        this.ai = new Ai([]);
        this.scene = new Scene(loader, arrPersons, config_skins, arrFurniture);

        // this.ai.initScene(this.scene);
        this.start();
    }
    start() {
        // let play: any = document.getElementById("play_btn");
        // play.addEventListener("click", this.startAI);
        // let container: any = document.getElementById("container");
        // container.appendChild(play);
    }
    startAI = () => {
        this.ai.step();
    };
}
new Director(loader, arrPersons);
