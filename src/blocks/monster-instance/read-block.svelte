<script lang="ts">
	import NumberInput from "../../components/number-input.svelte";
	import type Shadowdark from "../../main";
	import { MonsterInstance } from "../../types/monster-instance.svelte";

	let {
		scope,
		monsterInstance,
		onSave,
	}: {
		scope: Shadowdark;
		monsterInstance: MonsterInstance;
		onSave: (npc: MonsterInstance) => void;
	} = $props();

	// svelte-ignore state_referenced_locally
	let _monsterInstance = new MonsterInstance(monsterInstance);
	$effect(() => {
		onSave(_monsterInstance);
	});
</script>

<article>
	<h2>
		{_monsterInstance.name}
	</h2>
	<div class="details">
		<span>{_monsterInstance.description}</span>
		<span>
			<b>Hit Points:</b>
			<NumberInput
				min={0}
				max={_monsterInstance.maxHitPoints}
				bind:value={_monsterInstance.hitPoints}
			/>
		</span>
		<span><b>Attacks:</b></span>
		<ul class="actions">
			{#each _monsterInstance.actions as action}
				<li>{action}</li>
			{/each}
		</ul>
		{#if _monsterInstance.attributes.length}
			<span><b>Attributes:</b></span>
			<ul class="actions">
				{#each _monsterInstance.attributes as attribute}
					<li><b>{attribute.name}.</b> {attribute.description}</li>
				{/each}
			</ul>
		{/if}
	</div>
	<ul class="stats">
		<li>
			<h3>AC</h3>
			{_monsterInstance.armorClass}
		</li>
		<li>
			<h3>LV</h3>
			{_monsterInstance.level}
		</li>
		<li>
			<h3>STR</h3>
			{_monsterInstance.stats.strength > -1 ? "+" : ""}{_monsterInstance.stats
				.strength}
		</li>
		<li>
			<h3>INT</h3>
			{_monsterInstance.stats.intelligence > -1 ? "+" : ""}{_monsterInstance
				.stats.intelligence}
		</li>
		<li>
			<h3>DEX</h3>
			{_monsterInstance.stats.dexterity > -1 ? "+" : ""}{_monsterInstance.stats
				.dexterity}
		</li>
		<li>
			<h3>WIS</h3>
			{_monsterInstance.stats.wisdom > -1 ? "+" : ""}{_monsterInstance.stats
				.wisdom}
		</li>
		<li>
			<h3>CON</h3>
			{_monsterInstance.stats.constitution > -1 ? "+" : ""}{_monsterInstance
				.stats.constitution}
		</li>
		<li>
			<h3>CHA</h3>
			{_monsterInstance.stats.charisma > -1 ? "+" : ""}{_monsterInstance.stats
				.charisma}
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
