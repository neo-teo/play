import type p5 from "p5";

export interface InteractionArea {
    getCollisionBounds(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface Liftable {
    readonly x: number;
    readonly y: number;
    readonly weight: number;  // Add this
    isLifted: boolean;
    lift(): void;
    drop(direction: 'left' | 'right' | 'up' | 'down'): void;
    followSprite(spriteX: number, spriteY: number): void;
    isNearby(spriteX: number, spriteY: number, threshold?: number): boolean;
    update(): void;  // called each frame to update physics
    getCollisionBoundsCenter(): { x: number, y: number };  // New method
    setObstacles(obstacles: InteractionArea[]): void;
}

// Mixin class to provide default Liftable implementations
export class LiftableMixin implements Liftable {
    weight: number = 50.0;  // Default weight as float
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

    private interactionArea: InteractionArea;
    private obstacles: InteractionArea[] = []; // Add this property

    constructor(p: p5, x: number, y: number, interactionArea: InteractionArea) {
        this.p = p;
        this._x = x;
        this._y = y;
        this.interactionArea = interactionArea;
    }

    getCollisionBoundsCenter(): { x: number, y: number } {
        const bounds = this.interactionArea.getCollisionBounds();
        return {
            x: bounds.x + bounds.width / 2,
            y: bounds.y + bounds.height / 2
        };
    }

    // Add this method to set obstacles
    setObstacles(obstacles: InteractionArea[]): void {
        this.obstacles = obstacles;
    }

    private isColliding(newX: number, newY: number): boolean {
        const bounds = this.interactionArea.getCollisionBounds();
        const width = bounds.width;
        const height = bounds.height;

        return this.obstacles.some(obstacle => {

            const obstacleBounds = obstacle.getCollisionBounds();

            // Skip collision check if the obstacle has the exact same position and dimensions
            if (
                obstacleBounds.x === bounds.x &&
                obstacleBounds.y === bounds.y &&
                obstacleBounds.width === bounds.width &&
                obstacleBounds.height === bounds.height
            ) {
                return false;
            }

            return (
                newX < obstacleBounds.x + obstacleBounds.width &&
                newX + width > obstacleBounds.x &&
                newY < obstacleBounds.y + obstacleBounds.height &&
                newY + height > obstacleBounds.y
            );
        });
    }

    update() {
        if (this.isMoving && !this.isLifted) {
            if (this.vy < 0) {
                this.vy += this.GRAVITY;
            }

            // Calculate new position
            const newX = this._x + this.vx;
            const newY = this._y + this.vy;

            // Check for collisions and handle bouncing
            const BOUNCE_FACTOR = 0.5; // Reduce velocity by 50% on bounce

            if (this.isColliding(newX, this._y)) {
                this.vx = -this.vx * BOUNCE_FACTOR; // Reverse and reduce horizontal velocity
            } else {
                this._x = newX;
            }
            if (this.isColliding(this._x, newY)) {
                this.vy = -this.vy * BOUNCE_FACTOR; // Reverse and reduce vertical velocity
            } else {
                this._y = newY;
            }

            // Apply friction
            this.vx *= this.FRICTION;
            this.vy *= this.FRICTION;

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
            const bounds = this.interactionArea.getCollisionBounds();
            const offsetX = bounds.x - this._x;
            const offsetY = bounds.y - this._y;

            this._x = spriteX - offsetX;
            this._y = spriteY - offsetY;
        }
    }

    isNearby(spriteX: number, spriteY: number, threshold: number = 100): boolean {
        const bounds = this.interactionArea.getCollisionBounds();
        const centerX = bounds.x + bounds.width / 2;
        const centerY = bounds.y + bounds.height / 2;
        const distance = this.p.dist(spriteX, spriteY, centerX, centerY);
        return distance <= threshold;
    }
}