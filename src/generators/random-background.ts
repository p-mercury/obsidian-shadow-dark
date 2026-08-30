import { Background } from "../types/background";

export function getRandomBackground() {
	const values = Object.values(Background);
	return values[Math.floor(Math.random() * values.length)]!;
}
