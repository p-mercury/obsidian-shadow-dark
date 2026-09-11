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
			{#if monster.image}
				<img src={monster.image} alt={monster.name} />
			{/if}
			<ul>
				<li>
					<span>
						<b>{monster.name}</b>
					</span>
				</li>
				<li>
					<span>
						Level:
						{monster.level}
					</span>
				</li>
				<li>
					<span>
						Movement:
						{getRangeName(monster.movement)}
					</span>
				</li>
				<li>
					Description:
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
		padding: 0.8rem;
		margin: 0;
		width: 90dvw;
		max-width: 40rem;
		overflow: hidden;
		display: grid;
		gap: 1rem;
		grid:
			"image info" 10rem
			/ 10rem auto;
	}

	img {
		grid-area: image;
		border-radius: 1rem;
		width: 10rem;
		height: 10rem;
	}

	ul {
		all: unset;
		grid-area: info;
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
