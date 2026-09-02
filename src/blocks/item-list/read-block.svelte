<script lang="ts">
	import type { ItemList } from "../../types/item-list";
	import type { Item } from "../../types/item.svelte";
	import ItemDialog from "../../components/item-dialog.svelte";

	let { items, itemList }: { items: Record<string, Item>; itemList: ItemList } =
		$props();

	let itemDialog = $state<ReturnType<typeof ItemDialog>>();
</script>

<ItemDialog bind:this={itemDialog} />

<article class="papyros">
	<ul>
		<li class="header">
			<span><b>Qty.</b></span>
			<span><b>Name</b></span>
			<span><b>Cost</b></span>
		</li>
		{#each itemList.items as listItem}
			{@const item = items[listItem.id]}
			{#if item}
				<li>
					<button onclick={() => itemDialog?.showModal(item)}>
						<span>{listItem.quantity}</span>
						<span>{item.name}</span>
						<span>
							{#if item.cost.gold}
								{item.cost.gold}gp
							{/if}
							{#if item.cost.silver}
								{item.cost.silver}sp
							{/if}
							{#if item.cost.copper}
								{item.cost.copper}cp
							{/if}
						</span>
					</button>
				</li>
			{/if}
		{/each}
	</ul>
</article>

<style>
	article {
		font-family: PlaypenSans;
		background-color: var(--background-primary-alt);
		color: var(--text-normal);
		border: var(--border-width) solid var(--background-modifier-border);
		border-radius: 1rem;
		padding: 0;
		margin: 1rem 0;
		width: 100%;
		max-width: 40rem;
		overflow: hidden;
	}

	ul {
		all: unset;
		display: grid;
		grid-template-columns: auto 1fr 1fr;
		gap: 0;
		padding: 0;
		margin: 0;

		li {
			all: unset;
			display: grid;
			grid-column: 1 / -1;
			grid-template-columns: subgrid;
			padding: 0;
			margin: 0;
			border-bottom: var(--border-width) solid var(--background-modifier-border);

			button {
				all: unset;
				display: grid;
				grid-column: 1 / -1;
				grid-template-columns: subgrid;
				padding: 0;
				margin: 0;
				cursor: pointer;

				&:hover {
					background-color: var(--background-modifier-hover);
				}
			}

			&:last-child {
				border: none;
			}

			span {
				padding: 0.4rem 0.6rem;
				margin: 0;
				border-right: var(--border-width) solid
					var(--background-modifier-border);

				&:last-child {
					border: none;
				}
			}
		}
	}
</style>
