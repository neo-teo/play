<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Liquid from './liquid';
	import { data } from './data';

	const sketch: Sketch = (p) => {
		let currDay = 0;
		let liquids: Liquid[] = [];

		p.setup = () => {
			// TODO: days should b vertically stacked. canvas should be windowHeight * num elements in data lol
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.noStroke();

			liquids = data[currDay].entries.map((entry) => new Liquid(p));
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background(255);

			let numLiquids = liquids.length;

			for (let i = 1; i < numLiquids + 1; i++) {
				liquids[i - 1].draw(p.width / 2, (i * p.height) / numLiquids);
			}
		};

		p.mouseClicked = () => {
			currDay = (currDay + 1) % data.length;
			liquids = data[currDay].entries.map((entry) => new Liquid(p));
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
