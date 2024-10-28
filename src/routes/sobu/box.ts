import type p5 from "p5";
import { Obstacle } from "./obstacle";

export class Box extends Obstacle {
    private static images: p5.Image[] = [];

    img: p5.Image;

    constructor(p: p5, x: number, y: number) {
        super(p, x, y, 50, 50);

        this.img = p.random(Box.images);
        this.width = this.img.width;
        this.height = this.img.height;
        console.log("constructing w img", this.img);
    }

    static loadImages(p: p5): void {
        this.images = [
            p.loadImage('/sobu/boxes/small.png'),
            p.loadImage('/sobu/boxes/medium.png'),
            p.loadImage('/sobu/boxes/large.png'),
        ];
    }

    draw(): void {
        this.p.fill(150); // Different color for visualization
        // this.p.rect(this.x, this.y, this.width, this.height);
        this.p.image(this.img, this.x, this.y);
    }
}