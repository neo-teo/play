type Entry = {
    drink: 'coffee' | 'seltzer' | 'beer' | 'tequila' | 'water' | 'coca cola';
    volume: number; // in mL
    brand: string;
    flavor?: string;
    source?: string;
    note?: string;
    addon?: string;
};

export interface DailyConsumption {
    date: string;
    entries: Entry[];
}

export const data: DailyConsumption[] = [
    {
        date: '2024-10-11', // Friday
        entries: [
            { drink: "coffee", volume: 350, brand: "Bustelo", source: "deli", addon: "splash of milk", note: "deli cup of bustelo to start the day" },
            { drink: "seltzer", volume: 355, brand: "La Croix", flavor: "lime", note: "office drink of choice" },
            { drink: "seltzer", volume: 355, brand: "La Croix", flavor: "lime", note: "office drink of choice" },
            { drink: "beer", volume: 355, brand: "Naragansett", note: "ty xander" },
            { drink: "beer", volume: 355, brand: "Naragansett", note: "1 = 0" },
            { drink: "beer", volume: 355, brand: "Naragansett", note: "nice to meet u matt" },
            { drink: "seltzer", volume: 1000, brand: "Canada Dry", flavor: "original", note: "was feeling like a late night seltzer" },
        ]
    },
    {
        date: '2024-10-12', // Saturday
        entries: [
            { drink: "coffee", volume: 350, brand: "Bustelo", addon: "splash of milk", source: "deli", note: "took it with me to verizon" },
            { drink: "water", volume: 500, brand: "it's water...", source: "tap", note: "hydration" },
            { drink: "seltzer", volume: 600, brand: "Canada Dry", flavor: "original", note: "hydration with bubble!" },
            { drink: "coffee", volume: 250, brand: "Brooklyn's Own", source: "home", note: "david / oli came over wanted coffee, who am i to say no" },
            { drink: "water", volume: 400, brand: "it's water...", source: "tap", note: "hydration, heartbeat was uupp" },
            { drink: "beer", volume: 355, brand: "FMN", note: "nasai kala re giannare leventi" },
            { drink: "beer", volume: 355, brand: "FMN", note: "brewed in greece" },
            { drink: "beer", volume: 175, brand: "FMN", note: "david's half beer" },
            { drink: "tequila", volume: 100, brand: "Espolon", addon: "half a lime", note: "backgammon with oliver" },
            { drink: "tequila", volume: 100, brand: "Espolon", addon: "half a lime", note: "backgammon with oliver pt2" },
            { drink: "seltzer", volume: 400, brand: "Canada Dry", flavor: "original", note: "had to finish the big bottle" },
        ]
    },
    {
        date: '2024-10-13', // Sunday
        entries: [
            { drink: "coffee", volume: 250, brand: "Brooklyn's Own", source: "home", note: "cozy morning with some home coffee" },
            { drink: "coffee", volume: 250, brand: "?", source: "bookstore", note: "great bookstore on suffolk" },
            { drink: "coca cola", volume: 330, brand: "Coca Cola", flavor: "original", note: "welcome back zelda, scarr's is lowkey the best pizza in the city" },
            { drink: "water", volume: 750, brand: "it's water...", source: "tap", note: "gotta catch up on water" },
            { drink: "water", volume: 1000, brand: "it's water...", source: "tap", note: "lots of water before bed tonight" },
        ],
    },
    {
        date: '2024-10-14', // Monday
        entries: [
            { drink: "coffee", volume: 250, brand: "?", source: "bookstore", addon: "splash of milk", note: "Americano, was looking for a stronger kick this morning" },
            { drink: "water", volume: 500, brand: "it's water...", source: "tap", note: "hydration, the unusual" },
            { drink: "seltzer", volume: 750, brand: "Pellegrino", note: "had to go boujee because Mo was out of schweppes. at least he gave me a discount" },
            { drink: "water", volume: 750, brand: "it's water...", source: "tap", note: "filled pellegrino from tap lol" },
        ]
    },
    {
        date: '2024-10-15', // Tuesday
        entries: [
        ]
    }
];
