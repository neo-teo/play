// @ts-nocheck

const palette = ['#1E90FF80', '#FF450080', '#FF8C0080', '#F0808080', '#6495ED80'];

export default class Liquid {
    // info is of type entry, seen in data.ts
    constructor(p, entry) {
        this.p = p;

        this.info = entry;

        this.ballR = p.map(entry.volume, 0, 1000, 0, 300);

        this.cupHandleRotation = this.p.random(0, this.p.TWO_PI);
        this.cupColor = this.p.random(palette);

        this.drinkColor = this.p.color(this.p.random(255), this.p.random(255), this.p.random(255), this.p.random(100, 180));;
        this.drinkNoise = this.p.random(this.ballR / 8, this.ballR / 10);

        this.cupR;
        this.innerCupR;

        this.sizeThings();

        switch (entry.drink) {
            case "coffee":
                this.drinkColor = p.color(150, 114, 89);
                break;
            case "seltzer":
                this.drinkColor = p.color(255, 255, 255, 100);
                this.cupColor = p.color(227, 244, 229, 230)
                break;
            case "beer":
                this.drinkColor = p.color(245, 209, 49);
                this.cupColor = p.color(244, 238, 210, 230);
                break;
            case "tequila":
                this.drinkColor = p.color(248, 239, 180);
                this.cupColor = p.color(255, 255, 255, 230);
                break;
            case "water":
                this.drinkColor = p.color(235, 254, 251);
                this.cupColor = p.color(255, 255, 255, 230);
                break;
            case "tea":
                this.drinkColor = p.color(254, 199, 136, 230);
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

    drinking = false;

    draw(x, y) {

        this.sizeThings();
        this.x = x;
        this.y = y;

        this.p.push();

        if (this.drinking && this.ballR > 0) {
            this.ballR--;
        }

        this.p.translate(x, y);

        if (this.isHovered()) {
            this.p.scale(1.1);
            this.drinking = true;
        } else {
            this.p.scale(1);
        }

        this.p.stroke(160, 160, 160, 50);
        this.p.strokeWeight(2);

        this.p.fill(0, 0, 0, 50)
        this.p.ellipse(0, 0, this.innerCupR);

        this.p.fill(this.cupColor);
        this.p.ellipse(0, 0, this.cupR);
        if (this.info.drink === "coffee" || this.info.drink === "beer" || this.info.drink === "tea") {
            this.p.noStroke();
            this.p.push();
            this.p.rotate(this.cupHandleRotation);
            this.p.rect(this.cupR - this.cupR / 2 + this.cupR / 15, 0, this.cupR / 6, this.cupR / 4, this.cupR / 22);
            this.p.pop();
        }

        if (Math.floor(this.ballR > 1)) {
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
        }


        this.p.pop();
    }

    isHovered() {
        let d = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
        return d < this.cupR / 2;
    }

    sizeThings = () => {
        let newBallR = this.p.map(this.info.volume, 0, 1000, 0, 300);

        if (this.p.width < 800) {
            newBallR = this.p.map(this.info.volume, 0, 1000, 0, 200);
            this.cupR = 500;
        }

        this.cupR = newBallR * 1.2;
        this.innerCupR = newBallR * 1.1;

        if (!this.drinking) {
            this.ballR = newBallR;
        }
    }
}