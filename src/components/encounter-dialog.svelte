<script lang="ts">
	import type Shadowdark from "../main";
	import { executeDiceRoll, marshalDiceRoll } from "../types/dice-roll";
	import type { EncounterTable } from "../types/encounter-table";
	import Dialog from "./dialog.svelte";

	let { scope }: { scope: Shadowdark } = $props();

	let encounter = $state<EncounterTable["encounters"][0]>();

	let dialog = $state<ReturnType<typeof Dialog>>();

	export function showModal(e: EncounterTable["encounters"][0]) {
		encounter = e;
		dialog?.showModal();
	}

	export function close() {
		dialog?.close();
	}
</script>

<Dialog bind:this={dialog}>
	{#if encounter}
		<article>
			<header>
				<h2>Encounter</h2>
				{#if encounter.monsters}
					<button
						onclick={async () => {
							const file = [encounter!.description];

							encounter!.monsters?.forEach((m) => {
								const monster = scope.monsters[m.id];
								if (monster) {
									const x =
										typeof m.quantity === "number"
											? m.quantity
											: executeDiceRoll(m.quantity);
									for (let i = 0; i < x; i++) {
										const snapshot = monster.instance;
										snapshot.name += ` ${i + 1}`;
										file.push(snapshot.marshal());
									}
								}
							});

							let path = `Encounter.md`;
							let i = 2;
							while (scope.app.vault.getAbstractFileByPath(path)) {
								path = `Encounter ${i++}.md`;
							}

							const shopFile = await scope.app.vault.create(
								path,
								file.join("\n"),
							);

							await scope.app.workspace
								.getLeaf(true)
								.openFile(shopFile, { state: { mode: "preview" } });

							dialog?.close();
						}}
					>
						Run Encounter
					</button>
				{/if}
			</header>
			<div class="details">
				{encounter.description || encounter.title}
			</div>
			{#if encounter.monsters}
				<ul>
					<li>
						<span>Monsters:</span>
					</li>
					{#each encounter.monsters as m}
						{@const monster = scope.monsters[m.id]}
						{#if monster}
							<li>
								<span>
									- {typeof m.quantity === "number"
										? `${m.quantity}x`
										: marshalDiceRoll(m.quantity)}
									{monster.name}
								</span>
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
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
	}

	header {
		height: 2.6rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		padding: 0;
		margin: 0 0 1rem 0;
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

	.details {
		background-color: var(--background-secondary);
		border-radius: var(--radius-s);
		border: var(--border-width) solid var(--background-modifier-border);
		padding: 0.4rem 0.6rem;
		margin-bottom: 1rem;
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
