<script lang="ts">
	import { marshalPc, type Pc } from "../../types/pc";

	let {
		pc,
		onSave,
	}: {
		pc: Pc;
		onSave?: (pc: Pc) => void;
	} = $props();

	let draft = $state(pc);

	let saveTimeout: number | undefined;
	$effect(() => {
		const currentDraft = marshalPc(draft);
		const original = marshalPc(pc);
		if (currentDraft !== original) {
			window.clearTimeout(saveTimeout);
			saveTimeout = window.setTimeout(() => {
				onSave?.($state.snapshot(draft));
			}, 500);
		}
		return () => window.clearTimeout(saveTimeout);
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
