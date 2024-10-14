// @ts-nocheck

export default class JellyPhysics {
    constructor(p, x, y, radius) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.accX = 0;
        this.accY = 0;
        this.radius = radius;
        this.maxSpeed = 2;
        this.maxForce = 0.1;
        this.changeDirectionInterval = 100;
        this.frameCount = 0;

        // Scaling properties
        this.baseScale = 1;
        this.currentScale = 1;
        this.targetScale = 1;
        this.scaleSpeed = 0.05;
        this.maxScale = 1.2;
        this.isHovered = false;
    }

    update() {
        this.updatePosition();
        this.updateScale();
    }

    updatePosition() {
        this.velX += this.accX;
        this.velY += this.accY;

        let speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        if (speed > this.maxSpeed) {
            this.velX = (this.velX / speed) * this.maxSpeed;
            this.velY = (this.velY / speed) * this.maxSpeed;
        }

        this.x += this.velX;
        this.y += this.velY;

        this.handleBoundaries();

        this.accX = 0;
        this.accY = 0;

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

    applyForce(forceX, forceY) {
        this.accX += forceX;
        this.accY += forceY;
    }

    updateScale() {
        this.targetScale = this.baseScale;

        let d = this.p.dist(this.x, this.y, this.p.mouseX, this.p.mouseY);
        if (d < this.radius) {
            this.targetScale = this.maxScale
        }
        this.currentScale = this.p.lerp(this.currentScale, this.targetScale, this.scaleSpeed);
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getScale() {
        return this.currentScale;
    }
}