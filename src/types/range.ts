export enum Range {
	CLOSE = "CLOSE",
	NEAR = "NEAR",
	FAR = "FAR",
}

export function getRangeName(t: Range): string {
	switch (t) {
		case Range.CLOSE:
			return "Close";
		case Range.NEAR:
			return "Near";
		case Range.FAR:
			return "Far";
		default:
			return "Unknown";
	}
}
