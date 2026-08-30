export enum StatType {
	STRENGTH = "STRENGTH",
	DEXTERITY = "DEXTERITY",
	CONSTITUTION = "CONSTITUTION",
	INTELLIGENCE = "INTELLIGENCE",
	WISDOM = "WISDOM",
	CHARISMA = "CHARISMA",
}

export function getStatTypeName(t: StatType): string {
	switch (t) {
		case StatType.STRENGTH:
			return "Strength";
		case StatType.DEXTERITY:
			return "Dexterity";
		case StatType.CONSTITUTION:
			return "Constitution";
		case StatType.INTELLIGENCE:
			return "Intelligence";
		case StatType.WISDOM:
			return "Wisdom";
		case StatType.CHARISMA:
			return "Charisma";
		default:
			return "Unknown";
	}
}
