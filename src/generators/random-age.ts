import { Age } from "../types/age";

export function getRandomAge() {
	const values = Object.values(Age);
	return values[Math.floor(Math.random() * values.length)]!;
}
