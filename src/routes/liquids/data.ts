type LiquidEntry = {
    drink: string;
    volume: number; // in mL
    brand: string;
    flavor?: string;
    source?: string;
};

const liquidsConsumed: LiquidEntry[][] = [
    // Friday
    [
        { drink: "coffee", volume: 350, brand: "Bustelo", source: "deli" },
        { drink: "splash of milk", volume: 10, brand: "?" },
        { drink: "seltzer", volume: 355, brand: "La Croix", flavor: "lime" },
        { drink: "seltzer", volume: 355, brand: "La Croix", flavor: "lime" },
        { drink: "beer", volume: 355, brand: "Naragansett" },
        { drink: "beer", volume: 355, brand: "Naragansett" },
        { drink: "beer", volume: 355, brand: "Naragansett" },
        { drink: "seltzer", volume: 1000, brand: "Canada Dry", flavor: "original" },
    ],
    // Saturday
    [
        { drink: "coffee", volume: 350, brand: "Bustelo", source: "deli" },
        { drink: "splash of milk", volume: 10, brand: "?" },
        { drink: "water", volume: 500, brand: "it's water...", source: "tap", },
        { drink: "seltzer", volume: 600, brand: "Canada Dry", flavor: "original" },
        { drink: "coffee", volume: 250, brand: "Brooklyn's Own", source: "home" },
        { drink: "water", volume: 400, brand: "it's water...", source: "tap" },
        { drink: "beer", volume: 355, brand: "FMN" },
        { drink: "beer", volume: 355, brand: "FMN" },
        { drink: "beer", volume: 175, brand: "FMN" },
        { drink: "tequila", volume: 100, brand: "Espolon", flavor: "half a lime" },
        { drink: "half a lime", volume: 15, brand: "TJ" }, // TODO: should this brand be source instead ?
        { drink: "tequila", volume: 100, brand: "Espolon" },
        { drink: "half a lime", volume: 15, brand: "TJ" },
        { drink: "seltzer", volume: 400, brand: "Canada Dry", flavor: "original" },
    ],
    // Sunday
    [
        { drink: "coffee", volume: 250, brand: "Brooklyn's Own", source: "home" },
        { drink: "coffee", volume: 250, brand: "?", source: "bookstore" },
        { drink: "coca cola", volume: 330, brand: "Coca Cola", flavor: "original" },
        { drink: "water", volume: 750, brand: "it's water...", source: "tap" },
        { drink: "water", volume: 300, brand: "it's water...", source: "tap" },
        { drink: "water", volume: 300, brand: "it's water...", source: "tap" }
    ]
];
