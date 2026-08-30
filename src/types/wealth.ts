export enum Wealth {
	POOR = "POOR",
	STANDARD = "STANDARD",
	WEALTHY = "WEALTHY",
	EXTRAVAGANT = "EXTRAVAGANT",
}

export function getWealthName(t: Wealth): string {
	switch (t) {
		case Wealth.POOR:
			return "Poor";
		case Wealth.STANDARD:
			return "Standard";
		case Wealth.WEALTHY:
			return "Wealthy";
		case Wealth.EXTRAVAGANT:
			return "Extravagant";
		default:
			return "Unknown";
	}
}
