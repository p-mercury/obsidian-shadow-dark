import { Abundance } from "./abundance";
import type { Coin } from "./coin";
import type { DiceRoll } from "./dice-roll";
import { Range } from "./range";

export interface WeaponType {
	name: string;
	slotUsage: SlotUsage;
	cost: Coin;

	abundance: Abundance;
	stackSize: number;

	finesse: boolean;
	rangeAttack?: {
		range: Range;
		singleHandedDamage?: DiceRoll;
		doubleHandedDamage?: DiceRoll;
	};
	meleeAttack?: {
		range: Range;
		singleHandedDamage?: DiceRoll;
		doubleHandedDamage?: DiceRoll;
	};
}

export const WEAPON_TYPES: WeaponType[] = [
	{
		name: "Bastard sword",
		slotUsage: { slotsPerItem: 2 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 8,
				modifier: 0,
			},
			doubleHandedDamage: {
				count: 1,
				sides: 10,
				modifier: 0,
			},
		},
	},
	{
		name: "Club",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 0,
			copper: 5,
		},

		abundance: Abundance.ABUNDANT,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 4,
				modifier: 0,
			},
		},
	},
	{
		name: "Crossbow",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 8,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,

		finesse: false,
		rangeAttack: {
			range: Range.FAR,
			singleHandedDamage: {
				count: 1,
				sides: 6,
				modifier: 0,
			},
		},
	},
	{
		name: "Dagger",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 1,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.ABUNDANT,
		stackSize: 1,

		finesse: true,
		rangeAttack: {
			range: Range.NEAR,
			singleHandedDamage: {
				count: 1,
				sides: 4,
				modifier: 0,
			},
		},
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 4,
				modifier: 0,
			},
		},
	},
	{
		name: "Greataxe",
		slotUsage: { slotsPerItem: 2 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 8,
				modifier: 0,
			},
			doubleHandedDamage: {
				count: 1,
				sides: 10,
				modifier: 0,
			},
		},
	},
	{
		name: "Greatsword",
		slotUsage: { slotsPerItem: 2 },
		cost: {
			gold: 12,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			doubleHandedDamage: {
				count: 1,
				sides: 12,
				modifier: 0,
			},
		},
	},
	{
		name: "Javelin",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,

		finesse: false,
		rangeAttack: {
			range: Range.FAR,
			singleHandedDamage: {
				count: 1,
				sides: 4,
				modifier: 0,
			},
		},
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 4,
				modifier: 0,
			},
		},
	},
	{
		name: "Longbow",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 8,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,

		finesse: false,
		rangeAttack: {
			range: Range.FAR,
			doubleHandedDamage: {
				count: 1,
				sides: 8,
				modifier: 0,
			},
		},
	},
	{
		name: "Longsword",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 9,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 8,
				modifier: 0,
			},
		},
	},
	{
		name: "Mace",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 6,
				modifier: 0,
			},
		},
	},
	{
		name: "Shortbow",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 6,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,

		finesse: false,
		rangeAttack: {
			range: Range.FAR,
			doubleHandedDamage: {
				count: 1,
				sides: 4,
				modifier: 0,
			},
		},
	},
	{
		name: "Shortsword",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 7,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.COMMON,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 6,
				modifier: 0,
			},
		},
	},
	{
		name: "Spear",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.ABUNDANT,
		stackSize: 1,

		finesse: false,
		rangeAttack: {
			range: Range.NEAR,
			singleHandedDamage: {
				count: 1,
				sides: 6,
				modifier: 0,
			},
		},
		meleeAttack: {
			range: Range.CLOSE,
			singleHandedDamage: {
				count: 1,
				sides: 6,
				modifier: 0,
			},
		},
	},
	{
		name: "Staff",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 0,
			silver: 5,
			copper: 0,
		},

		abundance: Abundance.ABUNDANT,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			doubleHandedDamage: {
				count: 1,
				sides: 4,
				modifier: 0,
			},
		},
	},
	{
		name: "Warhammer",
		slotUsage: { slotsPerItem: 1 },
		cost: {
			gold: 10,
			silver: 0,
			copper: 0,
		},

		abundance: Abundance.SCARCE,
		stackSize: 1,

		finesse: false,
		meleeAttack: {
			range: Range.CLOSE,
			doubleHandedDamage: {
				count: 1,
				sides: 10,
				modifier: 0,
			},
		},
	},
];
