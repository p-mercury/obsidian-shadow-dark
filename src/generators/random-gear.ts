import { Abundance } from "../types/abundance";
import { GEAR_TYPES, type GearType } from "../types/gear-type";

const WEIGHTS: Record<Abundance, number> = {
	[Abundance.SCARCE]: 1,
	[Abundance.COMMON]: 3,
	[Abundance.ABUNDANT]: 6,
};

export function getRandomGear(): GearType {
	const weighted = GEAR_TYPES.flatMap((armor) =>
		Array(WEIGHTS[armor.abundance]).fill(armor),
	);
	return weighted[Math.floor(Math.random() * weighted.length)]!;
}
