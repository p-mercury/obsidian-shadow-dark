<script lang="ts">
	import NumberInput from "../../components/number-input.svelte";
	import { getStatModifierString } from "../../types/stat";
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
		<span><b>Level:</b> {_monsterInstance.level}</span>
	</div>
	<ul class="stats">
		<li>
			<h3>HP</h3>
			<NumberInput
				min={0}
				max={_monsterInstance.maxHitPoints}
				bind:value={_monsterInstance.hitPoints}
			/>
		</li>
		<li>
			<h3>AC</h3>
			<div><span>{_monsterInstance.armorClass}</span></div>
		</li>
		<li>
			<h3>STR</h3>
			<div>
				<span>{getStatModifierString(_monsterInstance.stats.strength)}</span>
				({_monsterInstance.stats.strength})
			</div>
		</li>
		<li>
			<h3>DEX</h3>
			<div>
				<span>{getStatModifierString(_monsterInstance.stats.dexterity)}</span>
				({_monsterInstance.stats.dexterity})
			</div>
		</li>
		<li>
			<h3>CON</h3>
			<div>
				<span>{getStatModifierString(_monsterInstance.stats.constitution)}</span
				>
				({_monsterInstance.stats.constitution})
			</div>
		</li>
		<li>
			<h3>INT</h3>
			<div>
				<span>{getStatModifierString(_monsterInstance.stats.intelligence)}</span
				>
				({_monsterInstance.stats.intelligence})
			</div>
		</li>
		<li>
			<h3>WIS</h3>
			<div>
				<span>{getStatModifierString(_monsterInstance.stats.wisdom)}</span>
				({_monsterInstance.stats.wisdom})
			</div>
		</li>
		<li>
			<h3>CHA</h3>
			<div>
				<span>{getStatModifierString(_monsterInstance.stats.charisma)}</span>
				({_monsterInstance.stats.charisma})
			</div>
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
