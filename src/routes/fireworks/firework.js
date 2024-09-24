// @ts-nocheck

import Particle from "./particle"; // Make sure to import the Particle class

const palette = ['#537DBD', '#CA683E', '#D3B934', '#AF9E7D', '#D85959', '#956750', '#277325', '#F3B524', '#972723', '#5B388B', '#686B1C', '#142D86', '#A1A329', '#BF1E16', '#3853A5', '#D7537E', '#E99F22', '#CE5310', '#613B31']

export default class Firework {

    constructor(x, y, letter, p) {
        let size = 10
        if (letter === "S") {
            size = 35;
        } else if (letter === "M") {
            size = 70;
        } else if (letter === "H") {
            size = 200;
        }

        this.p = p;
        this.hu = this.p.random(255);
        this.firework = new Particle(x, y, this.hu, letter, size, true, p);
        this.exploded = false;
        this.particles = [];
        this.letter = letter;
        this.size = size;
    }

    done() {
        if (this.exploded && this.particles.length === 0) {
            return true;
        } else {
            return false;
        }
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
                // this.particles.splice(i, 1);
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
            }
        }
    }

    explode() {
        // let h = this.p.hour() % 12 || 12;
        let particleInfo = this.letter === "S"
            ? this.p.second()
            : this.letter === "M"
                ? this.p.minute()
                : this.letter === "H"
                    ? this.p.hour()
                    : this.letter;
        for (let i = 0; i < 3; i++) {
            const ptcl = new Particle(this.firework.pos.x, this.firework.pos.y, this.p.random(palette), particleInfo, this.size, false, this.p);
            this.particles.push(ptcl);
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
