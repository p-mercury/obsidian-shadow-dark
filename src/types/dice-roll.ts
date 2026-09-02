export interface DiceRoll {
	count: number;
	sides: number;
	modifier: number;
}

export function marshalDiceRoll(value: DiceRoll) {
	const modifier =
		value.modifier > 0
			? `+${value.modifier}`
			: value.modifier < 0
				? `${value.modifier}`
				: "";

	return `${value.count}d${value.sides}${modifier}`;
}

export function unmarshalDiceRoll(value: string): DiceRoll {
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
