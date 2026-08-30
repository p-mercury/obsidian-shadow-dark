import type { Coin } from "./coin";

export interface GearType {
	name: string;
	slotUsage: SlotUsage;
	cost: Coin;
}

export const ARMOR_TYPES: GearType[] = [
	{
		name: "Arrow",
		slotUsage: { itemsPerSlot: 20 },
		cost: {
			gold: 0,
			silver: 0,
			copper: 50,
		},
	},
	{
		name: "Backpack",
		slotUsage: { slotsPerItem: 1, freeToCarry: 1 },
		cost: {
			gold: 2,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Caltrops (one bag)",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 4,
			copper: 0,
		},
	},
	{
		name: "Crossbow bolt",
		slotUsage: { itemsPerSlot: 20 },
		cost: {
			gold: 0,
			silver: 0,
			copper: 50,
		},
	},
	{
		name: "Crowbar",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},
	},
	{
		name: "Flask",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 3,
			copper: 0,
		},
	},
	{
		name: "Bottle",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 3,
			copper: 0,
		},
	},
	{
		name: "Flint and steel",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},
	},
	{
		name: "Grappling hook",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Iron spike",
		slotUsage: { itemsPerSlot: 10 },
		cost: {
			gold: 0,
			silver: 0,
			copper: 50,
		},
	},
	{
		name: "Lantern",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 5,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Mirror",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Oil flask",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},
	},
	{
		name: "Pole",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},
	},
	{
		name: "Ration",
		slotUsage: { itemsPerSlot: 3 },
		cost: {
			gold: 0,
			silver: 2,
			copper: 0,
		},
	},
	{
		name: "Rope, 60'",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},
	},
	{
		name: "Torch",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},
	},
];
