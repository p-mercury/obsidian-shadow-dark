export interface RollRange {
	min: number;
	max: number;
}

export function marshalRollRange(value: RollRange): string {
	if (!Number.isInteger(value.min) || !Number.isInteger(value.max)) {
		throw new Error("Roll range must contain integers.");
	}
	const min = Math.min(value.min, value.max);
	const max = Math.max(value.min, value.max);

	if (min === max) {
		return min.toString();
	}

	return `${min}-${max}`;
}

export function unmarshalRollRange(value: string): RollRange {
	const match = value.trim().match(/^(\d+)(?:\s*(?:-|->)\s*(\d+))?$/);

	if (!match) {
		throw new Error(`Invalid roll range: "${value}".`);
	}

	const first = Number(match[1]);
	const second = match[2] !== undefined ? Number(match[2]) : first;

	return {
		min: Math.min(first, second),
		max: Math.max(first, second),
	};
}
