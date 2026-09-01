<script lang="ts">
	import { getAbundanceName } from "../../types/abundance";
	import type { Item } from "../../types/item.svelte";

	let { items }: { items: Item[] } = $props();
</script>

<article class="papyros">
	<ul>
		<li class="header">
			<span><b>Name</b></span>
			<span><b>Cost</b></span>
			<span><b>Abundance</b></span>
			<span><b>Stack Size</b></span>
			<span><b>Description</b></span>
		</li>
		{#each items.sort((a, b) => a.cost.gold + a.cost.silver / 10 + a.cost.gold / 1000 - (b.cost.gold + b.cost.silver / 10 + b.cost.gold / 1000)) as item}
			<li>
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
				<span>
					{getAbundanceName(item.abundance)}
				</span>
				<span>{item.stackSize}</span>
				<span>{item.description}</span>
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
		width: 100%;
		max-width: 40rem;
		overflow: hidden;
	}

	ul {
		all: unset;
		display: grid;
		grid-template-columns: auto 1fr 1fr 1fr 1fr;
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
