<script lang="ts">
	import { untrack } from "svelte";
	import { Class } from "../../types/class.svelte";
	import { marshalDiceRoll } from "../../types/dice-roll";

	let {
		class: clas,
		onSave,
	}: {
		class: Class;
		onSave?: (npc: Class) => void;
	} = $props();

	let _clas = new Class(clas);
	$effect(() => {
		_clas.hitPoints;
		untrack(() => {
			if (_clas.marshal() !== clas.marshal()) {
				onSave?.(_clas);
			}
		});
	});
</script>

<article>
	<h2>
		{_clas.name}
	</h2>
	<div class="details">
		<span><b>Hit points per level:</b> {marshalDiceRoll(_clas.hitPoints)}</span>
	</div>
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
			"name stats" auto
			"details stats" 1fr
			/ 1fr auto;
	}

	h2 {
		grid-area: name;
		border-radius: 0.4rem;
		font-weight: 600;
		font-size: 1.2rem;
		padding: 0.4rem;
		margin: 0;
	}

	.details {
		grid-area: details;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.4rem;
		margin: 0;
	}

	.stats {
		all: unset;
		grid-area: stats;
		display: grid;
		gap: 0.4rem;
		grid-template-columns: 1fr 1fr;

		li {
			all: unset;
			display: flex;
			gap: 0.2rem;
			flex-direction: column;
			background-color: var(--background-primary);
			border: var(--border-width) solid var(--background-modifier-border);
			border-radius: 0.5rem;
			padding: 0.4rem;

			h3 {
				grid-area: title;
				text-align: center;
				margin: 0;
				padding: 0;
				font-weight: 700;
				font-size: 0.9rem;
			}

			div {
				text-align: center;
				font-size: 0.8rem;

				span {
					font-weight: 600;
				}
			}
		}
	}
</style>
