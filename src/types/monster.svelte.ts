import { Alignment } from "./alignment";
import {
	executeDiceRoll,
	marshalDiceRoll,
	unmarshalDiceRoll,
	type DiceRoll,
} from "./dice-roll";
import { Level } from "./level";
import { MonsterInstance } from "./monster-instance.svelte";
import { Range } from "./range";

export interface MonsterData {
	id: string;
	image?: string;
	name: string;
	description: string;
	level: Level;
	alignment: Alignment;
	movement: Range;
	hitPoints: number | DiceRoll;
	armorClass: number;
	attacks: string[];
	stats: {
		strength: number;
		dexterity: number;
		constitution: number;
		intelligence: number;
		wisdom: number;
		charisma: number;
	};
}

export interface RandomMonsterProps {
	ids?: string[];
}

export class Monster {
	readonly id: string;
	image: string | undefined;
	name: string;
	description: string;
	level: Level;
	alignment: Alignment;
	movement: Range;
	_hitPoints: number | DiceRoll;
	private _armorClass: number;
	attacks: string[];
	stats: MonsterData["stats"];

	constructor(data: MonsterData) {
		this.id = data.id;
		this.image = $state(data.image);
		this.name = $state(data.name);
		this.description = $state(data.description);
		this.level = $state(data.level);
		this.alignment = $state(data.alignment);
		this.movement = $state(data.movement);
		this._hitPoints = $state(
			typeof data.hitPoints === "number"
				? Math.round(data.hitPoints)
				: data.hitPoints,
		);
		this._armorClass = $state(Math.round(data.armorClass));
		this.attacks = $state(data.attacks);
		this.stats = $state({ ...data.stats });
	}

	get hitPoints() {
		return this._hitPoints;
	}

	set hitPoints(v: number | DiceRoll) {
		this._hitPoints = typeof v === "number" ? Math.round(v) : v;
	}

	get armorClass() {
		return this._armorClass;
	}

	set armorClass(v: number) {
		this._armorClass = Math.round(v);
	}

	get snapshot(): MonsterData {
		return {
			id: this.id,
			image: $state.snapshot(this.image),
			name: $state.snapshot(this.name),
			description: $state.snapshot(this.description),
			level: $state.snapshot(this.level),
			alignment: $state.snapshot(this.alignment),
			movement: $state.snapshot(this.movement),
			hitPoints: $state.snapshot(this._hitPoints),
			armorClass: $state.snapshot(this._armorClass),
			attacks: $state.snapshot(this.attacks),
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

	get instance(): MonsterInstance {
		const snapshot = this.snapshot;

		const hitPoints =
			typeof snapshot.hitPoints === "number"
				? snapshot.hitPoints
				: executeDiceRoll(snapshot.hitPoints);

		return new MonsterInstance({
			id: snapshot.id,
			name: snapshot.name,
			description: snapshot.description,
			level: snapshot.level,
			alignment: snapshot.alignment,
			movement: snapshot.movement,
			maxHitPoints: hitPoints,
			hitPoints,
			armorClass: snapshot.armorClass,
			attacks: snapshot.attacks,
			stats: {
				strength: $state.snapshot(this.stats.strength),
				dexterity: $state.snapshot(this.stats.dexterity),
				constitution: $state.snapshot(this.stats.constitution),
				intelligence: $state.snapshot(this.stats.intelligence),
				wisdom: $state.snapshot(this.stats.wisdom),
				charisma: $state.snapshot(this.stats.charisma),
			},
		});
	}

	marshal() {
		const snapshot = this.snapshot;
		return [
			"```shadowdark-monster",
			JSON.stringify(
				{
					...snapshot,
					hitPoints:
						typeof snapshot.hitPoints === "number"
							? snapshot.hitPoints
							: marshalDiceRoll(snapshot.hitPoints),
				},
				null,
				2,
			),
			"```",
		].join("\n");
	}

	static unmarshal(content: string): Monster {
		const blockMatch = content.match(/```shadowdark-monster\s*([\s\S]*?)```/);
		try {
			const data = JSON.parse(blockMatch?.[1]?.trim() ?? content.trim());

			let id = "";
			if (typeof data?.id === "string") {
				id = data.id.trim();
			}

			let name = "";
			if (typeof data?.name === "string") {
				name = data.name.trim();
			}

			let description = "";
			if (typeof data?.description === "string") {
				description = data.description.trim();
			}

			let level = Level.ZERO;
			if (typeof data?.level === "number") {
				level = data.level;
			}

			let alignment = Alignment.NEUTRAL;
			if (typeof data?.alignment === "string") {
				alignment = data.alignment;
			}

			let movement = Range.CLOSE;
			if (typeof data?.movement === "string") {
				movement = data.movement;
			}

			let hitPoints: number | DiceRoll = 1;
			if (typeof data?.hitPoints === "number") {
				hitPoints = data.hitPoints;
			} else if (typeof data?.hitPoints === "string") {
				hitPoints = unmarshalDiceRoll(data?.hitPoints);
			}

			let armorClass: number = 0;
			if (typeof data?.armorClass === "number") {
				armorClass = data.armorClass;
			}

			let attacks: string[] = [];
			if ("attacks" in data && Array.isArray(data.attacks)) {
				attacks = data.attacks;
			}

			let stats = {
				strength: 1,
				dexterity: 1,
				constitution: 1,
				intelligence: 1,
				wisdom: 1,
				charisma: 1,
			};
			if (typeof data?.stats === "object") {
				if (typeof data.stats.strength === "number") {
					stats.strength = data.stats.strength;
				}
				if (typeof data.stats.dexterity === "number") {
					stats.dexterity = data.stats.dexterity;
				}
				if (typeof data.stats.constitution === "number") {
					stats.constitution = data.stats.constitution;
				}
				if (typeof data.stats.intelligence === "number") {
					stats.intelligence = data.stats.intelligence;
				}
				if (typeof data.stats.wisdom === "number") {
					stats.wisdom = data.stats.wisdom;
				}
				if (typeof data.stats.charisma === "number") {
					stats.charisma = data.stats.charisma;
				}
			}

			return new Monster({
				id,
				name,
				description,
				level,
				alignment,
				movement,
				hitPoints,
				armorClass,
				attacks,
				stats,
			});
		} catch {
			throw new Error("Invalid PC JSON.");
		}
	}
}
