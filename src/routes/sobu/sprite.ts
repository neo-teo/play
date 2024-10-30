import p5 from 'p5'; // Import the p5 library

// Assuming you have the Obstacle class already defined somewhere
import { Obstacle } from './obstacle';
import type { Liftable } from './liftable';

export default class Sprite {
    private static images: { [key: string]: p5.Image } = {};
    private static imagesLoaded: boolean = false;

    private p: p5;  // Store the p5 instance
    private img: p5.Image | null = null
    x: number;
    y: number;
    vx: number;
    vy: number;
    private friction: number;  // Friction for sliding effect
    private speed: number;      // Speed of movement
    private obstacles: Obstacle[]; // Array of obstacles
    private liftedObject: Liftable | null = null;
    private liftableObjects: Liftable[] = [];
    private lastLiftTime: number = 0;
    private LIFT_COOLDOWN: number = 250; // 250ms cooldown

    private lastDirection: 'left' | 'right' | 'up' | 'down' = 'down';

    constructor(p: p5) {
        this.p = p;
        this.x = 50;
        this.y = 50;
        this.vx = 0;
        this.vy = 0;
        this.friction = .80;
        this.speed = 1.5;
        this.obstacles = [];
    }

    static loadImages(p: p5): void {
        this.images.resting = p.loadImage('/sobu/sprite/rest.gif');
        this.images.walkingUp = p.loadImage('/sobu/sprite/up.gif');
        this.images.walkingDown = p.loadImage('/sobu/sprite/down.gif');
        this.images.walkingLeft = p.loadImage('/sobu/sprite/left.gif');
        this.images.walkingRight = p.loadImage('/sobu/sprite/right.gif');
        this.images.standingLeft = p.loadImage('/sobu/sprite/left_rest.gif');  // Or separate standing images if you have them
        this.images.standingRight = p.loadImage('/sobu/sprite/right_rest.gif');
        this.images.standingUp = p.loadImage('/sobu/sprite/up_rest.gif');
        this.images.standingDown = p.loadImage('/sobu/sprite/down_rest.gif');

        this.imagesLoaded = true;
    }

    setObstacles(obstacles: Obstacle[]): void {
        this.obstacles = obstacles;
    }

    setLiftableObjects(liftables: Liftable[]): void {
        this.liftableObjects = liftables;
    }

    private isColliding(x: number, y: number): boolean {
        if (!this.img) return false;

        const spriteWidth = this.img.width * 0.8;
        const spriteHeight = this.img.height * 0.8;

        return this.obstacles.some(obstacle =>
            !('isLifted' in obstacle && (obstacle as unknown as Liftable).isLifted) &&
            obstacle.isColliding(x, y, spriteWidth, spriteHeight)
        );
    }

    handleInput(): void {
        // Guard against unloaded images
        if (!Sprite.images || !this.img) return;

        const currentTime = Date.now();
        let moved = false;

        if (this.p.keyIsDown(69) && // 'E' key
            currentTime - this.lastLiftTime > this.LIFT_COOLDOWN) {

            this.lastLiftTime = currentTime;
            this.handleLifting();
        }

        let ax = 0;
        let ay = 0;

        // Update acceleration based on key presses
        if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
            ax = -this.speed;
            this.img = Sprite.images.walkingLeft;
            this.lastDirection = 'left';
            moved = true;
        } else if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
            ax = this.speed;
            this.img = Sprite.images.walkingRight;
            this.lastDirection = 'right';
            moved = true;
        } else if (this.p.keyIsDown(this.p.UP_ARROW)) {
            ay = -this.speed;
            this.img = Sprite.images.walkingUp;
            this.lastDirection = 'up';
            moved = true;
        } else if (this.p.keyIsDown(this.p.DOWN_ARROW)) {
            ay = this.speed;
            this.img = Sprite.images.walkingDown;
            this.lastDirection = 'down';
            moved = true;
        } else {
            this.img = Sprite.images.resting;
        }

        if (!moved) {
            switch (this.lastDirection) {
                case 'left': this.img = Sprite.images.standingLeft; break;
                case 'right': this.img = Sprite.images.standingRight; break;
                case 'up': this.img = Sprite.images.standingUp; break;
                case 'down': this.img = Sprite.images.standingDown; break;
            }
        }

        // Apply acceleration to velocity
        this.vx += ax;
        this.vy += ay;
    }

    private handleLifting(): void {
        if (this.liftedObject) {
            this.liftedObject.drop(this.lastDirection);
            this.liftedObject = null;
            return;
        }

        const spriteCenter = {
            x: this.x + (this.img?.width ?? 0) * 0.4,
            y: this.y + (this.img?.height ?? 0) * 0.4
        };
        let closestLiftable: Liftable | null = null;
        let closestDistance = Infinity;

        for (const liftable of this.liftableObjects) {
            if (liftable.isNearby(spriteCenter.x, spriteCenter.y)) {
                const liftableCenter = liftable.getCollisionBoundsCenter();
                const dx = liftableCenter.x - spriteCenter.x;
                const dy = liftableCenter.y - spriteCenter.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestLiftable = liftable;
                }
            }
        }

        if (closestLiftable) {
            this.liftedObject = closestLiftable;
            closestLiftable.lift();
        }

    }

    update(): void {
        this.vx *= this.friction;
        this.vy *= this.friction;

        const newX = this.x + this.vx;
        const newY = this.y + this.vy;

        if (!this.isColliding(newX, this.y)) {
            this.x = newX;
        }
        if (!this.isColliding(this.x, newY)) {
            this.y = newY;
        }

        // If the velocity is very small, stop the sprite completely
        if (Math.abs(this.vx) < 0.01) this.vx = 0;
        if (Math.abs(this.vy) < 0.01) this.vy = 0;
    }

    draw(): void {
        this.update();
        if (this.img) {
            this.p.image(this.img, this.x, this.y, this.img.width * 0.8, this.img.height * 0.8);
        } else if (Sprite.imagesLoaded) {
            this.img = Sprite.images.resting;
        }

        if (this.liftedObject) {
            this.liftedObject.followSprite(this.x, this.y);
        }
    }
}
