<script lang="ts">
	import P5 from 'p5-svelte';
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

		p.preload = () => {
			Sprite.loadImages(p);
			Box.loadImages(p);
			Plant.loadImages(p);
		};

		p.setup = () => {
			p.textFont('Courier New');
			p.createCanvas(p.windowWidth, p.windowHeight);

			sprite = new Sprite(p);
			evergreen = new Evergreen(p);
			dialog = new Dialog(p);
			tutorial = new Tutorial(p);

			sprite.setObstacles([...evergreen.walls, ...evergreen.boxes, ...evergreen.plants]);
			sprite.setLiftableObjects([...evergreen.boxes, ...evergreen.plants]);
		};

		p.draw = () => {
			p.background(255);

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
	};
</script>

<div class="flex h-[100vh] items-center justify-center">
	<P5 {sketch} />
</div>
