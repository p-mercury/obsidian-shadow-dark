This is a work-in-progress tool intended to make things easier for Shadowdark GMs. It supports the random generation and editing of PC and NPC character sheets, as well as the random generation of shops—with hopefully many more features to come!

## Usage

### Items

To add items, create a table somewhere in your vault and mark it with `^shadowdark-items`. It should look something like this:

```md
| ID                | Name          | Slots per Item | Cost | Abundance |
| ----------------- | ------------- | -------------- | ---- | --------- |
| afkS82SdmW        | Leather armor | 1              | 10gp | Abundant  |
| Zy2I7Ued1f        | Chainmail     | 1              | 60gp | Common    |
| ^shadowdark-items |
```

All items in properly marked tables are automatically detected and included in random generation.

### Random Generation

After you have defined some items, you can start generating shops. Right-click any folder in your vault and select **Random Shop** to generate a shop complete with a randomly generated NPC and inventory based on your defined items.
