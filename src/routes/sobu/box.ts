import type p5 from "p5";
import { Obstacle } from "./obstacle";
import { LiftableMixin, type Liftable, type InteractionArea } from "./liftable";

export class Box extends Obstacle implements Liftable, InteractionArea {
    private static images: p5.Image[] = [];
    private liftableImpl: LiftableMixin;

    isLifted: boolean = false;

    img: p5.Image;

    constructor(p: p5, x: number, y: number, size: 'sm' | 'md' | 'lg' | 'chest') {
        super(p, x, y, 50, 50);

        switch (size) {
            case 'sm':
                this.img = Box.images[0];
                this.weight = 35.0;
                break;
            case 'md':
                this.img = Box.images[1];
                this.weight = 50.0;
                break;
            case 'lg':
                this.img = Box.images[2];
                this.weight = 75.0;
                break;
            case 'chest':
                this.img = Box.images[3];
                this.weight = 100.0;
                break;
        }
        this.width = this.img.width;
        this.height = this.img.height;

        this.liftableImpl = new LiftableMixin(p, x, y, this);
    }

    setObstacles(obstacles: InteractionArea[]): void {
        this.liftableImpl.setObstacles(obstacles);
    }

    getCollisionBoundsCenter(): { x: number, y: number } {
        return this.liftableImpl.getCollisionBoundsCenter();
    }

    lift(): void {
        this.liftableImpl.lift();
        this.isLifted = this.liftableImpl.isLifted;
    }

    update(): void {
        this.liftableImpl.update();
        // Update Box's position from the mixin
        this.x = this.liftableImpl.x;
        this.y = this.liftableImpl.y;
    }

    drop(direction: 'left' | 'right' | 'up' | 'down'): void {
        this.liftableImpl.drop(direction);
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
            p.loadImage('/sobu/chest.png'),
        ];
    }

    draw(): void {
        this.p.image(this.img, this.x, this.y);
    }
}