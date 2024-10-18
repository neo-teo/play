// @ts-nocheck

const palette = ['#1E90FF', '#FF4500', '#FF8C00', '#F08080', '#6495ED'];

export default class Liquid {
    constructor(p, r, color, carbonated) {
        this.p = p;

        this.r = r;
        this.drinkColor = color;
        this.drinkNoise = this.p.random(this.r / 8, this.r / 10);

        this.carbonated = carbonated;

        this.timeOffset = 0;

        this.x = 0;
        this.y = 0;
    }

    drinking = false;

    draw(x, y) {
        this.x = x;
        this.y = y;

        this.p.push();

        if (this.drinking && this.r > 0) {
            this.r--;
        }

        this.p.translate(x, y);

        if (Math.floor(this.r > 1)) {
            this.p.fill(this.drinkColor);
            this.liquidCircle(this.r / 2);

            if (this.carbonated) {
                this.p.fill(255, 255, 255, 200);
                this.liquidCircle(this.r / 2 - 8 > 0 ? this.r / 2 - 8 : 0);
            }

            this.timeOffset += this.p.random(0.003, 0.01);
        }

        this.p.pop();
    }

    liquidCircle(radius) {
        this.p.beginShape();
        for (let angle = 0; angle < this.p.TWO_PI; angle += 0.1) {
            let xoff = this.p.map(this.p.cos(angle), -1, 1, 0, 1);
            let yoff = this.p.map(this.p.sin(angle), -1, 1, 0, 1);
            let r = radius + this.p.map(this.p.noise(xoff + this.timeOffset, yoff + this.timeOffset), 0, 1, -this.drinkNoise, this.drinkNoise);
            let x = r * this.p.cos(angle);
            let y = r * this.p.sin(angle);
            this.p.vertex(x, y);
        }
        this.p.endShape(this.p.CLOSE);
    }
}