// @ts-nocheck

export default class Ball {
    constructor(p) {
        this.ballR = p.random(100, 200);
        this.ballX = p.width / 2;;
        this.ballMoveSpeed = 6;
        this.ballRotation = 0;
        this.ballRotationSpeed = 6;
        this.ballColor = p.color(p.random(255), p.random(255), p.random(255));;
        this.ballNoise = p.random(5, 10);
        this.boundObjects = [];
        this.p = p;
    }

    reset() {
        this.boundObjects = [];
        this.ballR = this.p.random(100, 200);
        this.ballNoise = this.p.random(10, 15);
        this.ballColor = this.p.color(this.p.random(255), this.p.random(255), this.p.random(255));
    }

    bindObject(o) {
        this.boundObjects.push(o)
    }

    draw() {
        this.p.push();
        if (this.p.mouseX > this.ballX + this.ballR / 4) {
            if (this.ballX < this.p.width - this.ballR / 2) {
                this.ballX += this.ballMoveSpeed;
                this.ballRotation += this.ballRotationSpeed;
            }
        } else if (this.p.mouseX < this.ballX - this.ballR / 4) {
            if (this.ballX > this.ballR / 2) {
                this.ballX -= this.ballMoveSpeed;
                this.ballRotation -= this.ballRotationSpeed;
            }
        }

        // draw the ball
        this.p.fill(this.ballColor);
        this.p.translate(this.ballX, this.p.height - this.ballR / 2 + this.ballNoise / 2);
        this.p.rotate(this.p.radians(this.ballRotation));

        let radius = this.ballR / 2;
        let noiseAmount = this.ballNoise;
        this.p.beginShape();
        for (let angle = 0; angle < this.p.TWO_PI; angle += 0.1) {
            let xoff = this.p.map(this.p.cos(angle), -1, 1, 0, 1);
            let yoff = this.p.map(this.p.sin(angle), -1, 1, 0, 1);
            let r = radius + this.p.map(this.p.noise(xoff, yoff), 0, 1, -noiseAmount, noiseAmount);
            let x = r * this.p.cos(angle);
            let y = r * this.p.sin(angle);
            this.p.vertex(x, y);
        }
        this.p.endShape(this.p.CLOSE);

        // draw objects bound to the ball
        for (let bound of this.boundObjects) {
            this.p.push();
            this.p.translate(bound.relativeX, bound.relativeY);
            this.p.rotate(-bound.relativeRotation); // not sure why this should be -1 *, but it works that way lol!
            bound.object.draw(0, 0);
            this.p.pop();
        }
        this.p.pop();
    }
}