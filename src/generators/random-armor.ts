import { Abundance } from "../types/abundance";
import { ARMOR_TYPES, type ArmorType } from "../types/armor-type";

const WEIGHTS: Record<Abundance, number> = {
	[Abundance.SCARCE]: 1,
	[Abundance.COMMON]: 3,
	[Abundance.ABUNDANT]: 6,
};

export function getRandomArmor(): ArmorType {
	const weighted = ARMOR_TYPES.flatMap((armor) =>
		Array(WEIGHTS[armor.abundance]).fill(armor),
	);
	return weighted[Math.floor(Math.random() * weighted.length)]!;
}
