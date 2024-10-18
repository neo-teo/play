<script lang="ts">
	import Letterize from 'letterizejs';
	import { onMount } from 'svelte';
	import { bouncyBottom } from '$lib/animations';
	import gsap from 'gsap';

	function randomOffset() {
		if (Math.random() < 0.5) {
			return Math.floor(Math.random() * 11) - 20; // Range [-20, -10]
		} else {
			return Math.floor(Math.random() * 11) + 10; // Range [10, 20]
		}
	}

	onMount(() => {
		const handleHover = (event: any) => {
			const target = event.target;

			let xoff = randomOffset();
			let yoff = randomOffset();

			if (event.type === 'mouseenter') {
				var tl = gsap.timeline({ delay: 0 });
				tl.to(target, {
					duration: 1,
					x: `+=${xoff}`,
					y: `+=${yoff}`
				});
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
