import type { DiceRoll } from "./dice-roll";

export interface ModifiedDiceRoll extends DiceRoll {
	modifier: number;
}

export function marshalModifiedDiceRoll(value: ModifiedDiceRoll) {
	if (value.count < 1 || value.sides < 1) {
		return value.modifier;
	} else {
		const modifier =
			value.modifier > 0
				? `+${value.modifier}`
				: value.modifier < 0
					? `${value.modifier}`
					: "";
		return `${value.count}d${value.sides}${modifier}`;
	}
}

export function unmarshalModifiedDiceRoll(value: unknown): ModifiedDiceRoll {
	if (typeof value === "number") {
		return { count: 0, sides: 0, modifier: Math.round(value) };
	}

	if (typeof value !== "string") {
		return { count: 1, sides: 6, modifier: 0 };
	}

	if (Number.isSafeInteger(Number(value))) {
		return { count: 0, sides: 0, modifier: Math.round(Number(value)) };
	}

	const match = value.replace(/\s+/g, "").match(/^(\d+)d(\d+)([+-]\d+)?$/i);

	const countText = match?.[1];
	const sidesText = match?.[2];
	const modifierText = match?.[3];

	if (countText === undefined || sidesText === undefined) {
		return { count: 1, sides: 6, modifier: 0 };
	}

	const count = Number.parseInt(countText, 10);
	const sides = Number.parseInt(sidesText, 10);
	const modifier =
		modifierText === undefined ? 0 : Number.parseInt(modifierText, 10);

	if (
		!Number.isSafeInteger(count) ||
		!Number.isSafeInteger(sides) ||
		!Number.isSafeInteger(modifier) ||
		count < 1 ||
		sides < 1
	) {
		return { count: 1, sides: 6, modifier: 0 };
	}

	return { count, sides, modifier };
}

export function executeRoll(value: DiceRoll | ModifiedDiceRoll): number {
	let result = "modifier" in value ? value.modifier : 0;

	for (let index = 0; index < value.count; index++) {
		result += Math.floor(Math.random() * value.sides) + 1;
	}

	return result;
}

export function getMaxRoll(value: DiceRoll | ModifiedDiceRoll): number {
	const modifier = "modifier" in value ? value.modifier : 0;

	return value.count * value.sides + modifier;
}

export function getMinRoll(value: DiceRoll | ModifiedDiceRoll): number {
	const modifier = "modifier" in value ? value.modifier : 0;

	return value.count + modifier;
}
