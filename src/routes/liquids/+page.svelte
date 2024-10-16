<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Liquid from './liquid';
	import { data } from './data';

	const sketch: Sketch = (p) => {
		let currDay = 0;
		let liquids: Liquid[] = [];
		let date: string;
		let hoveredLiquid: Liquid | null = null;

		p.setup = () => {
			// TODO: days should b vertically stacked. canvas should be windowHeight * num elements in data lol
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.textAlign(p.CENTER);
			p.textSize(30);
			p.textStyle(p.BOLD);

			date = data[currDay].date;
			liquids = data[currDay].entries.map((entry) => new Liquid(p, entry));
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background(255);

			hoveredLiquid = null; // Reset hoveredLiquid at the start of each frame

			const label = readableDate(date);

			p.text(label, p.width / 2, 100);

			let numLiquids = liquids.length;

			for (let i = 0; i < numLiquids; i++) {
				let l = liquids[i];

				l.draw(((i % 3) + 1) * (p.width / 4), p.floor(i / 3 + 1) * (p.height / 4));

				if (l.isHovered(p.mouseX, p.mouseY)) {
					hoveredLiquid = l;
				}
			}

			// Display info for hovered liquid
			if (hoveredLiquid) {
				p.textSize(30);
				p.text(
					`${hoveredLiquid.info.brand} ${hoveredLiquid.info.drink} -- ${hoveredLiquid.info.volume}mL`,
					p.width / 2,
					p.height - 50
				);
				p.textSize(20);
				p.text(`${hoveredLiquid.info.note}`, p.width / 2, p.height - 20);
			}
		};

		p.mouseClicked = () => {
			currDay = (currDay + 1) % data.length;
			date = data[currDay].date;
			liquids = data[currDay].entries.map((entry) => new Liquid(p, entry));
		};
	};

	function readableDate(datestring: string) {
		// Split the date string to get the year, month, and day
		const [year, month, day] = datestring.split('-');

		const date = new Date(+year, +month - 1, +day); // Subtract 1 from month because months are 0-indexed in JavaScript

		const options = {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		};

		return date.toLocaleDateString('en-US', options);
	}
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
