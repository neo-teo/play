<script lang="ts">
	import { onMount } from 'svelte';
	import Matter from 'matter-js';

	const Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Bodies = Matter.Bodies,
		Composite = Matter.Composite;

	let engine: Matter.Engine;
	let render: Matter.Render;
	let runner: Matter.Runner;

	let boxA: Matter.Body;
	let boxB: Matter.Body;
	let ground: Matter.Body;

	onMount(() => {
		engine = Engine.create();

		let w = window.innerWidth;
		let h = window.innerHeight;

		render = Render.create({
			element: document.body,
			engine: engine,
			options: {
				width: w,
				height: h,
				wireframes: false
			}
		});

		boxA = Bodies.rectangle(w / 2 - 10, 0, 80, 80, {
			render: {
				fillStyle: 'orange'
			}
		});
		boxB = Bodies.rectangle(w / 2 + 10, 50, 80, 80, {
			render: {
				fillStyle: 'blue'
			}
		});
		ground = Bodies.rectangle(w / 2, h - 30, w, 60, {
			isStatic: true
		});

		Composite.add(engine.world, [boxA, boxB, ground]);

		Render.run(render);

		runner = Runner.create();

		Runner.run(runner, engine);

		// Create a mouse constraint to enable dragging
		const mouseConstraint = Matter.MouseConstraint.create(engine, {
			element: render.canvas
		});

		window.addEventListener('resize', resizeCanvas);
	});

	function resizeCanvas() {
		let w = window.innerWidth;
		let h = window.innerHeight;

		render.canvas.width = w;
		render.canvas.height = h;

		const g: Matter.Body | undefined = Composite.allBodies(engine.world).find(
			(body) => body === ground
		);

		if (g) {
			Matter.Body.setPosition(g, {
				x: w / 2,
				y: h - 30
			});
		}
	}
</script>
