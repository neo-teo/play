<script>
	// @ts-nocheck
	import P5 from 'p5-svelte';
	import p5 from 'p5';
	const sketch = (p) => {
		// let palettes = [
		// 	{
		// 		left: p.color(0, 0, 0),
		// 		right: p.color(200, 200, 200),
		// 		center: p.color(100, 100, 100)
		// 	}
		// ];
		let palettes = [
			{
				left: p.color(255, 0, 0), // Bright red
				right: p.color(0, 0, 255), // Bright blue
				center: p.color(200, 50, 48) // Bright yellow
			},
			{
				left: p.color(0, 255, 0), // Bright green
				right: p.color(255, 165, 0), // Bright orange
				center: p.color(20, 230, 110) // Bright cyan
			}
		];

		const gradientBackground = (leftColor, rightColor) => {
			for (let x = 0; x < p.width; x++) {
				let inter = p.map(x, 0, p.width, 0, 1);
				let c = p.lerpColor(leftColor, rightColor, inter);
				p.stroke(c);
				p.line(x, 0, x, p.height);
			}
		};

		let paletteIndex = 0;
		let palette = palettes[0];
		let infos = [
			{
				left: {
					fill: palette.left,
					nw: 50,
					ne: 10,
					se: 70,
					sw: 10
				},
				right: {
					fill: palette.right,
					nw: 50,
					ne: 10,
					se: 70,
					sw: 10
				},
				center: {
					fill: palette.center,
					nw: 10,
					ne: 4,
					se: 10,
					sw: 20
				}
			}
		];

		let info = infos[0];
		let bigRectsW;
		let bigRectsH;
		let littleRectsW;
		let littleRectsH;

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.rectMode(p.CENTER);
			p.noStroke();
			p.background('white');

			bigRectsW = p.width / 2.7;
			bigRectsH = (5 * p.height) / 6;

			littleRectsW = p.width / 12;
			littleRectsH = (1.5 * p.height) / 6;
			resetInfo();
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			p.background('white'); // IF U REMOVE THIS U GET AN INTERESTING STACK EFFECT
			// gradientBackground(p.color(0, 0, 0), p.color(255, 255, 255));
			p.noStroke();

			bigRectsW = p.width / 2.7;
			bigRectsH = (5 * p.height) / 6;

			littleRectsW = p.width / 12;
			littleRectsH = (2 * p.height) / 6;

			p.fill(info.left.fill);
			p.rect(
				bigRectsW / 2 + bigRectsW / 4,
				p.height / 2,
				bigRectsW,
				bigRectsH,
				info.left.nw,
				info.left.ne,
				info.left.se,
				info.left.sw
			);

			p.fill(info.right.fill);
			p.rect(
				p.width - bigRectsW / 2 - bigRectsW / 4,
				p.height / 2,
				bigRectsW,
				bigRectsH,
				info.right.nw,
				info.right.ne,
				info.right.se,
				info.right.sw
			);

			p.fill(info.center.fill);
			p.rect(
				bigRectsW / 2 + bigRectsW / 4,
				p.height / 2,
				littleRectsW,
				littleRectsH,
				info.center.nw,
				info.center.ne,
				info.center.se,
				info.center.sw
			);
			p.rect(
				p.width - bigRectsW / 2 - bigRectsW / 4,
				p.height / 2,
				littleRectsW,
				littleRectsH,
				info.center.nw,
				info.center.ne,
				info.center.se,
				info.center.sw
			);

			if (clickedXY) {
				p.ellipse(clickedXY[0], clickedXY[1], mouseEllipseSize, mouseEllipseSize);
			}
		};

		let mouseEllipseSize = 0;
		let interval;
		let clickedXY;

		// every time i click make a circle out of mouse pos that reveals that center squares were indeed
		// same color. and then change to next color pallete which also will work :)
		p.mouseClicked = () => {
			if (interval) {
				resetInfo();
			}

			if (mouseEllipseSize === 0) {
				interval = setInterval(() => (mouseEllipseSize += 4), 0.0001);
				clickedXY = [p.mouseX, p.mouseY];
				console.log(interval);
			} else {
				mouseEllipseSize = 0;
				clearInterval(interval);
				interval = undefined;
				console.log(interval);
			}
		};

		let roundedness = () => p.random(p.width / 20, p.width / 10);

		const resetInfo = () => {
			paletteIndex = (paletteIndex + 1) % palettes.length;
			info.left.fill = palettes[paletteIndex].left;
			info.right.fill = palettes[paletteIndex].right;
			info.center.fill = palettes[paletteIndex].center;

			info.right.nw = roundedness();
			info.right.ne = roundedness();
			info.right.se = roundedness();
			info.right.sw = roundedness();
			info.left.nw = roundedness();
			info.left.ne = roundedness();
			info.left.se = roundedness();
			info.left.sw = roundedness();
			info.center.nw = roundedness();
			info.center.ne = roundedness();
			info.center.se = roundedness();
			info.center.sw = roundedness();
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
