<script lang="ts">
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
	import Poem from './Poem.svelte';
	import { poems } from './poems';

	let activeTool: string | null = null;

	let letters: HTMLElement[] = [];

	function toolSelect(event: CustomEvent) {
		const selectedTool = event.detail.toolType;
		activeTool = activeTool === selectedTool ? null : selectedTool;
	}

	let poemIndex = 0;

	function handleLettersReady(event: any) {
		letters = event.detail.letters;
	}

	function changeText() {
		poemIndex = (poemIndex + 1) % poems.length;
	}

	onMount(() => {
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

<div class="relative flex flex-col items-center justify-center min-h-screen cursor-pointer">
	<!-- Poem -->
	<Poem textArray={poems[poemIndex]} on:lettersReady={handleLettersReady} />

	<button class="absolute top-5 w-10 h-10 border border-black text-sm" on:click={changeText}>
		<div class="flex flex-col items-center">
			<div class="flex gap-2">
				<div class="rotate-[-10deg]">a</div>
				<div class="rotate-[5deg]">b</div>
			</div>
			<div class="rotate-[12deg] mt-[-5px]">c</div>
		</div>
	</button>

	<!-- Tool tray -->
	<button
		class="absolute top-1/2 right-[-5px] transform -translate-y-1/2"
		on:click={() => (activeTool = null)}
	>
		<img class="w-16" src="/impermanence/shelf3.png" alt="shelf" />
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
