// @ts-nocheck

export default class Particle {
    constructor(x, y, color, letter, size, firework, p) {
        this.p = p;
        this.pos = this.p.createVector(x, y);
        this.firework = firework;
        this.lifespan = 50;
        this.color = color;
        this.letter = letter;
        this.size = size;
        this.acc = this.p.createVector(0, 0);
        this.rotation = 0;
        this.rotationDiff = this.p.random(-1, 1);

        if (this.firework) {
            this.vel = this.p.createVector(0, this.p.random(-12, -8));
        } else {
            let displacement = this.p.random(4, 15);

            if (letter === this.p.hour()) {
                displacement = this.p.random(20, 30);
            } else if (letter === this.p.minute()) {
                displacement = this.p.random(10, 20);
            }
            this.vel = p.Vector.random2D();
            this.vel.mult(displacement);
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if (!this.firework) {
            this.vel.mult(0.92);
            this.lifespan -= 2.5;
            this.rotation += this.rotationDiff;
        } else {
            this.rotation += 0.2;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); // Reset acceleration
    }

    done() {
        return this.lifespan < 0;
    }

    show() {
        this.p.textSize(30);
        this.p.angleMode(this.p.DEGREES);

        if (!this.firework) {
            this.p.push();
            this.p.translate(this.pos.x, this.pos.y);
            this.p.rotate(this.rotation);

            this.p.noStroke();
            this.p.fill(this.color);
            this.p.ellipse(0, 0, this.size, this.size);

            this.p.textSize(this.size / 2);

            this.p.fill('#EFEDE4');
            this.p.text(this.letter, -9, 10);
            this.p.pop();
        } else {

            this.p.angleMode(this.p.RADIANS);
            this.p.push();
            this.p.translate(this.pos.x, this.pos.y);
            this.p.rotate(this.rotation);

            this.p.noStroke();
            this.p.fill('#EFEDE4');

            this.p.ellipse(0, 0, this.size, this.size);
            this.p.textSize(this.size / 2);

            this.p.fill('#000');
            this.p.text(this.letter, -9, 10);
            this.p.pop();
        }
    }
}
