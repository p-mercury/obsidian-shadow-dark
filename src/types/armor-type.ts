import type { Coin } from "./coin";

export interface ArmorType {
	name: string;
	slotUsage: SlotUsage;
	cost: Coin;
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
	},
	{
		name: "Chainmail",
		slotUsage: { slotsPerItem: 2 },
		cost: {
			gold: 60,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Mithral Chainmail",
		slotUsage: { slotsPerItem: 2 },
		cost: {
			gold: 240,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Platemail",
		slotUsage: { slotsPerItem: 3 },
		cost: {
			gold: 130,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Mithral Platemail",
		slotUsage: { slotsPerItem: 3 },
		cost: {
			gold: 520,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Shield",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},
	},
];
