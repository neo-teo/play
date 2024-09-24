<script lang="ts">
	// Daniel Shiffman
	// http://codingtra.in
	// https://youtu.be/CKeyIbT3vXI

	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import Firework from './firework';

	const sketch: Sketch = (p) => {
		const fireworks: Firework[] = [];
		// const letters = ["S", "M", "H"];
		// let lettersCounter = 0;
		let gravity;
		// let clicked = false;
		// let fireworkEverySecond: NodeJS.Timeout;

		let s: number = 0;
		let m: number = 0;
		let hr: number = 0;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.colorMode(p.HSB);
			gravity = p.createVector(0, 0.13);
			p.stroke(255);
			p.strokeWeight(4);
			p.background(0);

			s = p.second();
			m = p.minute();
			hr = p.hour();

			// fireworkEverySecond = setInterval(sendFireworkUp, 1000);
		};

		const sendFireworkUp = (letter: string) => {
			fireworks.push(new Firework(p.random(p.width), p.height, letter, p));
			// updateCounter();
		};

		// const updateCounter = () => {
		//     lettersCounter++;
		//     if (lettersCounter >= letters.length) {
		//         lettersCounter = 0;
		//     }
		// };

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.colorMode(p.RGB);
			p.clear();

			if (hr != p.hour()) {
				fireworks.length = 0;
				sendFireworkUp('H');
				hr = p.hour();
			}
			if (m != p.minute()) {
				fireworks.length = 0;
				sendFireworkUp('M');

				m = p.minute();
			}
			if (s != p.second()) {
				sendFireworkUp('S');
				s = p.second();
			}

			for (let i = 0; i < fireworks.length; i++) {
				fireworks[i].update();
				fireworks[i].show();

				if (fireworks[i].done()) {
					fireworks.splice(i, 1);
				}
			}

			p.textSize(20);
			p.textStyle(p.BOLD);
			let h = p.hour() % 12 || 12;
			p.text(
				p.nf(h, 2) + ':' + p.nf(p.minute(), 2) + ':' + p.nf(p.second(), 2),
				p.mouseX,
				p.mouseY
			);
		};

		p.mousePressed = () => {
			// clicked = true;
			fireworks.push(new Firework(p.mouseX, p.mouseY, 'EY', p));
			// updateCounter();

			// clearInterval(fireworkEverySecond);
		};

		p.mouseMoved = () => {
			for (let i = 0; i < fireworks.length; i++) {
				for (let part = 0; part < fireworks[i].particles.length; part++) {
					let ptcl = fireworks[i].particles[part];
					if (
						p.mouseX > ptcl.pos.x - 40 &&
						p.mouseX < ptcl.pos.x + 60 &&
						p.mouseY > ptcl.pos.y - 40 &&
						p.mouseY < ptcl.pos.y + 60
					) {
						fireworks[i].particles.splice(part, 1);
					}
				}
			}
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
