import type p5 from "p5";
import type { Liftable } from "./liftable";

export class CargoBay {
    private p: p5;  // Store the p5 instance

    private liftables: Liftable[] = [];

    private readonly bayWidth = 75;
    private readonly bayHeight = 500;

    private displayWeight: number = 0;
    private targetWeight: number = 0;
    private isCalibrating: boolean = false;
    private calibrationStartTime: number = 0;
    private readonly CALIBRATION_DURATION: number = 500; // 2 seconds of calibration
    private lastUpdateTime: number = 0;
    private readonly UPDATE_INTERVAL: number = 100;


    constructor(p: p5, liftables: Liftable[]) {
        this.p = p;

        this.liftables = liftables;

        this.targetWeight = this.calculateTotalWeight();
        this.displayWeight = this.targetWeight;
    }

    private calculateTotalWeight(): number {
        let totalWeight = 0;
        const bounds = this.getBayBounds();

        for (const liftable of this.liftables) {
            if (liftable.isLifted) continue;

            const objCenter = liftable.getCollisionBoundsCenter();
            if (objCenter.x >= bounds.x &&
                objCenter.x <= bounds.x + bounds.width &&
                objCenter.y >= bounds.y &&
                objCenter.y <= bounds.y + bounds.height) {
                totalWeight += liftable.weight;
            }
        }
        return totalWeight;
    }

    whatIsWeight(): number {
        const newWeight = this.calculateTotalWeight();

        // Start calibration if weight has changed
        if (newWeight !== this.targetWeight) {
            this.targetWeight = newWeight;
            this.displayWeight = this.targetWeight;
            this.isCalibrating = true;
            this.calibrationStartTime = Date.now();
            this.lastUpdateTime = Date.now();
        }

        // Handle calibration animation
        if (this.isCalibrating) {
            const elapsed = Date.now() - this.calibrationStartTime;

            if (elapsed > this.CALIBRATION_DURATION) {
                // Calibration complete
                this.isCalibrating = false;
                this.displayWeight = this.targetWeight;
            } else {
                // Only update fluctuation every UPDATE_INTERVAL
                const currentTime = Date.now();
                if (currentTime - this.lastUpdateTime >= this.UPDATE_INTERVAL) {
                    const progress = elapsed / this.CALIBRATION_DURATION;
                    const maxFluctuation = 2 * (1 - progress); // Increased fluctuation for visibility
                    const randomOffset = (Math.random() - 0.5) * maxFluctuation * 2;

                    this.lastUpdateTime = currentTime;
                    this.displayWeight = this.targetWeight + randomOffset;  // Update displayWeight
                }
                return this.displayWeight;  // Always return displayWeight
            }
        }

        return this.displayWeight;
    }

    private getBayBounds() {
        const middleX = this.p.width - this.bayWidth * 1.1;
        const middleY = this.p.height / 2;

        return {
            x: middleX - this.bayWidth / 2,
            y: middleY - this.bayHeight / 2,
            width: this.bayWidth,
            height: this.bayHeight
        };
    }

    draw(): void {
        const bayWidth = 75;
        const bayHeight = 500;

        let rectW = 15;

        let yoff = bayHeight + rectW;
        let xoff = bayWidth + rectW;

        let middleX = this.p.width - bayWidth * 1.1;
        let middleY = this.p.height / 2;

        this.p.push();
        this.p.fill('#2675f8');
        this.p.translate(middleX, middleY);

        this.p.rectMode(this.p.CENTER);
        this.p.noStroke();
        this.p.rect(0, -yoff / 2, bayWidth, rectW);
        this.p.rect(0, +yoff / 2, bayWidth, rectW);
        this.p.rect(-xoff / 2, 0, rectW, bayHeight);
        this.p.rect(+xoff / 2, 0, rectW, bayHeight);

        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.rotate(this.p.HALF_PI);
        this.p.textSize(30);
        this.p.text(this.whatIsWeight().toFixed(1), 0, 0);

        this.p.pop();
    }
}