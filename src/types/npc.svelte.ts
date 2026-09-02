import { getRandomAge } from "../generators/random-age";
import { getRandomAlignment } from "../generators/random-alignment";
import { getRandomAncestry } from "../generators/random-ancestry";
import { getRandomLevel } from "../generators/random-level";
import { getRandomNpcName } from "../generators/random-npc-name";
import { getRandomOccupation } from "../generators/random-occupation";
import { getRandomStat } from "../generators/random-stat";
import { getRandomWealth } from "../generators/random-wealth";
import { Age } from "./age";
import { Alignment } from "./alignment";
import { Ancestry } from "./ancestry";
import type { Class } from "./class.svelte";
import { Level } from "./level";
import { getStatModifier } from "./stat";
import { Wealth } from "./wealth";

export interface NpcData {
	name: string;
	level: Level;
	ancestry: Ancestry;
	class?: Class;
	occupation: string;
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
	levels?: Level[];
	ancestries?: Ancestry[];
	classes?: Class[];
	occupations?: string[];
	ages?: Age[];
	alignments?: Alignment[];
	wealths?: Wealth[];
}

export class Npc {
	name: string;
	level: Level;
	ancestry: Ancestry;
	class?: Class;
	occupation: string;
	age: Age;
	alignment: Alignment;
	wealth: Wealth;
	maxHitPoints: number;
	hitPoints: number;
	stats: NpcData["stats"];

	constructor(data: NpcData) {
		this.name = $state(data.name);
		this.level = $state(data.level);
		this.ancestry = $state(data.ancestry);
		this.occupation = $state(data.occupation);
		this.age = $state(data.age);
		this.alignment = $state(data.alignment);
		this.wealth = $state(data.wealth);
		this.maxHitPoints = $state(data.maxHitPoints);
		this.hitPoints = $state(data.hitPoints);
		this.stats = $state({ ...data.stats });

		if (this.level > 0) {
			this.class = data.class;
		}
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

		let clas: Class | undefined = undefined;
		if (props?.classes && props.classes.length > 0) {
			clas = props.classes[Math.floor(Math.random() * props.classes.length)]!;
		}

		let level = Level.ZERO;
		if (clas) {
			level = getRandomLevel(props?.levels);
		}

		return new Npc({
			name: getRandomNpcName(ancestry),
			level,
			ancestry,
			class: clas,
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
			level: $state.snapshot(this.level),
			ancestry: $state.snapshot(this.ancestry),
			class: this.class,
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
		const snapshot = this.snapshot;

		return [
			"```shadowdark-npc",
			JSON.stringify(
				{
					...snapshot,
					class: snapshot.class?.id,
				},
				null,
				2,
			),
			"```",
			`^npc-${this.name.toLowerCase().replace(/\s+/g, "-")}`,
		].join("\n");
	}

	static unmarshal(content: string, classes: Record<string, Class>): Npc {
		const blockMatch = content.match(/```shadowdark-npc\s*([\s\S]*?)```/);
		const json = blockMatch?.[1]?.trim() ?? content.trim();
		try {
			const value = JSON.parse(json);
			return new Npc({ ...value, class: classes[value.class] });
		} catch {
			throw new Error("Invalid NPC JSON.");
		}
	}
}
