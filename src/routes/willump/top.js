// @ts-nocheck

export default class Top {

    constructor(p) {
        this.x;
        this.y;
        this.p = p;

        this.isHovering = false;
        this.shakeSpeed = 30; // Increased for more noticeable effect
        this.maxShakeAngle = 3; // Maximum shake angle in degrees
        this.angerLevel = 0;
    }

    draw() {
        this.x = this.p.width / 2;
        this.y = this.p.height - 280 - 90 - 135;

        this.headSize = 130;

        this.p.noStroke();
        this.p.rectMode(this.p.CENTER);

        this.checkHover();
        this.updateShake();

        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.rotate(this.shakeAngle);
        this.p.translate(-this.x, -this.y);

        this.ears();
        this.face();
        this.eyes();
        this.p.pop();
    }

    checkHover() {
        let d = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
        this.isHovering = d < this.headSize / 2;
    }

    updateShake() {
        let shakeSpeed = this.isHovering ? 30 : 3;
        let targetSize = this.isHovering ? 170 : 140;
        this.headSize = this.p.lerp(this.headSize, targetSize, 0.1); // 0.1 is the smoothing factor

        // this.headSize = this.isHovering ? 145 : 140;
        this.shakeAngle = this.p.sin(this.p.frameCount * shakeSpeed) * this.p.degrees(.05);
    }

    face() {
        this.p.push();

        let headSize = this.headSize;

        // head
        this.p.fill('#A1795B');
        this.p.rect(
            this.x,
            this.y,
            headSize,
            headSize,
            // rounding
            headSize,
            headSize,
            headSize * 0.35,
            headSize * 0.35
        );

        // cheeks
        let cheekSize = headSize / 2.8;
        this.p.fill('#C29370');
        this.p.ellipse(
            this.x - (headSize / 6),
            this.y + headSize / 4,
            cheekSize * 1.3,
            cheekSize,
        );
        this.p.ellipse(
            this.x + (headSize / 6),
            this.y + headSize / 4,
            cheekSize * 1.3,
            cheekSize,
        );

        // nose
        this.p.fill("#FD728B")
        this.p.rect(
            this.x,
            this.y + (cheekSize / 3),
            cheekSize / 1.7,
            cheekSize / 2.5,
            // rounding
            cheekSize / 10,
            cheekSize / 10,
            cheekSize * 20,
            cheekSize * 20,
        );

        this.p.pop();
    }

    eyes() {
        let headSize = this.headSize;

        // eyeball
        let eyeW = headSize / 3.5;
        let eyeH = headSize / 2.3;

        let eyeX = this.x - (headSize / 5);
        let eyeY = this.y - (eyeH / 2);

        // this.p.fill("#D9D9D9");
        this.p.fill("#D9D9D9");

        // Check if hovering and update angerLevel
        if (this.isHovering) {
            this.angerLevel = Math.min(this.angerLevel + 0.3, 1);
        } else {
            this.angerLevel = Math.max(this.angerLevel - 0.3, 0);
        }

        // Draw the eye
        const startAngle = 0;
        const endAngle = this.p.lerp(360, 280, this.angerLevel);

        this.p.arc(eyeX, eyeY, eyeW, eyeH, startAngle, endAngle, this.p.CHORD);


        // iris
        let irisW = eyeW / 2 // TODO: split irisW irisH for ellipse ?
        let irisH = eyeH / 2 // TODO: split irisW irisH for ellipse ?

        let maxDistance = (eyeW - irisW) / 2.7 // eyeW - (irisSize * 1.5);

        let dx = this.p.mouseX - eyeX;
        let dy = this.p.mouseY - eyeY;

        let distance = Math.min(this.p.dist(eyeX, eyeY, this.p.mouseX, this.p.mouseY), maxDistance);
        let angle = Math.atan2(dy, dx);

        let irisX = eyeX + Math.cos(angle) * distance;
        let irisY = eyeY + Math.sin(angle) * distance;

        this.p.fill("black")
        this.p.ellipse(
            irisX,
            irisY,
            irisW,
            irisH,
        );

        // eye patch
        this.p.push();
        let patchW = headSize / 2.4;
        let patchH = headSize / 2.7;
        this.p.translate(this.x + (headSize / 3.8), this.y - (headSize / 5));
        this.p.rotate(7);
        this.p.fill("black");
        this.p.rect(
            0, 0,
            patchW,
            patchH,
            // rounding
            patchH / 4,
            patchH / 4,
            patchH * 2,
            patchH * 2
        );

        this.p.stroke('black')
        this.p.strokeWeight(patchH / 4);
        this.p.noFill();
        let bandStartX = 0;
        let bandStartY = -patchH / 2.5;
        let bandEndX = -headSize / 1.7;  // 200px to the left
        let bandEndY = -patchH / 2.5;
        let controlPointX = (bandStartX + bandEndX) / 2;
        let controlPointY = -patchH / 2;  // Adjust this value to change the curve height

        this.p.bezier(
            bandStartX, bandStartY,
            controlPointX, controlPointY,
            controlPointX, controlPointY,
            bandEndX, bandEndY
        );

        this.p.pop();
    }

    ears() {
        let headSize = this.headSize;

        this.p.push();

        // right ear
        let rightEarW = this.headSize / 1.4;
        let rightEarH = this.headSize * 2;

        this.p.translate(this.x, this.y);

        this.p.rotate(20);

        this.p.fill('#C29370');
        this.p.ellipse(rightEarW / 5, -rightEarH / 2, rightEarW, rightEarH);

        this.p.fill('#FC83BD60');
        this.p.ellipse(rightEarW / 5, -rightEarH / 2.4, rightEarW / 2, rightEarH / 1.5);

        // left ear
        this.p.rotate(-40);

        this.p.fill('#C29370');
        this.p.ellipse(-rightEarW / 5, -rightEarH / 2.5, rightEarW, rightEarH / 1.5);

        this.p.fill('#FC83BD60');
        this.p.ellipse(-rightEarW / 5, -rightEarH / 2.8, rightEarW / 2, rightEarH / 2);

        this.p.rotate(-15);
        this.p.fill('#C29370');
        this.p.ellipse(-rightEarW / 5, -rightEarH / 1.6, rightEarW * 1.5, rightEarH / 3);

        // left ear earring hole
        this.p.rotate(35);
        this.p.fill('#FFFBF3');
        this.p.ellipse(-rightEarW * 1.65, -rightEarH / 3, rightEarW / 5, rightEarW / 4);

        // left ear earring hoop rotation
        this.p.push();
        this.p.stroke('#FFCC69');
        this.p.translate(-rightEarW * 1.62, -rightEarH / 4);

        // jiggle for earring
        let earringJiggleSpeed = this.isHovering ? 20 : 4; // Speed up the jiggle on hover
        let earringMaxRotate = this.isHovering ? this.p.degrees(0.6) : this.p.degrees(0.2);
        let earringJiggle = this.p.sin(this.p.frameCount * earringJiggleSpeed) * earringMaxRotate; // Independent jiggle

        this.p.rotate(earringJiggle);

        this.p.strokeWeight(rightEarW / 8);
        this.p.noFill();
        this.p.ellipse(0, 0, rightEarW / 3.5, rightEarW / 2.5);
        this.p.noStroke();
        this.p.pop();

        // left ear earring skin cover
        this.p.push();
        this.p.fill('#C29370');
        this.p.translate(-rightEarW * 1.7, -rightEarH / 3.30);
        this.p.rotate(35);
        this.p.ellipse(0, 0, rightEarW / 5, rightEarW / 15);
        this.p.pop();

        this.p.pop();
    }

}
