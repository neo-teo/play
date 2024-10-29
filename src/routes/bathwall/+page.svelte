<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import type { Element, Image } from 'p5';

	const palette = [
		'#FF0000',
		'#FFD700',
		'#1E90FF',
		'#32CD32',
		'#8B4513',
		'#FF4500',
		'#800080',
		'#FF8C00',
		'#8B0000',
		'#F08080',
		'#FFA07A',
		'#ADFF2F',
		'#6495ED',
		'#D2691E',
		'#DA70D6'
	];

	const sketch: Sketch = (p) => {
		let img: Image;
		let pixelSlider: Element;

		let numColsShowing = 0;

		p.preload = () => {
			img = p.loadImage('/bathwall/letters2.png');
		};

		p.setup = () => {
			p.createCanvas(1000, 2000);

			p.frameRate(10);

			// Create the slider for both pixel size and image size
			// pixelSlider = p.createSlider(1, 60, 1);
			// pixelSlider.position(p.width / 2, p.windowHeight - 100);

			p.strokeWeight(0.3);
		};

		let colors: string[][] = [];

		p.draw = () => {
			p.background(255);

			let pixelSize = 15; // +pixelSlider.value();

			let resizedImg = img.get();
			resizedImg.resize(p.width, p.height);

			// p.image(resizedImg, 0, 0);

			// TODO: start out with it missing 10 px arbitratily ..
			// 		then make these pixels animate in one click at a time from left to right...
			//
			// NOTE: clean up to save current version and switch to it by flipping a number switch.
			for (let x = 0; x < p.width; x += pixelSize) {
				if (!colors[x]) {
					colors[x] = [];
				}
				for (let y = 0; y < p.height; y += pixelSize) {
					let c = resizedImg.get(x, y);

					let text;

					if (!colors[x][y] || colors[x][y] === 'white') {
						if (x / pixelSize <= numColsShowing && c.some((v) => v !== 0)) {
							colors[x][y] = p.random() < 0.5 ? p.random(palette) : 'black';
							// p.fill('black');
							// colors[x][y] = 'black';
							text = '&';
						} else {
							colors[x][y] = 'white';
							// p.fill('white');
							text = ' ';
						}
					}

					p.fill(colors[x][y]);

					p.rect(x, y, pixelSize, pixelSize);

					// p.text(text, x, y);
				}
			}

			console.log(numColsShowing);

			numColsShowing++;
		};
	};
</script>

<div class="flex bg-orange-200 h-[100vh] items-center justify-center">
	<P5 {sketch} />
</div>
