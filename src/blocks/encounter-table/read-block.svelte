<script lang="ts">
	import { setIcon } from "obsidian";
	import { type EncounterTable } from "../../types/encounter-table";
	import { marshalRollRange } from "../../types/roll-range";
	import EncounterDialog from "../../components/encounter-dialog.svelte";
	import type Shadowdark from "../../main";

	let {
		scope,
		encounterTable,
		onSave,
	}: {
		scope: Shadowdark;
		encounterTable: EncounterTable;
		onSave: (npc: EncounterTable) => void;
	} = $props();

	let encounterDialog = $state<ReturnType<typeof EncounterDialog>>();
	let randomButton = $state<HTMLElement>();

	let roll = $state<number>();

	$effect(() => {
		if (randomButton) setIcon(randomButton, "dices");
	});

	let _encounterTable = $state(encounterTable);
	$effect(() => {
		onSave(_encounterTable);
	});
</script>

<EncounterDialog {scope} bind:this={encounterDialog} />

<article class="papyros">
	<header>
		<h2>
			{encounterTable.title}
		</h2>
		<button
			onclick={() =>
				(roll = Math.floor(Math.random() * encounterTable.die) + 1)}
		>
			d{encounterTable.die}
			<div bind:this={randomButton}></div>
		</button>
	</header>
	<ul>
		<li class="header">
			<span><b>d{encounterTable.die}</b></span>
			<span><b>Details</b></span>
		</li>
		{#each encounterTable.encounters as encounter}
			<li
				class:active={roll &&
					roll >= encounter.range.min &&
					roll <= encounter.range.max}
			>
				<button onclick={() => encounterDialog?.showModal(encounter)}>
					<span>{marshalRollRange(encounter.range)}</span>
					<span>{encounter.title}</span>
				</button>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		font-family: PlaypenSans;
		font-weight: 300;
		background-color: var(--background-primary-alt);
		color: var(--text-normal);
		border: var(--border-width) solid var(--background-modifier-border);
		border-radius: 1rem;
		padding: 0;
		margin: 1rem 0;
		min-width: 20rem;
		width: max-content;
		max-width: 40rem;
		overflow: hidden;
	}

	header {
		height: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		padding: 0.4rem 0.6rem;
		gap: 1rem;

		h2 {
			font-weight: 600;
			font-size: 1.2rem;
			margin: 0;
			color: var(--text-accent);
		}

		button {
			height: 100%;
			cursor: pointer;
			display: flex;
			gap: 0.2rem;
			font-weight: 600;
			font-size: 0.9rem;
			color: var(--text);
			background-color: var(--interactive-normal);
			border-radius: var(--button-radius);
			border: var(--border-width) solid var(--background-modifier-border);

			&:hover {
				background-color: var(--interactive-hover);
			}
		}
	}

	b {
		font-weight: 500;
	}

	ul {
		all: unset;
		display: grid;
		grid-template-columns: auto 1fr auto;
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
			border-top: var(--border-width) solid var(--background-modifier-border);

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
					border-color: var(--background-modifier-border-hover);
				}
			}

			&:last-child {
				border-radius: 0 0 1rem 1rem;
			}

			&.active {
				box-shadow: inset 0 0 0 2px var(--interactive-accent);
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
