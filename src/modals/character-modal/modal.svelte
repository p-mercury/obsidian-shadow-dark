<script lang="ts">
	import type { Pc } from "../../types/pc";

	let { character }: { character: Pc } = $props();
</script>

<ul>
	<li>Name: {character.name}</li>
	<li>Background: {character.background}</li>
	<li>Ancestry: {character.ancestry}</li>
</ul>
