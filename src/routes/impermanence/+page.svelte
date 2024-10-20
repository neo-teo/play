<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import { offsetPos, resetPos } from '$lib/animations';
	import { distanceToElement } from '$lib/physics';

	let breakMode = true;

	const handleHover = (target: HTMLElement) => {
		if (breakMode) {
			offsetPos(target);
		} else {
			resetPos(target);
		}
	};

	onMount(() => {
		const text = new Letterize({
			targets: '#letterize p'
		});

		const letters = text.listAll;

		letters.forEach((span) => {
			span.style.display = 'inline-block';

			span.addEventListener('mouseenter', () => handleHover(span as HTMLElement));
		});

		const letterizeContainer = document.getElementById('letterize');

		const handleMove = (x: number, y: number) => {
			letters.forEach((span) => {
				const distance = distanceToElement(x, y, span as HTMLElement);
				if (distance < 30) {
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
	});
</script>

<div
	class={`relative flex items-center justify-center min-h-screen ${breakMode ? 'cursor-custom' : 'cursor-hammer'}`}
>
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
		class="absolute cursor-none top-10 right-10 hover:scale-110"
		on:click={() => (breakMode = !breakMode)}
		>{#if breakMode}<img class="w-12" src="/impermanence/hammer.png" alt="hammer" />
		{:else}
			<img class="w-12" src="/impermanence/cursor.png" alt="cursor" />
		{/if}</button
	>
</div>

<style lang="postcss">
	.flex {
		touch-action: none;
	}
</style>
