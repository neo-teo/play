// Function to calculate the distance between the mouse and an element
export const distanceToElement = (mouseX: number, mouseY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;
    const dx = mouseX - elementX;
    const dy = mouseY - elementY;
    return Math.sqrt(dx * dx + dy * dy);
};