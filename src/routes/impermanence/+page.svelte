<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import { scale, rotate, offsetPos, resetPos } from '$lib/animations';
	import { distanceToElement } from '$lib/physics';
	import gsap from 'gsap';

	let breakMode = false;

	const handleHover = (target: HTMLElement) => {
		if (breakMode) {
			offsetPos(target);
		} else {
			resetPos(target);
		}
	};

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
			if (!breakMode) {
				handleMove(event.clientX, event.clientY);
			}
		});

		letterizeContainer?.addEventListener('touchmove', (event: TouchEvent) => {
			const touch = event.touches[0];
			handleMove(touch.clientX, touch.clientY);
		});

		const handleMouseMove = (event: MouseEvent) => {
			if (breakMode) {
				const mouseX = event.clientX;
				const mouseY = event.clientY;

				gsap.to(hammer, {
					left: mouseX - 30,
					top: mouseY - 20,
					duration: 0.1,
					ease: 'power3.out'
				});
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
	});

	function pickUpTool() {
		breakMode = true;

		gsap.to('.hammer', {
			rotation: 40,
			duration: 1,
			yoyo: true,
			repeat: -1,
			ease: 'back.in'
		});
	}

	function putDownTool() {
		breakMode = false;

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

	<button
		class="absolute top-1/2 right-0 transform -translate-y-1/2 top-10 group"
		on:click={putDownTool}
	>
		<img class="w-12" src="/impermanence/long_shelf.png" alt="cursor" />
	</button>

	{#if !breakMode}
		<button
			on:click={pickUpTool}
			class="w-8 hammer fixed top-1/2 transform -translate-y-1/2 right-5 hover:scale-125"
		>
			<img src="/impermanence/hammer.png" alt="hammer" />
		</button>
	{:else}
		<img
			bind:this={hammer}
			src="/impermanence/hammer.png"
			alt="hammer"
			class="pointer-events-none w-8 hammer fixed top-1/2 transform -translate-y-1/2 right-5"
		/>
	{/if}

	<!-- <img
		class="pointer-events-none w-9 rotate-[-30deg] fixed top-12 right-40"
		src="/impermanence/brush.png"
		alt="brush"
	/>

	<img
		class="pointer-events-none w-10 fixed top-12 right-10"
		src="/impermanence/driver.png"
		alt="driver"
	/>

	<img
		class="pointer-events-none w-12 fixed top-12 right-14"
		src="/impermanence/magnifier.png"
		alt="magnifier"
	/> -->
</div>

<style lang="postcss">
	.flex {
		touch-action: none;
	}
</style>
