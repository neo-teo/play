export function yyyymmdd_to_text(datestring: string) {
    // Split the date string to get the year, month, and day
    const [year, month, day] = datestring.split('-');

    const date = new Date(+year, +month - 1, +day); // Subtract 1 from month because months are 0-indexed in JavaScript

    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}