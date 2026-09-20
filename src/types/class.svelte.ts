import type { ModifiedDiceRoll } from "./modified-dice-roll";
import JSON5 from "json5";

export interface ClassData {
	id: string;
	name: string;
	description: string;
	hitPoints: ModifiedDiceRoll;
}

export class Class {
	id: string;
	name: string;
	description: string;
	hitPoints: ModifiedDiceRoll;

	constructor(data: ClassData) {
		this.id = $state(data.id);
		this.name = $state(data.name);
		this.description = $state(data.description);
		this.hitPoints = $state(data.hitPoints);
	}

	get snapshot(): ClassData {
		return {
			id: $state.snapshot(this.id),
			name: $state.snapshot(this.name),
			description: $state.snapshot(this.description),
			hitPoints: $state.snapshot(this.hitPoints),
		};
	}

	marshal() {
		return [
			"```shadowdark-class",
			JSON5.stringify(this.snapshot, null, 2),
			"```",
			`^shadowdark-class-${this.id}`,
		].join("\n");
	}

	static unmarshal(content: string) {
		const blockMatch = content.match(/```shadowdark-item\s*([\s\S]*?)```/);
		const json = blockMatch?.[1]?.trim() ?? content.trim();
		try {
			return new Class(JSON5.parse(json) as ClassData);
		} catch {
			throw new Error("Invalid Item JSON.");
		}
	}
}
