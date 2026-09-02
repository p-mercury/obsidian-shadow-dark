import { type DiceRoll } from "./dice-roll";

export interface ClassData {
	id: string;
	name: string;
	description: string;
	hitPoints: DiceRoll;
}

export class Class {
	id: string;
	name: string;
	description: string;
	hitPoints: DiceRoll;

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
			JSON.stringify(this.snapshot, null, 2),
			"```",
			`^shadowdark-class-${this.id}`,
		].join("\n");
	}

	static unmarshal(content: string) {
		const blockMatch = content.match(/```shadowdark-item\s*([\s\S]*?)```/);
		const json = blockMatch?.[1]?.trim() ?? content.trim();
		try {
			return new Class(JSON.parse(json) as ClassData);
		} catch {
			throw new Error("Invalid Item JSON.");
		}
	}
}
