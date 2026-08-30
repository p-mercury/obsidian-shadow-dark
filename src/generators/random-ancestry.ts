import { Ancestry } from "../types/ancestry";

export function getRandomAncestry(allowedValues?: Ancestry[]): Ancestry {
	let values = allowedValues ?? Object.values(Ancestry);
	if (values.length < 1) values = Object.values(Ancestry);
	return values[Math.floor(Math.random() * values.length)]!;
}
