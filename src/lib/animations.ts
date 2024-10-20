import gsap from 'gsap';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

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

export const offsetPos = (e: Element) => {
    function randomOffset() {
        if (Math.random() < 0.5) {
            return Math.floor(Math.random() * 11) - 20; // Range [-20, -10]
        } else {
            return Math.floor(Math.random() * 11) + 10; // Range [10, 20]
        }
    }

    let xoff = randomOffset();
    let yoff = randomOffset();

    var tl = gsap.timeline({ delay: 0 });

    tl.to(e, {
        duration: 1,
        x: `+=${xoff}`,
        y: `+=${yoff}`
    });
};

export const rotate = (e: Element) => {
    let rotation = getRandomInt(45, 180);

    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        rotate: `+=${rotation}`,
        ease: "back.out"
    });
};

export const scale = (e: Element) => {
    console.log("scaling")
    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        scale: Math.max(0.5, Math.random() * 2.3),
        ease: "back.out",
    });
};

export const resetPos = (e: Element) => {
    var tl = gsap.timeline({ delay: 0 });

    tl.to(e, {
        duration: 1,
        rotate: '0',
        scale: '1',
        x: '0',
        y: '0'
    });
};

export const hammer = (e: Element) => {
    var tl = gsap.timeline({ delay: 0 });

    tl.to(e, {
        duration: 1,
        rotate: `180`,
        yoyo: true,
        // repeat: -1,
        ease: "back.inOut"
    });
};