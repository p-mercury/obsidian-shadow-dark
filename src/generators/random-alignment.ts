import { Alignment } from "../types/alignment";

export function getRandomAlignment() {
	const values = Object.values(Alignment);
	return values[Math.floor(Math.random() * values.length)]!;
}
