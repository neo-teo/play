import p5 from 'p5'; // Import the p5 library

// Assuming you have the Obstacle class already defined somewhere
import { Obstacle } from './obstacle';

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

    private isColliding(x: number, y: number): boolean {
        return this.obstacles.some(obstacle =>
            obstacle.isColliding(x, y, this.img.width, this.img.height)
        );
    }

    setDirection(direction: keyof typeof Sprite.images): void {
        if (direction in Sprite.images) {
            this.img = Sprite.images[direction];
        }
    }

    handleMovement(): void {
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
        this.handleMovement();
        this.update();
        this.p.image(this.img, this.x, this.y);
    }
}
