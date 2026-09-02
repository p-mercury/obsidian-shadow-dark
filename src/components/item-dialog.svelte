<script lang="ts">
	import { describe } from "node:test";
	import { getAbundanceName } from "../types/abundance";
	import type { Item } from "../types/item.svelte";
	import Dialog from "./dialog.svelte";

	let item = $state<Item>();

	let dialog = $state<ReturnType<typeof Dialog>>();

	export function showModal(i: Item) {
		item = i;
		dialog?.showModal();
	}

	export function close() {
		dialog?.close();
	}
</script>

<Dialog bind:this={dialog}>
	{#if item}
		<article class="papyros">
			<ul>
				<li>
					<span>
						<b>Name:</b>
						{item.name}
					</span>
				</li>
				<li>
					<span>
						<b>Cost:</b>
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
				</li>
				<li>
					<span>
						<b>Abundance:</b>
						{getAbundanceName(item.abundance)}
					</span>
				</li>
				<li>
					<span>
						<b>Stack Size:</b>
						{item.stackSize}
					</span>
				</li>
				<li>
					{#if item.description}
						<b>Description:</b>
						{item.description}
					{/if}
				</li>
			</ul>
		</article>
	{/if}
</Dialog>

<style>
	article {
		font-family: PlaypenSans;
		border-radius: 1rem;
		padding: 1rem;
		margin: 0;
		width: max-content;
		max-width: 50rem;
		overflow: hidden;
	}

	ul {
		all: unset;
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
		margin: 0;

		li {
			all: unset;
			padding: 0;
			margin: 0;
		}
	}
</style>
