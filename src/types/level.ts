export enum Level {
	ZERO = 0,
	ONE,
	TWO,
	THREE,
	FOUR,
	FIVE,
	SIX,
	SEVEN,
	EIGHT,
	NINE,
	TEN,
}

export function marshalLevel(level: Level): string {
	return level.toString();
}

export function unmarshalLevel(value: string): Level {
	const level = Number(value.trim());
	if (!Number.isInteger(level) || level < Level.ONE || level > Level.TEN) {
		return Level.ONE;
	}
	return level as Level;
}
