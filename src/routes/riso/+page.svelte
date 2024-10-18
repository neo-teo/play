<script>
	// @ts-nocheck

	import P5 from 'p5-svelte';

	const sketch = (p) => {
		let riso;
		let srcs = [
			// '/riso/oli.jpeg',
			'/riso/kimon.jpeg',
			// '/riso/t.jpeg',
			'/riso/kostis.JPG',
			'/riso/teo.JPG'
		];
		let imgs = [];
		let imgIdx = 0;
		let halftoned;

		p.preload = function () {
			for (let src of srcs) {
				p.loadImage(src, (img) => {
					imgs.push(img);
				});
			}
		};

		p.setup = function () {
			p.pixelDensity(1);
			p.createCanvas(500, 500); // Attach to the container
			riso = new Riso('red');
			p.frameRate(3);
		};

		let lineW = 4;
		let lastLineWChange = 0;
		let lineWInterval = 500;
		let lineWVelocity = 3;

		p.draw = function () {
			p.background('white');

			if (imgs.length === srcs.length) {
				clearRiso();

				halftoned = halftoneImage(imgs[imgIdx], 'circle', lineW, p.QUARTER_PI, 200);

				riso.image(halftoned, 0, 0);

				if (p.millis() - lastLineWChange > lineWInterval) {
					lineWInterval = 300;
					lineW = Math.floor(lineW * lineWVelocity);

					if (lineW >= 40) {
						lineWVelocity = 0.7;
						imgIdx = (imgIdx + 1) % imgs.length;
					}
					if (lineW <= 4) {
						lineWVelocity = 1.4;
						lineWInterval = 1500;
					}

					lastLineWChange = p.millis();
				}

				drawRiso();
			}
		};
	};
</script>

<div class="flex h-screen flex-col justify-center items-center">
	<P5 {sketch} />
</div>
