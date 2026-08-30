import { WEAPON_TYPES } from "../types/weapon-type";

export function getRandomWeapon() {
	return WEAPON_TYPES[Math.floor(Math.random() * WEAPON_TYPES.length)]!;
}
