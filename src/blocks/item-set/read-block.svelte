<script lang="ts">
	import { Abundance, getAbundanceName } from "../../types/abundance";
	import type { Item } from "../../types/item.svelte";
	import ItemDialog from "../../components/item-dialog.svelte";

	let { items }: { items: Item[] } = $props();

	let itemDialog = $state<ReturnType<typeof ItemDialog>>();
</script>

<ItemDialog bind:this={itemDialog} />

<article class="papyros">
	<ul>
		<li class="header">
			<span><b>Name</b></span>
			<span><b>Cost</b></span>
			<span><b>Abundance</b></span>
			{#if items.find((i) => i.stackSize !== 1)}
				<span><b>Stack Size</b></span>
			{/if}
		</li>
		{#each items.sort((a, b) => a.cost.gold + a.cost.silver / 10 + a.cost.gold / 1000 - (b.cost.gold + b.cost.silver / 10 + b.cost.gold / 1000)) as item}
			<li>
				<button onclick={() => itemDialog?.showModal(item)}>
					<span>{item.name}</span>
					<span>
						{#if item.cost.gold}
							<span class="gold">
								{item.cost.gold}gp
							</span>
						{/if}
						{#if item.cost.silver}
							<span class="silver">
								{item.cost.silver}sp
							</span>
						{/if}
						{#if item.cost.copper}
							<span class="copper">
								{item.cost.copper}cp
							</span>
						{/if}
					</span>
					<span
						class:abundant={item.abundance === Abundance.ABUNDANT}
						class:common={item.abundance === Abundance.COMMON}
						class:scarce={item.abundance === Abundance.SCARCE}
					>
						{getAbundanceName(item.abundance)}
					</span>
					{#if items.find((i) => i.stackSize !== 1)}
						<span>{item.stackSize}</span>
					{/if}
				</button>
			</li>
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
		width: max-content;
		max-width: 40rem;
		overflow: hidden;
	}

	ul {
		all: unset;
		display: grid;
		grid-template-columns: auto max-content max-content max-content;
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

	.gold {
		color: #b8860b;
	}

	.silver {
		color: #6b7280;
	}

	.copper {
		color: #b45309;
	}

	.abundant {
		color: var(--text-success);
	}

	.common {
		color: var(--text-normal);
	}

	.scarce {
		color: var(--text-error);
	}
</style>
