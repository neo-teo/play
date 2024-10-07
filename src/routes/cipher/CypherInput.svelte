<script>
	// @ts-nocheck
	import { createEventDispatcher, onMount } from 'svelte';
	import EncryptionSelect from './EncryptionSelect.svelte';

	let content = '';
	let selectedEncryption = 'lowercase';

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		if (content.trim()) {
			dispatch('addSentence', { text: content.trim(), method: selectedEncryption });
			content = '';
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}

	function encryptionChanged(event) {
		selectedEncryption = event.detail.method;
	}
</script>

<div class="flex items-center gap-2">
	<div class="flex w-full items-center">
		<input
			autofocus
			type="text"
			bind:value={content}
			on:keydown={handleKeydown}
			class="h-16 px-4 border border-blue-600 outline-none bg-transparent w-full"
		/>

		<button
			on:click={handleSubmit}
			class="h-16 w-16 px-4 border border-l-0 border-blue-600 flex flex-wrap items-center justify-center gap-2 text-blue-600 hover:bg-blue-600 hover:text-white"
		>
			<div class="text-2xl">+</div>
		</button>
	</div>

	<EncryptionSelect on:change={encryptionChanged} />
</div>

<style>
	input {
		color: rgb(37, 99, 235);
		caret-color: rgb(37, 99, 235);
	}
</style>
