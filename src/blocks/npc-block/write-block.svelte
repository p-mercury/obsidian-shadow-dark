<script lang="ts">
	import type { Npc } from "../../types/npc";

	let {
		npc,
		onSave,
	}: {
		npc: Npc;
		onSave?: (npc: Npc) => void;
	} = $props();

	let draft = $state(npc);

	let saveTimeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		const currentDraft = JSON.stringify(draft);
		const original = JSON.stringify(npc);

		if (currentDraft !== original) {
			clearTimeout(saveTimeout);

			saveTimeout = setTimeout(() => {
				onSave?.($state.snapshot(draft));
			}, 500);
		}
	});
</script>

<div>
	<label>
		Name
		<input bind:value={draft.name} />
	</label>
	<p><strong>Ancestry:</strong> {draft.ancestry}</p>
</div>
