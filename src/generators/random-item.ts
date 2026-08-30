import { getRandomArmor } from "./random-armor";
import { getRandomWeapon } from "./random-weapon";

export function getRandomItem() {
	const rand = Math.floor(Math.random() * 2);
	if (rand < 1) {
		return getRandomArmor();
	} else {
		return getRandomWeapon();
	}
}
