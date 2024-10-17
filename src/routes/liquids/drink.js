// @ts-nocheck

import Liquid from "./liquid";

const palette = ['#1E90FF', '#FF4500', '#FF8C00', '#F08080', '#6495ED'];

export default class Drink {
    // info is of type entry, seen in data.ts
    constructor(p, entry) {
        this.p = p;

        this.info = entry;

        this.drinkR;
        this.cupR;
        this.innerCupR;
        this.sizeThings();

        this.cupHandleRotation = this.p.random(0, this.p.TWO_PI);

        this.drinkNoise = this.p.random(this.drinkR / 8, this.drinkR / 10);

        // default colors
        this.drinkColor = this.p.color(this.p.random(255), this.p.random(255), this.p.random(255), this.p.random(100, 180));;
        this.cupColor = this.p.random(palette);
        // drink specific colors
        this.colorThings();

        this.liquid = new Liquid(this.p, this.drinkR, this.drinkColor, this.info.carbonated)

        this.timeOffset = 0;

        this.x = 0;
        this.y = 0;
    }

    draw(x, y) {
        this.sizeThings();
        this.x = x;
        this.y = y;

        this.p.push();

        this.p.translate(x, y);

        if (this.isHovered()) {
            this.p.scale(1.1);
            this.liquid.drinking = true;
        } else {
            this.p.scale(1);
        }

        this.p.fill(this.cupColor);
        this.p.ellipse(0, 0, this.cupR);
        if (this.info.drink === "coffee" || this.info.drink === "beer" || this.info.drink === "tea") {
            this.p.push();
            this.p.rotate(this.cupHandleRotation);
            this.p.rect(this.cupR - this.cupR / 2 + this.cupR / 15, 0, this.cupR / 6, this.cupR / 3, this.cupR / 22);
            this.p.pop();
        }

        this.p.fill(0, 0, 0, 20)
        this.p.ellipse(0, 0, this.innerCupR);

        this.liquid.draw(0, 0)

        this.p.pop();
    }

    isHovered() {
        let d = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
        return d < this.cupR / 2;
    }

    sizeThings = () => {
        let newDrinkR = this.p.map(this.info.volume, 0, 1000, 0, 300);

        if (this.p.width < 800) {
            newDrinkR = this.p.map(this.info.volume, 0, 1000, 0, 150);
            this.cupR = 500;
        }

        this.cupR = newDrinkR * 1.2;
        this.innerCupR = newDrinkR * .95;

        if (!this.drinking) {
            this.drinkR = newDrinkR;
        }
    }

    colorThings = () => {
        switch (this.info.drink) {
            case "coffee":
                this.drinkColor = this.p.color(150, 114, 89);
                break;
            case "seltzer":
                this.drinkColor = this.p.color(235, 254, 251);
                this.cupColor = this.p.color(255, 255, 255, 255);
                break;
            case "beer":
                this.drinkColor = this.p.color(245, 209, 49);
                this.cupColor = this.p.color(244, 238, 210, 255);
                break;
            case "tequila":
                this.drinkColor = this.p.color(248, 239, 180);
                this.cupColor = this.p.color(255, 255, 255, 255);
                break;
            case "water":
                this.drinkColor = this.p.color(235, 254, 251);
                this.cupColor = this.p.color(255, 255, 255, 255);
                break;
            case "tea":
                this.drinkColor = this.p.color(254, 199, 136, 230);
                break;
            case "milk":
                this.drinkColor = this.p.color(255, 255, 255);
                break;
            case "coca cola":
                this.drinkColor = this.p.color(154, 51, 36);
                break;
        }
    }
}