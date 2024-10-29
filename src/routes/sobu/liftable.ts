import type p5 from "p5";

export interface Liftable {
    readonly x: number;
    readonly y: number;
    isLifted: boolean;
    lift(spriteX: number, spriteY: number): void;
    drop(): void;
    followSprite(spriteX: number, spriteY: number): void;
    isNearby(spriteX: number, spriteY: number, threshold?: number): boolean;
}

// Mixin class to provide default implementations
export class LiftableMixin implements Liftable {
    isLifted: boolean = false;
    protected _x: number;
    protected _y: number;
    protected p: p5;

    constructor(p: p5, x: number, y: number) {
        this.p = p;
        this._x = x;
        this._y = y;
    }

    get x(): number { return this._x; }
    get y(): number { return this._y; }

    lift(): void {
        this.isLifted = true;
    }

    drop(): void {
        this.isLifted = false;
    }

    followSprite(spriteX: number, spriteY: number): void {
        if (this.isLifted) {
            this._x = spriteX;
            this._y = spriteY;
        }
    }

    isNearby(spriteX: number, spriteY: number, threshold: number = 100): boolean {
        const distance = this.p.dist(spriteX, spriteY, this.x, this.y);
        return distance <= threshold;
    }
}