<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Liquid from './liquid';

	const sketch: Sketch = (p) => {
		let water: Liquid;
		let beer: Liquid;
		let coffee: Liquid;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.noStroke();

			water = new Liquid(p);
			coffee = new Liquid(p);
			beer = new Liquid(p);
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background(255);

			water.draw();
			coffee.draw();
			beer.draw();
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
