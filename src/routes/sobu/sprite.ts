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
        this.p = p;  // Store the p5 instance
        this.x = 50;
        this.y = 50;
        this.vx = 0;
        this.vy = 0;
        this.friction = .80;  // Adjust this value for more or less sliding
        this.speed = .5;
        this.obstacles = []; // Initialize obstacles array
    }

    static loadImages(p: p5): void {
        // Load images synchronously in preload
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

        return this.obstacles.some(obstacle =>
            // If it's a Liftable, only collide if it's not lifted
            !('isLifted' in obstacle && (obstacle as unknown as Liftable).isLifted) &&
            obstacle.isColliding(x, y, this.img!.width, this.img!.height)
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
