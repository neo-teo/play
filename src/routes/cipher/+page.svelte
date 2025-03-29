<script>
	// inspired by: http://tdingsun.github.io/document/ and https://taliacotton.com/2021/

	// @ts-nocheck
	import CypherInput from './CypherInput.svelte';
	import { encrypt } from './encryptionHelper';
	import Sentences from './Sentences.svelte';

	let sentences = [];

	function addSentence(event) {
		const { text, method } = event.detail;

		const encrypted = encrypt(text, method);

		let newSentence = {
			id: Date.now(),
			decrypted: text,
			method: method
		};

		sentences = [...sentences, newSentence];
	}
</script>

<div class=" flex flex-col gap-5 sm:px-10 py-20 px-5 font-mono sm:text-lg text-base">
	<CypherInput on:addSentence={addSentence} />

	<Sentences {sentences} />
</div>
