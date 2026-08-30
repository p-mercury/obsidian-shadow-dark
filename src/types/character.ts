import { Ancestry } from "./ancestry";
import { Background } from "./background";

export interface Character {
	name: string;
	background: Background;
	ancestry: Ancestry;

	hitPoints: number;

	stats: {
		strength: number;
		dexterity: number;
		constitution: number;
		intelligence: number;
		wisdom: number;
		charisma: number;
	};
}
