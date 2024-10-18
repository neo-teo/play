<script lang="ts">
	import Letterize from 'letterizejs';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	onMount(() => {
		const handleHover = (event) => {
			const target = event.target;

			if (event.type === 'mouseenter') {
				scale(target);
			}
		};

		const text = new Letterize({
			targets: '#letterize p'
		});

		const letters = text.listAll;

		letters.forEach((span) => {
			span.style.display = 'inline-block';
			span.addEventListener('mouseenter', handleHover);
			span.addEventListener('mouseleave', handleHover);
		});

		const scale = (e: Element) => {
			const windowHeight = window.innerHeight;
			const elementRect = e.getBoundingClientRect();
			const distanceToBottom = windowHeight - elementRect.bottom;

			gsap.to(e, {
				color: 'green',
				duration: 0.5,
				yoyo: true,
				ease: 'power1.inOut'
			});

			// Create a timeline for the falling effect
			var tl = gsap.timeline({ delay: Math.random() * 3 });
			tl.to(e, {
				duration: 4,
				y: `+=${distanceToBottom}`, // Move the element to the bottom dynamically
				ease: 'bounce.out'
			});
		};
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
