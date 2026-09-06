<script lang="ts">
	import { setIcon } from "obsidian";
	import MonsterDialog from "../../components/monster-dialog.svelte";
	import { Abundance, getAbundanceName } from "../../types/abundance";
	import type { EncounterTable } from "../../types/encounter-table";
	import { Monster } from "../../types/monster.svelte";
	import { marshalRollRange } from "../../types/roll-range";

	let {
		monsters,
		encounterTable,
	}: {
		monsters: Record<string, Monster>;
		encounterTable: EncounterTable;
	} = $props();

	let monsterDialog = $state<ReturnType<typeof MonsterDialog>>();
	let randomButton = $state<HTMLElement>();

	let roll = $state<number>();

	$effect(() => {
		if (randomButton) setIcon(randomButton, "dices");
	});
</script>

<MonsterDialog bind:this={monsterDialog} />

<article class="papyros">
	<header>
		<h2>
			{encounterTable.title}
		</h2>
		<button
			class="random"
			onclick={() =>
				(roll = Math.floor(Math.random() * encounterTable.dice) + 1)}
		>
			d{encounterTable.dice}
			<div bind:this={randomButton}></div>
		</button>
	</header>
	<ul>
		<li class="header">
			<span><b>Range</b></span>
			<span><b>Name</b></span>
			<span><b>Level</b></span>
		</li>
		{#each encounterTable.encounters as encounter}
			<li
				class:active={roll &&
					roll >= encounter.range.min &&
					roll <= encounter.range.max}
			>
				{#if encounter.id}
					{@const monster = monsters[encounter.id]}
					{#if monster}
						<button onclick={() => monsterDialog?.showModal(monster)}>
							<span>
								{marshalRollRange(encounter.range)}
							</span>
							<span>{monster.name}</span>
							<span>{monster.level}</span>
						</button>
					{/if}
				{:else}
					<span>
						{marshalRollRange(encounter.range)}
					</span>
					<span>Nothing Happens</span>
					<span>-</span>
				{/if}
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
		width: max-content;
		max-width: 40rem;
		overflow: hidden;
	}

	.random {
		height: 100%;
		border-radius: 1rem;
		cursor: pointer;
		display: flex;
		gap: 0.2rem;
	}

	header {
		height: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0.4rem 0.6rem;
	}

	h2 {
		font-weight: 600;
		font-size: 1.1rem;
		margin: 0;
		color: var(--text-accent);
	}

	b {
		font-weight: 500;
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
