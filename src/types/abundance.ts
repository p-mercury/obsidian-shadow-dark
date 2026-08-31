export enum Abundance {
	SCARCE = "SCARCE",
	COMMON = "COMMON",
	ABUNDANT = "ABUNDANT",
}

export function getAbundance(t: Abundance): string {
	switch (t) {
		case Abundance.SCARCE:
			return "Scarce";
		case Abundance.COMMON:
			return "Common";
		case Abundance.ABUNDANT:
			return "Abundant";
		default:
			return "Unknown";
	}
}
