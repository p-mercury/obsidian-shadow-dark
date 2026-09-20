export interface DiceRoll {
	count: number;
	sides: number;
}

export function marshalDiceRoll(value: DiceRoll) {
	return `${value.count}d${value.sides}`;
}

export function unmarshalDiceRoll(value: unknown): DiceRoll {
	if (typeof value !== "string") {
		return { count: 1, sides: 6 };
	}

	const match = value.replace(/\s+/g, "").match(/^(\d+)d(\d+)?$/i);

	const countText = match?.[1];
	const sidesText = match?.[2];

	if (countText === undefined || sidesText === undefined) {
		return { count: 1, sides: 6 };
	}

	const count = Number.parseInt(countText, 10);
	const sides = Number.parseInt(sidesText, 10);

	if (
		!Number.isSafeInteger(count) ||
		!Number.isSafeInteger(sides) ||
		count < 1 ||
		sides < 1
	) {
		return { count: 1, sides: 6 };
	}

	return { count, sides };
}
