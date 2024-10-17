// @ts-nocheck

const palette = ['#1E90FF', '#FF4500', '#FF8C00', '#F08080', '#6495ED'];

export default class Button {
    // info is of type entry, seen in data.ts
    constructor(p, label, onClick) {
        this.p = p;

        this.el = p.createButton(label);
        this.el.style('font-size', '30px');
        this.el.style('background-color', 'transparent');
        this.el.style('padding', '0 5px 0 5px');
        this.el.style('border', 'none');

        this.el.mouseOver(() => {
            this.el.style('background-color', 'black');
            this.el.style('color', 'white');
        });
        this.el.mouseOut(() => {
            this.el.style('background-color', 'transparent');
            this.el.style('color', 'black');
        });

        this.el.mousePressed(onClick);
    }

    draw(x, y, visible) {
        // this centers the button horizontally by subtracting half the button width
        this.el.position(x - this.el.width / 2, y);

        if (visible) {
            this.el.show();
        } else {
            this.el.hide();
        }
    }

}