import { Ancestry } from "../types/ancestry";

export function getRandomNpcName(ancestry: Ancestry) {
	switch (ancestry) {
		case Ancestry.DWARF:
			return DWARF_NAMES[Math.floor(Math.random() * DWARF_NAMES.length)]!;
		case Ancestry.GOBLIN:
			return GOBLIN_NAMES[Math.floor(Math.random() * GOBLIN_NAMES.length)]!;
		case Ancestry.ELF:
			return ELF_NAMES[Math.floor(Math.random() * ELF_NAMES.length)]!;
		case Ancestry.HALF_ORC:
			return HALF_ORC_NAMES[Math.floor(Math.random() * HALF_ORC_NAMES.length)]!;
		case Ancestry.HALFLING:
			return HALFLING_NAMES[Math.floor(Math.random() * HALFLING_NAMES.length)]!;
		case Ancestry.HUMAN:
			return HUMAN_NAMES[Math.floor(Math.random() * HUMAN_NAMES.length)]!;
	}
}

const DWARF_NAMES = [
	"Hera",
	"Torin",
	"Ginny",
	"Gant",
	"Olga",
	"Dendor",
	"Ygrid",
	"Pike",
	"Sarda",
	"Brigg",
	"Zorli",
	"Yorin",
	"Jorgena",
	"Trogin",
	"Riga",
	"Barton",
	"Katrina",
	"Egrim",
	"Elsa",
	"Orgo",
];

const GOBLIN_NAMES = [
	"Iggs",
	"Tark",
	"Nix",
	"Lenk",
	"Roke",
	"Fitz",
	"Tila",
	"Riggs",
	"Prim",
	"Zeb",
	"Finn",
	"Borg",
	"Yark",
	"Deeg",
	"Nibs",
	"Brak",
	"Fink",
	"Rizzo",
	"Squib",
	"Grix",
];

const ELF_NAMES = [
	"Sarenia",
	"Ravos",
	"Imeria",
	"Farond",
	"Isolden",
	"Kieren",
	"Mirenel",
	"Riarden",
	"Allindra",
	"Arlomas",
	"Sylara",
	"Tyr",
	"Rinariel",
	"Saramir",
	"Vedana",
	"Elindos",
	"Ophelia",
	"Cydaros",
	"Tiramel",
	"Varond",
];

const HALF_ORC_NAMES = [
	"Troga",
	"Boraal",
	"Urgana",
	"Zoraal",
	"Scalga",
	"Krell",
	"Voraga",
	"Morak",
	"Draga",
	"Sorak",
	"Varga",
	"Ulgar",
	"Jala",
	"Kresh",
	"Zana",
	"Torvash",
	"Rokara",
	"Gartak",
	"Iskana",
	"Ziraak",
];

const HALFLING_NAMES = [
	"Myrtle",
	"Robby",
	"Nora",
	"Percy",
	"Daisy",
	"Jolly",
	"Evelyn",
	"Horace",
	"Willie",
	"Gertie",
	"Peri",
	"Carlsby",
	"Nyx",
	"Kellan",
	"Fern",
	"Harlow",
	"Moira",
	"Sage",
	"Reenie",
	"Wendry",
];

const HUMAN_NAMES = [
	"Hesta",
	"Matteo",
	"Rosalin",
	"Endric",
	"Kiara",
	"Yao",
	"Corina",
	"Rowan",
	"Hariko",
	"Ikam",
	"Mariel",
	"Jin",
	"Hana",
	"Lios",
	"Indra",
	"Remy",
	"Nura",
	"Vakesh",
	"Una",
	"Nabilo",
];
