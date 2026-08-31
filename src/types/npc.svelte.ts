import { getRandomAge } from "../generators/random-age";
import { getRandomAlignment } from "../generators/random-alignment";
import { getRandomAncestry } from "../generators/random-ancestry";
import { getRandomNpcName } from "../generators/random-npc-name";
import { getRandomOccupation } from "../generators/random-occupation";
import { getRandomStat } from "../generators/random-stat";
import { getRandomWealth } from "../generators/random-wealth";
import { Age } from "./age";
import { Alignment } from "./alignment";
import { Ancestry } from "./ancestry";
import { Occupation } from "./occupation";
import { getStatModifier } from "./stat";
import { Wealth } from "./wealth";

export interface NpcData {
	name: string;
	ancestry: Ancestry;
	occupation: Occupation;
	age: Age;
	alignment: Alignment;
	wealth: Wealth;
	maxHitPoints: number;
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

export interface RandomNpcProps {
	ancestries?: Ancestry[];
	occupations?: Occupation[];
	ages?: Age[];
	alignments?: Alignment[];
	wealths?: Wealth[];
}

export class Npc {
	name: string;
	ancestry: Ancestry;
	occupation: Occupation;
	age: Age;
	alignment: Alignment;
	wealth: Wealth;
	maxHitPoints: number;
	hitPoints: number;
	stats: NpcData["stats"];

	constructor(data: NpcData) {
		this.name = $state(data.name);
		this.ancestry = $state(data.ancestry);
		this.occupation = $state(data.occupation);
		this.age = $state(data.age);
		this.alignment = $state(data.alignment);
		this.wealth = $state(data.wealth);
		this.maxHitPoints = $state(data.maxHitPoints);
		this.hitPoints = $state(data.hitPoints);
		this.stats = $state({ ...data.stats });
	}

	static random(props?: RandomNpcProps): Npc {
		const ancestry = getRandomAncestry(props?.ancestries);

		let stats: NpcData["stats"];

		do {
			stats = {
				strength: getRandomStat(),
				dexterity: getRandomStat(),
				constitution: getRandomStat(),
				intelligence: getRandomStat(),
				wisdom: getRandomStat(),
				charisma: getRandomStat(),
			};
		} while (!Object.values(stats).some((score) => score > 13));

		const maxHitPoints = Math.max(1, getStatModifier(stats.constitution));

		return new Npc({
			name: getRandomNpcName(ancestry),
			ancestry,
			occupation: getRandomOccupation(props?.occupations),
			age: getRandomAge(props?.ages),
			alignment: getRandomAlignment(props?.alignments),
			wealth: getRandomWealth(props?.wealths),
			stats,
			maxHitPoints,
			hitPoints: maxHitPoints,
		});
	}

	get armorClass(): number {
		return 10 + getStatModifier(this.stats.dexterity);
	}

	get snapshot(): NpcData {
		return {
			name: $state.snapshot(this.name),
			ancestry: $state.snapshot(this.ancestry),
			occupation: $state.snapshot(this.occupation),
			age: $state.snapshot(this.age),
			alignment: $state.snapshot(this.alignment),
			wealth: $state.snapshot(this.wealth),
			maxHitPoints: $state.snapshot(this.maxHitPoints),
			hitPoints: $state.snapshot(this.hitPoints),
			stats: {
				strength: $state.snapshot(this.stats.strength),
				dexterity: $state.snapshot(this.stats.dexterity),
				constitution: $state.snapshot(this.stats.constitution),
				intelligence: $state.snapshot(this.stats.intelligence),
				wisdom: $state.snapshot(this.stats.wisdom),
				charisma: $state.snapshot(this.stats.charisma),
			},
		};
	}

	marshal() {
		return [
			"```shadowdark-npc",
			JSON.stringify(this.snapshot, null, 2),
			"```",
			`^npc-${this.name}`,
		].join("\n");
	}
}

export function unmarshalNpc(content: string): Npc {
	const blockMatch = content.match(/```shadowdark-npc\s*([\s\S]*?)```/);
	const json = blockMatch?.[1]?.trim() ?? content.trim();
	try {
		return new Npc(JSON.parse(json) as NpcData);
	} catch {
		throw new Error("Invalid NPC JSON.");
	}
}
