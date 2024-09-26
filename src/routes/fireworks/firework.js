// @ts-nocheck

import Particle from "./particle"; // Make sure to import the Particle class

const palette = ['#FF0000', '#FFD700', '#1E90FF', '#32CD32', '#8B4513', '#FF4500', '#800080', '#FF8C00', '#8B0000', '#F08080', '#FFA07A', '#ADFF2F', '#6495ED', '#D2691E', '#DA70D6'];

export default class Firework {

    constructor(x, y, letter, p, onExplode) {
        let size = 35
        if (letter === "S") {
            size = 35;
        } else if (letter === "M") {
            size = 100;
        } else if (letter === "H") {
            size = 200;
        } else if (letter === "?") {
            size = 300;
        }

        this.p = p;
        this.hu = this.p.random(255);
        this.firework = new Particle(x, y, this.hu, letter, size, true, p);
        this.exploded = false;
        this.particles = [];
        this.letter = letter;
        this.size = size;
        this.onExplode = onExplode;
    }

    update() {
        let gravity = this.p.createVector(0, 0.13);
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();

            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (!this.particles[i].done()) {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
            }
        }
    }

    explode() {
        let h = this.p.hour() % 12 || 12;
        let particleInfo = this.letter === "S"
            ? this.p.second()
            : this.letter === "M"
                ? this.p.minute()
                : this.letter === "H"
                    ? h
                    : this.letter === "?"
                        ? "it's\nmade up\nanyway"
                        : this.letter;
        let numParticles = this.letter === "S"
            ? 1
            : this.letter === "M"
                ? 3
                : this.letter === "H"
                    ? 6
                    : 10
        for (let i = 0; i < numParticles; i++) {
            const ptcl = new Particle(this.firework.pos.x, this.firework.pos.y, this.p.random(palette), particleInfo, this.size, false, this.p);
            this.particles.push(ptcl);
        }

        if (this.onExplode) {
            this.onExplode(this.letter);
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show();
        }

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}
