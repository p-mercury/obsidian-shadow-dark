import type { Pc } from "../types/pc";
import { getRandomAlignment } from "./random-alignment";
import { getRandomAncestry } from "./random-ancestry";
import { getRandomBackground } from "./random-background";
import { getRandomPcName } from "./random-pc-name";

export function getRandomPc(): Pc {
	const ancestry = getRandomAncestry();
	return {
		name: getRandomPcName(ancestry),
		background: getRandomBackground(),
		ancestry: ancestry,
		alignment: getRandomAlignment(),

		hitPoints: 1,

		stats: {
			strength: 1,
			dexterity: 2,
			constitution: 3,
			intelligence: 4,
			wisdom: 5,
			charisma: 6,
		},
	};
}
