// @ts-nocheck

export default class Bottom {

    constructor(p) {
        this.x;
        this.y;
        this.p = p;
    }

    draw() {
        this.x = this.p.width / 2;
        this.y = this.p.height - 280;

        this.pantsW = 260;

        this.p.noStroke();
        this.p.rectMode(this.p.CENTER);

        this.legs();
        this.pants();
    }

    legs() {
        let pantsW = this.pantsW;
        this.p.push();
        // human leg
        this.p.fill("#4C4B4B")
        this.p.rect(this.x - pantsW / 4.7, this.y + pantsW / 1.2, pantsW / 8, pantsW / 5);

        this.p.fill("black");
        this.p.rect(
            this.x - pantsW / 3.3,
            this.y + pantsW / 1.2 + pantsW / 6,
            pantsW / 2.7,
            pantsW / 5,
            pantsW, pantsW / 15, pantsW / 50, pantsW / 30
        )

        // peg leg
        this.p.fill("#774E45")
        this.p.rect(
            this.x + pantsW / 3.2,
            this.y + pantsW / 1.2,
            pantsW / 8,
            pantsW / 2,
            // rounding
            0, 0, pantsW / 10, pantsW / 30
        );

        this.p.ellipse(
            this.x + pantsW / 3.2,
            this.y + pantsW / 1.2,
            pantsW / 6.5,
            pantsW / 2,
        );


        this.p.pop();
    }

    pants() {
        let pantsW = this.pantsW;

        this.p.push();

        // waist part of pants
        this.p.fill("#4B8EBF");
        this.p.rect(this.x, this.y, pantsW, pantsW / 2.5);

        // left trouser
        this.p.push();
        this.p.translate(
            this.x - pantsW / 3.4,
            this.y + pantsW / 3
        );
        this.p.rotate(3)
        this.p.rect(
            0, 0,
            pantsW / 2.2,
            pantsW
        );

        this.pantsFray();
        this.p.pop();

        // right trouser
        this.p.push();
        this.p.translate(
            this.x + pantsW / 3.4,
            this.y + pantsW / 3.5,
        );
        this.p.rotate(-3)
        this.p.rect(
            0, 0,
            pantsW / 2.2,
            pantsW
        );

        this.pantsFray();
        this.p.pop();

        this.p.pop();
    }

    pantsFray() {
        this.p.push();
        this.p.translate(-this.pantsW / 5.5, this.pantsW / 2)

        this.p.fill('#6FC2FF');

        let triangleW = this.pantsW / 10;

        for (let i = 0; i < 5; i++) {
            let c = i * this.pantsW / 11;

            this.p.triangle(
                c - triangleW / 2, 0,
                c + triangleW / 2, 0,
                c, this.pantsW / 20
            );
        }

        this.p.pop();
    }
}
