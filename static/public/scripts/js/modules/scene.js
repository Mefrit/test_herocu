define(["require", "exports", "../viewScene", "./person_collection", "../lib/dragon", "../lib/miniGame", "../lib/deskBoard"], function (require, exports, viewScene_1, person_collection_1, dragon_1, miniGame_1, deskBoard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = (function () {
        function Scene(loader, arrImg, config_skins, arrFurniture, ai) {
            var _this = this;
            if (ai === void 0) { ai = false; }
            this.onBlock = function (event) {
                var block = event.target, posX, posY;
                if (_this.canvas != undefined) {
                    posX = Math.abs(parseInt(_this.canvas.style.left.split("px")[0]) - _this.getCoordFromStyle(block.style.left));
                    posY = Math.abs(parseInt(_this.canvas.style.top.split("px")[0]) - _this.getCoordFromStyle(block.style.top));
                    block.classList.add("block__free");
                }
            };
            this.syncUnit = function (data) {
                _this.person_collection = data;
            };
            this.onOutBlock = function (event) {
                event.target.classList.remove("block__free");
                event.target.classList.remove("block__nonFree");
            };
            this.onMove = function (event) {
                var posX = event.target.style.left, posY = event.target.style.top;
                _this.movePersonByCoord(_this.canvas, posX, posY);
            };
            this.onChangePerson = function (event) {
                var canvas = event.target;
                if (_this.canvas != undefined) {
                    _this.view.clearPrev(_this.canvas, _this.loader);
                }
                _this.chosePerson = true;
                _this.view.changePersonView(canvas, _this.loader);
                _this.canvas = canvas;
                _this.view.showAvailabeMovies(_this.canvas);
            };
            this.loader = loader;
            this.chosePerson = false;
            this.skins = {};
            this.config_skins = config_skins;
            this.person_collection = new person_collection_1.Collection(arrImg);
            this.furniture_collection = new person_collection_1.Collection(arrFurniture, "furniture");
            this.wall_blocks = [];
            this.view = new viewScene_1.ViewScene(this.person_collection, this.loader, this.furniture_collection);
            this.curentPerson = undefined;
            this.water_blocks = [];
            this.play();
        }
        Scene.prototype.getCoordFromStyle = function (elem) {
            return parseInt(elem.split("px")[0]);
        };
        Scene.prototype.getPerson = function () {
            return this.person_collection;
        };
        Scene.prototype.getActivePerson = function (canvas) {
            return this.person_collection.getCollection().filter(function (elem) {
                if (elem.getId() == canvas.getAttribute("data-id")) {
                    return elem;
                }
            });
        };
        Scene.prototype.movePersonByCoord = function (canvas, posX, posY) {
            var activePerson = [];
            canvas.style.left = parseInt(posX.split("px")[0]) - 30 + "px";
            canvas.style.top = parseInt(posY.split("px")[0]) - 60 + "px";
            canvas.style.transition = "1s";
            activePerson = this.person_collection.getCollection().filter(function (elem) {
                if (elem.getId() == canvas.getAttribute("data-id")) {
                    elem.setCoord(parseInt(posX.split("px")) / 100, parseInt(posY.split("px")) / 100);
                }
                if (!elem.getMoveAction() && !elem.getKind()) {
                    return elem;
                }
            });
            if (activePerson.length == 0) {
                this.person_collection.getCollection().forEach(function (elem) {
                    if (!elem.getKind()) {
                        elem.setMoveAction(false);
                    }
                });
                setTimeout(function () {
                }, 200);
            }
        };
        Scene.prototype.renderElement = function (element) {
            this.view.renderElement(element);
        };
        Scene.prototype.get = function (name) {
            return this[name];
        };
        Scene.prototype.renderArena = function () {
            var _this = this;
            var scence = document.getElementById("scene"), block, posX = 0, posY = 0, position_block, num_rows = 14, is_furniture = false, curent_unit;
            var _loop_1 = function (j) {
                var _loop_2 = function (i) {
                    block = document.createElement("img");
                    block.addEventListener("mouseout", this_1.onOutBlock);
                    block.addEventListener("mouseover", this_1.onBlock);
                    this_1.furniture_collection.getCollection().forEach(function (element) {
                        if (element.x == i && element.y == j) {
                            is_furniture = true;
                            block.addEventListener("click", function () {
                                console.log(element);
                                if (element.furniture.type == "table") {
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    block.classList.add("sence__block-table");
                                    _this.workTableAction(curent_unit, element);
                                }
                                if (element.furniture.type == "kitchen") {
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    _this.workKitchenAction(curent_unit, element);
                                }
                                if (element.furniture.type == "game") {
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    _this.workGameAction(curent_unit, element);
                                }
                                if (element.furniture.type == "desck") {
                                    curent_unit = _this.getActivePerson(_this.canvas)[0];
                                    _this.getDesckInfo(curent_unit, element);
                                }
                            });
                        }
                    });
                    if (!is_furniture) {
                        block.addEventListener("click", this_1.onMove);
                    }
                    is_furniture = false;
                    if (j == 6) {
                        num_rows = 8;
                    }
                    block = this_1.view.renderBlockView(block, posX, posY, i, j);
                    if (block.src.indexOf("block1.png") != -1) {
                        position_block = block.getAttribute("data-coord").split(";");
                        this_1.wall_blocks.push({ x: position_block[0], y: position_block[1] });
                    }
                    if (block.src.indexOf("block4.png") != -1) {
                        position_block = block.getAttribute("data-coord").split(";");
                        this_1.water_blocks.push({ x: position_block[0], y: position_block[1] });
                    }
                    scence.appendChild(block);
                    posX += 100;
                };
                for (var i = 0; i < num_rows; i++) {
                    _loop_2(i);
                }
                posX = 0;
                posY += 100;
            };
            var this_1 = this;
            for (var j = 0; j < 10; j++) {
                _loop_1(j);
            }
        };
        Scene.prototype.getDesckInfo = function (curent_unit, table) {
            alert("DESCK!!!!");
            var desck = new deskBoard_1.DesckBoard({});
            this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + 60 + "px");
        };
        Scene.prototype.workGameAction = function (curent_unit, table) {
            alert("Game!!!");
            var mini_game = new miniGame_1.MiniGame();
            this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + "px");
        };
        Scene.prototype.workKitchenAction = function (curent_unit, table) {
            console.log(curent_unit);
            alert("EATING!!!");
            this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + "px");
        };
        Scene.prototype.workTableAction = function (curent_unit, table) {
            var posX = table.x;
            console.log(curent_unit);
            alert("WORK!!!");
            this.movePersonByCoord(curent_unit.domPerson, posX * 100 + "px", table.y * 100 - 15 + "px");
        };
        Scene.prototype.setAIperson = function () { };
        Scene.prototype.loadDragon = function () {
            var _this = this;
            var obj = this, image_domcache = [];
            this.config_skins.forEach(function (skin) {
                image_domcache = [];
                skin.children.forEach(function (elem) {
                    _this.loader.loadJSON(elem.src_json);
                    elem.src_images.forEach(function (img) {
                        if (typeof obj.loader.get(img.path) == "undefined") {
                            obj.loader.loadElement(img.path);
                        }
                    });
                });
            });
        };
        Scene.prototype.play = function () {
            var _this = this;
            this.renderArena();
            var cache_skins = [], tmp = {};
            this.loader.load(this.person_collection);
            this.loadDragon();
            this.loader.onReady(function () {
                _this.config_skins.forEach(function (skin) {
                    skin.children.forEach(function (elem) {
                        tmp.cahce_image = [];
                        tmp.name = elem.name;
                        tmp.src_json = elem.src_json;
                        tmp.class = elem.class;
                        elem.src_images.forEach(function (img) {
                            tmp.cahce_image[img.name] = { node: _this.loader.get(img.path) };
                        });
                        cache_skins.push(tmp);
                        tmp = {};
                    });
                });
                console.log(_this.person_collection);
                _this.person_collection.collection.forEach(function (elem) {
                    var img = _this.loader.get(elem.person.url);
                    var cnvsElem = document.createElement("canvas");
                    cnvsElem = _this.view.renderPlayer(cnvsElem, elem, img);
                    cnvsElem.onclick = _this.onChangePerson;
                    console.log(cnvsElem);
                    elem.initDomPerson(cnvsElem);
                    cache_skins.forEach(function (skin) {
                        if (elem.person.evil) {
                            if (skin.class == "evil_fighter" && elem.person.class == "fighter") {
                                var dragon = new dragon_1.DragonAnimationUpdate(_this.loader.get(skin.src_json), skin.cahce_image, skin.name, elem);
                                dragon.updateCanvas(elem.domPerson);
                                if (skin.name == "default_fighter") {
                                    dragon.play();
                                }
                                elem.setAnimation(skin.name, dragon);
                            }
                            if (skin.class == "evil_archer" && elem.person.class == "archer") {
                                var dragon = new dragon_1.DragonAnimationUpdate(_this.loader.get(skin.src_json), skin.cahce_image, skin.name, elem);
                                dragon.updateCanvas(elem.domPerson);
                                if (skin.name == "default_archer") {
                                    dragon.play();
                                }
                                elem.setAnimation(skin.name, dragon);
                            }
                        }
                        else {
                            if (skin.class == "elf_fighter" && elem.person.class == "fighter") {
                                var dragon = new dragon_1.DragonAnimationUpdate(_this.loader.get(skin.src_json), skin.cahce_image, skin.name, elem);
                                dragon.updateCanvas(elem.domPerson);
                                if (skin.name == "elf_fighter_default") {
                                    dragon.play();
                                }
                                elem.setAnimation(skin.name, dragon);
                            }
                            if (skin.class == "elf_archer" && elem.person.class == "archer") {
                                var dragon = new dragon_1.DragonAnimationUpdate(_this.loader.get(skin.src_json), skin.cahce_image, skin.name, elem);
                                dragon.updateCanvas(elem.domPerson);
                                if (skin.name == "elf_archer_default") {
                                    dragon.play();
                                }
                                elem.setAnimation(skin.name, dragon);
                            }
                        }
                    });
                    elem.initImage(img);
                    var scene = document.getElementById("scene");
                    scene.appendChild(cnvsElem);
                });
            });
        };
        Scene.prototype.renderAiPerson = function () { };
        return Scene;
    }());
    exports.Scene = Scene;
});
