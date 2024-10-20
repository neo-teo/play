import gsap from 'gsap';

export const bouncyBottom = (e: Element) => {
    const windowHeight = window.innerHeight;
    const elementRect = e.getBoundingClientRect();
    const distanceToBottom = windowHeight - elementRect.bottom;

    gsap.to(e, {
        color: 'green',
        duration: 0.5,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Create a timeline for the falling effect
    var tl = gsap.timeline({ delay: Math.random() * 3 });
    tl.to(e, {
        duration: 4,
        y: `+=${distanceToBottom}`, // Move the element to the bottom dynamically
        ease: 'bounce.out'
    });
};
