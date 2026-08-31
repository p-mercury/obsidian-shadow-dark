<script lang="ts">
	import type { ItemList } from "../../types/item-list";

	let { itemList }: { itemList: ItemList } = $props();
</script>

<article class="papyros">
	<h2>
		{itemList.title}
	</h2>
	<ul>
		{#each itemList.items as item}
			<li>
				<span>{item.quantity}x {item.name}</span>
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
		padding: 0.6rem;
		margin: 1rem 0;
		display: grid;
		gap: 0.4rem;
		width: 100%;
		max-width: 32rem;
		grid:
			"title" auto
			"items" auto
			/ auto;
	}

	h2 {
		grid-area: title;
		border-radius: 0.4rem;
		font-weight: 600;
		font-size: 1.2rem;
		padding: 0.4rem;
		margin: 0;
	}

	ul {
		margin: 0;
		padding: 0.4rem;
	}

	li {
		margin: 0;
		padding: 0;
	}
</style>
