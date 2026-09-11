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
		<span><b>Level:</b> {_monster.level}</span>
		<span><b>Attacks:</b></span>
		<ul>
			{#each _monster.attacks as attack}
				<li>{attack}</li>
			{/each}
		</ul>
	</div>
	<ul class="stats">
		<li>
			<h3>HP</h3>
			<div>
				{typeof _monster.hitPoints === "number"
					? _monster.hitPoints
					: marshalDiceRoll(_monster.hitPoints)}
			</div>
		</li>
		<li>
			<h3>AC</h3>
			<div>{_monster.armorClass}</div>
		</li>
		<li>
			<h3>STR</h3>
			<div>
				{_monster.stats.strength}
			</div>
		</li>
		<li>
			<h3>DEX</h3>
			<div>
				{_monster.stats.dexterity}
			</div>
		</li>
		<li>
			<h3>CON</h3>
			<div>
				{_monster.stats.constitution}
			</div>
		</li>
		<li>
			<h3>INT</h3>
			<div>
				{_monster.stats.intelligence}
			</div>
		</li>
		<li>
			<h3>WIS</h3>
			<div>
				{_monster.stats.wisdom}
			</div>
		</li>
		<li>
			<h3>CHA</h3>
			<div>
				{_monster.stats.charisma}
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
