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

const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6) //+ '80';
};

export const magnify = (e: Element) => {
    var tl = gsap.timeline({ delay: 0 });
    let color = randomHexColorCode();

    tl.to(e, {
        duration: 1,
        backgroundColor: color,
        color: color,
        // scale: Math.max(0.5, Math.random() * 2.3),
        ease: "back.out",
    });
};

export const paint = (e: Element) => {

    function randomOffset() {
        if (Math.random() < 0.5) {
            return Math.floor(Math.random() * 11) - 20; // Range [-20, -10]
        } else {
            return Math.floor(Math.random() * 11) + 10; // Range [10, 20]
        }
    }

    let xoff = randomOffset();
    let yoff = randomOffset();

    let rotation = getRandomInt(-45, 45);

    let color = randomHexColorCode();

    var tl = gsap.timeline({ delay: 0 });
    tl.to(e, {
        duration: 1,
        // x: `+=${xoff}`,
        // y: `+=${yoff}`,
        backgroundColor: color,
        rotate: rotation,
        // padding: getRandomInt(5, 10),
        // boxShadow: '0px 0px 2px 2px ' + color,
        borderRadius: getRandomInt(0, 100) + '%',
        // borderRadius: '100%',
        // width: getRandomInt(50, 100) + "px",
        // height: getRandomInt(50, 100) + "px",
        color: color,
        ease: "back.out",
    });
};

export const reset = (e: Element) => {
    var tl = gsap.timeline({ delay: 0 });

    tl.to(e, {
        duration: 1,
        rotate: '0',
        scale: '1',
        width: 'auto',
        height: 'auto',

        backgroundColor: 'transparent',
        color: 'black',
        x: '0',
        y: '0'
    });
};

export const hammerAnimation = {
    rotation: 40,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: 'back.in'
};

export const driverAnimation = {
    rotation: 5,
    duration: 0.5,
    yoyo: true,
    repeat: -1,
    ease: 'elastic.inOut'
};

export const magnifierAnimation = {
    scale: 1.3,
    duration: 0.6,
    yoyo: true,
    repeat: -1,
    ease: 'ease.inOut'
};

export const brushAnimation = {
    rotation: 20,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
};