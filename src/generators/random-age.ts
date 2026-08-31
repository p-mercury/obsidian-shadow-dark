import { Age } from "../types/age";

export function getRandomAge(allowedValues?: Age[]) {
	let values = allowedValues ?? Object.values(Age);
	if (values.length < 1) values = Object.values(Age);
	return values[Math.floor(Math.random() * values.length)]!;
}
