import { Person } from "./person";
import { ViewScene } from "../viewScene";
import { Collection } from "./person_collection";
import { DragonAnimationUpdate } from "../lib/dragon";
import { MiniGame } from "../lib/miniGame";
import { DesckBoard } from "../lib/deskBoard";

export class Scene {
    loader: any;
    canvas: any;
    ai: any;
    arrImg: object[];
    person_collection: any;
    chosePerson: boolean;
    curentPerson: any;
    view: any;
    config_skins: any;
    skins: any;
    water_blocks: any[];
    furniture_collection: any;
    wall_blocks: any[]; // кеш стен
    id_curent_user: number;
    constructor(loader, arrImg, config_skins, arrFurniture, id_curent_user) {
        this.loader = loader;
        this.chosePerson = false;
        this.skins = {};
        this.config_skins = config_skins;
        this.person_collection = new Collection(arrImg);
        this.furniture_collection = new Collection(arrFurniture, "furniture");

        this.wall_blocks = [];
        this.id_curent_user = id_curent_user;
        this.view = new ViewScene(this.person_collection, this.loader, this.furniture_collection);
        this.curentPerson = undefined;
        this.water_blocks = [];
        // this.ai = ai;
        // this.ai.initView(this.view);
        // this.ai.initPersons(this.person_collection, this.syncUnit);
        this.play();
    }
    updateScene(arr_obj, id_curent_user) {
        // this.person_collection = new Collection(arr_obj);
        let person: any = {};
        this.id_curent_user = id_curent_user;
        arr_obj.forEach((element) => {
            person = {};
            person = this.person_collection.getPersonById(element.id)[0];
            if (person == undefined || typeof person == "undefined") {
                this.playNewPerson(new Collection([new Person(element)]));
                person = this.person_collection.getPersonById(element.id)[0];
            }

            this.movePersonByCoord(person.domPerson, element.x * 100 + "px", element.y * 100 + "px");
        });
        this.person_collection;
        // this.view = new ViewScene(this.person_collection, this.loader, this.furniture_collection);
    }
    getCoordFromStyle(elem) {
        return parseInt(elem.split("px")[0]);
    }
    getPerson() {
        return this.person_collection;
    }
    onBlock = (event) => {
        let block = event.target,
            posX,
            posY;
        if (this.canvas != undefined) {
            posX = Math.abs(parseInt(this.canvas.style.left.split("px")[0]) - this.getCoordFromStyle(block.style.left));
            posY = Math.abs(parseInt(this.canvas.style.top.split("px")[0]) - this.getCoordFromStyle(block.style.top));
            // let coord_block = document.createElement("h1");
            // coord_block.innerText = "x:" + block.style.left + " y:" + block.style.top;
            // document.getElementById("block_information").innerHTML =
            //     "<h1>x:" +
            //     this.getCoordFromStyle(block.style.left) / 120 +
            //     " y:" +
            //     this.getCoordFromStyle(block.style.top) / 120 +
            //     "</h1>";

            // if (posX < 290 && posY < 290) {
            block.classList.add("block__free");
            // } else {
            //     block.classList.add("block__nonFree");
            // }
        }
    };
    syncUnit = (data) => {
        this.person_collection = data;
    };
    onOutBlock = (event) => {
        event.target.classList.remove("block__free");
        event.target.classList.remove("block__nonFree");
    };
    // знаю что плохо так писать !!!! Но время(((
    setCoord2Server(x, y, id_user) {
        fetch("/?module=GeoPosition&action=SetUserCoord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ x: x, y: y, id_curent_user: id_user }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.status == "ok") {
                    // console.log(result.friends_list);
                    // this.setState({
                    //     friends_list: result.friends_list,
                    // });
                    // console.log("GetAllUsers!!!!!!! ", arrPersons);
                    // this.props.loadScene(arrPersons, this.state.id_curent_user);
                } else {
                    alert("ERROR " + result.message);
                }
            });
    }
    onMove = (event) => {
        let posX = event.target.style.left,
            posY = event.target.style.top;
        //\словие что можно ходить в область
        let curent_unit = this.getActivePerson(this.canvas)[0];
        console.log("curent_unit", curent_unit);
        if (curent_unit.person.id == this.id_curent_user) {
            this.setCoord2Server(
                parseInt(posX.split("px")) / 100,
                parseInt(posY.split("px")) / 100,
                this.id_curent_user
            );
            this.movePersonByCoord(this.canvas, posX, posY);
        } else {
            alert("AnotherUser  " + curent_unit.person.id + "   " + this.id_curent_user);
        }
    };
    getActivePerson(canvas) {
        return this.person_collection.getCollection().filter((elem: any) => {
            if (elem.getId() == canvas.getAttribute("data-id")) {
                // elem.setCoord(parseInt(posX.split("px")) / 120, parseInt(posY.split("px")) / 120);
                return elem;
                // elem.setMoveAction(true);
            }
        });
    }
    movePersonByCoord(canvas, posX, posY) {
        let activePerson = [];
        canvas.style.left = parseInt(posX.split("px")[0]) - 30 + "px";
        canvas.style.top = parseInt(posY.split("px")[0]) - 60 + "px";
        // this.canvas.style.top = posY;
        // this.canvas.style.transition = "transform 500ms ease-out 100s";
        canvas.style.transition = "0.5s";

        activePerson = this.person_collection.getCollection().filter((elem: any) => {
            if (elem.getId() == canvas.getAttribute("data-id")) {
                // elem.setCoord(parseInt(posX.split("px")) / 120, parseInt(posY.split("px")) / 120);
                elem.setCoord(parseInt(posX.split("px")) / 100, parseInt(posY.split("px")) / 100);
                // elem.setMoveAction(true);
            }
            if (!elem.getMoveAction() && !elem.getKind()) {
                return elem;
            }
        });
        if (activePerson.length == 0) {
            // optimizase
            this.person_collection.getCollection().forEach((elem: any) => {
                if (!elem.getKind()) {
                    elem.setMoveAction(false);
                }
            });
            setTimeout(() => {
                // this.ai.step();
            }, 200);
        }
    }
    renderElement(element) {
        this.view.renderElement(element);
    }
    get(name) {
        return this[name];
    }
    renderArena() {
        let scence: any = document.getElementById("scene"),
            block,
            posX = 0,
            posY = 0,
            position_block,
            num_rows = 14,
            is_furniture = false,
            curent_unit;
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < num_rows; i++) {
                block = document.createElement("img");
                block.addEventListener("mouseout", this.onOutBlock);
                block.addEventListener("mouseover", this.onBlock);
                console.log(typeof this.canvas);
                this.furniture_collection.getCollection().forEach((element) => {
                    if (element.x == i && element.y == j) {
                        is_furniture = true;

                        block.addEventListener("click", () => {
                            // console.log(element);
                            if (element.furniture.type == "table") {
                                block.classList.add("sence__block-table");
                                curent_unit = this.getActivePerson(this.canvas)[0];
                                this.workTableAction(curent_unit, element);
                            }
                            if (element.furniture.type == "kitchen") {
                                curent_unit = this.getActivePerson(this.canvas)[0];
                                this.workKitchenAction(curent_unit, element);
                            }
                            if (element.furniture.type == "game") {
                                curent_unit = this.getActivePerson(this.canvas)[0];
                                this.workGameAction(curent_unit, element);
                            }
                            if (element.furniture.type == "desck") {
                                curent_unit = this.getActivePerson(this.canvas)[0];
                                this.getDesckInfo(curent_unit, element);
                            }
                        });
                    }
                });

                if (!is_furniture) {
                    block.addEventListener("click", this.onMove);
                }

                is_furniture = false;
                if (j == 6) {
                    num_rows = 8;
                }
                block = this.view.renderBlockView(block, posX, posY, i, j);
                if (block.src.indexOf("block1.png") != -1) {
                    position_block = block.getAttribute("data-coord").split(";");
                    this.wall_blocks.push({ x: position_block[0], y: position_block[1] });
                }
                if (block.src.indexOf("block4.png") != -1) {
                    position_block = block.getAttribute("data-coord").split(";");
                    this.water_blocks.push({ x: position_block[0], y: position_block[1] });
                }
                scence.appendChild(block);

                posX += 100;
            }
            posX = 0;
            // posY += 120;
            posY += 100;
        }
    }
    getDesckInfo(curent_unit, table) {
        let desck = new DesckBoard({});
        if (curent_unit.person.id == this.id_curent_user) {
            this.setCoord2Server(table.x, table.y, this.id_curent_user);

            this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + 60 + "px");
        }
    }
    workGameAction(curent_unit, table) {
        if (curent_unit.person.id == this.id_curent_user) {
            this.setCoord2Server(table.x, table.y, this.id_curent_user);
            let mini_game = new MiniGame();
            this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + "px");
        }
    }
    workKitchenAction(curent_unit, table) {
        if (curent_unit.person.id == this.id_curent_user) {
            this.setCoord2Server(table.x, table.y, this.id_curent_user);

            this.movePersonByCoord(curent_unit.domPerson, table.x * 100 + "px", table.y * 100 + "px");
        }
    }
    workTableAction(curent_unit, table) {
        let posX = table.x;
        if (curent_unit.person.id == this.id_curent_user) {
            this.setCoord2Server(table.x, table.y, this.id_curent_user);

            this.movePersonByCoord(curent_unit.domPerson, posX * 100 + "px", table.y * 100 - 15 + "px");
        }
    }
    setAIperson() {}
    loadDragon() {
        let obj = this,
            image_domcache = [];

        this.config_skins.forEach((skin) => {
            image_domcache = [];
            skin.children.forEach((elem) => {
                this.loader.loadJSON(elem.src_json);

                elem.src_images.forEach((img) => {
                    if (typeof obj.loader.get(img.path) == "undefined") {
                        obj.loader.loadElement(img.path);
                    }
                });
            });
        });
    }
    play() {
        this.renderArena();
        let cache_skins: any = [],
            tmp: any = {};
        // this.loader.loadElement("./src/images/rip.png");
        this.loader.load(this.person_collection);
        this.loadDragon();
        let load = false;
        this.loader.onReady(() => {
            if (!load) {
                load = true;
                this.config_skins.forEach((skin) => {
                    skin.children.forEach((elem) => {
                        // this.loader.loadJSON(elem.src_json);

                        tmp.cahce_image = [];
                        tmp.name = elem.name;
                        tmp.src_json = elem.src_json;
                        tmp.class = elem.class;
                        elem.src_images.forEach((img) => {
                            tmp.cahce_image[img.name] = { node: this.loader.get(img.path) };
                        });

                        cache_skins.push(tmp);
                        tmp = {};
                    });
                });
                console.log("!!!!!!!!!!!!!!!!!!!!", cache_skins);
                this.person_collection.collection.forEach((elem: any) => {
                    let img = this.loader.get(elem.person.url);
                    let cnvsElem = document.createElement("canvas");
                    cnvsElem = this.view.renderPlayer(cnvsElem, elem, img);

                    cnvsElem.onclick = this.onChangePerson;
                    if (elem.person.id == this.id_curent_user) {
                        cnvsElem.classList.add("curent_user");
                    }
                    console.log("cnvsElem", cnvsElem);
                    elem.initDomPerson(cnvsElem);
                    // когда будем делать графику будет сложнее, тк от этого аподхода придется избавиться
                    cache_skins.forEach((skin: any) => {
                        //         dragon.updateCanvas(elem.domPerson);
                        //         if (skin.name == "default_archer") {
                        //             dragon.play();
                        //         }
                        //         // setTimeout(() => {
                        //         //     elem.stopAnimation("default_archer");
                        //         //     elem.playAnimation("atacke_archer");
                        //         //     setTimeout(() => {
                        //         //         elem.stopAnimation("atacke_archer");
                        //         //         elem.playAnimation("evil_archer_die");
                        //         //         setTimeout(() => {
                        //         //             elem.stopAnimation("evil_archer_die");
                        //         //         }, 750);
                        //         //     }, 4000);
                        //         // }, 8000);
                        //         elem.setAnimation(skin.name, dragon);
                        //     }
                        // } else {
                        console.log("dtagon", elem, skin);
                        var dragon = new DragonAnimationUpdate(
                            this.loader.get(skin.src_json),
                            skin.cahce_image,
                            skin.name,
                            elem
                        );
                        dragon.updateCanvas(elem.domPerson);
                        if (skin.name == "default_perosn1") {
                            dragon.play();
                        }
                        elem.setAnimation(skin.name, dragon);
                        // if (skin.class == "elf_fighter" && elem.person.class == "fighter") {
                        //     var dragon = new DragonAnimationUpdate(
                        //         this.loader.get(skin.src_json),
                        //         skin.cahce_image,
                        //         skin.name,
                        //         elem
                        //     );
                        //     dragon.updateCanvas(elem.domPerson);
                        //     if (skin.name == "elf_fighter_default") {
                        //         dragon.play();
                        //     }
                        //     elem.setAnimation(skin.name, dragon);
                        // }
                        // if (skin.class == "elf_archer" && elem.person.class == "archer") {
                        //     var dragon = new DragonAnimationUpdate(
                        //         this.loader.get(skin.src_json),
                        //         skin.cahce_image,
                        //         skin.name,
                        //         elem
                        //     );
                        //     dragon.updateCanvas(elem.domPerson);
                        //     if (skin.name == "elf_archer_default") {
                        //         dragon.play();
                        //     }
                        //     elem.setAnimation(skin.name, dragon);
                        // }
                        // // }
                    });
                    elem.initImage(img);
                    let scene: any = document.getElementById("scene");
                    scene.appendChild(cnvsElem);
                });
            }
        });
    }
    playNewPerson(person_collection) {
        // костыль, копипаст ужасный подход - 5 часов до дедлайна

        let cache_skins: any = [],
            tmp: any = {};
        let load = false;
        // this.loader.loadElement("./src/images/rip.png");
        this.loader.load(person_collection);
        // this.loadDragon();
        if (!load) {
            load = true;
            console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEE11111111111111", person_collection.getCollection());
            this.config_skins.forEach((skin) => {
                skin.children.forEach((elem) => {
                    // this.loader.loadJSON(elem.src_json);

                    tmp.cahce_image = [];
                    tmp.name = elem.name;
                    tmp.src_json = elem.src_json;
                    tmp.class = elem.class;
                    elem.src_images.forEach((img) => {
                        tmp.cahce_image[img.name] = { node: this.loader.get(img.path) };
                    });

                    cache_skins.push(tmp);
                    tmp = {};
                });
            });

            person_collection.getCollection().forEach((elem: any) => {
                let img = this.loader.get(elem.person.url);
                let cnvsElem = document.createElement("canvas");
                cnvsElem = this.view.renderPlayer(cnvsElem, elem, img);

                cnvsElem.onclick = this.onChangePerson;

                console.log("cnvsElem", cnvsElem);
                elem.initDomPerson(cnvsElem);
                console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEE22222222222222222222222222222", cache_skins);
                if (elem.person.id == this.id_curent_user) {
                    cnvsElem.classList.add("curent_user");
                }
                // когда будем делать графику будет сложнее, тк от этого аподхода придется избавиться
                cache_skins.forEach((skin: any) => {
                    console.log("dtagon", elem, skin);
                    var dragon = new DragonAnimationUpdate(
                        this.loader.get(skin.src_json),
                        skin.cahce_image,
                        skin.name,
                        elem
                    );
                    dragon.updateCanvas(elem.domPerson);
                    if (skin.name == "default_perosn1") {
                        dragon.play();
                    }
                    elem.setAnimation(skin.name, dragon);
                });
                elem.initImage(img);
                let scene: any = document.getElementById("scene");
                scene.appendChild(cnvsElem);

                this.person_collection.addPerson(elem);
            });
        }
    }
    // contactPersons = (event) => {
    //     let canvas = event.target,
    //         img = this.loader.get(event.target.getAttribute("data-image"));

    //     if (typeof this.canvas != "undefined") {
    //         let id_person = parseInt(this.canvas.getAttribute("data-id"));
    //         let unit: any = this.person_collection.getPersonById(id_person)[0];
    //         // console.log(person);
    //         if (unit.person.class == "fighter") {
    //             unit.stopAnimation("elf_fighter_default");
    //             unit.playAnimation("elf_fighter_atacke");

    //             // animation.stop();
    //             setTimeout(() => {
    //                 unit.stopAnimation("elf_fighter_atacke");
    //                 unit.playAnimation("elf_fighter_default");
    //             }, 750);
    //         }
    //         if (unit.person.class == "archer") {
    //             unit.stopAnimation("elf_archer_default");
    //             unit.playAnimation("elf_archer_atacke");

    //             // animation.stop();
    //             setTimeout(() => {
    //                 unit.stopAnimation("elf_archer_atacke");
    //                 unit.playAnimation("elf_archer_default");
    //             }, 750);
    //         }
    //         this.view.contactPersonsView(canvas, img, unit.person.damage);
    //     }
    // };
    onChangePerson = (event) => {
        let canvas = event.target;

        if (this.canvas != undefined) {
            this.view.clearPrev(this.canvas, this.loader);
        }
        this.chosePerson = true;

        this.view.changePersonView(canvas, this.loader);

        this.canvas = canvas;

        this.view.showAvailabeMovies(this.canvas);
    };
    renderAiPerson() {}
}
