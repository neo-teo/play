import p5 from "p5";
import { Wall } from "./wall";
import { Box } from "./box";

export class Evergreen {
    walls: Wall[];

    boxes: Box[];

    constructor(p: p5) {
        this.walls = [
            new Wall(p, 0, 0, 20, p.windowHeight),
            new Wall(p, 0, 0, p.windowWidth, 20),
            new Wall(p, p.windowWidth - 20, 0, 20, p.windowHeight),
            new Wall(p, 0, p.windowHeight - 20, p.windowWidth, 20),
        ];

        this.boxes = [];

        for (let i = 0; i < 4; i++) {
            this.boxes.push(new Box(p, p.random(200, p.windowWidth - 200), p.random(200, p.windowHeight - 200)))
        }
    }

    draw(): void {
        this.walls.forEach((w) => w.draw());
        this.boxes.forEach((b) => b.draw());
    }
}