<script lang="ts">
	import Letterize from 'letterizejs';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let textArray: string[] = [];
	let letters: Element[] = [];
	let letterize: any;
	let uniqueId = 0;

	function initializeLetterize() {
		if (letterize) {
			letters = [];
			letterize = null;
		}

		// Create new instance after a brief delay to ensure DOM is ready
		setTimeout(() => {
			letterize = new Letterize({
				targets: `#letterize-${uniqueId} p`
			});

			letters = letterize.listAll;
			letters.forEach((span) => {
				(span as HTMLElement).style.display = 'inline-block';
				(span as HTMLElement).classList.add('z-1');
			});

			dispatch('lettersReady', { letters });
		}, 2);
	}

	$: if (textArray) {
		uniqueId++;
		initializeLetterize();
	}

	onMount(() => {
		return () => {
			if (letterize) {
				letters = [];
				letterize = null;
			}
		};
	});
</script>

{#key uniqueId}
	<div
		id="letterize-{uniqueId}"
		class="px-20 mx-auto text-center font-serif tracking-wider font-light text-lg"
	>
		{#each textArray as line, index}
			<p class={index === 0 || index === textArray.length - 1 ? 'italic' : ''}>{line}</p>
		{/each}
	</div>
{/key}
