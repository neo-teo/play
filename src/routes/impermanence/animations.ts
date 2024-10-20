import gsap from 'gsap';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const hammerEffect = (e: Element) => {
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
        duration: .5,
        x: `+=${xoff}`,
        y: `+=${yoff}`
    });
};

export const screwEffect = (e: Element) => {
    let rotation = getRandomInt(45, 180);

    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        rotate: `+=${rotation}`,
        ease: "back.out"
    });
};

export const magnifyEffect = (e: Element) => {
    console.log("scaling")
    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        scale: Math.max(0.5, Math.random() * 2.3),
        ease: "back.out",
    });
};

export const reset = (e: Element) => {
    var tl = gsap.timeline({ delay: 0 });

    tl.to(e, {
        duration: 1,
        rotate: '0',
        scale: '1',
        x: '0',
        y: '0'
    });
};