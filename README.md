This is a work-in-progress tool intended to make things easier for Shadowdark GMs. It supports the random generation and editing of PC and NPC character sheets, as well as the random generation of shops, with hopefully many more features to come!

## Usage

### Encounter Tables

#### Setup

To start using encounter tables, you first need to create a monster. Right-click any folder in your vault and select **New Monster**. This will create a monster template for you to fill out. Fill out the template, but don't modify the ID field, as it contains the unique identifier for this monster.

#### Usage

Now that you have a monster, you can create your first encounter table. Right-click in the file where you want to add the table, then click **Insert Encounter Table** in the **Shadowdark** section. This will create an encounter table template for you to fill out.

You will need to give the encounter table a title and decide which die will be rolled to select the encounter. For example, put **6** in the **die** section if you want a **d6** to determine the encounter.

In the **encounters** section, you can add any encounters you want. Each encounter needs a range, which determines which rolls will trigger it, and a title, which will be displayed in the table. You can optionally add a longer description, which will be shown when you click the encounter to view more information.

The second optional property is the **monsters** list. In this section, you can add all the monsters involved in the encounter by specifying each monster's ID and quantity, like so:

```json
{
	"title": "Cave Encounters",
	"die": 6,
	"encounters": [
		{
			"range": "1",
			"title": "Toxic gas enters the cave"
		},
		{
			"range": "2-3",
			"title": "1d4 rats burst out of a crack in the wall",
			"monsters": [
				{
					"id": "oBMGefHkBn",
					"quantity": "1d4"
				}
			]
		},
		{
			"range": "4",
			"title": "A group of 2 large spiders creeps through the cave",
			"monsters": [
				{
					"id": "oBMGefHkBn",
					"quantity": 2
				}
			]
		},
		{
			"range": "5-6",
			"title": "Nothing happens"
		}
	]
}
```

### Shops

#### Setup

To begin, you need to add some items to the system! Right-click any folder in your vault and select **New Item Set**. Enter write mode and add some items to the table, ensuring that each item has a unique ID. You can have as many item sets as you want, and all items in properly marked item sets are automatically detected and included in random generation.

In read mode, the item set will hide some details to make the table more readable. To view an item's full information, simply click it.

### Random Generation

After you have defined some items, you can start generating shops. Right-click any folder in your vault and select **Random Shop** to generate a shop complete with a randomly generated NPC and an inventory based on your defined items.

## Disclaimer

Shadowdark Tools is an independent product published under the Shadowdark RPG Third-Party License and is not affiliated with The Arcane Library, LLC. Shadowdark RPG © 2023 The Arcane Library, LLC.
