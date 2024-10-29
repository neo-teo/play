import type p5 from "p5";
import { Obstacle } from "./obstacle";
import { LiftableMixin, type Liftable } from "./liftable";

export class Box extends Obstacle implements Liftable {
    private static images: p5.Image[] = [];
    private liftableImpl: LiftableMixin;

    isLifted: boolean = false;

    img: p5.Image;

    constructor(p: p5, x: number, y: number) {
        super(p, x, y, 50, 50);

        this.img = p.random(Box.images);
        this.width = this.img.width;
        this.height = this.img.height;

        this.liftableImpl = new LiftableMixin(p, x, y);
    }

    lift(spriteX: number, spriteY: number): void {
        this.liftableImpl.lift();
        this.isLifted = this.liftableImpl.isLifted;
    }

    drop(): void {
        this.liftableImpl.drop();
        this.isLifted = this.liftableImpl.isLifted;
    }

    followSprite(spriteX: number, spriteY: number): void {
        this.liftableImpl.followSprite(spriteX, spriteY);
        // Update Box's position from the mixin
        this.x = this.liftableImpl.x;
        this.y = this.liftableImpl.y;
    }

    isNearby(spriteX: number, spriteY: number, threshold?: number): boolean {
        return this.liftableImpl.isNearby(spriteX, spriteY, threshold);
    }

    static loadImages(p: p5): void {
        this.images = [
            p.loadImage('/sobu/boxes/small.png'),
            p.loadImage('/sobu/boxes/medium.png'),
            p.loadImage('/sobu/boxes/large.png'),
        ];
    }

    draw(): void {
        this.p.fill(150); // Different color for visualization
        // this.p.rect(this.x, this.y, this.width, this.height);
        this.p.image(this.img, this.x, this.y);
    }
}