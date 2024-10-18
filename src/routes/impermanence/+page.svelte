<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	function randomOffset() {
		if (Math.random() < 0.5) {
			return Math.floor(Math.random() * 11) - 20; // Range [-20, -10]
		} else {
			return Math.floor(Math.random() * 11) + 10; // Range [10, 20]
		}
	}

	onMount(() => {
		let lastElement: HTMLElement | null = null;

		const handleHover = (target: HTMLElement) => {
			let xoff = randomOffset();
			let yoff = randomOffset();

			// Prevent animating the same element multiple times in a row
			if (target !== lastElement) {
				lastElement = target; // Update to the new element being touched
				var tl = gsap.timeline({ delay: 0 });
				tl.to(target, {
					duration: 1,
					x: `+=${xoff}`,
					y: `+=${yoff}`
				});
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
