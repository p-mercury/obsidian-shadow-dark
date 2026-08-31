import { Alignment } from "../types/alignment";

export function getRandomAlignment(allowedValues?: Alignment[]) {
	let values = allowedValues ?? Object.values(Alignment);
	if (values.length < 1) values = Object.values(Alignment);
	return values[Math.floor(Math.random() * values.length)]!;
}
