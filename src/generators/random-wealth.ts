import { Wealth } from "../types/wealth";

export function getRandomWealth() {
	const values = Object.values(Wealth);
	return values[Math.floor(Math.random() * values.length)]!;
}
