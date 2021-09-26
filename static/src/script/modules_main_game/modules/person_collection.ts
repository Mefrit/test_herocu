import { Person } from "./person";
import { Furniture } from ".//furniture";
export class Collection {
    collection: any;
    constructor(data, mode = "person") {
        this.collection = data.map((elem) => {
            if (mode == "person") {
                return new Person(elem);
            } else {
                return new Furniture(elem);
            }
        });
    }
    getCollection() {
        return this.collection;
    }
    addPerson(elem) {
        this.collection.push(elem);
    }
    checkFreeCoord(coord) {
        let res = true;
        this.collection.forEach((element) => {
            if (element.x == coord.x && element.y == coord.y) {
                res = false;
            }
        });
        return res;
    }

    getPersonById(id) {
        return this.collection.filter((elem) => {
            if (!elem.isNotDied() && elem.person.id == id) {
                return elem;
            }
        });
    }
    updateElement(unit) {
        this.collection = this.collection.map((elem) => {
            if (unit.getId() == elem.getId()) {
                return unit;
            } else {
                return elem;
            }
        });
    }
}
