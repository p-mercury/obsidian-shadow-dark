import { Occupation } from "../types/occupation";

export function getRandomOccupation(allowedValues?: Occupation[]) {
	let values = allowedValues ?? Object.values(Occupation);
	if (values.length < 1) values = Object.values(Occupation);
	return values[Math.floor(Math.random() * values.length)]!;
}
