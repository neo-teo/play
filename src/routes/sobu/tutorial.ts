import type p5 from "p5";
import type Sprite from "./sprite";

export class Tutorial {
    private p: p5;
    private currentStep: 'waiting' | 'movement' | 'transition' | 'interaction' | 'ending' | 'complete' = 'waiting';
    private hasMovedBefore: boolean = false;
    private hasInteractedBefore: boolean = false;
    private stepStartTime: number;

    constructor(p: p5) {
        this.p = p;
        this.stepStartTime = Date.now();
    }

    update(sprite: Sprite): void {
        const now = Date.now();
        const timeSinceStart = now - this.stepStartTime;

        switch (this.currentStep) {
            case 'waiting':
                if (timeSinceStart > 2000) {
                    this.currentStep = 'movement';
                    this.stepStartTime = now;
                }
                break;

            case 'movement':
                if (sprite.vx !== 0 || sprite.vy !== 0) {
                    setTimeout(() => {
                        this.hasMovedBefore = true;
                    }, 2000);
                }

                if (this.hasMovedBefore) {
                    this.currentStep = 'transition';
                    this.stepStartTime = now;
                }
                break;

            case 'transition':
                if (timeSinceStart > 2000) {
                    this.currentStep = 'interaction';
                    this.stepStartTime = now;
                }
                break;

            case 'interaction':
                if (sprite.hasInteractedRecently()) {
                    setTimeout(() => {
                        this.hasInteractedBefore = true;
                    }, 2000);
                }

                if (this.hasInteractedBefore) {
                    this.currentStep = 'ending';
                    this.stepStartTime = now;
                }
                break;

            case 'ending':
                if (timeSinceStart > 2000) {
                    this.currentStep = 'complete';
                }
                break;
        }
    }

    draw(): void {
        if (this.currentStep === 'waiting' ||
            this.currentStep === 'transition' ||
            this.currentStep === 'ending' ||
            this.currentStep === 'complete') return;

        this.p.push();
        this.p.textAlign('center');
        this.p.textSize(17);

        const text = this.currentStep === 'movement'
            ? "WASD / Arrows to move"
            : "E to interact";

        this.p.text(text, this.p.width / 2, this.p.height / 2);
        this.p.pop();
    }

    isComplete(): boolean {
        return this.currentStep === 'complete';
    }
}