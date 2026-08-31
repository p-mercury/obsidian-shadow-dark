<script lang="ts">
	import { type Npc } from "../../types/npc.svelte";

	let {
		npc,
		onSave,
	}: {
		npc: Npc;
		onSave?: (npc: Npc) => void;
	} = $props();

	let draft = $state(npc);

	let saveTimeout: number | undefined;
	$effect(() => {
		const currentDraft = draft.marshal;
		const original = npc.marshal;
		if (currentDraft !== original) {
			window.clearTimeout(saveTimeout);
			saveTimeout = window.setTimeout(() => {
				onSave?.(draft);
			}, 500);
		}
		return () => window.clearTimeout(saveTimeout);
	});
</script>

<div>
	<label>
		Name
		<input bind:value={draft.name} />
	</label>
	<p><strong>Ancestry:</strong> {draft.ancestry}</p>
</div>

<div>
	<label>
		Name
		<input bind:value={draft.name} />
	</label>
	<p><strong>Ancestry:</strong> {draft.ancestry}</p>
</div>
