// @ts-nocheck

const palette = ['#FFD700', '#1E90FF', '#FF4500', '#800080', '#FF8C00', '#F08080', '#6495ED'];

export default class Liquid {
    // info is of type entry, seen in data.ts
    constructor(p, entry) {
        this.ballR = p.map(entry.volume, 0, 1000, 0, 300);

        this.cupHandleRotation = p.random(0, p.TWO_PI);
        this.cupColor = p.random(palette);
        this.drinkColor = p.color(p.random(255), p.random(255), p.random(255), p.random(100, 180));;
        this.drinkNoise = p.random(this.ballR / 8, this.ballR / 10);
        this.p = p;

        this.info = entry;

        switch (entry.drink) {
            case "coffee":
                this.drinkColor = p.color(150, 114, 89);
                break;
            case "seltzer":
                this.drinkColor = p.color(255, 255, 255, 100);
                this.cupColor = p.color(227, 244, 229, 200)
                break;
            case "beer":
                this.drinkColor = p.color(245, 209, 49);
                this.cupColor = p.color(244, 238, 210);
                break;
            case "tequila":
                this.drinkColor = p.color(248, 239, 180);
                this.cupColor = p.color(255, 255, 255, 200);
                break;
            case "water":
                this.drinkColor = p.color(235, 254, 251);
                this.cupColor = p.color(255, 255, 255, 200);
                break;
            case "tea":
                this.drinkColor = p.color(254, 199, 136, 200);
                break;
            case "milk":
                this.drinkColor = p.color(255, 255, 255);
                break;
            case "coca cola":
                this.drinkColor = p.color(154, 51, 36);
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

        this.p.translate(x, y);

        if (this.isHovered()) {
            console.log("drink is hovered!!")
            this.p.scale(1.1);
        } else {
            this.p.scale(1);
        }

        if (this.info.drink === "water" || this.info.drink === "tequila") {
            this.p.stroke(160);
            this.p.strokeWeight(2);
        }

        this.p.fill(this.cupColor);
        this.p.ellipse(0, 0, this.ballR * 1.2);

        if (this.info.drink === "coffee" || this.info.drink === "beer" || this.info.drink === "tea") {
            this.p.push();
            this.p.rotate(this.cupHandleRotation);
            this.p.rect(this.ballR - this.ballR / 2, 0, this.ballR / 2, this.ballR / 2, this.ballR / 10);
            this.p.pop();
        }

        this.p.noStroke();
        this.p.fill(this.drinkColor);

        let radius = this.ballR / 2;
        let noiseAmount = this.drinkNoise;
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

        this.timeOffset += this.p.random(0.001, 0.003);

        this.p.pop();
    }

    isHovered() {
        let d = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
        return d < this.ballR / 2;
    }
}