import { Alignment } from "./alignment";
import { Level } from "./level";
import {
	executeRoll,
	marshalModifiedDiceRoll,
	unmarshalModifiedDiceRoll,
	type ModifiedDiceRoll,
} from "./modified-dice-roll";
import { MonsterInstance } from "./monster-instance.svelte";
import { Range } from "./range";
import JSON5 from "json5";

export interface MonsterData {
	id: string;
	image?: string;
	name: string;
	description: string;
	level: Level;
	alignment: Alignment;
	movement: Range;
	hitPoints: ModifiedDiceRoll;
	armorClass: number;
	actions: string[];
	attributes: { name: string; description: string }[];
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
	hitPoints: ModifiedDiceRoll;
	private _armorClass: number;
	actions: string[];
	attributes: { name: string; description: string }[];
	stats: MonsterData["stats"];

	constructor(data: MonsterData) {
		this.id = data.id;
		this.image = $state(data.image);
		this.name = $state(data.name);
		this.description = $state(data.description);
		this.level = $state(data.level);
		this.alignment = $state(data.alignment);
		this.movement = $state(data.movement);
		this.hitPoints = $state(data.hitPoints);
		this._armorClass = $state(Math.round(data.armorClass));
		this.actions = $state(data.actions);
		this.attributes = $state(data.attributes);
		this.stats = $state({ ...data.stats });
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
			hitPoints: $state.snapshot(this.hitPoints),
			armorClass: $state.snapshot(this._armorClass),
			actions: $state.snapshot(this.actions),
			attributes: $state.snapshot(this.attributes),
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

		const hitPoints = executeRoll(snapshot.hitPoints);

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
			actions: snapshot.actions,
			attributes: snapshot.attributes,
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
			JSON5.stringify(
				{
					...snapshot,
					hitPoints: marshalModifiedDiceRoll(snapshot.hitPoints),
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
			const data = JSON5.parse(blockMatch?.[1]?.trim() ?? content.trim());

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

			let hitPoints: ModifiedDiceRoll = unmarshalModifiedDiceRoll(
				data?.hitPoints,
			);

			let armorClass: number = 0;
			if (typeof data?.armorClass === "number") {
				armorClass = data.armorClass;
			}

			let actions: string[] = [];
			if ("actions" in data && Array.isArray(data.actions)) {
				data.actions.forEach((a: any) => {
					if (typeof a !== "string") return;
					actions.push(a);
				});
			}

			let attributes: MonsterData["attributes"] = [];
			if ("attributes" in data && Array.isArray(data.attributes)) {
				data.attributes.forEach((a: any) => {
					if (typeof a !== "object") return;
					if (typeof a.name !== "string") return;
					if (typeof a.description !== "string") return;
					attributes.push({ name: a.name, description: a.description });
				});
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
				actions,
				attributes,
				stats,
			});
		} catch {
			throw new Error("Invalid PC JSON.");
		}
	}
}
