// @ts-nocheck

export default class Jellayer {
    constructor(p) {
        this.r = p.random(50, 200);
        this.color = p.color(p.random(255), p.random(255), p.random(255), p.random(100, 180));;
        this.noise = this.r / 5;
        this.p = p;

        this.timeOffset = 0; // Initialize timeOffset here
    }

    draw(x, y) {
        this.p.push();

        // draw the ball
        this.p.fill(this.color);
        this.p.translate(x, y);

        let radius = this.r / 2;
        let noiseAmount = this.noise;
        this.p.beginShape();
        for (let angle = 0; angle < this.p.TWO_PI; angle += 0.1) {
            let xoff = this.p.map(this.p.cos(angle), -1, 1, 0, 1);
            let yoff = this.p.map(this.p.sin(angle), -1, 1, 0, 1);
            let r = radius + this.p.map(this.p.noise(xoff + this.timeOffset, yoff + this.timeOffset), 0, 1, -noiseAmount, noiseAmount);
            let x = r * this.p.cos(angle);
            let y = r * this.p.sin(angle);
            this.p.vertex(x, y);
        }
        this.p.endShape(this.p.CLOSE);

        this.timeOffset += 0.004;

        this.p.pop();
    }
}