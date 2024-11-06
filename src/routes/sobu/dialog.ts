import type p5 from "p5";

export class Dialog {
    private readonly script: string[] = [
        "287 Evergreen Ave, Bushwick NY\n\nJuly 1st 2024",
        "Anyway -- time to get these boxes to the bay so I can move on.",
        "I understand moving is a good time to reflect and all but",
        "but it is humbling to see the things that you collected when you saw potential",
        "and realize they are now taking up space.",
        "As you watch your life become increasingly boxed up just remember",
        "whenever you think you're close to done, there's more to go.. lol",
        "...",
        "There have been some good ones though.",
        "Like when it poured on Wriston quad and we moved 7 people's belongings with 3 people,",
        "or the day we moved out of 102 Governor in a socially isolated world,",
        "or the day we moved to Bushwick and had our first visit to Dicayagua.",
        "...",
        "And today is the day we move out of Evergreen.",
        "...",
        "Anyway -- time to get these boxes to the bay so I can move on in life.",
    ];

    private p: p5;  // Store the p5 instance

    private currentScriptIndex: number = 0;
    private isWaitingForNext: boolean = false;

    private wasSpacePressed: boolean = false;

    private currentText: string = '';
    private targetText: string = '';
    private currentIndex: number = 0;
    private letterDelay: number = 100; // 0.2 seconds
    private lastLetterTime: number = 0;

    constructor(p: p5) {
        this.p = p;
    }

    public start(): void {
        this.currentScriptIndex = 0;
        this.setText(this.script[0]);
    }

    setText(text: string): void {
        this.targetText = text;
        this.currentText = '';
        this.currentIndex = 0;
        this.isWaitingForNext = false;
    }

    update(): void {
        const now = Date.now();

        if (this.currentIndex < this.targetText.length &&
            now - this.lastLetterTime > this.letterDelay) {
            this.currentText += this.targetText[this.currentIndex];
            this.currentIndex++;
            this.lastLetterTime = now;
        } else if (this.currentIndex >= this.targetText.length && !this.isWaitingForNext) {
            this.isWaitingForNext = true;
        }
    }

    handleInput(): void {
        if (this.p.keyIsPressed && this.p.keyCode === 32) {
            if (this.isWaitingForNext && !this.wasSpacePressed && this.currentScriptIndex < this.script.length - 1) {
                this.currentScriptIndex++;
                this.setText(this.script[this.currentScriptIndex]);
            }

            if (!this.isWaitingForNext) {
                this.letterDelay = 10;
            }
            this.wasSpacePressed = true;
        } else {
            this.letterDelay = 100;
            this.wasSpacePressed = false;
        }
    }

    draw(): void {
        const padding = 20;
        const paddingY = padding / 1.25;
        const boxWidth = 500;
        const boxHeight = 100;
        const lineHeight = 24; // Spacing between lines
        const maxWidth = boxWidth - (padding * 2);

        let dialogX = this.p.width / 2 - boxWidth / 2;
        let dialogY = this.p.height - boxHeight * 1.5

        this.p.push();
        this.p.fill(255, 255, 255, 150);
        this.p.strokeWeight(3);
        this.p.rect(dialogX, this.p.height - boxHeight * 1.5, boxWidth, boxHeight);
        this.p.pop();

        this.p.fill(0);
        this.p.textSize(15);

        const words = this.currentText.split(' ');
        let currentLine = '';
        let y = dialogY + paddingY;

        for (const word of words) {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const testWidth = this.p.textWidth(testLine);

            if (testWidth > maxWidth) {
                this.p.text(currentLine, dialogX + padding, y + paddingY);
                currentLine = word;
                y += lineHeight;

                // Prevent text from overflowing box
                // if (y + lineHeight > dialogY + boxHeight - paddingY) {
                //     break;
                // }
            } else {
                currentLine = testLine;
            }
        }
        // Draw the last line
        if (currentLine) {
            this.p.text(currentLine, dialogX + padding, y + paddingY);
        }

        if (this.isWaitingForNext && this.currentScriptIndex === 0) {
            this.p.textSize(12);
            this.p.text("space to continue", dialogX + padding, dialogY + boxHeight - paddingY);
        }
    }
}