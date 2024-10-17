<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Liquid from './liquid';
	import { data } from './data';
	import type p5 from 'p5';

	const sketch: Sketch = (p) => {
		let currDay = 0;
		let liquids: Liquid[] = [];
		let date: string;
		let hoveredLiquid: Liquid | null = null;

		let prevButton: p5.Element;
		let nextButton: p5.Element;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.rectMode(p.CENTER);
			p.textAlign(p.CENTER);
			p.textFont('Courier New');
			p.textStyle(p.BOLD);
			p.noStroke();

			prevButton = p.createButton('<--');
			prevButton.style('font-size', '30px');
			prevButton.style('background-color', 'transparent');
			prevButton.style('border', 'none');

			nextButton = p.createButton('-->');
			nextButton.style('font-size', '30px');
			nextButton.style('background-color', 'transparent');
			nextButton.style('border', 'none');

			prevButton.mousePressed(prevDay);
			nextButton.mousePressed(nextDay);

			date = data[currDay].date;
			liquids = data[currDay].entries.map((entry) => new Liquid(p, entry));
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background(255);
			p.background('#fff5d150');

			hoveredLiquid = null; // Reset hoveredLiquid at the start of each frame

			if (currDay > 0) {
				prevButton.show();
				prevButton.position(p.width / 2 - nextButton.width / 2 - 50, 15);
			} else {
				prevButton.hide();
			}
			if (currDay < data.length - 1) {
				nextButton.show();
				nextButton.position(p.width / 2 - nextButton.width / 2 + 50, 15);
			} else {
				nextButton.hide();
			}

			p.textStyle(p.BOLD);
			p.textSize(30);
			p.text(readableDate(date), p.width / 2, 90);

			let numLiquids = liquids.length;

			for (let i = 0; i < numLiquids; i++) {
				let l = liquids[i];

				l.draw(((i % 3) + 1) * (p.width / 4), p.floor(i / 3 + 1) * (p.height / 4));

				if (l.isHovered()) {
					hoveredLiquid = l;
				}
			}

			// Display info for hovered liquid
			if (hoveredLiquid) {
				p.textStyle(p.BOLD);
				p.textSize(30);
				p.text(
					`${hoveredLiquid.info.brand} ${hoveredLiquid.info.drink} -- ${hoveredLiquid.info.volume}mL`,
					p.width / 2,
					p.height - 70
				);
				p.textSize(20);
				if (hoveredLiquid.info.addon) {
					p.text(`with ${hoveredLiquid.info.addon}`, p.width / 2, p.height - 50);
				}

				p.textStyle(p.BOLDITALIC);
				p.text(`${hoveredLiquid.info.note}`, p.width / 2, p.height - 20);
			}
		};

		function nextDay() {
			if (currDay + 1 === data.length) {
				return;
			}
			currDay++;
			date = data[currDay].date;
			liquids = data[currDay].entries.map((entry) => new Liquid(p, entry));
		}

		function prevDay() {
			if (currDay - 1 < 0) {
				return;
			}
			currDay--;
			date = data[currDay].date;
			liquids = data[currDay].entries.map((entry) => new Liquid(p, entry));
		}
	};

	function readableDate(datestring: string) {
		// Split the date string to get the year, month, and day
		const [year, month, day] = datestring.split('-');

		const date = new Date(+year, +month - 1, +day); // Subtract 1 from month because months are 0-indexed in JavaScript

		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
