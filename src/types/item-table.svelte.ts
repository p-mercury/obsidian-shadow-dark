import { Abundance } from "./abundance";
import type { Coin } from "./coin";
import type { SlotUsage } from "./slot-usage";

export interface ItemData {
	id: string;
	name: string;
	slotUsage: SlotUsage;
	cost: Coin;
	abundance: Abundance;
	stackSize: number;
}

export class Item {
	id: string;
	name: string;
	slotUsage: SlotUsage;
	cost: Coin;
	abundance: Abundance;
	stackSize: number;

	constructor(data: ItemData) {
		this.id = $state(data.id);
		this.name = $state(data.name);
		this.slotUsage = $state(data.slotUsage);
		this.cost = $state(data.cost);
		this.abundance = $state(data.abundance);
		this.stackSize = $state(data.stackSize);
	}

	get snapshot(): ItemData {
		return {
			id: $state.snapshot(this.id),
			name: $state.snapshot(this.name),
			slotUsage: $state.snapshot(this.slotUsage),
			cost: $state.snapshot(this.cost),
			abundance: $state.snapshot(this.abundance),
			stackSize: $state.snapshot(this.stackSize),
		};
	}

	marshal() {
		return [
			"```shadowdark-item",
			JSON.stringify(this.snapshot, null, 2),
			"```",
			`^shadowdark-item-${this.id}`,
		].join("\n");
	}

	static unmarshal(content: string) {
		const blockMatch = content.match(/```shadowdark-item\s*([\s\S]*?)```/);
		const json = blockMatch?.[1]?.trim() ?? content.trim();
		try {
			return new Item(JSON.parse(json) as ItemData);
		} catch {
			throw new Error("Invalid Item JSON.");
		}
	}

	static unmarshalList(content: string) {
		const lines = content
			.trim()
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.startsWith("|"));

		if (lines.length < 3) {
			throw new Error("Invalid item table.");
		}

		const headers = lines[0]!
			.replace(/^\|/, "")
			.replace(/\|$/, "")
			.split("|")
			.map((header) => header.replace(/\s/g, "").toLowerCase());

		return lines.slice(2).map((row) => {
			const cells = row
				.replace(/^\|/, "")
				.replace(/\|$/, "")
				.split("|")
				.map((cell) => cell.trim());

			const data = Object.fromEntries(
				headers.map((header, index) => [header, cells[index]]),
			);

			let slotUsage: SlotUsage = { slotsPerItem: 1 };
			if ("slotsperitem" in data) {
				const value = Math.round(Number(data.slotsperitem));
				if (Number.isFinite(value) && value > 0) {
					slotUsage = { slotsPerItem: value };
				}
			} else if ("itemsperslot" in data) {
				const value = Math.round(Number(data.itemsperslot));
				if (Number.isFinite(value) && value > 0) {
					slotUsage = { itemsPerSlot: value };
				}
			}
			if ("freetocarry" in data) {
				const value = Math.round(Number(data.freetocarry));
				if (Number.isFinite(value) && value > -1) {
					slotUsage.freeToCarry = value;
				}
			}

			let cost: Coin = { gold: 10, silver: 0, copper: 0 };
			if ("cost" in data) {
				const match = data.cost.trim().match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
				if (match) {
					const amount = Math.round(Number(match[1]));
					const currency = match[2]!.toLowerCase();
					if (Number.isFinite(amount) && amount > 0) {
						if (["gp", "gold"].includes(currency)) {
							cost = { gold: amount, silver: 0, copper: 0 };
						} else if (["sp", "silver"].includes(currency)) {
							cost = { gold: 0, silver: amount, copper: 0 };
						} else if (["cp", "copper"].includes(currency)) {
							cost = { gold: 0, silver: 0, copper: amount };
						}
					}
				}
			}

			let abundance = Abundance.COMMON;
			if ("abundance" in data) {
				const value = String(data.abundance).trim().toUpperCase();
				if (Object.values(Abundance).includes(value as Abundance)) {
					abundance = value as Abundance;
				}
			}

			let stackSize = 1;
			if ("stacksize" in data) {
				const value = Math.round(Number(data.stacksize));
				if (Number.isFinite(value) && value > 0) {
					stackSize = value;
				}
			}

			try {
				return new Item({
					id: data.id!,
					name: data.name!,
					slotUsage,
					cost,
					abundance,
					stackSize,
				});
			} catch {
				throw new Error("Invalid item table row.");
			}
		});
	}
}
