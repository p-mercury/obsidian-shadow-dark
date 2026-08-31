import { Abundance } from "../types/abundance";
import { WEAPON_TYPES, type WeaponType } from "../types/weapon-type";

const WEIGHTS: Record<Abundance, number> = {
	[Abundance.SCARCE]: 1,
	[Abundance.COMMON]: 3,
	[Abundance.ABUNDANT]: 6,
};

export function getRandomWeapon(): WeaponType {
	const weighted = WEAPON_TYPES.flatMap((armor) =>
		Array(WEIGHTS[armor.abundance]).fill(armor),
	);
	return weighted[Math.floor(Math.random() * weighted.length)]!;
}
