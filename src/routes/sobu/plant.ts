import type p5 from "p5";
import { Obstacle } from "./obstacle";
import { LiftableMixin, type Liftable, type InteractionArea } from "./liftable";

export class Plant extends Obstacle implements Liftable, InteractionArea {
    private static plantImg: p5.Image;
    private liftableImpl: LiftableMixin;
    isLifted: boolean = false;
    img: p5.Image;

    private readonly potWidth = 45;
    private readonly potHeight = 30;

    getCollisionBounds() {
        return {
            x: this.x + (this.width - this.potWidth) / 2,
            y: this.y + this.height - this.potHeight,
            width: this.potWidth,
            height: this.potHeight
        };
    }

    getCollisionBoundsCenter(): { x: number, y: number } {
        return this.liftableImpl.getCollisionBoundsCenter();
    }

    constructor(p: p5, x: number, y: number) {
        super(p, x, y, 50, 50);

        this.img = Plant.plantImg;
        this.width = this.img.width;
        this.height = this.img.height;

        this.liftableImpl = new LiftableMixin(p, x, y, this);
    }

    lift(): void {
        this.liftableImpl.lift();
        this.isLifted = this.liftableImpl.isLifted;
    }

    update(): void {
        this.liftableImpl.update();
        this.x = this.liftableImpl.x;
        this.y = this.liftableImpl.y;
    }

    drop(direction: 'left' | 'right' | 'up' | 'down'): void {
        this.liftableImpl.drop(direction);
        this.isLifted = this.liftableImpl.isLifted;
    }

    followSprite(spriteX: number, spriteY: number): void {
        this.liftableImpl.followSprite(spriteX, spriteY);
        this.x = this.liftableImpl.x;
        this.y = this.liftableImpl.y;
    }

    isNearby(spriteX: number, spriteY: number, threshold?: number): boolean {
        return this.liftableImpl.isNearby(spriteX, spriteY, threshold);
    }

    static loadImages(p: p5): void {
        this.plantImg = p.loadImage('/sobu/plant.png');
    }

    draw(): void {
        this.p.image(this.img, this.x, this.y);
    }
}