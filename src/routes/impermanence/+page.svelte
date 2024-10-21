<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import { reset, hammer, screw, magnify, paint } from './animations';
	import { distanceToElement } from '$lib/physics';
	import Tool from './Tool.svelte';
	import { getRandomInt } from '$lib/numbers';

	let activeTool: string | null = null;

	const hammerAnimation = {
		rotation: 40,
		duration: 1,
		yoyo: true,
		repeat: -1,
		ease: 'back.in'
	};

	const driverAnimation = {
		rotation: 5,
		duration: 0.5,
		yoyo: true,
		repeat: -1,
		ease: 'elastic.inOut'
	};

	const magnifierAnimation = {
		scale: 1.3,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'ease.inOut'
	};

	const brushAnimation = {
		rotation: 20,
		duration: 1,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut'
	};

	function toolSelect(event: CustomEvent) {
		const selectedTool = event.detail.toolType;
		activeTool = activeTool === selectedTool ? null : selectedTool;
	}

	const handleHover = (target: HTMLElement) => {
		switch (activeTool) {
			case 'hammer':
				hammer(target);
				break;
			case 'driver':
				screw(target);
				break;
			case 'magnifier':
				magnify(target);
				break;
			case 'brush':
				paint(target);
				break;
			default:
				reset(target);
		}
	};

	onMount(() => {
		const text = new Letterize({
			targets: '#letterize p'
		});

		const letters = text.listAll;

		letters.forEach((span) => {
			(span as HTMLElement).style.display = 'inline-block';
		});

		const letterizeContainer = document.getElementById('letterize');

		const handleMove = (x: number, y: number) => {
			letters.forEach((span) => {
				const distance = distanceToElement(x, y, span as HTMLElement);
				if (distance < 25) {
					handleHover(span as HTMLElement);
				}
			});
		};

		letterizeContainer?.addEventListener('mousemove', (event) => {
			handleMove(event.clientX, event.clientY);
		});

		letterizeContainer?.addEventListener('touchmove', (event: TouchEvent) => {
			const touch = event.touches[0];
			handleMove(touch.clientX, touch.clientY);
		});
	});
</script>

<div class="relative flex items-center justify-center min-h-screen cursor-pointer">
	<div id="letterize" class="px-20 mx-auto text-center font-serif font-light text-base">
		<p class="italic">most plants and web pages have few connections,</p>
		<p>but well connected hubs like ours</p>
		<p>have a lot of links</p>
		<p>and make it possible to traverse the network</p>
		<p>in</p>
		<p>a</p>
		<p class="italic">small</p>
		<p class="italic">number</p>
		<p class="italic">of</p>
		<p class="italic">steps</p>
	</div>

	<button
		class="absolute top-1/2 right-0 transform -translate-y-1/2"
		on:click={() => (activeTool = null)}
	>
		<img class="w-12" src="/impermanence/long_shelf_detail.png" alt="shelf" />
	</button>

	<Tool
		name="hammer"
		isActive={activeTool === 'hammer'}
		initialTopPct={`${getRandomInt(17, 25)}%`}
		animationConfig={hammerAnimation}
		on:toolSelect={toolSelect}
	/>

	<Tool
		name="driver"
		isActive={activeTool === 'driver'}
		initialTopPct={`${getRandomInt(30, 35)}%`}
		animationConfig={driverAnimation}
		on:toolSelect={toolSelect}
	/>

	<Tool
		name="magnifier"
		isActive={activeTool === 'magnifier'}
		initialTopPct={`${getRandomInt(40, 50)}%`}
		animationConfig={magnifierAnimation}
		on:toolSelect={toolSelect}
	/>

	<Tool
		name="brush"
		isActive={activeTool === 'brush'}
		initialTopPct={`${getRandomInt(65, 77)}%`}
		animationConfig={brushAnimation}
		on:toolSelect={toolSelect}
	/>
</div>

<style lang="postcss">
	.flex {
		touch-action: none;
	}
</style>
