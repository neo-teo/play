// @ts-nocheck

export default class Liquid {
    // info is of type entry, seen in data.ts
    constructor(p, entry) {
        this.ballR = p.map(entry.volume, 0, 1000, 0, 300);

        this.ballColor = p.color(p.random(255), p.random(255), p.random(255), p.random(100, 180));;
        this.ballNoise = p.random(this.ballR / 3, this.ballR / 10);
        this.p = p;

        this.info = entry;

        switch (entry.drink) {
            case "coffee":
                this.ballColor = p.color(150, 114, 89);
                break;
            case "seltzer":
                this.ballColor = p.color(84, 100, 100, 10);
                break;
            case "beer":
                this.ballColor = p.color(245, 209, 49);
                break;
            case "tequila":
                this.ballColor = p.color(250, 255, 179);
                break;
            case "water":
                this.ballColor = p.color(246, 251, 252, 20);
                break;
            case "tea":
                this.ballColor = p.color(146, 60, 1);
                break;
            case "milk":
                this.ballColor = p.color(255, 255, 255);
                break;
            case "coca cola":
                this.ballColor = p.color(154, 51, 36)
                break;
        }

        this.timeOffset = 0;

        this.x = 0;
        this.y = 0;
    }

    draw(x, y) {
        this.x = x;
        this.y = y;

        this.p.push();

        // draw the ball
        this.p.fill(this.ballColor);
        this.p.translate(x, y);

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

        this.timeOffset += this.p.random(0.002, 0.005);

        this.p.pop();
    }

    isHovered(mouseX, mouseY) {
        let d = this.p.dist(mouseX, mouseY, this.x, this.y);
        return d < this.ballR / 2;
    }
}