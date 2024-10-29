import type p5 from "p5";

export interface Liftable {
    readonly x: number;
    readonly y: number;
    isLifted: boolean;
    lift(spriteX: number, spriteY: number): void;
    drop(direction: 'left' | 'right' | 'up' | 'down'): void;
    followSprite(spriteX: number, spriteY: number): void;
    isNearby(spriteX: number, spriteY: number, threshold?: number): boolean;
    update(): void;  // called each frame to update physics
}

// Mixin class to provide default implementations
export class LiftableMixin implements Liftable {
    isLifted: boolean = false;
    protected _x: number;
    protected _y: number;
    protected p: p5;

    private isMoving: boolean = false;

    private vx: number = 0;
    private vy: number = 0;

    private readonly FRICTION = 0.90;
    private readonly THROW_SPEED = 10;
    private readonly GRAVITY = 1;
    private readonly THROW_ARC = 5;

    constructor(p: p5, x: number, y: number) {
        this.p = p;
        this._x = x;
        this._y = y;
    }

    update() {
        if (this.isMoving && !this.isLifted) {
            if (this.vy < 0) {
                this.vy += this.GRAVITY;
            }

            // Calculate new position
            const newX = this._x + this.vx;
            const newY = this._y + this.vy;

            // Update position
            this._x = newX;
            this._y = newY;

            // Apply friction (more to horizontal than vertical for better arcs)
            this.vx *= this.FRICTION;
            this.vy *= this.FRICTION;  // Less friction on vertical movement

            // Stop if moving very slowly
            if (Math.abs(this.vx) < 0.1 && Math.abs(this.vy) < 0.1) {
                this.vx = 0;
                this.vy = 0;
                this.isMoving = false;
            }
        }
    }

    drop(direction: 'left' | 'right' | 'up' | 'down'): void {
        this.isLifted = false;
        this.isMoving = true;

        // Set initial velocity based on throw direction
        switch (direction) {
            case 'left':
                this.vx = -this.THROW_SPEED;
                this.vy = -this.THROW_ARC;
                break;
            case 'right':
                this.vx = this.THROW_SPEED;
                this.vy = -this.THROW_ARC;
                break;
            case 'up':
                this.vy = -this.THROW_SPEED * 1.7;
                break;
            case 'down':
                this.vy = this.THROW_SPEED;
                break;
        }
    }

    get x(): number { return this._x; }
    get y(): number { return this._y; }

    lift(): void {
        this.isLifted = true;
        this.isMoving = false;
        this.vx = 0;
        this.vy = 0;
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