import { Ancestry } from "../types/ancestry";

export function getRandomPcName(ancestry: Ancestry) {
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
	"Hilde",
	"Torbin",
	"Marga",
	"Bruno",
	"Karina",
	"Naugrim",
	"Brenna",
	"Darvin",
	"Elga",
	"Alric",
	"Isolde",
	"Gendry",
	"Bruga",
	"Junnor",
	"Vidrid",
	"Torson",
	"Brielle",
	"Ulfgar",
	"Sarna",
	"Grimm",
];

const GOBLIN_NAMES = [
	"Kog",
	"Dibbs",
	"Fronk",
	"Irv",
	"Squag",
	"Mort",
	"Vig",
	"Sticks",
	"Gorb",
	"Yogg",
	"Plok",
	"Zrak",
	"Dent",
	"Krik",
	"Mizzo",
	"Bort",
	"Nabo",
	"Hink",
	"Bree",
	"Kreeb",
];

const ELF_NAMES = [
	"Eliara",
	"Ryarn",
	"Sariel",
	"Tirolas",
	"Galira",
	"Varos",
	"Daeniel",
	"Axidor",
	"Hiralia",
	"Cyrwin",
	"Lothiel",
	"Zaphiel",
	"Nayra",
	"Ithior",
	"Amriel",
	"Elyon",
	"Jirwyn",
	"Natinel",
	"Fiora",
	"Ruhiel",
];

const HALF_ORC_NAMES = [
	"Vara",
	"Gralk",
	"Ranna",
	"Korv",
	"Zasha",
	"Hrogar",
	"Klara",
	"Tragan",
	"Brolga",
	"Drago",
	"Yelena",
	"Krull",
	"Ulara",
	"Tulk",
	"Shiraal",
	"Wulf",
	"Ivara",
	"Hirok",
	"Aja",
	"Zoraan",
];

const HALFLING_NAMES = [
	"Willow",
	"Benny",
	"Annie",
	"Tucker",
	"Marie",
	"Hobb",
	"Cora",
	"Gordie",
	"Rose",
	"Ardo",
	"Alma",
	"Norbert",
	"Jennie",
	"Barvin",
	"Tilly",
	"Pike",
	"Lydia",
	"Marlow",
	"Astrid",
	"Jasper",
	" ",
];

const HUMAN_NAMES = [
	"Zali",
	"Bram",
	"Clara",
	"Nattias",
	"Rina",
	"Denton",
	"Mirena",
	"Aran",
	"Morgan",
	"Giralt",
	"Tamra",
	"Oscar",
	"Ishana",
	"Rogar",
	"Jasmin",
	"Tarin",
	"Yuri",
	"Malchor",
	"Lienna",
	"Godfrey",
];
