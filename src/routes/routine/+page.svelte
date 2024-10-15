<script>
	// @ts-nocheck
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	let letters = {
		r: ['/routine/one_chars/r.png', '/routine/two_chars/r.png', '/routine/three_chars/r.png'],
		o: ['/routine/one_chars/o.png', '/routine/two_chars/o.png', '/routine/three_chars/o.png'],
		u: ['/routine/one_chars/u.png', '/routine/two_chars/u.png', '/routine/three_chars/u.png'],
		t: ['/routine/one_chars/t.png', '/routine/two_chars/t.png', '/routine/three_chars/t.png'],
		i: ['/routine/one_chars/i.png', '/routine/two_chars/i.png', '/routine/three_chars/i.png'],
		n: ['/routine/one_chars/n.png', '/routine/two_chars/n.png', '/routine/three_chars/n.png'],
		e: ['/routine/one_chars/e.png', '/routine/two_chars/e.png', '/routine/three_chars/e.png']
	};

	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	onMount(() => {
		document.querySelectorAll('.char').forEach((span) => {
			span.addEventListener('mouseenter', handleHover);
			span.addEventListener('mouseleave', handleHover);
		});

		document.querySelectorAll('.scale').forEach((span) => {
			resetScale(span);
		});

		document.querySelectorAll('.swing').forEach((span) => {
			setTimeout(
				() => {
					gsap.to(span, {
						rotation: -15,
						duration: 0.5,
						ease: 'linear',
						transformOrigin: '50% 35%'
					});
					setTimeout(() => swing(span), 500);
				},
				getRandomInt(0, 500)
			);
		});
	});

	const scale = (element) => {
		gsap.to(element, {
			scale: 0,
			duration: 0.3,
			ease: 'power1.inOut'
		});
	};

	const resetScale = (element) => {
		gsap.killTweensOf(element);
		gsap.to(element, {
			scale: Math.max(Math.random() + 0.1, 0.9),
			rotate: getRandomInt(-30, 30),
			duration: 0.8,
			ease: 'back.out'
		});
	};

	const swing = (element) => {
		const currentRotation = gsap.getProperty(element, 'rotation');
		gsap.to(element, {
			rotation: currentRotation + 30,
			duration: 1,
			ease: 'power1.inOut',
			repeat: -1,
			yoyo: true
		});
	};

	// const fullSwing = (element) => {
	// 	gsap.killTweensOf(element);
	// 	gsap.to(element, {
	// 		rotation: '+=360', // Use relative value
	// 		duration: 1,
	// 		repeat: -1,
	// 		ease: 'linear' // Use linear easing for smooth rotation
	// 	});
	// };

	// const smoothTransitionToSwing = (element) => {
	// 	gsap.killTweensOf(element);

	// 	const currentRotation = gsap.getProperty(element, 'rotation');
	// 	const remainingRotation = 360 - (currentRotation % 360) - 15;

	// 	gsap.to(element, {
	// 		rotation: `+=${remainingRotation}`,
	// 		duration: 1.2,
	// 		ease: 'back.out',
	// 		onComplete: () => {
	// 			swing(element);
	// 		}
	// 	});
	// };

	const handleHover = (event) => {
		const target = event.target;

		if (event.type === 'mouseenter') {
			if (target.classList.contains('scale')) {
				scale(target);
			} else if (target.classList.contains('swing')) {
				fullSwing(target);
			}
		} else if (event.type === 'mouseleave') {
			if (target.classList.contains('scale')) {
				setTimeout(() => resetScale(target), 1000);
			} else if (target.classList.contains('swing')) {
				smoothTransitionToSwing(target);
			}
		}
	};
</script>

<div class="flex flex-col gap-5 sm:px-10">
	<div class="flex flex-col gap-20">
		<div class="flex flex-row flex-wrap items-center justify-center">
			<img class="char swing max-h-[100px]" src={letters.r[1]} alt="r" data-letter="r" />
			<img class="char swing max-h-[100px]" src={letters.o[1]} alt="o" data-letter="o" />
			<img class="char swing max-h-[100px]" src={letters.u[1]} alt="u" data-letter="u" />
			<img class="char swing max-h-[100px]" src={letters.t[1]} alt="t" data-letter="t" />
			<img class="char swing max-h-[100px]" src={letters.i[1]} alt="i" data-letter="i" />
			<img class="char swing max-h-[100px]" src={letters.n[1]} alt="n" data-letter="n" />
			<img class="char swing max-h-[100px]" src={letters.e[1]} alt="e" data-letter="e" />
		</div>

		<div class="flex flex-col items-center justify-center gap-0">
			<div class="flex flex-row flex-wrap items-center justify-center">
				<img class="char scale max-h-[100px]" src={letters.r[0]} alt="r" data-letter="r" />
				<img class="char scale max-h-[100px]" src={letters.o[0]} alt="o" data-letter="o" />
				<img class="char scale max-h-[100px]" src={letters.u[0]} alt="u" data-letter="u" />
				<img class="char scale max-h-[100px]" src={letters.t[0]} alt="t" data-letter="t" />
				<img class="char scale max-h-[100px]" src={letters.i[0]} alt="i" data-letter="i" />
				<img class="char scale max-h-[100px]" src={letters.n[0]} alt="n" data-letter="n" />
				<img class="char scale max-h-[100px]" src={letters.e[0]} alt="e" data-letter="e" />
			</div>
			<div class="flex flex-row flex-wrap items-center justify-center">
				<img class="char scale max-h-[100px]" src={letters.r[2]} alt="r" data-letter="r" />
				<img class="char scale max-h-[100px]" src={letters.o[2]} alt="o" data-letter="o" />
				<img class="char scale max-h-[100px]" src={letters.u[2]} alt="u" data-letter="u" />
				<img class="char scale max-h-[100px]" src={letters.t[2]} alt="t" data-letter="t" />
				<img class="char scale max-h-[100px]" src={letters.i[2]} alt="i" data-letter="i" />
				<img class="char scale max-h-[100px]" src={letters.n[2]} alt="n" data-letter="n" />
				<img class="char scale max-h-[100px]" src={letters.e[2]} alt="e" data-letter="e" />
			</div>
			<div class="flex flex-row flex-wrap items-center justify-center">
				<img class="char scale max-h-[100px]" src={letters.r[0]} alt="r" data-letter="r" />
				<img class="char scale max-h-[100px]" src={letters.o[0]} alt="o" data-letter="o" />
				<img class="char scale max-h-[100px]" src={letters.u[0]} alt="u" data-letter="u" />
				<img class="char scale max-h-[100px]" src={letters.t[0]} alt="t" data-letter="t" />
				<img class="char scale max-h-[100px]" src={letters.i[0]} alt="i" data-letter="i" />
				<img class="char scale max-h-[100px]" src={letters.n[0]} alt="n" data-letter="n" />
				<img class="char scale max-h-[100px]" src={letters.e[0]} alt="e" data-letter="e" />
			</div>
			<div class="flex flex-row flex-wrap items-center justify-center">
				<img class="char scale max-h-[100px]" src={letters.r[2]} alt="r" data-letter="r" />
				<img class="char scale max-h-[100px]" src={letters.o[2]} alt="o" data-letter="o" />
				<img class="char scale max-h-[100px]" src={letters.u[2]} alt="u" data-letter="u" />
				<img class="char scale max-h-[100px]" src={letters.t[2]} alt="t" data-letter="t" />
				<img class="char scale max-h-[100px]" src={letters.i[2]} alt="i" data-letter="i" />
				<img class="char scale max-h-[100px]" src={letters.n[2]} alt="n" data-letter="n" />
				<img class="char scale max-h-[100px]" src={letters.e[2]} alt="e" data-letter="e" />
			</div>
			<div class="flex flex-row flex-wrap items-center justify-center">
				<img class="char scale max-h-[100px]" src={letters.r[0]} alt="r" data-letter="r" />
				<img class="char scale max-h-[100px]" src={letters.o[0]} alt="o" data-letter="o" />
				<img class="char scale max-h-[100px]" src={letters.u[0]} alt="u" data-letter="u" />
				<img class="char scale max-h-[100px]" src={letters.t[0]} alt="t" data-letter="t" />
				<img class="char scale max-h-[100px]" src={letters.i[0]} alt="i" data-letter="i" />
				<img class="char scale max-h-[100px]" src={letters.n[0]} alt="n" data-letter="n" />
				<img class="char scale max-h-[100px]" src={letters.e[0]} alt="e" data-letter="e" />
			</div>
			<div class="flex flex-row flex-wrap items-center justify-center">
				<img class="char scale max-h-[100px]" src={letters.r[2]} alt="r" data-letter="r" />
				<img class="char scale max-h-[100px]" src={letters.o[2]} alt="o" data-letter="o" />
				<img class="char scale max-h-[100px]" src={letters.u[2]} alt="u" data-letter="u" />
				<img class="char scale max-h-[100px]" src={letters.t[2]} alt="t" data-letter="t" />
				<img class="char scale max-h-[100px]" src={letters.i[2]} alt="i" data-letter="i" />
				<img class="char scale max-h-[100px]" src={letters.n[2]} alt="n" data-letter="n" />
				<img class="char scale max-h-[100px]" src={letters.e[2]} alt="e" data-letter="e" />
			</div>
			<div class="flex flex-row flex-wrap items-center justify-center">
				<img class="char scale max-h-[100px]" src={letters.r[0]} alt="r" data-letter="r" />
				<img class="char scale max-h-[100px]" src={letters.o[0]} alt="o" data-letter="o" />
				<img class="char scale max-h-[100px]" src={letters.u[0]} alt="u" data-letter="u" />
				<img class="char scale max-h-[100px]" src={letters.t[0]} alt="t" data-letter="t" />
				<img class="char scale max-h-[100px]" src={letters.i[0]} alt="i" data-letter="i" />
				<img class="char scale max-h-[100px]" src={letters.n[0]} alt="n" data-letter="n" />
				<img class="char scale max-h-[100px]" src={letters.e[0]} alt="e" data-letter="e" />
			</div>
		</div>

		<div class="flex flex-row flex-wrap items-center justify-center">
			<img class="w-60" src={'/routine/thumbnail.png'} alt="thumbnail" />
		</div>
	</div>
</div>
