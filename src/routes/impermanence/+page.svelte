<script lang="ts">
	import Letterize from 'letterizejs';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let letters;
	onMount(() => {
		const example = new Letterize({
			targets: '#letterize p'
		});

		letters = example.listAll;

		const scale = (element: Element, s: number) => {
			gsap.to(element, {
				scale: s,
				duration: 0.3,
				ease: 'power1.inOut'
			});
		};

		letters.forEach((letter) => {
			if (!letter.textContent || letter.textContent.trim() === '') return;
			letter.addEventListener('mouseenter', () => scale(letter, 0));
			letter.addEventListener('mouseleave', () => scale(letter, 1));
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
