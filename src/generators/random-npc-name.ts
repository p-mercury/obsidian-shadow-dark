import { Ancestry } from "../types/ancestry";

const randomItem = <T>(items: readonly T[]): T =>
	items[Math.floor(Math.random() * items.length)]!;

export function getRandomNpcName(ancestry: Ancestry) {
	switch (ancestry) {
		case Ancestry.DWARF:
			return `${randomItem(DWARF_FIRST_NAMES)} ${randomItem(DWARF_LAST_NAMES)}`;
		case Ancestry.GOBLIN:
			return randomItem(GOBLIN_NAMES);
		case Ancestry.ELF:
			return `${randomItem(ELF_FIRST_NAMES)} ${randomItem(ELF_LAST_NAMES)}`;
		case Ancestry.HALF_ORC:
			return randomItem(HALF_ORC_NAMES);
		case Ancestry.HALFLING:
			return `${randomItem(HALFLING_FIRST_NAMES)} ${randomItem(HALFLING_LAST_NAMES)}`;
		case Ancestry.HUMAN:
			return `${randomItem(HUMAN_FIRST_NAMES)} ${randomItem(HUMAN_LAST_NAMES)}`;
	}
}

const DWARF_FIRST_NAMES = [
	"Orsik",
	"Dorrik",
	"Grigg",
	"Grom",
	"Rurik",
	"Skorn",
	"Brokk",
	"Korga",
	"Dorn",
	"Hilda",
	"Torgrin",
	"Baldrik",
	"Yorra",
	"Dagna",
	"Runa",
	"Keld",
	"Nori",
	"Sigrun",
	"Ulfar",
	"Zorin",
];

const DWARF_LAST_NAMES = [
	"Ironbeard",
	"Stonehelm",
	"Emberforge",
	"Bronzefist",
	"Deepdelver",
	"Goldhammer",
	"Blackanvil",
	"Steelheart",
	"Flintaxe",
	"Coppervein",
	"Firebrand",
	"Granitehand",
	"Silverpick",
	"Strongbrew",
	"Ashmantle",
	"Runeshield",
	"Oakenkeg",
	"Coalbraid",
	"Mountainborn",
	"Thunderfoot",
];

const GOBLIN_NAMES = [
	"Grik",
	"Snag",
	"Bok",
	"Zib",
	"Krag",
	"Wug",
	"Gub",
	"Ruk",
	"Skab",
	"Vek",
	"Mog",
	"Tik",
	"Zark",
	"Snik",
	"Gob",
	"Driz",
	"Kip",
	"Zog",
	"Fiz",
	"Nub",
];

const ELF_FIRST_NAMES = [
	"Aelar",
	"Lirael",
	"Thalion",
	"Sylwen",
	"Eryndor",
	"Naelis",
	"Faelar",
	"Elowen",
	"Caelen",
	"Ilyra",
	"Vaelis",
	"Seraphin",
	"Nymera",
	"Orlith",
	"Maeriel",
	"Theren",
	"Aelwyn",
	"Lyrian",
	"Elaris",
	"Sylvar",
];

const ELF_LAST_NAMES = [
	"Moonwhisper",
	"Silverleaf",
	"Starbloom",
	"Dawnweaver",
	"Nightvale",
	"Windrunner",
	"Brightwood",
	"Shadowglade",
	"Sunbranch",
	"Mistwalker",
	"Emberleaf",
	"Frostsong",
	"Greenbough",
	"Lightbrook",
	"Stormpetal",
	"Dreamthorn",
	"Skywarden",
	"Willowshade",
	"Goldensong",
	"Duskmantle",
];

const HALF_ORC_NAMES = [
	"Grosh",
	"Thrak",
	"Krova",
	"Durg",
	"Brakka",
	"Mogar",
	"Urza",
	"Grash",
	"Rokka",
	"Varg",
	"Drakka",
	"Kraz",
	"Zorga",
	"Brog",
	"Thura",
	"Gorak",
	"Murka",
	"Rug",
	"Vorga",
	"Drek",
];

const HALFLING_FIRST_NAMES = [
	"Pip",
	"Milo",
	"Tilly",
	"Bram",
	"Poppy",
	"Finn",
	"Rosie",
	"Tobin",
	"Nell",
	"Wally",
	"Daisy",
	"Benny",
	"Mabel",
	"Otis",
	"Lottie",
	"Perry",
	"Winnie",
	"Sammy",
	"Merry",
	"Hugo",
];

const HALFLING_LAST_NAMES = [
	"Bramblefoot",
	"Goodbarrel",
	"Underhill",
	"Honeybun",
	"Greenbottle",
	"Tealeaf",
	"Softstep",
	"Applebrook",
	"Thistletop",
	"Warmhearth",
	"Meadowhop",
	"Copperkettle",
	"Berryfield",
	"Quickwhistle",
	"Dewdrop",
	"Butterwick",
	"Mossbank",
	"Tumblebrook",
	"Proudfoot",
	"Willowby",
];

const HUMAN_FIRST_NAMES = [
	"Alden",
	"Mira",
	"Rowan",
	"Elara",
	"Cedric",
	"Lyra",
	"Gareth",
	"Freya",
	"Toren",
	"Isolde",
	"Bren",
	"Selene",
	"Dorian",
	"Kaia",
	"Edric",
	"Nora",
	"Lucan",
	"Vera",
	"Tristan",
	"Maeve",
];

const HUMAN_LAST_NAMES = [
	"Ashford",
	"Blackwood",
	"Brighton",
	"Dunwell",
	"Everhart",
	"Fairwind",
	"Greycastle",
	"Hawthorne",
	"Ironwood",
	"Kingsley",
	"Lightfoot",
	"Oakheart",
	"Ravencrest",
	"Redmont",
	"Silverbrook",
	"Stormwell",
	"Thornfield",
	"Westfall",
	"Wintermere",
	"Wolfhart",
];
