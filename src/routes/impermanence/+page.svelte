<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import {
		reset,
		hammer,
		screw,
		magnify,
		paint,
		driverAnimation,
		hammerAnimation,
		magnifierAnimation,
		brushAnimation
	} from './animations';
	import { distanceToElement } from '$lib/physics';
	import Tool from './Tool.svelte';
	import { getRandomInt } from '$lib/numbers';

	let activeTool: string | null = null;

	function toolSelect(event: CustomEvent) {
		const selectedTool = event.detail.toolType;
		activeTool = activeTool === selectedTool ? null : selectedTool;
	}

	onMount(() => {
		const letters = new Letterize({
			targets: '#letterize p'
		}).listAll;

		letters.forEach((span) => {
			(span as HTMLElement).style.display = 'inline-block';
		});

		const handleMove = (x: number, y: number) => {
			for (const span of letters) {
				let target = span as HTMLElement;
				const maxDistance = activeTool == null ? 30 : 15;
				if (distanceToElement(x, y, target) < maxDistance) {
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
							break;
					}
				}
			}
		};

		const onMouseMove = (event: MouseEvent) => {
			handleMove(event.clientX, event.clientY);
		};
		const onTouchMove = (event: TouchEvent) => {
			const touch = event.touches[0];
			handleMove(touch.clientX, touch.clientY);
		};

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('touchmove', onTouchMove);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('touchmove', onTouchMove);
		};
	});
</script>

<div class="relative flex items-center justify-center min-h-screen cursor-pointer">
	<!-- Text -->
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

	<!-- Tool tray -->
	<button
		class="absolute top-1/2 right-0 transform -translate-y-1/2"
		on:click={() => (activeTool = null)}
	>
		<img class="w-12" src="/impermanence/long_shelf_detail.png" alt="shelf" />
	</button>

	<!-- Tools -->
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
