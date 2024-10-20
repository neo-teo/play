<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import { magnifyEffect, screwEffect, hammerEffect, reset } from './animations';
	import { distanceToElement } from '$lib/physics';
	import gsap from 'gsap';

	let hammerMode = false;
	let driverMode = false;

	const handleHover = (target: HTMLElement) => {
		if (hammerMode) {
			hammerEffect(target);
		} else if (driverMode) {
			screwEffect(target);
		} else {
			reset(target);
		}
	};

	const toolOffsetX = -30; // Horizontal offset
	const toolOffsetY = -20; // Vertical offset

	let hammer: HTMLElement;
	let driver: HTMLElement;

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
			// if (!hammerMode) {
			handleMove(event.clientX, event.clientY);
			// }
		});

		letterizeContainer?.addEventListener('touchmove', (event: TouchEvent) => {
			const touch = event.touches[0];
			handleMove(touch.clientX, touch.clientY);
		});

		const handleMouseMove = (event: MouseEvent) => {
			const mouseX = event.clientX;
			const mouseY = event.clientY;

			if (hammerMode) {
				gsap.to(hammer, {
					left: mouseX + toolOffsetX,
					top: mouseY + toolOffsetY,
					duration: 0.1,
					ease: 'power3.out'
				});
			}

			if (driverMode) {
				gsap.to(driver, {
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

	let driverPos = { left: 'calc(100vw - 50px)', top: '60%' };

	function pickUpHammer() {
		hammerMode = true;

		gsap.to('.hammer', {
			rotation: 40,
			duration: 1,
			yoyo: true,
			repeat: -1,
			ease: 'back.in'
		});
	}

	function pickUpDriver() {
		driverMode = true;
	}

	function putDownTool() {
		if (hammerMode) {
			hammerMode = false;

			const pos = hammer.getBoundingClientRect();
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			hammerPos = {
				left: `${((pos.left - toolOffsetX / 2) / vw) * 100}vw`, // Convert px to vw
				top: `${((pos.top - toolOffsetY / 2) / vh) * 100}vh` // Convert px to vh
			};

			gsap.killTweensOf('.hammer');
		}

		if (driverMode) {
			driverMode = false;

			const pos = driver.getBoundingClientRect();
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			driverPos = {
				left: `${((pos.left - toolOffsetX / 2) / vw) * 100}vw`, // Convert px to vw
				top: `${((pos.top - toolOffsetY / 2) / vh) * 100}vh` // Convert px to vh
			};
		}
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
		on:click={pickUpDriver}
		class="w-8 driver fixed"
		style="left: {driverPos.left}; top: {driverPos.top};"
		class:opacity-0={driverMode}
	>
		<img src="/impermanence/driver.png" alt="driver" />
	</button>

	<button
		on:click={pickUpHammer}
		class="w-11 hammer fixed"
		style="left: {hammerPos.left}; top: {hammerPos.top};"
		class:opacity-0={hammerMode}
	>
		<img src="/impermanence/hammer2.png" alt="hammer" />
	</button>

	<img
		bind:this={hammer}
		src="/impermanence/hammer2.png"
		alt="hammer"
		class="pointer-events-none w-11 hammer fixed scale-125"
		style="left: {hammerPos.left}; top: {hammerPos.top};"
		class:opacity-0={!hammerMode}
	/>

	<img
		bind:this={driver}
		src="/impermanence/driver.png"
		alt="driver"
		class="pointer-events-none w-11 hammer fixed scale-125"
		style="left: {driverPos.left}; top: {driverPos.top};"
		class:opacity-0={!driverMode}
	/>
</div>

<style lang="postcss">
	.flex {
		touch-action: none;
	}
</style>
