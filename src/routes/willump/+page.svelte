<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Top from './top';
	import Middle from './middle';
	import Bottom from './bottom';
	import Legend from './legend';

	const sketch: Sketch = (p) => {
		let top: Top;
		let middle: Middle;
		let bottom: Bottom;
		let legend: Legend;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);

			p.angleMode('degrees');

			top = new Top(p);
			middle = new Middle(p);
			bottom = new Bottom(p);
			legend = new Legend(70, p);
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background('#FFFBF3');

			middle.draw();

			top.draw();

			bottom.draw();

			legend.draw();
		};

		p.mouseClicked = () => {
			legend.handleClick();
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
