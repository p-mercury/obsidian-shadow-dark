<script lang="ts">
	import { Monster } from "../../types/monster.svelte";
	import type Shadowdark from "../../main";
	import { marshalDiceRoll } from "../../types/dice-roll";

	let {
		scope,
		monster,
		onSave,
	}: {
		scope: Shadowdark;
		monster: Monster;
		onSave: (npc: Monster) => void;
	} = $props();

	let _monster = new Monster(monster);
	$effect(() => {
		onSave(_monster);
	});
</script>

<article>
	<h2>
		{_monster.name}
	</h2>
	<div class="details">
		<span>{_monster.description}</span>
		<span><b>Level:</b> {_monster.level}</span>
		<span><b>Attacks:</b></span>
		<ul class="actions">
			{#each _monster.actions as action}
				<li>{action}</li>
			{/each}
		</ul>
		{#if _monster.attributes.length}
			<span><b>Attributes:</b></span>
			<ul class="actions">
				{#each _monster.attributes as attribute}
					<li><b>{attribute.name}.</b> {attribute.description}</li>
				{/each}
			</ul>
		{/if}
	</div>
	<ul class="stats">
		<li>
			<h3>HP</h3>
			{typeof _monster.hitPoints === "number"
				? _monster.hitPoints
				: marshalDiceRoll(_monster.hitPoints)}
		</li>
		<li>
			<h3>AC</h3>
			{_monster.armorClass}
		</li>
		<li>
			<h3>STR</h3>
			{_monster.stats.strength > -1 ? "+" : ""}{_monster.stats.strength}
		</li>
		<li>
			<h3>INT</h3>
			{_monster.stats.intelligence > -1 ? "+" : ""}{_monster.stats.intelligence}
		</li>
		<li>
			<h3>DEX</h3>
			{_monster.stats.dexterity > -1 ? "+" : ""}{_monster.stats.dexterity}
		</li>
		<li>
			<h3>WIS</h3>
			{_monster.stats.wisdom > -1 ? "+" : ""}{_monster.stats.wisdom}
		</li>
		<li>
			<h3>CON</h3>
			{_monster.stats.constitution > -1 ? "+" : ""}{_monster.stats.constitution}
		</li>
		<li>
			<h3>CHA</h3>
			{_monster.stats.charisma > -1 ? "+" : ""}{_monster.stats.charisma}
		</li>
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
		max-width: 40rem;
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
		gap: 0.6rem;
		padding: 0.4rem;
		margin: 0;
	}

	.actions {
		all: unset;
		grid-area: stats;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.stats {
		all: unset;
		grid-area: stats;
		display: grid;
		gap: 0.4rem;
		grid-template-columns: 1fr 1fr;
		height: min-content;

		li {
			all: unset;
			display: flex;
			gap: 0.2rem;
			flex-direction: column;
			background-color: var(--background-primary);
			border: var(--border-width) solid var(--background-modifier-border);
			border-radius: 0.5rem;
			padding: 0.4rem;
			justify-content: center;
			align-items: center;
			font-size: 0.8rem;

			h3 {
				grid-area: title;
				text-align: center;
				margin: 0;
				padding: 0;
				font-weight: 700;
				font-size: 0.9rem;
			}
		}
	}
</style>
