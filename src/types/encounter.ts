import {
	marshalModifiedDiceRoll,
	unmarshalModifiedDiceRoll,
	type ModifiedDiceRoll,
} from "./modified-dice-roll";
import JSON5 from "json5";

export type Encounter = {
	title: string;
	description?: string;
	monsters?: {
		id: string;
		quantity: ModifiedDiceRoll;
	}[];
};

export function marshalEncounter(encounter: Encounter): string {
	const serialized = {
		...encounter,
		monsters: encounter.monsters?.map((m) => ({
			...m,
			quantity: marshalModifiedDiceRoll(m.quantity),
		})),
	};

	return [
		"```shadowdark-encounter",
		JSON5.stringify(serialized, null, 2),
		"```",
	].join("\n");
}

export function unmarshalEncounter(content: string) {
	let data: any;
	try {
		const blockMatch = content.match(/```shadowdark-encounter\s*([\s\S]*?)```/);
		data = JSON5.parse(blockMatch?.[1]?.trim() ?? content.trim());
	} catch {
		throw new Error("Invalid JSON");
	}

	if ("title" in data) throw Error("Missing encounter title");
	if (typeof data.title !== "string") throw Error("Invalid encounter title");

	if (!("description" in data) || typeof data.description !== "string")
		throw Error("Invalid encounter description");

	if (!("monsters" in data) || !Array.isArray(data.monsters))
		throw Error("Invalid encounter monsters");

	return {
		title: data.title,
		description: data.description,
		monsters: data.monsters?.length
			? data.monsters?.map((m: any) => ({
					id: m.id,
					quantity: unmarshalModifiedDiceRoll(m.quantity || 1),
				}))
			: undefined,
	} as Encounter;
}
