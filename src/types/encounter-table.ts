import { marshalDiceRoll, unmarshalDiceRoll, type DiceRoll } from "./dice-roll";
import type { Encounter } from "./encounter";
import {
	getMaxRoll,
	marshalModifiedDiceRoll,
	unmarshalModifiedDiceRoll,
} from "./modified-dice-roll";
import {
	marshalRollRange,
	unmarshalRollRange,
	type RollRange,
} from "./roll-range";
import JSON5 from "json5";

export type EncounterTable = {
	title: string;
	roll: DiceRoll;
	encounters: (Encounter & {
		range: RollRange;
	})[];
};

export function marshalEncounterTable(encounterTable: EncounterTable): string {
	const serialized = {
		...encounterTable,
		roll: marshalDiceRoll(encounterTable.roll),
		encounters: encounterTable.encounters.map((encounter) => ({
			...encounter,
			range: marshalRollRange(encounter.range),
			monsters: encounter.monsters?.map((m) => ({
				...m,
				quantity: marshalModifiedDiceRoll(m.quantity),
			})),
		})),
	};

	return [
		"```shadowdark-encounter-table",
		JSON.stringify(serialized, null, 2),
		"```",
	].join("\n");
}

export function unmarshalEncounterTable(content: string) {
	const blockMatch = content.match(
		/```shadowdark-encounter-table\s*([\s\S]*?)```/,
	);
	try {
		const data = JSON5.parse(blockMatch?.[1]?.trim() ?? content.trim());

		let title = "";
		if (typeof data?.title === "string") {
			title = data.title.trim();
		}

		let roll = unmarshalDiceRoll(data?.roll);

		let encounters: EncounterTable["encounters"] = [];
		if ("encounters" in data && Array.isArray(data.encounters)) {
			const parsedEncounters: EncounterTable["encounters"] = [];

			data.encounters.forEach((e: any) => {
				if (typeof e.range !== "string") return;
				if (typeof e.title !== "string") return;

				parsedEncounters.push({
					range: unmarshalRollRange(e.range),

					title: e.title,
					description: e.description,
					monsters: Array.isArray(e.monsters)
						? e.monsters?.map((m: any) => ({
								id: m.id,
								quantity: unmarshalModifiedDiceRoll(m.quantity),
							}))
						: undefined,
				});
			});

			const occupiedEncounters = parsedEncounters
				.sort((a, b) => a.range.min - b.range.min || a.range.max - b.range.max)
				.reduce<EncounterTable["encounters"]>((result, encounter) => {
					const previous = result[result.length - 1];

					const min = previous
						? Math.max(encounter.range.min, previous.range.max + 1)
						: Math.max(encounter.range.min, 1);

					const max = Math.min(encounter.range.max, getMaxRoll(roll));

					if (min <= max) {
						result.push({
							...encounter,
							range: {
								...encounter.range,
								min,
								max,
							},
						});
					}

					return result;
				}, []);

			let nextUnoccupiedRoll = 1;

			for (const encounter of occupiedEncounters) {
				if (nextUnoccupiedRoll < encounter.range.min) {
					encounters.push({
						range: {
							min: nextUnoccupiedRoll,
							max: encounter.range.min - 1,
						},
						title: "Nothing happens",
					});
				}

				encounters.push(encounter);
				nextUnoccupiedRoll = encounter.range.max + 1;
			}

			if (nextUnoccupiedRoll <= getMaxRoll(roll)) {
				encounters.push({
					range: {
						min: nextUnoccupiedRoll,
						max: getMaxRoll(roll),
					},
					title: "Nothing happens",
				});
			}
		}

		return {
			title,
			roll,
			encounters,
		} as EncounterTable;
	} catch {
		throw new Error("Invalid PC JSON.");
	}
}
