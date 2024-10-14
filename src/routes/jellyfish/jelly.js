// @ts-nocheck
import Jellayer from "./jellayer";
import Jellysics from "./jellysics";

export default class Jelly {
    constructor(p, x, y) {
        this.p = p;
        this.layers = [];
        this.radius = 50;
        this.physics = new Jellysics(p, x, y, this.radius);

        for (let i = 0; i < 3; i++) {
            this.layers.push(new Jellayer(p));
        }
    }

    draw() {
        this.physics.update();
        const { x, y } = this.physics.getPosition();
        const scale = this.physics.getScale();

        this.p.push();
        this.p.translate(x, y);
        this.p.scale(scale);
        for (let layer of this.layers) {
            layer.draw(0, 0); // Draw relative to the jellyfish center
        }
        this.p.pop();
    }
}