export enum Ancestry {
	DWARF = "DWARF",
	GOBLIN = "GOBLIN",
	ELF = "ELF",
	HALF_ORC = "HALF_ORC",
	HALFLING = "HALFLING",
	HUMAN = "HUMAN",
}

export function getAncestryName(t: Ancestry): string {
	switch (t) {
		case Ancestry.DWARF:
			return "Dwarf";
		case Ancestry.GOBLIN:
			return "Goblin";
		case Ancestry.ELF:
			return "Elf";
		case Ancestry.HALF_ORC:
			return "Half Orc";
		case Ancestry.HALFLING:
			return "Halfling";
		case Ancestry.HUMAN:
			return "Human";
		default:
			return "Unknown";
	}
}
