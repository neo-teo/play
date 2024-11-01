import p5 from "p5";
import { Wall } from "./wall";
import { Box } from "./box";
import { Plant } from "./plant";

export class Evergreen {
    walls: Wall[];
    boxes: Box[];
    plants: Plant[];
    p: p5;

    constructor(p: p5) {
        this.p = p;
        this.walls = [
            new Wall(p, 0, 0, 20, p.windowHeight),
            new Wall(p, 0, 0, p.windowWidth, 20),
            new Wall(p, p.windowWidth - 20, 0, 20, p.windowHeight),
            new Wall(p, 0, p.windowHeight - 20, p.windowWidth, 20),
        ];

        this.boxes = [];
        this.boxes.push(new Box(p, p.width / 2 - 75, 190, 'md'));
        this.boxes.push(new Box(p, p.width / 2, 195, 'md'));
        this.boxes.push(new Box(p, p.width / 2 - 75, 255, 'md'));
        this.boxes.push(new Box(p, p.width / 2, 250, 'md'));

        this.boxes.push(new Box(p, p.width / 2 - 200, 225, 'lg'));

        this.boxes.push(new Box(p, p.width / 2 - 125, 180, 'sm'));

        this.plants = [];
        this.plants.push(new Plant(p, p.width / 2 + 90, 225, 'snake'));
        this.plants.push(new Plant(p, p.width / 2 + 120, 160, 'bird'));
    }

    draw(): void {
        this.walls.forEach((w) => w.draw());
        this.boxes.forEach((b) => b.draw());
        this.plants.forEach((p) => p.draw());

        // // loading zone
        // this.p.push();
        // this.p.noStroke();
        // this.p.fill(28, 122, 191);
        // this.p.rect(this.p.width / 2 + 50, this.p.height - 400, 15, 300);
        // this.p.rect(this.p.width / 2 + 250, this.p.height - 400, 15, 300);
        // this.p.rect(this.p.width / 2 + 50, this.p.height - 400, 200, 15);
        // this.p.rect(this.p.width / 2 + 50, this.p.height - 100, 215, 15);
        // this.p.pop();
    }
}