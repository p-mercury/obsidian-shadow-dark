import { Age } from "./age";
import { Alignment } from "./alignment";
import { Ancestry } from "./ancestry";
import { Occupation } from "./occupation";
import { Wealth } from "./wealth";

export interface Npc {
	name: string;
	ancestry: Ancestry;
	occupation: Occupation;
	age: Age;
	alignment: Alignment;
	wealth: Wealth;

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

export function marshalNpc(npc: Npc) {
	return [
		"",
		"```shadowdark-npc",
		JSON.stringify(npc, null, 2),
		"```",
		`^npc-${npc.name}`,
		"",
	].join("\n");
}

export function unmarshalNpc(content: string) {
	const blockMatch = content.match(/```shadowdark-npc\s*([\s\S]*?)```/);
	const json = blockMatch?.[1]?.trim() ?? content.trim();
	try {
		return JSON.parse(json) as Npc;
	} catch {
		throw new Error("Invalid PC JSON.");
	}
}
