<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch } from '$lib/types';
	import p5 from 'p5';

	let grid: number[][];
	let cellD: Map<string, { w: number; h: number }>;
	let cols = 100;
	let rows = 100;
	let cellSize = 30;
	let satisfactionThreshold = 0.4; // Agents need at least 30% of their neighbors to be of the same type
	let emptyCells: { x: number; y: number }[];

	const sketch: Sketch = (p) => {
		let textSize = ((p.windowWidth / cols) * 4) / 5;

		let colorOne: p5.Color;
		let colorTwo: p5.Color;

		p.setup = () => {
			p.frameRate(8); // Slows down the simulation for visibility

			p.createCanvas(p.windowWidth, p.windowHeight);

			p.angleMode(p.DEGREES);

			p.noStroke();

			// Initialize grid with random 0s, 1s, and 2s
			initializeGrid();
		};

		function initializeGrid() {
			emptyCells = [];
			cellD = new Map();

			colorOne = p.color(p.random(255), p.random(255), p.random(255));
			colorTwo = p.color(p.random(255), p.random(255), p.random(255));

			cols = p.floor(p.width / cellSize);
			rows = p.floor(p.height / cellSize);

			grid = make2DArray(cols, rows);

			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					let w = p.random((cellSize * 3) / 4, (cellSize * 5) / 5);
					let h = p.random(cellSize / 2, (cellSize * 5) / 5);
					cellD.set(`${i},${j}`, { w: w, h: h });

					let val = p.floor(p.random(3)); // Randomly assign 0, 1, or 2

					grid[i][j] = val;
					if (val == 0) {
						emptyCells.push({ x: i, y: j });
					}
				}
			}
		}

		p.draw = () => {
			p.background(255);
			drawGrid();
			moveDissatisfiedAgents();
		};

		p.mouseClicked = () => {
			initializeGrid();
		};

		// Function to create a 2D array
		function make2DArray(cols: number, rows: number) {
			let arr = new Array(cols);
			for (let i = 0; i < arr.length; i++) {
				arr[i] = new Array(rows);
			}
			return arr;
		}

		// Function to draw the grid
		function drawGrid() {
			p.textSize(textSize);
			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					let val = grid[i][j];
					drawCell(val, i, j);
				}
			}
		}

		function drawCell(val: number, i: number, j: number) {
			p.fill(255); // white tile
			p.rect(i * cellSize, j * cellSize, cellSize, cellSize);

			let cellWH = cellD.get(`${i},${j}`);
			if (!cellWH) {
				return;
			}

			if (val == 0) {
				p.fill(255);
			} else if (val == 1) {
				p.fill(colorOne);
				p.ellipse(i * cellSize + cellSize / 2, j * cellSize + cellSize / 2, cellWH.w, cellWH.h);
			} else if (val == 2) {
				p.fill(colorTwo);
				p.ellipse(i * cellSize + cellSize / 2, j * cellSize + cellSize / 2, cellWH.w, cellWH.h);
			}
		}

		// Function to move dissatisfied agents
		function moveDissatisfiedAgents() {
			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					let agent = grid[i][j];
					if (agent !== 0) {
						let neighbors = getNeighbors(i, j);
						let sameTypeCount = neighbors.filter((n) => n === agent).length;
						let satisfaction = sameTypeCount / neighbors.length;

						if (satisfaction < satisfactionThreshold) {
							moveAgent(i, j);
						}
					}
				}
			}
		}

		// Function to move an agent to a random empty cell
		function moveAgent(x: number, y: number) {
			if (emptyCells.length > 0) {
				let randomIndex = p.floor(p.random(emptyCells.length));
				let newCell = emptyCells[randomIndex];

				grid[newCell.x][newCell.y] = grid[x][y];
				grid[x][y] = 0;

				emptyCells[randomIndex] = { x, y }; // Old cell becomes empty
			}
		}

		function getNeighbors(x: number, y: number) {
			let neighbors = [];
			for (let dx = -1; dx <= 1; dx++) {
				for (let dy = -1; dy <= 1; dy++) {
					let nx = x + dx;
					let ny = y + dy;
					if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !(dx === 0 && dy === 0)) {
						neighbors.push(grid[nx][ny]);
					}
				}
			}
			return neighbors;
		}
	};
</script>

<div class="flex flex-wrap items-center">
	<P5 {sketch} />
</div>
