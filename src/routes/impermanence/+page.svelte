<script lang="ts">
	import Letterize from 'letterizejs';
	import { afterUpdate, onMount } from 'svelte';
	import { offsetPos, resetPos } from '$lib/animations';
	import { distanceToElement } from '$lib/physics';
	import gsap from 'gsap';

	let breakMode = true;

	const handleHover = (target: HTMLElement) => {
		if (breakMode) {
			offsetPos(target);
		} else {
			resetPos(target);
		}
	};

	let hammerImg: HTMLElement;

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
			const mouseX = event.clientX;
			const mouseY = event.clientY;

			gsap.to(hammerImg, {
				left: mouseX - 30,
				top: mouseY - 20,
				duration: 0.1,
				ease: 'power3.out'
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
	});

	afterUpdate(() => {
		if (breakMode) {
			gsap.to('.hammer', {
				rotation: 40,
				duration: 1,
				yoyo: true,
				repeat: -1,
				ease: 'back.in'
			});
		}
	});

	function toggleBreakMode() {
		breakMode = !breakMode;

		gsap.to(hammerImg, {
			opacity: breakMode ? 1 : 0,
			duration: 0.1,
			ease: 'power3.out'
		});
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

	<button class="absolute top-10 right-10 hover:scale-110" on:click={toggleBreakMode}>
		{#if breakMode}
			<img class="w-8 hammer" src="/impermanence/hammer2.png" alt="hammer" />
		{:else}
			<img class="w-8" src="/impermanence/cursor.png" alt="cursor" />
		{/if}
	</button>

	<!-- hammer that follows mouse -->
	<img
		bind:this={hammerImg}
		class="pointer-events-none w-8 hammer fixed"
		src="/impermanence/hammer2.png"
		alt="hammer"
	/>
</div>

<style lang="postcss">
	.flex {
		touch-action: none;
	}
</style>
