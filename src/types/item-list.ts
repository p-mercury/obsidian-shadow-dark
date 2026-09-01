export type ItemList = {
	title: string;
	items: {
		id: string;
		quantity: number;
	}[];
};

export function marshalItemList(itemList: ItemList) {
	return [
		"```shadowdark-item-list",
		JSON.stringify(itemList, null, 2),
		"```",
		`^item-list-${itemList.title.toLowerCase().replace(/\s+/g, "-")}`,
	].join("\n");
}

export function unmarshalItemList(content: string) {
	const blockMatch = content.match(/```shadowdark-item-list\s*([\s\S]*?)```/);
	const json = blockMatch?.[1]?.trim() ?? content.trim();
	try {
		return JSON.parse(json) as ItemList;
	} catch {
		throw new Error("Invalid PC JSON.");
	}
}
