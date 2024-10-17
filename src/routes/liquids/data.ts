type Entry = {
    drink: 'coffee' | 'seltzer' | 'beer' | 'tequila' | 'water' | 'coca cola' | 'tea' | 'milk';
    volume: number; // in mL
    brand: string;
    note?: string;
    addon?: string;
    carbonated?: boolean;
};

export interface DailyConsumption {
    date: string;
    entries: Entry[];
}

export const data: DailyConsumption[] = [
    {
        date: '2024-10-11', // Friday
        entries: [
            {
                drink: "coffee",
                volume: 350,
                brand: "Deli",
                addon: "a splash of milk",
                note: "deli cup of bustelo to start the day"
            },
            { drink: "seltzer", volume: 355, brand: "La Croix", note: "office drink of choice", carbonated: true },
            { drink: "seltzer", volume: 355, brand: "La Croix", note: "office drink of choice", carbonated: true },
            { drink: "beer", volume: 355, brand: "Naragansett", note: "ty alexander ly lot", carbonated: true },
            { drink: "beer", volume: 355, brand: "Naragansett", note: "1 = 0", carbonated: true },
            { drink: "beer", volume: 355, brand: "Naragansett", note: "nice to meet u matt", carbonated: true },
            { drink: "seltzer", volume: 800, brand: "Canada Dry", note: "was feeling like a late night seltzer", carbonated: true },
        ]
    },
    {
        date: '2024-10-12', // Saturday
        entries: [
            { drink: "coffee", volume: 350, brand: "Deli", addon: "a splash of milk", note: "took it with me to verizon" },
            { drink: "water", volume: 500, brand: "Tap", note: "hydration" },
            { drink: "seltzer", volume: 600, brand: "Canada Dry", note: "hydration with bubble!", carbonated: true },
            { drink: "coffee", volume: 250, brand: "French Press", note: "david / oli came over wanted coffee, who am i to say no" },
            { drink: "water", volume: 400, brand: "Tap", note: "hydration, heartbeat was uupp" },
            { drink: "beer", volume: 355, brand: "FMN", note: "nasai kala re giannare leventi", carbonated: true },
            { drink: "beer", volume: 500, brand: "FMN", note: "also had half of david's beer", carbonated: true },
            { drink: "tequila", volume: 200, brand: "Espolon", addon: "a squeezed lime", note: "backgammon with oliver" },
            { drink: "seltzer", volume: 400, brand: "Canada Dry", note: "had to finish the big bottle", carbonated: true },
        ]
    },
    {
        date: '2024-10-13', // Sunday
        entries: [
            { drink: "coffee", volume: 250, brand: "French Press", note: "cozy morning with some home coffee" },
            { drink: "coffee", volume: 250, brand: "Drip", note: "great bookstore on suffolk" },
            { drink: "coca cola", volume: 330, brand: "Coca Cola", note: "welcome back zelda, scarr's is lowkey the best pizza in the city", carbonated: true },
            { drink: "water", volume: 750, brand: "Tap", note: "gotta catch up on water" },
            { drink: "water", volume: 1000, brand: "Tap", note: "lots of water before bed tonight" },
        ],
    },
    {
        date: '2024-10-14', // Monday
        entries: [
            { drink: "coffee", volume: 250, brand: "Americano", addon: "a splash of milk", note: "Americano, was looking for a stronger kick this morning" },
            { drink: "water", volume: 500, brand: "Tap", note: "hydration, the unusual" },
            { drink: "seltzer", volume: 750, brand: "Pellegrino", note: "had to go boujee because Mo was out of schweppes. at least he gave me a discount", carbonated: true },
            { drink: "water", volume: 750, brand: "Tap", note: "filled pellegrino from tap lol" },
        ]
    },
    {
        date: '2024-10-15', // Tuesday
        entries: [
            { drink: "water", volume: 400, brand: "Tap", note: "bedside pellegrino bottle" },
            { drink: "tea", volume: 350, brand: "Cotterley", addon: "some honey", note: "honestly not sure what type of tea it was, french packaging" },
            { drink: "milk", volume: 200, brand: "Trader Joe's", note: "with raisin bran" },
            { drink: "coffee", volume: 355, brand: "Drip", note: "machine supposedly needs descaling but have been using it for a while now..." },
            { drink: "tea", volume: 350, brand: "Twinnings", note: "so cold outside..." },
            { drink: "water", volume: 750, brand: "Tap", note: "the usual hydration" },
        ]
    },
    {
        date: '2024-10-16', // Wednesday
        entries: [
            { drink: "water", volume: 400, brand: "Tap", note: "bedside pellegrino bottle" },
            { drink: "coffee", volume: 350, brand: "Americano", addon: "a splash of milk", note: "needed this one like .... a lot" },
            { drink: "seltzer", volume: 750, brand: "Saratoga", note: "much needed", carbonated: true }
        ]
    }
];
