// @ts-nocheck

export default class Middle {

    constructor(p) {
        this.x;
        this.y;
        this.p = p;
    }

    draw() {
        this.x = this.p.width / 2;
        this.y = this.p.height / 2;

        this.bodySize = 200;

        this.p.noStroke();
        this.p.rectMode(this.p.CENTER);

        this.body();
    }

    body() {
        let bodySize = this.bodySize;

        let bodyW = bodySize * 1.4;
        let bodyH = bodySize;

        //left arm
        this.p.push();
        this.p.translate(this.x - bodyW / 2, this.y - bodyH / 6)
        this.p.fill("#4E4232");
        this.p.rotate(40);
        this.p.ellipse(
            0, 0,
            bodyW / 4,
            bodyH / 2
        );
        this.p.pop();

        // torso
        this.p.push();
        this.p.fill("#554A39")
        this.p.ellipse(this.x, this.y, bodyW, bodyH);

        let tummyW = bodyH * 1.1
        let tummyH = tummyW / 2;
        this.p.fill("#AEAD9F50")
        this.p.ellipse(this.x, this.y + tummyH / 4, tummyW, tummyH);
        this.p.pop();

        // right arm
        this.p.push();
        this.p.translate(this.x + bodyW / 2, this.y - bodyH / 6)
        this.p.fill("#4E4232");
        this.p.rotate(-40);
        this.p.ellipse(
            0, 0,
            bodyW / 4,
            bodyH / 2
        );
        this.p.pop();
    }
}
