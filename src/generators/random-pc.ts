import type { Pc } from "../types/pc";
import { getStatModifier } from "../types/stat";
import { getRandomAlignment } from "./random-alignment";
import { getRandomAncestry } from "./random-ancestry";
import { getRandomBackground } from "./random-background";
import { getRandomPcName } from "./random-pc-name";
import { getRandomStat } from "./random-stat";

export function getRandomPc(): Pc {
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
		name: getRandomPcName(ancestry),
		background: getRandomBackground(),
		ancestry: ancestry,
		alignment: getRandomAlignment(),

		hitPoints: Math.max(1, getStatModifier(stats.constitution)),
		stats,
	};
}
