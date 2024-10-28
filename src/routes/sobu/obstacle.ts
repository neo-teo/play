import p5 from "p5";

export abstract class Obstacle {
    protected p: p5;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(p: p5, x: number, y: number, width: number, height: number) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isColliding(x: number, y: number, spriteWidth: number, spriteHeight: number): boolean {
        return (
            x < this.x + this.width &&
            x + spriteWidth > this.x &&
            y < this.y + this.height &&
            y + spriteHeight > this.y
        );
    }

    abstract draw(): void;
}