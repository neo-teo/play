<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import gsap from 'gsap';

	export let name: string;
	export let isActive = false;
	export let initialTopPct = '50%';
	export let animationConfig: gsap.TweenVars | null = null;

	let src = `/impermanence/${name}.png`;

	let width: string = 'w-16';

	let initialPosition = { left: 'calc(100vw - 75px)', top: initialTopPct };
	let toolOffsetX = -40;
	let toolOffsetY = -30;

	const dispatch = createEventDispatcher();
	let toolElement: HTMLElement;
	let restPosition = initialPosition; // Position when tool is at rest
	let currentPosition = initialPosition; // Current/active position

	function pickUpTool() {
		dispatch('toolSelect', {
			toolType: name
		});

		if (animationConfig) {
			gsap.to(toolElement, animationConfig);
		}
	}

	// Watch for deactivation
	$: if (!isActive && toolElement) {
		if (animationConfig) {
			gsap.killTweensOf(toolElement);
		}

		// Update rest position based on current position before deactivating
		const pos = toolElement.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		restPosition = {
			left: `${((pos.left - toolOffsetX / 2) / vw) * 100}vw`,
			top: `${((pos.top - toolOffsetY / 2) / vh) * 100}vh`
		};
		currentPosition = restPosition;
	}

	function updateToolPosition(event: MouseEvent) {
		if (!isActive) return;

		currentPosition = {
			left: `${event.clientX + toolOffsetX}px`,
			top: `${event.clientY + toolOffsetY}px`
		};

		gsap.to(toolElement, {
			left: event.clientX + toolOffsetX,
			top: event.clientY + toolOffsetY,
			duration: 0.1,
			ease: 'power3.out'
		});
	}
</script>

<svelte:window on:mousemove={updateToolPosition} />

<button
	on:click={pickUpTool}
	class="{width} fixed"
	style="left: {restPosition.left}; top: {restPosition.top};"
	class:opacity-0={isActive}
>
	<img {src} alt={name} />
</button>

<img
	bind:this={toolElement}
	{src}
	alt={name}
	class="pointer-events-none {width} fixed scale-110"
	style="
        left: {isActive ? currentPosition.left : restPosition.left}; 
        top: {isActive ? currentPosition.top : restPosition.top};
    "
	class:opacity-0={!isActive}
/>
