<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Jelly from './jelly';

	const sketch: Sketch = (p) => {
		let jellies: Jelly[] = [];

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.noStroke();

			jellies.push(
				new Jelly(
					p,
					p.random(p.width / 5, (4 * p.width) / 5),
					p.random(p.height / 5, (4 * p.height) / 5)
				)
			);
			jellies.push(
				new Jelly(
					p,
					p.random(p.width / 5, (4 * p.width) / 5),
					p.random(p.height / 5, (4 * p.height) / 5)
				)
			);
			jellies.push(
				new Jelly(
					p,
					p.random(p.width / 5, (4 * p.width) / 5),
					p.random(p.height / 5, (4 * p.height) / 5)
				)
			);
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background('white');
			p.background(184, 241, 252, 100);

			for (let jelly of jellies) {
				jelly.draw();
			}
		};

		p.mouseClicked = () => {
			jellies.push(new Jelly(p, p.mouseX, p.mouseY));
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
