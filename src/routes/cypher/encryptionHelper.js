// @ts-nocheck

export function encrypt(text, method) {
    let cypher;
    switch (method) {
        case 'x':
            cypher = encryptX(text);
            break;
        case 'symbols':
            cypher = encryptSymbols(text);
            break;
        default:
            cypher = encryptLowercase(text);
            break;
    }
    return cypher;
}

export function encryptLowercase(str) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            result += ' '; // Preserve spaces from the original string
        } else {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
    }

    return result;
}

export function encryptX(str) {
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            result += ' '; // Preserve spaces from the original string
        } else {
            result += 'x'
        }
    }

    return result;
}

export function encryptSymbols(str) {
    const characters = '!?@#$%^&*_+=><,./{}[]()';
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            result += ' '; // Preserve spaces from the original string
        } else {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
    }

    return result;
}

