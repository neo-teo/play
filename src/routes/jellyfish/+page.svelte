<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Jelly from './jelly';

	const sketch: Sketch = (p) => {
		let jellies: Jelly[] = [];

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.noStroke();

			jellies.push(new Jelly(p, p.width / 2, p.height / 2));
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
