export enum Occupation {
	GRAVEDIGGER = "GRAVEDIGGER",
	TAX_COLLECTOR = "TAX_COLLECTOR",
	BAKER = "BAKER",
	LOCKSMITH = "LOCKSMITH",
	CARPENTER = "CARPENTER",
	FARMER = "FARMER",
	COOK = "COOK",
	COBBLER = "COBBLER",
	SCHOLAR = "SCHOLAR",
	BARTENDER = "BARTENDER",
	SAILOR = "SAILOR",
	FRIAR_NUN = "FRIAR_NUN",
	BLACKSMITH = "BLACKSMITH",
	BEGGAR = "BEGGAR",
	BUTCHER = "BUTCHER",
	MERCHANT = "MERCHANT",
}

export function getOccupationName(t: Occupation): string {
	switch (t) {
		case Occupation.GRAVEDIGGER:
			return "Gravedigger";
		case Occupation.TAX_COLLECTOR:
			return "Tax Collector";
		case Occupation.BAKER:
			return "Baker";
		case Occupation.LOCKSMITH:
			return "Locksmith";
		case Occupation.CARPENTER:
			return "Carpenter";
		case Occupation.FARMER:
			return "Farmer";
		case Occupation.COOK:
			return "Cook";
		case Occupation.COBBLER:
			return "Cobbler";
		case Occupation.SCHOLAR:
			return "Scholar";
		case Occupation.BARTENDER:
			return "Bartender";
		case Occupation.SAILOR:
			return "Sailor";
		case Occupation.FRIAR_NUN:
			return "Friar Nun";
		case Occupation.BLACKSMITH:
			return "Blacksmith";
		case Occupation.BEGGAR:
			return "Beggar";
		case Occupation.BUTCHER:
			return "Butcher";
		case Occupation.MERCHANT:
			return "Merchant";
		default:
			return "Unknown";
	}
}
