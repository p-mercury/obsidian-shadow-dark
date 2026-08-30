<script lang="ts">
	import type { Pc } from "../../types/pc";

	let {
		pc,
		onSave,
	}: {
		pc: Pc;
		onSave?: (pc: Pc) => void;
	} = $props();

	let draft = $state(pc);

	let saveTimeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		const currentDraft = JSON.stringify(draft);
		const original = JSON.stringify(pc);

		if (currentDraft !== original) {
			clearTimeout(saveTimeout);

			saveTimeout = setTimeout(() => {
				onSave?.($state.snapshot(draft));
			}, 500);
		}
	});
</script>

<div class="shadowdark-character">
	<label>
		Name
		<input bind:value={draft.name} />
	</label>

	<label>
		Hit points
		<input type="number" bind:value={draft.hitPoints} />
	</label>

	<label>
		Strength
		<input type="number" bind:value={draft.stats.strength} />
	</label>

	<p><strong>Background:</strong> {draft.background}</p>
	<p><strong>Ancestry:</strong> {draft.ancestry}</p>
</div>
