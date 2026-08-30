export enum Age {
	ADOLESCENT = "ADOLESCENT",
	YOUNG_ADULT = "YOUNG_ADULT",
	ADULT = "ADULT",
	MIDDLE_AGED = "MIDDLE_AGED",
	ELDERLY = "ELDERLY",
	ANCIENT = "ANCIENT",
}

export function getAgeName(t: Age): string {
	switch (t) {
		case Age.ADOLESCENT:
			return "Adolescent";
		case Age.YOUNG_ADULT:
			return "Young Adult";
		case Age.ADULT:
			return "Adult";
		case Age.MIDDLE_AGED:
			return "Middle Aged";
		case Age.ELDERLY:
			return "Elderly";
		case Age.ANCIENT:
			return "Ancient";
		default:
			return "Unknown";
	}
}
