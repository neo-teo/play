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

		let s: number = -1;
		let m: number = -1;
		let hr: number = -1;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.colorMode(p.HSB);
			gravity = p.createVector(0, 0.13);
			p.stroke(255);
			p.strokeWeight(4);
			p.background(0);
		};

		let mExploded = false;
		let hExploded = false;

		const onFireworkExplode = (letter: string) => {
			if (letter === 'M') {
				mExploded = true;
			}
			if (letter === 'H') {
				hExploded = true;
			}
		};

		const removeExpiredFireworks = () => {
			for (let index = fireworks.length - 1; index >= 0; index--) {
				const fw = fireworks[index];
				if (mExploded) {
					if (fw.letter === '?') {
						fireworks.splice(index, 1);
					}

					if (fw.letter === 'S' && fw.particles.length > 0) {
						fireworks.splice(index, 1);
					}

					if (fw.letter === 'M' && fw.particles[0].letter !== p.minute()) {
						fireworks.splice(index, 1);
					}
				}

				if (hExploded) {
					if (fw.letter === 'H' && fw.particles[0].letter !== p.hour()) {
						fireworks.splice(index, 1);
					}
				}
			}
			mExploded = false;
			hExploded = false;
		};

		const sendFireworkUp = (letter: string) => {
			fireworks.push(new Firework(p.random(p.width), p.height, letter, p, onFireworkExplode));
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
				sendFireworkUp('H');
				hr = p.hour();
			}
			if (m != p.minute()) {
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
			}

			removeExpiredFireworks();

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
			fireworks.push(new Firework(p.mouseX, p.mouseY, '?', p));
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
