<script lang="ts">
	import { Character } from "../../types";

	let { character }: { character: Character } = $props();
</script>

<ul>
	<li>Name: {character.name}</li>
	<li>Background: {character.background}</li>
	<li>Ancestry: {character.ancestry}</li>
</ul>
