import type { Npc } from "../types/npc";
import { getStatModifier } from "../types/stat";
import { getRandomAge } from "./random-age";
import { getRandomAlignment } from "./random-alignment";
import { getRandomAncestry } from "./random-ancestry";
import { getRandomNpcName } from "./random-npc-name";
import { getRandomOccupation } from "./random-occupation";
import { getRandomStat } from "./random-stat";
import { getRandomWealth } from "./random-wealth";

export function getRandomNpc(): Npc {
	const ancestry = getRandomAncestry();

	const stats = {
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	};
	while (!Object.values(stats).find((i) => i > 13)) {
		stats.strength = getRandomStat();
		stats.dexterity = getRandomStat();
		stats.constitution = getRandomStat();
		stats.intelligence = getRandomStat();
		stats.wisdom = getRandomStat();
		stats.charisma = getRandomStat();
	}

	return {
		name: getRandomNpcName(ancestry),
		ancestry: ancestry,
		occupation: getRandomOccupation(),
		age: getRandomAge(),
		alignment: getRandomAlignment(),
		wealth: getRandomWealth(),

		hitPoints: Math.max(1, getStatModifier(stats.constitution)),
		stats,
	};
}
