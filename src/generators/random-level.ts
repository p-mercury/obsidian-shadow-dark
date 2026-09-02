import { Level } from "../types/level";

export function getRandomLevel(allowedValues?: Level[]) {
	const allLevels = Object.values(Level).filter(
		(value): value is Level => typeof value === "number",
	);
	const values =
		allowedValues && allowedValues.length > 0 ? allowedValues : allLevels;
	return values[Math.floor(Math.random() * values.length)]!;
}
