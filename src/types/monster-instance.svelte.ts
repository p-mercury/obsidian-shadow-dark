import { Alignment } from "./alignment";
import { Level } from "./level";
import type { Range } from "./range";
import JSON5 from "json5";

export interface MonsterInstanceData {
	id: string;
	name: string;
	description: string;
	level: Level;
	alignment: Alignment;
	movement: Range;
	maxHitPoints: number;
	hitPoints: number;
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

export interface RandomMonsterInstanceProps {
	ids?: string[];
}

export class MonsterInstance {
	readonly id: string;
	name: string;
	description: string;
	level: Level;
	alignment: Alignment;
	movement: Range;
	private _maxHitPoints: number;
	private _hitPoints: number;
	private _armorClass: number;
	actions: string[];
	attributes: { name: string; description: string }[];
	stats: MonsterInstanceData["stats"];

	constructor(data: MonsterInstanceData) {
		this.id = data.id;
		this.name = $state(data.name);
		this.description = $state(data.description);
		this.level = $state(data.level);
		this.alignment = $state(data.alignment);
		this.movement = $state(data.movement);
		this._maxHitPoints = $state(Math.round(data.maxHitPoints));
		this._hitPoints = $state(Math.round(data.hitPoints));
		this._armorClass = $state(Math.round(data.armorClass));
		this.actions = $state(data.actions);
		this.attributes = $state(data.attributes);
		this.stats = $state({ ...data.stats });
	}

	get maxHitPoints() {
		return this._maxHitPoints;
	}

	set maxHitPoints(v: number) {
		this._maxHitPoints = Math.round(v);
	}

	get hitPoints() {
		return this._hitPoints;
	}

	set hitPoints(v: number) {
		this._hitPoints = Math.round(v);
	}

	get armorClass() {
		return this._armorClass;
	}

	set armorClass(v: number) {
		this._armorClass = Math.round(v);
	}

	get snapshot(): MonsterInstanceData {
		return {
			id: this.id,
			name: $state.snapshot(this.name),
			description: $state.snapshot(this.description),
			level: $state.snapshot(this.level),
			alignment: $state.snapshot(this.alignment),
			movement: $state.snapshot(this.movement),
			maxHitPoints: $state.snapshot(this._maxHitPoints),
			hitPoints: $state.snapshot(this._hitPoints),
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

	marshal() {
		return [
			"```shadowdark-monster-instance",
			JSON.stringify(this.snapshot, null, 2),
			"```",
		].join("\n");
	}

	static unmarshal(content: string): MonsterInstance {
		const blockMatch = content.match(
			/```shadowdark-monster-instance\s*([\s\S]*?)```/,
		);
		const json = blockMatch?.[1]?.trim() ?? content.trim();
		try {
			const value = JSON5.parse(json);
			return new MonsterInstance(value);
		} catch {
			throw new Error("Invalid NPC JSON.");
		}
	}
}
