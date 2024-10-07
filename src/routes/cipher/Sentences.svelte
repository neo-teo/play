<script>
	// inspired by: http://tdingsun.github.io/document/ and https://taliacotton.com/2021/

	// @ts-nocheck
	import CypherInput from './CypherInput.svelte';

	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { encryptLowercase, encryptX, encryptSymbols, encrypt } from './encryptionHelper';

	export let sentences;

	onMount(async () => {
		const { default: TextPlugin } = await import('gsap/TextPlugin');

		gsap.registerPlugin(TextPlugin);
	});

	function toggleEncryption(id) {
		// if element is already animating, don't do anything
		if (gsap.isTweening(`#scramble-${id}`) || gsap.isTweening(`#encrypted-${id}`)) {
			return;
		}

		const sentence = sentences.find((s) => s.id === id);

		const encrypted = encrypt(sentence.decrypted, sentence.method);

		let d = sentence.decrypted.length / 30;

		gsap.to(`#encrypted-${id}`, {
			duration: 0.3,
			rotate: 90,
			ease: 'power1.inOut'
		});

		gsap.to(`#scramble-${id}`, {
			duration: d,
			text: sentence.decrypted,
			ease: 'none',
			delay: 0.2
		});

		gsap.to(`#encrypted-${id}`, {
			duration: 0.3,
			rotate: '-=90',
			ease: 'power1.inOut',
			delay: d + 3
		});

		gsap.to(`#scramble-${id}`, {
			duration: d,
			text: encrypted,
			ease: 'none',
			delay: d + 3.1
		});
	}
</script>

<div class="border border-black p-4 flex flex-col gap-2">
	{#if sentences.length === 0}
		enter a message you want to encrypt above and press plus (or enter)
	{/if}
	{#each sentences as sentence, i}
		<button
			class="group w-full text-left border-black p-3 flex items-start gap-3 hover:italic"
			on:click={() => toggleEncryption(sentence.id)}
		>
			<div id={`encrypted-${sentence.id}`} class="flex items-center justify-center">
				<svg width="20px" height="30px" xmlns="http://www.w3.org/2000/svg">
					<ellipse
						cx="10"
						cy="13"
						rx="4"
						ry="8"
						fill="none"
						stroke="rgb(37, 99, 235)"
						stroke-width="2"
						class="group-hover:fill-blue-200"
					/>
				</svg>
			</div>

			<div id={`scramble-${sentence.id}`}>
				{encrypt(sentence.decrypted, sentence.method)}
			</div>
		</button>

		{#if i < sentences.length - 1}
			<div class="border-t border-black border-1"></div>
		{/if}
	{/each}
</div>
