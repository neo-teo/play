import p5 from "p5";
import { Wall } from "./wall";
import { Box } from "./box";
import { Plant } from "./plant";

export class Evergreen {
    walls: Wall[];
    boxes: Box[];
    plants: Plant[];

    constructor(p: p5) {
        this.walls = [
            new Wall(p, 0, 0, 20, p.windowHeight),
            new Wall(p, 0, 0, p.windowWidth, 20),
            new Wall(p, p.windowWidth - 20, 0, 20, p.windowHeight),
            new Wall(p, 0, p.windowHeight - 20, p.windowWidth, 20),
        ];

        this.boxes = [];
        for (let i = 0; i < 4; i++) {
            this.boxes.push(new Box(p, 200, p.height / 6 * (i + 1)))
        }

        this.plants = [];
        this.plants.push(new Plant(p, 200, 200));
    }

    draw(): void {
        this.walls.forEach((w) => w.draw());
        this.boxes.forEach((b) => b.draw());
        this.plants.forEach((p) => p.draw());
    }
}