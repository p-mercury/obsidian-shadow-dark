import { Abundance } from "./abundance";
import type { Coin } from "./coin";
import type { SlotUsage } from "./slot-usage";

export interface GearType {
	name: string;
	slotUsage: SlotUsage;
	cost: Coin;

	abundance: Abundance;
	stackSize: number;
}

export const GEAR_TYPES: GearType[] = [
	{
		name: "Arrows",
		slotUsage: { itemsPerSlot: 20 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 20,
	},
	{
		name: "Backpack",
		slotUsage: { slotsPerItem: 1, freeToCarry: 1 },
		cost: {
			gold: 2,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Caltrops (one bag)",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 4,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Crossbow bolts",
		slotUsage: { itemsPerSlot: 20 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 20,
	},
	{
		name: "Crowbar",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Flask",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 3,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Bottle",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 3,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Flint and steel",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.ABUNDANT,
		stackSize: 1,
	},
	{
		name: "Grappling hook",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,
	},
	{
		name: "Iron spikes",
		slotUsage: { itemsPerSlot: 10 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 10,
	},
	{
		name: "Lantern",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 5,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,
	},
	{
		name: "Mirror",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,
	},
	{
		name: "Oil flask",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Pole",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Rations",
		slotUsage: { itemsPerSlot: 3 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 3,
	},
	{
		name: "Rope, 60'",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,
	},
	{
		name: "Torch",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.ABUNDANT,
		stackSize: 1,
	},
];
