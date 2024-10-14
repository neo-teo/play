// @ts-nocheck
import Jellayer from "./jellayer";

export default class Jelly {
    constructor(p, x, y) {
        this.p = p;
        this.layers = [];
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.accX = 0;
        this.accY = 0;
        this.maxSpeed = 2;
        this.maxForce = 0.1;
        this.changeDirectionInterval = 100; // Change direction every 100 frames
        this.frameCount = 0;
        this.radius = 50; // Approximate radius of the jellyfish for boundary checking

        for (let i = 0; i < 3; i++) {
            this.layers.push(new Jellayer(p));
        }
    }

    applyForce(forceX, forceY) {
        this.accX += forceX;
        this.accY += forceY;
    }

    update() {
        // Update velocity
        this.velX += this.accX;
        this.velY += this.accY;

        // Limit speed
        let speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        if (speed > this.maxSpeed) {
            this.velX = (this.velX / speed) * this.maxSpeed;
            this.velY = (this.velY / speed) * this.maxSpeed;
        }

        // Update position
        this.x += this.velX;
        this.y += this.velY;

        // Check and handle screen boundaries
        this.handleBoundaries();

        // Reset acceleration
        this.accX = 0;
        this.accY = 0;

        // Change direction occasionally
        this.frameCount++;
        if (this.frameCount >= this.changeDirectionInterval) {
            this.changeDirection();
            this.frameCount = 0;
        }
    }

    handleBoundaries() {
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.velX *= -1;
        } else if (this.x + this.radius > this.p.windowWidth) {
            this.x = this.p.windowWidth - this.radius;
            this.velX *= -1;
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.velY *= -1;
        } else if (this.y + this.radius > this.p.windowHeight) {
            this.y = this.p.windowHeight - this.radius;
            this.velY *= -1;
        }
    }

    changeDirection() {
        let angle = this.p.random(this.p.TWO_PI);
        let force = this.p.random(0, this.maxForce);
        this.applyForce(this.p.cos(angle) * force, this.p.sin(angle) * force);
    }

    draw() {
        this.update();
        for (let layer of this.layers) {
            layer.draw(this.x, this.y);
        }
    }
}