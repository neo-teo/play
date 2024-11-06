<script lang="ts">
	import P5 from 'p5-svelte';
	import p5 from 'p5';
	import type { Sketch } from '$lib/types';
	import Sprite from './sprite';
	import { Evergreen } from './evergreen';
	import { Box } from './box';
	import { Plant } from './plant';
	import { Dialog } from './dialog';
	import { Tutorial } from './tutorial';

	const sketch: Sketch = (p) => {
		let sprite: Sprite;
		let evergreen: Evergreen;
		let dialog: Dialog;

		let tutorial: Tutorial;
		let isTutorialActive = true;

		let customFont: p5.Font;

		p.preload = () => {
			Sprite.loadImages(p);
			Box.loadImages(p);
			Plant.loadImages(p);

			customFont = p.loadFont('/sobu/pay2win.ttf');
		};

		p.setup = () => {
			p.textFont(customFont);
			p.createCanvas(p.windowWidth, p.windowHeight);

			sprite = new Sprite(p);
			evergreen = new Evergreen(p);
			dialog = new Dialog(p);
			tutorial = new Tutorial(p);

			let obstacles = [...evergreen.walls, ...evergreen.boxes, ...evergreen.plants];
			let liftables = [...evergreen.boxes, ...evergreen.plants];

			sprite.setObstacles(obstacles);
			sprite.setLiftableObjects(liftables);

			evergreen.boxes.forEach((box) => box.setObstacles(obstacles));
			evergreen.plants.forEach((plant) => plant.setObstacles(obstacles));
		};

		p.draw = () => {
			if (p.windowWidth < 600 || p.windowHeight < 700) {
				smallDeviceMessage();
				return;
			}
			p.background(255);

			evergreen.drawCargobay();

			sprite.handleInput();
			sprite.draw();

			evergreen.boxes.forEach((box) => box.update());
			evergreen.plants.forEach((plant) => plant.update());
			evergreen.draw();

			if (isTutorialActive) {
				tutorial.update(sprite);
				tutorial.draw();

				if (tutorial.isComplete()) {
					isTutorialActive = false;
					dialog.start();
				}
			} else {
				dialog.handleInput();
				dialog.update();
				dialog.draw();
			}
		};

		function smallDeviceMessage(): void {
			p.background(0);
			p.push();
			p.textAlign('center');
			p.textSize(15);
			p.fill('white');
			p.text('Sobu is meant to be \nplayed on large devices.', p.width / 2, p.height / 2);
			p.pop();
		}
	};
</script>

<div class="flex h-[100vh] items-center justify-center">
	<P5 {sketch} />
</div>
