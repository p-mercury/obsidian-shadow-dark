import { Abundance } from "../types/abundance";
import type { Item } from "../types/item.svelte";

const WEIGHTS: Record<Abundance, number> = {
	[Abundance.SCARCE]: 1,
	[Abundance.COMMON]: 3,
	[Abundance.ABUNDANT]: 6,
};

export function getRandomItem(items: Item[]): Item {
	const weighted = items.flatMap((item) =>
		Array(WEIGHTS[item.abundance]).fill(item),
	);
	return weighted[Math.floor(Math.random() * weighted.length)]!;
}
