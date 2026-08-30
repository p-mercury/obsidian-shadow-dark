import { ARMOR_TYPES } from "../types/gear-type";

export function getRandomArmor() {
	return ARMOR_TYPES[Math.floor(Math.random() * ARMOR_TYPES.length)]!;
}
