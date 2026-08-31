<script lang="ts">
	import { marshalNpc, type Npc } from "../../types/npc";

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
		const currentDraft = marshalNpc(draft);
		const original = marshalNpc(npc);
		if (currentDraft !== original) {
			window.clearTimeout(saveTimeout);
			saveTimeout = window.setTimeout(() => {
				onSave?.($state.snapshot(draft));
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
