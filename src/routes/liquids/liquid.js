// @ts-nocheck

export default class Liquid {
    constructor(p) {
        this.ballR = p.random(200, 400);
        this.ballX = p.width / 2;
        this.ballColor = p.color(p.random(255), p.random(255), p.random(255), p.random(100, 180));;
        this.ballNoise = this.ballR / 5;
        this.p = p;

        this.timeOffset = 0; // Initialize timeOffset here
    }

    draw() {
        this.p.push();

        // draw the ball
        this.p.fill(this.ballColor);
        this.p.translate(this.ballX, this.p.height / 2);

        let radius = this.ballR / 2;
        let noiseAmount = this.ballNoise;
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