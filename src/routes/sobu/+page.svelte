<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Sprite from './sprite';
	import { Evergreen } from './evergreen';
	import { Box } from './box';

	const sketch: Sketch = (p) => {
		let sprite: Sprite;
		let evergreen: Evergreen;

		p.preload = () => {
			Sprite.loadImages(p);
			Box.loadImages(p);
		};

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			sprite = new Sprite(p);
			evergreen = new Evergreen(p);

			sprite.setObstacles([...evergreen.walls, ...evergreen.boxes]);
			sprite.setLiftableObjects(evergreen.boxes);
		};

		p.draw = () => {
			p.background(255);

			evergreen.boxes.forEach((box) => box.update());

			sprite.handleInput();
			sprite.draw();
			evergreen.draw();
		};
	};
</script>

<div class="flex h-[100vh] items-center justify-center">
	<P5 {sketch} />
</div>
