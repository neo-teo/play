<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import p5 from 'p5';

	let textX: number, textY: number;
	let xMultiplier = -1;
	let yMultiplier = 1;
	let spots: number[][] = [];

	let mode = 2;

	const sketch: Sketch = (p) => {
		p.preload = () => {
			mousey = p.loadImage('/mouse/mouse.png');
			// mousey = p.loadImage("/mousino.png")
		};

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);

			p.angleMode(p.DEGREES);

			p.noCursor();

			textX = p.width / 2;
			textY = p.height / 2;
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		p.draw = () => {
			woodenDesk();
			cable();

			let imgX = p.mouseX - 200;
			let imgY = p.mouseY - 50;
			let imgWidth = 300;
			let imgHeight = 200;

			let textWidth = p.textWidth('(mouse)');
			let textHeight = 200;

			let overlap =
				imgX < textX + textWidth &&
				imgX + imgWidth > textX &&
				imgY < textY + textHeight &&
				imgY + imgHeight > textY;

			if (mode === 2) {
				dvdMovement();
			}
			if (mode === 3) {
				flashLocation();
			}

			parensText();

			if (overlap) {
				if (mode === 1) {
					staticUnderText();
				}
				if (mode === 2) {
					popUpOnMouse();
				}
				if (mode === 3) {
					popUpAroundText();
				}
			}

			renderSpots();

			mouseImage();
		};

		p.mouseClicked = () => {
			// mode = (mode % 3) + 1
			resetSpots();
		};

		function dvdMovement() {
			textX = textX += xMultiplier * 1;
			textY = textY += yMultiplier * 1;
			if (textX <= 0 || textX >= p.windowWidth) {
				xMultiplier *= -1; // Reverse the horizontal direction
			}
			if (textY <= 100 || textY >= p.windowHeight - 100) {
				yMultiplier *= -1; // Reverse the vertical direction
			}
		}

		function flashLocation() {
			if (p.frameCount % (2 * 60) === 0) {
				textX = p.random(p.width);
				textY = p.random(p.height);
			}
		}

		function resetSpots() {
			spots = [];
		}

		function renderSpots() {
			p.push();
			p.fill('yellow');
			p.textSize(30);
			p.textStyle('bold');
			spots.forEach(([spotX, spotY]) => {
				p.text('on mouse', spotX, spotY); // 20 pixels below the original text)
			});
			p.pop();
		}

		function popUpAroundText() {
			let newSpotX: number, newSpotY: number;
			p.textSize(30);

			if (p.frameCount % (0.5 * 60) === 0) {
				newSpotX = textX - 100 + p.random(400);
				newSpotY = textY - 50 + p.random(200);

				spots.push([newSpotX, newSpotY]);
			}
		}

		function popUpOnMouse() {
			p.textSize(30);

			if (p.frameCount % (0.1 * 60) === 0) {
				spots.push([p.mouseX - 70, p.mouseY - 70]);
			}
		}

		function staticUnderText() {
			p.push();
			p.textSize(40);
			p.textStyle('bold');
			p.fill('yellow');
			p.text('on mouse', textX, textY + 120); // 20 pixels below the original text
			p.pop();
		}

		function parensText() {
			p.push();
			p.fill('white');
			p.textSize(100);
			p.text('(mouse)', textX, textY, 200, 200);
			p.pop();
		}

		let mousey: p5.Image;

		function mouseImage() {
			p.push();
			p.translate(p.mouseX, p.mouseY);

			// Calculate the screen width percentage (with 16-inch MacBook having ~1440px height)
			let maxScreenWidth = 1440;
			let currentWidth = p.windowWidth;
			let widthFactor = currentWidth / maxScreenWidth;

			let rotateFactor = p.mouseX / 3 + 1 / ((p.mouseY + 200) / 10000);

			// Reduce rotation factor by 20% when screen is at max width
			let adjustedRotationFactor = rotateFactor * (1 - 0.4 * widthFactor);

			p.rotate(-adjustedRotationFactor / 3);

			p.image(mousey, -100, -50, 300, 300);
			p.pop();
		}

		function woodenDesk() {
			p.background(213, 176, 124);
			p.push();
			p.blendMode(p.SOFT_LIGHT);
			p.noStroke();

			let numStripes = 400;
			for (let i = 0; i < numStripes; i++) {
				if (i % 20 === 0) {
					p.fill(161, 102, 47);
				} else {
					p.fill(198, 152, 116);
				}
				p.rect(0, (p.height / numStripes) * i, p.width, p.height / numStripes);
			}
			p.pop();
		}

		function cable() {
			p.push();
			p.noFill();
			p.strokeWeight(7);
			p.stroke(50);
			p.curve(-1000, 500, 0, 0, p.mouseX + 100, p.mouseY, p.mouseX + 1000, p.mouseY - 200);
			p.pop();
		}

		// Function to check if two rectangles overlap (AABB)
		const isOverlapping = (
			x1: number,
			y1: number,
			w1: number,
			h1: number,
			x2: number,
			y2: number,
			w2: number,
			h2: number
		): boolean => {
			return !(
				x1 + w1 < x2 || // Text is to the left of image
				x1 > x2 + w2 || // Text is to the right of image
				y1 + h1 < y2 || // Text is above image
				y1 > y2 + h2
			); // Text is below image
		};
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
