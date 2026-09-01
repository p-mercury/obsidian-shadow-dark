import { Abundance } from "./abundance";
import type { Coin } from "./coin";
import type { SlotUsage } from "./slot-usage";

export interface ArmorType {
	name: string;
	slotUsage: SlotUsage;
	cost: Coin;

	abundance: Abundance;
	stackSize: number;
}

export const ARMOR_TYPES: ArmorType[] = [
	{
		name: "Leather armor",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.ABUNDANT,
		stackSize: 1,
	},
	{
		name: "Chainmail",
		slotUsage: { slotsPerItem: 2 },
		cost: {
			gold: 60,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Mithral Chainmail",
		slotUsage: { slotsPerItem: 2 },
		cost: {
			gold: 240,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,
	},
	{
		name: "Platemail",
		slotUsage: { slotsPerItem: 3 },
		cost: {
			gold: 130,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,
	},
	{
		name: "Mithral Platemail",
		slotUsage: { slotsPerItem: 3 },
		cost: {
			gold: 520,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,
	},
	{
		name: "Shield",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
];
