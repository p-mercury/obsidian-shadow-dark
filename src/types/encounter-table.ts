import {
	marshalRollRange,
	unmarshalRollRange,
	type RollRange,
} from "./roll-range";

export type EncounterTable = {
	title: string;
	dice: number;
	encounters: {
		id?: string;
		range: RollRange;
	}[];
};

export function marshalEncounterTable(encounterTable: EncounterTable): string {
	const serialized = {
		...encounterTable,
		encounters: encounterTable.encounters.map((encounter) => ({
			...encounter,
			range: marshalRollRange(encounter.range),
		})),
	};

	const blockId = encounterTable.title
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-");

	return [
		"```shadowdark-encounter-table",
		JSON.stringify(serialized, null, 2),
		"```",
		`^encounter-table-${blockId}`,
	].join("\n");
}

export function unmarshalEncounterTable(content: string) {
	const blockMatch = content.match(
		/```shadowdark-encounter-table\s*([\s\S]*?)```/,
	);
	const json = blockMatch?.[1]?.trim() ?? content.trim();
	try {
		const value = JSON.parse(json);
		return {
			...value,
			encounters: value.encounters.map((e: any) => ({
				...e,
				range: unmarshalRollRange(e.range),
			})),
		} as EncounterTable;
	} catch {
		throw new Error("Invalid PC JSON.");
	}
}
