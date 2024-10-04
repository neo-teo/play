// may be missing an eye but he can hear incredibly well with big ears

// legend says that he attacks at night and the only thing you'll get to
// see is reflection off his golden earring

// @ts-nocheck

export default class Legend {

    constructor(legendSize, p) {
        this.x;
        this.y;
        this.p = p;

        this.baseSize = legendSize;
        this.legendSize = legendSize;

        this.isHovered = false;
        this.isExpanded = true; // TODO: uncheck
    }

    draw() {
        let legendSize = this.legendSize;

        this.x = this.p.width - legendSize * 1.1 + legendSize / 2;
        this.y = this.p.height - legendSize * 1.1 + legendSize / 2;

        // TODO: make sure we don't do this stuff when isExpanded
        if (this.mouseIsIntersecting()) {
            this.isHovered = true;
            this.legendSize = this.baseSize * 1.1; // Scale up by 10%
            this.p.cursor(this.p.HAND); // Change cursor to hand
        } else {
            this.isHovered = false;
            this.legendSize = this.isExpanded ? this.baseSize * 1.1 : this.baseSize;
            this.p.cursor(this.p.ARROW); // Reset cursor
        }

        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.rotate(-5);

        // draw legend "paper"
        this.p.fill('#FFE8AC');
        this.p.noStroke();
        this.p.rectMode(this.p.CENTER);
        this.p.rect(0, 0, legendSize, legendSize, legendSize / 8, legendSize / 3, legendSize / 8, legendSize / 7);

        // Set up for drawing squiggles
        this.p.strokeWeight(legendSize / 20);
        this.p.stroke("#0A234A");
        this.p.noFill();

        // draw "writing" on legend paper
        for (let i = 0; i < 3; i++) {
            let yOffset = (i - 1) * legendSize / 4; // Distribute vertically
            let amplitude = (i % 2) ? legendSize / 70 : legendSize / 90;
            let shorter = i % 2 === 0;
            this.squiggle(
                legendSize,
                yOffset,
                amplitude,
                5 / legendSize,
                shorter
            );
        }

        this.p.pop();

        // Draw expanded rectangle if isExpanded is true
        if (this.isExpanded) {
            this.expandedLegend();
        }
    }

    squiggle(size, yOffset, amplitude, frequency, shorter) {
        let end = shorter ? 2.5 : 3.5;
        this.p.beginShape();
        for (let x = -size / 2.5; x <= size / end; x += 1) {
            let y = amplitude * Math.sin(x * frequency * Math.PI * 2) + yOffset;
            this.p.vertex(x, y);
        }
        this.p.endShape();
    }

    handleClick() {
        if (this.isExpanded) {
            this.isExpanded = false;
            return;
        }

        if (this.isHovered) {
            this.isExpanded = true;
        }
    }

    expandedLegend() {
        this.p.push();
        this.p.translate(
            this.p.width * 0.5,
            this.p.height * 0.5 + 120
        )

        this.p.fill(255, 240, 200, 250);
        this.p.rect(
            0, 0,
            400,
            500,
            50,
            100,
            50,
            50
        );
        let lineHeight = 30;
        this.p.fill("black")
        this.p.textSize(30);
        this.p.textFont('Courier New');
        this.p.strokeWeight(3);
        this.p.stroke(50)
        // this.p.rotate(-1);
        this.p.text("Cottonbeard Willump", -170, - lineHeight * 5);
        this.p.rotate(2);
        this.p.textSize(22);
        this.p.text("  Part rabbit, part dodo,", -150, - lineHeight * 2);
        this.p.text("part human ;", -150, - lineHeight * 1);

        this.p.rotate(-3);
        this.p.text("One eye but hearing as   ", -170, lineHeight * 1);
        this.p.rotate(1);
        this.p.text("  sharp as the sea breeze", -170, lineHeight * 2);
        this.p.rotate(-3);
        this.p.text("    eye", -170, lineHeight * 1);

        this.p.rotate(5);
        this.p.text("  they say his golden ear ", -160, lineHeight * 6);
        this.p.rotate(-2);
        this.p.text("shines under the moon's eye", -160, lineHeight * 7);

        this.p.text
        this.p.pop();
    }

    mouseIsIntersecting() {
        return this.p.mouseX > this.x - this.legendSize / 2 &&
            this.p.mouseX < this.x + this.legendSize / 2 &&
            this.p.mouseY > this.y - this.legendSize / 2 &&
            this.p.mouseY < this.y + this.legendSize / 2
    }
}
