import { Wealth } from "../types/wealth";

export function getRandomWealth(allowedValues?: Wealth[]) {
	let values = allowedValues ?? Object.values(Wealth);
	if (values.length < 1) values = Object.values(Wealth);
	return values[Math.floor(Math.random() * values.length)]!;
}
