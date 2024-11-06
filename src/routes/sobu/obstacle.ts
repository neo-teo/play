import p5 from "p5";
import type { InteractionArea } from "./liftable";

export abstract class Obstacle implements InteractionArea {
    protected p: p5;
    x: number;
    y: number;
    width: number;
    height: number;

    weight: number;

    constructor(p: p5, x: number, y: number, width: number, height: number) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.weight = 50.0;
    }

    // Default implementation that can be overridden
    getCollisionBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    isColliding(x: number, y: number, spriteWidth: number, spriteHeight: number): boolean {
        const bounds = this.getCollisionBounds();
        return (
            // Using bounds instead of this.x and this.width
            x < bounds.x + bounds.width &&
            x + spriteWidth > bounds.x &&
            y < bounds.y + bounds.height &&
            y + spriteHeight > bounds.y
        );
    }

    abstract draw(): void;
}