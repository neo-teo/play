<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import p5 from 'p5';

	type FallingObject = {
		x: any;
		y: any;
		draw: (drawX: any, drawY: any) => void;
	};

	type BoundObject = {
		object: FallingObject;
		relativeX: number;
		relativeY: number;
		relativeRotation: number;
	};

	const sketch: Sketch = (p) => {
		// falling object properties
		let fallingObject: FallingObject | null;
		let fallingObjectType: 'eye' | 'banana' | 'twizzler';
		let fallingSpeed = 4;

		// ball properties
		let ballR = p.random(100, 200);
		let ballX: number;
		let ballMoveSpeed = 6;
		let ballRotation = 0;
		let ballRotationSpeed = 6;
		let ballColor: p5.Color;
		let ballNoise = p.random(5, 10);

		// objects that are bound to ball
		let boundObjects: BoundObject[] = [];

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);

			ballX = p.width / 2;
			fallingObject = randomFallingObject();

			ballColor = p.color(p.random(255), p.random(255), p.random(255));
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};

		// reset on mouse click
		p.mouseClicked = () => {
			boundObjects = [];
			ballR = p.random(100, 200);
			ballNoise = p.random(10, 15);
			ballColor = p.color(p.random(255), p.random(255), p.random(255));
		};

		// save canvas as image on 's'
		p.keyPressed = () => {
			if (p.key === 'S' || p.key === 's') {
				p.saveCanvas('banana_face', 'png');
			}
		};

		function legend() {
			p.push();
			p.textSize(20);
			p.textStyle(p.BOLD);
			p.fill('black');
			p.text('click to reset', p.width - 150, p.height - 50);
			p.text('s to save', p.width - 150, p.height - 25);
			p.pop();
		}

		p.draw = () => {
			p.background(255);

			legend();

			rollingBall();

			dropObject();
		};

		function dropObject() {
			if (fallingObject) {
				fallingObject.y += fallingSpeed;
				fallingObject.draw(fallingObject.x, fallingObject.y);

				// calculate if object should be bound to ball, with some help from llms
				let distanceToBall = p.dist(fallingObject.x, fallingObject.y, ballX, p.height - ballR / 2);
				let intersectionThreshold = ballR / 2 - ballR / 4;
				if (fallingObjectType === 'twizzler') {
					intersectionThreshold = ballR / 2;
				}

				if (distanceToBall <= intersectionThreshold) {
					let angle =
						p.atan2(fallingObject.y - (p.height - ballR / 2), fallingObject.x - ballX) -
						p.radians(ballRotation);
					boundObjects.push({
						object: fallingObject,
						relativeX: p.cos(angle) * distanceToBall,
						relativeY: p.sin(angle) * distanceToBall,
						relativeRotation: p.radians(ballRotation)
					});

					fallingObject = null;
				}

				// If the falling object goes off-screen, replace it with a new one
				if (!fallingObject || fallingObject.y - 100 > p.height) {
					fallingObject = randomFallingObject();
				}
			}
		}

		function rollingBall() {
			p.push();
			if (p.mouseX > ballX + ballR / 4) {
				if (ballX < p.width - ballR / 2) {
					ballX += ballMoveSpeed;
					ballRotation += ballRotationSpeed;
				}
			} else if (p.mouseX < ballX - ballR / 4) {
				if (ballX > ballR / 2) {
					ballX -= ballMoveSpeed;
					ballRotation -= ballRotationSpeed;
				}
			}

			// draw the ball
			p.fill(ballColor);
			p.translate(ballX, p.height - ballR / 2 + ballNoise / 2);
			p.rotate(p.radians(ballRotation));
			drawOrganicBall(ballR / 2, ballNoise);

			// draw objects bound to the ball
			for (let bound of boundObjects) {
				p.push();
				p.translate(bound.relativeX, bound.relativeY);
				p.rotate(-bound.relativeRotation); // not sure why this should be -1 *, but it works that way lol!
				bound.object.draw(0, 0);
				p.pop();
			}
			p.pop();
		}

		// draw organic shape ball with the help of llms
		function drawOrganicBall(radius: number, noiseAmount: number) {
			p.beginShape();
			for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
				let xoff = p.map(p.cos(angle), -1, 1, 0, 1);
				let yoff = p.map(p.sin(angle), -1, 1, 0, 1);
				let r = radius + p.map(p.noise(xoff, yoff), 0, 1, -noiseAmount, noiseAmount);
				let x = r * p.cos(angle);
				let y = r * p.sin(angle);
				p.vertex(x, y);
			}
			p.endShape(p.CLOSE);
		}

		function randomFallingObject() {
			fallingObjectType = p.random(['eye', 'banana', 'twizzler']);
			let x = p.random((1 * p.width) / 5, (4 * p.width) / 5);
			let y = 0;

			switch (fallingObjectType) {
				case 'eye':
					return eye(x, y);
				case 'banana':
					return banana(x, y);
				case 'twizzler':
					return twizzler(x, y);
				default:
					return eye(x, y);
			}
		}

		function eye(x: number, y: number) {
			return {
				x: x,
				y: y,
				eyeballR: 15,
				irisR: 7,
				draw: function (drawX: number, drawY: number) {
					p.push();
					p.fill(255);
					p.ellipse(drawX, drawY, this.eyeballR * 2);
					p.fill(0);
					p.ellipse(drawX, drawY, this.irisR * 2);
					p.pop();
				}
			};
		}

		function banana(x: number, y: number) {
			return {
				x: x,
				y: y,
				draw: function (drawX: number, drawY: number) {
					p.push();
					p.fill(255, 204, 0);
					p.arc(drawX, drawY, 50, 20, 0, -p.PI);
					p.line(drawX - 25, drawY, drawX + 25, drawY);
					p.stroke(139, 69, 19);
					p.arc(drawX, drawY, 40, 10, 0, -p.PI);
					p.fill('brown');
					p.rect(drawX + 25, drawY, 5, 3);
					p.pop();
				}
			};
		}

		function twizzler(x: number, y: number) {
			return {
				x: x,
				y: y,
				draw: function (drawX: number, drawY: number) {
					p.push();
					p.strokeWeight(3);
					p.stroke('red');
					p.fill(0, 0, 0, 0);
					p.ellipse(drawX, drawY, 20, 20);
					p.ellipse(drawX - 5, drawY - 4, 20, 20);
					p.ellipse(drawX + 5, drawY - 4, 20, 20);
					p.ellipse(drawX - 10, drawY - 2, 20, 20);
					p.ellipse(drawX + 10, drawY - 3, 20, 20);
					p.ellipse(drawX - 15, drawY, 20, 20);
					p.ellipse(drawX + 15, drawY, 20, 20);
					p.pop();
				}
			};
		}
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
