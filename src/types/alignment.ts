export enum Alignment {
	LAWFUL = "LAWFUL",
	NEUTRAL = "NEUTRAL",
	CHAOTIC = "CHAOTIC",
}

export function getAlignmentName(t: Alignment): string {
	switch (t) {
		case Alignment.LAWFUL:
			return "Lawful";
		case Alignment.NEUTRAL:
			return "Neutral";
		case Alignment.CHAOTIC:
			return "Chaotic";
		default:
			return "Unknown";
	}
}
