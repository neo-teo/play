<script>
	// @ts-nocheck
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	let isOpen = false;
	let selectedOption = '';
	let dropdownContainer;
	const dispatch = createEventDispatcher();
	const encryptionMethods = ['lowercase', 'x', 'symbols'];

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(option) {
		dispatch('change', { method: option });
		selectedOption = option;
		isOpen = false;
	}

	function handleClickOutside(event) {
		if (dropdownContainer && !dropdownContainer.contains(event.target)) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="relative inline-block text-left" bind:this={dropdownContainer}>
	<button
		on:click|stopPropagation={toggleDropdown}
		class="h-16 w-16 border border-blue-600 px-4 gap-2 bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
	>
		{#if selectedOption === 'symbols'}
			<div class="flex flex-col">
				<div class="flex gap-3">
					<div class="rotate-[-10deg]">&</div>
					<div class="rotate-[5deg]">%</div>
				</div>
				<div class="rotate-[12deg]">#</div>
			</div>
		{:else if selectedOption === 'x'}
			<div class="flex flex-col">
				<div class="flex gap-3">
					<div class="rotate-[-7deg]">x</div>
					<div class="rotate-[5deg]">x</div>
				</div>
				<div class="rotate-[-10deg] mt-[-5px]">x</div>
			</div>
		{:else}
			<div class="flex flex-col">
				<div class="flex gap-2">
					<div class="rotate-[-10deg]">a</div>
					<div class="rotate-[5deg]">b</div>
				</div>
				<div class="rotate-[12deg] mt-[-5px]">c</div>
			</div>
		{/if}
	</button>

	{#if isOpen}
		<div class="absolute left-0 right-0 border border-t-0 border-blue-600 bg-white">
			<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
				{#each encryptionMethods as option}
					<button
						on:click={() => selectOption(option)}
						class="h-16 w-16 flex flex-wrap gap-2 [&:not(:last-child)]:border-b border-blue-600 items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white"
						role="menuitem"
					>
						{#if option === 'symbols'}
							<div class="flex flex-col">
								<div class="flex gap-3">
									<div class="rotate-[-10deg]">&</div>
									<div class="rotate-[5deg]">%</div>
								</div>
								<div class="rotate-[12deg]">#</div>
							</div>
						{:else if option === 'x'}
							<div class="flex flex-col">
								<div class="flex gap-3">
									<div class="rotate-[-7deg]">x</div>
									<div class="rotate-[5deg]">x</div>
								</div>
								<div class="rotate-[-10deg] mt-[-5px]">x</div>
							</div>
						{:else}
							<div class="flex flex-col">
								<div class="flex gap-2">
									<div class="rotate-[-10deg]">a</div>
									<div class="rotate-[5deg]">b</div>
								</div>
								<div class="rotate-[12deg] mt-[-5px]">c</div>
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
