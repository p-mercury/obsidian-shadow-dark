import { Alignment } from "./alignment";
import { Ancestry } from "./ancestry";
import { Background } from "./background";

export interface Pc {
	name: string;
	background: Background;
	ancestry: Ancestry;
	alignment: Alignment;

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

export function marshalPc(pc: Pc) {
	return [
		"",
		"```shadowdark-pc",
		JSON.stringify(pc, null, 2),
		"```",
		`^pc-${pc.name}`,
		"",
	].join("\n");
}

export function unmarshalPc(content: string): Pc {
	const blockMatch = content.match(/```shadowdark-pc\s*([\s\S]*?)```/);
	const json = blockMatch?.[1]?.trim() ?? content.trim();
	try {
		return JSON.parse(json);
	} catch {
		throw new Error("Invalid PC JSON.");
	}
}
