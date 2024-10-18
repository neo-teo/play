<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import { data } from './data';
	import Button from './button';
	import Drink from './drink';
	import { yyyymmdd_to_text } from '$lib/datefunctions';

	const sketch: Sketch = (p) => {
		let currDay = 0;
		let drinks: Drink[] = [];
		let date: string;
		let hoveredDrink: Drink | null = null;

		let prevButton: Button;
		let nextButton: Button;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.rectMode(p.CENTER);
			p.textAlign(p.CENTER);
			p.textFont('Courier New');
			p.textStyle(p.BOLD);
			p.noStroke();

			prevButton = new Button(p, '<--', prevDay);
			nextButton = new Button(p, '-->', nextDay);

			date = data[currDay].date;
			drinks = data[currDay].entries.map((entry) => new Drink(p, entry));
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background(255);
			p.background('#fff5d150');

			hoveredDrink = null;

			for (let i = 0; i < drinks.length; i++) {
				let d = drinks[i];

				d.draw(((i % 3) + 1) * (p.width / 4), p.floor(i / 3 + 1) * (p.height / 4));

				if (d.isHovered()) {
					hoveredDrink = d;
				}
			}
			dateNav();

			if (hoveredDrink) {
				drinkInfo();
			}
		};

		function nextDay() {
			if (currDay < data.length - 1) {
				currDay++;
				date = data[currDay].date;
				drinks = data[currDay].entries.map((entry) => new Drink(p, entry));
			}
		}

		function prevDay() {
			if (currDay > 0) {
				currDay--;
				date = data[currDay].date;
				drinks = data[currDay].entries.map((entry) => new Drink(p, entry));
			}
		}

		function dateNav() {
			prevButton.draw(p.width / 2 - 100, 10, currDay > 0);
			nextButton.draw(p.width / 2 + 100, 10, currDay < data.length - 1);

			let textSize = p.width < 800 ? 25 : 40;

			p.textStyle(p.BOLD);
			p.textSize(textSize);
			p.text(yyyymmdd_to_text(date), p.width / 2, 90);
		}

		function drinkInfo() {
			if (!hoveredDrink) return;

			let textSize = p.width < 800 ? 25 : 40;

			p.textStyle(p.BOLD);
			p.textSize(textSize);
			p.text(
				`${hoveredDrink.info.brand} ${hoveredDrink.info.drink} -- ${hoveredDrink.info.volume}mL`,
				p.width / 2,
				p.height - 90
			);

			p.textSize(textSize * 0.65);
			if (hoveredDrink.info.addon) {
				p.text(`with ${hoveredDrink.info.addon}`, p.width / 2, p.height - 50);
			}
			p.textStyle(p.BOLDITALIC);
			p.text(`${hoveredDrink.info.note}`, p.width / 2, p.height - 20);
		}
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
