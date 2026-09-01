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
	"Thordra",
	"Keldrin",
	"Brynja",
	"Bromrik",
	"Veldra",
	"Kharnum",
	"Orsina",
	"Thormek",
	"Thylda",
	"Grondar",
	"Mergrin",
	"Falkrum",
	"Bryndis",
	"Korrum",
	"Skalda",
	"Borgrim",
	"Helvara",
	"Durvek",
	"Korrina",
	"Thrainor",
];

const GOBLIN_NAMES = [
	"Grib",
	"Krizz",
	"Vrot",
	"Klegg",
	"Nibz",
	"Drub",
	"Skrit",
	"Boggo",
	"Zink",
	"Crunk",
	"Fizzle",
	"Razzik",
	"Glom",
	"Trikk",
	"Mugga",
	"Spork",
	"Noggit",
	"Brizz",
	"Yurk",
	"Klob",
];

const ELF_NAMES = [
	"Aeloria",
	"Caelith",
	"Thiravel",
	"Vaelora",
	"Orindel",
	"Sylrien",
	"Naevys",
	"Talorien",
	"Elowyn",
	"Sylorien",
	"Maerith",
	"Quinrael",
	"Saelira",
	"Aerendyl",
	"Velithor",
	"Liorael",
	"Nymeris",
	"Aerithen",
	"Ilyrana",
	"Zephyriel",
];

const HALF_ORC_NAMES = [
	"Ravka",
	"Ghoran",
	"Mazra",
	"Thokk",
	"Vesha",
	"Kargan",
	"Druska",
	"Vorak",
	"Kharza",
	"Grishna",
	"Keshra",
	"Morduk",
	"Graela",
	"Rokkar",
	"Urzha",
	"Thrag",
	"Velka",
	"Drogan",
	"Narsha",
	"Korzaan",
];

const HALFLING_NAMES = [
	"Clover",
	"Fennel",
	"Jasper",
	"Dottie",
	"Percy",
	"Nellie",
	"Bodkin",
	"Maisie",
	"Barnaby",
	"Juniper",
	"Roscoe",
	"Effie",
	"Wendel",
	"Posy",
	"Digby",
	"Marigold",
	"Oswin",
	"Petunia",
	"Rollo",
	"Primrose",
	"Wilby",
];

const HUMAN_NAMES = [
	"Kaelen",
	"Amara",
	"Evander",
	"Seraphine",
	"Osric",
	"Maelis",
	"Corwin",
	"Ysara",
	"Cassian",
	"Veyra",
	"Hadrian",
	"Lysandra",
	"Alistair",
	"Nerissa",
	"Garran",
	"Ismeria",
	"Leoric",
	"Tavira",
	"Orren",
	"Calista",
];
