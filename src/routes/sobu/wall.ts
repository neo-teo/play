import p5 from "p5";
import { Obstacle } from "./obstacle";

export class Wall extends Obstacle {
    constructor(p: p5, x: number, y: number, width: number, height: number) {
        super(p, x, y, width, height);
    }

    draw(): void {
        this.p.fill(0); // Different color for visualization
        this.p.rect(this.x, this.y, this.width, this.height);
    }
}