import { Person } from "./person";
export class Furniture extends Person {
    furniture: any;
    constructor(furniture) {
        super(furniture);
        this.furniture = furniture;
        this.x = furniture.x;
        this.y = furniture.y;
    }
}
