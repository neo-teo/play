<script lang="ts">
	import Letterize from 'letterizejs';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let textArray: string[] = [];

	let letters: Element[] = [];

	onMount(() => {
		letters = new Letterize({
			targets: '#letterize p'
		}).listAll;

		letters.forEach((span) => {
			(span as HTMLElement).style.display = 'inline-block';
		});

		// Dispatch the letters to the parent
		dispatch('lettersReady', { letters });
	});
</script>

<div id="letterize" class="px-20 mx-auto text-center font-serif font-light text-base">
	{#each textArray as line, index}
		<p class={index % 2 === 0 ? 'italic' : ''}>{line}</p>
	{/each}
</div>
