<script lang="ts">
	import type { Monster } from "../types/monster.svelte";
	import { getRangeName } from "../types/range";
	import Dialog from "./dialog.svelte";

	let monster = $state<Monster>();

	let dialog = $state<ReturnType<typeof Dialog>>();

	export function showModal(i: Monster) {
		monster = i;
		dialog?.showModal();
	}

	export function close() {
		dialog?.close();
	}
</script>

<Dialog bind:this={dialog}>
	{#if monster}
		<article>
			<ul>
				<li>
					<span>
						<b>Name:</b>
						{monster.name}
					</span>
				</li>
				<li>
					<span>
						<b>Level:</b>
						{monster.level}
					</span>
				</li>
				<li>
					<span>
						<b>Movement:</b>
						{getRangeName(monster.movement)}
					</span>
				</li>
				<li>
					<b>Description:</b>
					{monster.description}
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
