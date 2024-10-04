<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Top from './top';
	import Middle from './middle';
	import Bottom from './bottom';

	const sketch: Sketch = (p) => {
		let top: Top;
		let middle: Middle;
		let bottom: Bottom;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);

			p.angleMode('degrees');

			top = new Top(p);

			middle = new Middle(p);

			bottom = new Bottom(p);
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background('white');

			middle.draw();

			top.draw();

			bottom.draw();
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
