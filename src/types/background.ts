export enum Background {
	URCHIN = "URCHIN",
	WANTED = "WANTED",
	CULT = "CULT",
	THIEVES = "THIEVES",
	BANISHED = "BANISHED",
	ORPHANED = "ORPHANED",
	WIZARD = "WIZARD",
	JEWELER = "JEWELER",
	HERBALIST = "HERBALIST",
	BARBARIAN = "BARBARIAN",
	MERCENARY = "MERCENARY",
	SAILOR = "SAILOR",
	ACOLYTE = "ACOLYTE",
	SOLDIER = "SOLDIER",
	RANGER = "RANGER",
	SCOUT = "SCOUT",
	MINSTREL = "MINSTREL",
	SCHOLAR = "SCHOLAR",
	NOBLE = "NOBLE",
	CHIRURGEON = "CHIRURGEON",
}

export function getBackgroundName(t: Background): string {
	switch (t) {
		case Background.URCHIN:
			return "Urchin";
		case Background.WANTED:
			return "Wanted";
		case Background.CULT:
			return "Cult";
		case Background.THIEVES:
			return "Thieves";
		case Background.BANISHED:
			return "Banished";
		case Background.ORPHANED:
			return "Orphaned";
		case Background.WIZARD:
			return "Wizard";
		case Background.JEWELER:
			return "Jeweler";
		case Background.HERBALIST:
			return "Herbalist";
		case Background.BARBARIAN:
			return "Barbarian";
		case Background.MERCENARY:
			return "Mercenary";
		case Background.SAILOR:
			return "Sailor";
		case Background.ACOLYTE:
			return "Acolyte";
		case Background.SOLDIER:
			return "Soldier";
		case Background.RANGER:
			return "Ranger";
		case Background.SCOUT:
			return "Scout";
		case Background.MINSTREL:
			return "Minstrel";
		case Background.SCHOLAR:
			return "Scholar";
		case Background.NOBLE:
			return "Noble";
		case Background.CHIRURGEON:
			return "Chirurgeon";
		default:
			return "Unknown";
	}
}
