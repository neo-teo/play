import { getRandomInt } from '$lib/numbers';
import gsap from 'gsap';


export const hammer = (e: Element) => {
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

export const screw = (e: Element) => {
    let rotation = getRandomInt(45, 180);

    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        rotate: `+=${rotation}`,
        ease: "back.out"
    });
};

export const magnify = (e: Element) => {
    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        scale: Math.max(0.5, Math.random() * 2.3),
        ease: "back.out",
    });
};

export const paint = (e: Element) => {
    const randomHexColorCode = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };

    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        color: randomHexColorCode(),
        ease: "back.out",
    });
};

export const reset = (e: Element) => {
    var tl = gsap.timeline({ delay: 0 });

    tl.to(e, {
        duration: 1,
        rotate: '0',
        scale: '1',
        color: 'black',
        x: '0',
        y: '0'
    });
};