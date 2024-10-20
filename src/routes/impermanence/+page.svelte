<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import { scale, rotate, offsetPos, resetPos } from '$lib/animations';
	import { distanceToElement } from '$lib/physics';
	import gsap from 'gsap';

	let hammerMode = false;

	const handleHover = (target: HTMLElement) => {
		if (hammerMode) {
			offsetPos(target);
		} else {
			resetPos(target);
		}
	};

	const toolOffsetX = -30; // Horizontal offset
	const toolOffsetY = -20; // Vertical offset

	let hammer: HTMLElement;

	onMount(() => {
		const text = new Letterize({
			targets: '#letterize p'
		});

		const letters = text.listAll;

		letters.forEach((span) => {
			(span as HTMLElement).style.display = 'inline-block';

			span.addEventListener('mouseenter', () => handleHover(span as HTMLElement));
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
			if (!hammerMode) {
				handleMove(event.clientX, event.clientY);
			}
		});

		letterizeContainer?.addEventListener('touchmove', (event: TouchEvent) => {
			const touch = event.touches[0];
			handleMove(touch.clientX, touch.clientY);
		});

		const handleMouseMove = (event: MouseEvent) => {
			if (hammerMode) {
				const mouseX = event.clientX;
				const mouseY = event.clientY;

				gsap.to(hammer, {
					left: mouseX + toolOffsetX,
					top: mouseY + toolOffsetY,
					duration: 0.1,
					ease: 'power3.out'
				});
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
	});

	let hammerPos = { left: 'calc(100vw - 50px)', top: '50%' };

	function pickUpTool() {
		hammerMode = true;

		gsap.to('.hammer', {
			rotation: 40,
			duration: 1,
			yoyo: true,
			repeat: -1,
			ease: 'back.in'
		});
	}

	function putDownTool() {
		if (!hammerMode) return;

		hammerMode = false;

		const pos = hammer.getBoundingClientRect();
		hammerPos = {
			left: `${pos.left - toolOffsetX / 2}px`, // Adjust for the horizontal offset
			top: `${pos.top - toolOffsetY / 2}px` // Adjust for the vertical offset
		};
		gsap.killTweensOf('.hammer');
	}
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

	<button class="absolute top-1/2 right-0 transform -translate-y-1/2" on:click={putDownTool}>
		<img class="w-12" src="/impermanence/long_shelf.png" alt="cursor" />
	</button>

	<button
		on:click={pickUpTool}
		class="w-8 hammer fixed"
		style="left: {hammerPos.left}; top: {hammerPos.top};"
		class:opacity-0={hammerMode}
	>
		<img src="/impermanence/hammer.png" alt="hammer" />
	</button>

	<img
		bind:this={hammer}
		src="/impermanence/hammer.png"
		alt="hammer"
		class="pointer-events-none w-8 hammer fixed scale-125"
		style="left: {hammerPos.left}; top: {hammerPos.top};"
		class:opacity-0={!hammerMode}
	/>
</div>

<style lang="postcss">
	.flex {
		touch-action: none;
	}
</style>
