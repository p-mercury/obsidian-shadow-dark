export function getRandomOccupation(allowedValues?: readonly string[]) {
	const occupations = allowedValues?.length
		? allowedValues
		: FANTASY_OCCUPATIONS;
	return occupations[Math.floor(Math.random() * occupations.length)]!;
}

const FANTASY_OCCUPATIONS = [
	"Blacksmith",
	"Farmer",
	"Guard",
	"Merchant",
	"Innkeeper",
	"Hunter",
	"Fisher",
	"Miner",
	"Baker",
	"Cook",
	"Healer",
	"Herbalist",
	"Alchemist",
	"Bard",
	"Scribe",
	"Tailor",
	"Carpenter",
	"Sailor",
	"Soldier",
	"Stablemaster",
];
