import p5 from 'p5'; // Import the p5 library

// Assuming you have the Obstacle class already defined somewhere
import { Obstacle } from './obstacle';
import type { Liftable } from './liftable';

export default class Sprite {
    private static images: { [key: string]: p5.Image } = {};

    private p: p5;  // Store the p5 instance
    private img: p5.Image;
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

    // private lastDirection: 'left' | 'right' | 'up' | 'down' = 'down';

    constructor(p: p5) {
        this.p = p;  // Store the p5 instance
        this.img = Sprite.images.resting;
        this.x = 50;
        this.y = 50;
        this.vx = 0;
        this.vy = 0;
        this.friction = .93;  // Adjust this value for more or less sliding
        this.speed = .8;
        this.obstacles = []; // Initialize obstacles array
    }

    static loadImages(p: p5): void {
        this.images = {
            resting: p.loadImage('/sobu/sprite/rest.gif'),
            walkingUp: p.loadImage('/sobu/sprite/up.gif'),
            walkingDown: p.loadImage('/sobu/sprite/down.gif'),
            walkingLeft: p.loadImage('/sobu/sprite/left.gif'),
            walkingRight: p.loadImage('/sobu/sprite/right.gif'),
        };
    }

    setObstacles(obstacles: Obstacle[]): void {
        this.obstacles = obstacles;
    }

    setLiftableObjects(liftables: Liftable[]): void {
        this.liftableObjects = liftables;
    }

    private isColliding(x: number, y: number): boolean {
        return this.obstacles.some(obstacle =>
            // If it's a Liftable, only collide if it's not lifted
            !('isLifted' in obstacle && (obstacle as unknown as Liftable).isLifted) &&
            obstacle.isColliding(x, y, this.img.width, this.img.height)
        );
    }

    setDirection(direction: keyof typeof Sprite.images): void {
        if (direction in Sprite.images) {
            this.img = Sprite.images[direction];
        }
    }

    handleInput(): void {
        const currentTime = Date.now();

        // Handle E key with cooldown
        if (this.p.keyIsDown(69) && // 69 is 'E' key
            currentTime - this.lastLiftTime > this.LIFT_COOLDOWN) {

            this.lastLiftTime = currentTime;
            this.handleLifting();
        }

        let ax = 0;
        let ay = 0;

        // Update acceleration based on key presses
        if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
            ax = -this.speed;
            this.setDirection('walkingLeft');
        } else if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
            ax = this.speed;
            this.setDirection('walkingRight');
        } else if (this.p.keyIsDown(this.p.UP_ARROW)) {
            ay = -this.speed;
            this.setDirection('walkingUp');
        } else if (this.p.keyIsDown(this.p.DOWN_ARROW)) {
            ay = this.speed;
            this.setDirection('walkingDown');
        } else {
            this.setDirection('resting');
        }

        // Apply acceleration to velocity
        this.vx += ax;
        this.vy += ay;
    }

    private handleLifting(): void {
        if (this.liftedObject) {
            const THROW_DISTANCE = 100; // pixels
            let dropX = this.x;
            let dropY = this.y;

            // Try different positions in order: front, left, right, back
            const tryPositions = [
                { x: dropX, y: dropY + THROW_DISTANCE }, // front
                { x: dropX - THROW_DISTANCE, y: dropY }, // left
                { x: dropX + THROW_DISTANCE, y: dropY }, // right
                { x: dropX, y: dropY - THROW_DISTANCE }  // back
            ];

            // Find first clear position
            const clearPosition = tryPositions.find(pos =>
                !this.isColliding(pos.x, pos.y)
            );

            if (clearPosition) {
                this.liftedObject.followSprite(clearPosition.x, clearPosition.y);
                this.liftedObject.drop();
                this.liftedObject = null;
            }
            // If no clear position, don't drop the object
        } else {
            for (const liftable of this.liftableObjects) {

                if (liftable.isNearby(this.x, this.y)) {
                    this.liftedObject = liftable;
                    liftable.lift(this.x, this.y);
                    break;
                }
            }
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
        this.p.image(this.img, this.x, this.y);

        if (this.liftedObject) {
            this.liftedObject.followSprite(this.x, this.y);
        }
    }
}
