import type p5 from "p5";
import type Sprite from "./sprite";

export class Tutorial {
    private p: p5;
    private currentStep: 'movement' | 'interaction' | 'complete' = 'movement';
    private hasMovedBefore: boolean = false;
    private hasInteractedBefore: boolean = false;

    constructor(p: p5) {
        this.p = p;
    }

    update(sprite: Sprite): void {
        if (this.currentStep === 'movement' &&
            (sprite.vx !== 0 || sprite.vy !== 0)) {
            this.hasMovedBefore = true;
        }

        if (this.currentStep === 'interaction' &&
            sprite.hasInteractedRecently()) {
            this.hasInteractedBefore = true;
        }

        if (this.currentStep === 'movement' && this.hasMovedBefore) {
            this.currentStep = 'interaction';
        } else if (this.currentStep === 'interaction' && this.hasInteractedBefore) {
            this.currentStep = 'complete';
        }
    }

    isComplete(): boolean {
        return this.currentStep === 'complete';
    }

    draw(): void {
        if (this.isComplete()) return;

        this.p.push();
        this.p.textAlign('center');
        this.p.textStyle('bold');
        this.p.textSize(15);

        const text = this.currentStep === 'movement'
            ? "WASD to move"
            : "Press E near an object to interact";

        this.p.text(text, this.p.width / 2, this.p.height / 2);
        this.p.pop();
    }
}