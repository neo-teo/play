// @ts-nocheck

import Jellayer from "./jellayer"; // Make sure to import the Particle class

export default class Jelly {
    constructor(p, x, y) {
        this.p = p;

        this.layers = []

        this.x = x;
        this.y = y;

        for (let i = 0; i < 3; i++) {
            this.layers.push(new Jellayer(p))
        }
    }

    draw() {
        for (let layer of this.layers) {
            let velX = 0 // Math.random(-1, 1)
            let velY = 0 // Math.random(-1, 1)
            layer.draw(this.x + velX, this.y + velY);
        }
    }
}