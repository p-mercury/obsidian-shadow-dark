import type { Npc } from "../types/npc";
import { getRandomAge } from "./random-age";
import { getRandomAlignment } from "./random-alignment";
import { getRandomAncestry } from "./random-ancestry";
import { getRandomNpcName } from "./random-npc-name";
import { getRandomOccupation } from "./random-occupation";
import { getRandomWealth } from "./random-wealth";

export function getRandomNpc(): Npc {
	const ancestry = getRandomAncestry();
	return {
		name: getRandomNpcName(ancestry),
		ancestry: ancestry,
		occupation: getRandomOccupation(),
		age: getRandomAge(),
		alignment: getRandomAlignment(),
		wealth: getRandomWealth(),
	};
}
