<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import { offsetPos, resetPos } from '$lib/animations';
	import { distanceToElement } from '$lib/physics';

	let breakMode = true;

	onMount(() => {
		const handleHover = (target: HTMLElement) => {
			if (breakMode) {
				offsetPos(target);
			} else {
				resetPos(target);
			}
		};

		const handleTouchMove = (event: TouchEvent) => {
			// Get the touch target
			const touch = event.touches[0];
			const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;

			if (target && target.style.display === 'inline-block') {
				handleHover(target);
			}
		};

		const text = new Letterize({
			targets: '#letterize p'
		});

		const letters = text.listAll;

		letters.forEach((span) => {
			span.style.display = 'inline-block';

			span.addEventListener('mouseenter', (event) => handleHover(span as HTMLElement)); // Desktop hover interaction
		});

		// Add the touchmove listener to the whole container to capture finger movements
		const letterizeContainer = document.getElementById('letterize');
		letterizeContainer?.addEventListener('touchmove', handleTouchMove);
	});

	// Add a click event to toggle breakMode
	window.addEventListener('click', () => {
		breakMode = !breakMode;
	});
</script>

<div class="flex items-center justify-center min-h-screen">
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
</div>
