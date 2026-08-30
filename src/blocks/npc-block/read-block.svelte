<script lang="ts">
	import { getAgeName } from "../../types/age";
	import { getAncestryName } from "../../types/ancestry";
	import type { Npc } from "../../types/npc";
	import { getOccupationName } from "../../types/occupation";
	import { getWealthName } from "../../types/wealth";

	let { npc }: { npc: Npc } = $props();
</script>

<article>
	<h2 class="papyros">
		{npc.name}
	</h2>
	<span class="subtitle">
		{getAncestryName(npc.ancestry)}
		{getOccupationName(npc.occupation)}
	</span>
	<div class="info papyros">
		<span>Age: {getAgeName(npc.age)}</span>
		<span>Wealth: {getWealthName(npc.wealth)}</span>
	</div>
</article>

<style>
	article {
		font-family: PlaypenSans;
		background-color: #261a14;
		color: #261a14;
		border-radius: 1rem;
		padding: 0.6rem;
		display: grid;
		grid-auto-flow: row;
		gap: 0.6rem;
		width: 100%;
		max-width: 30rem;
	}

	h2 {
		border-radius: 0.4rem;
		font-weight: 600;
		font-size: 1.2rem;
		padding: 0.4rem;
		margin: 0;
		text-align: center;
	}

	.subtitle {
		border-radius: 0.4rem;
		color: #dec173;
		font-weight: 500;
		font-size: 0.8rem;
		padding: 0;
		margin: 0;
		text-align: center;
	}

	.info {
		border-radius: 0.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.4rem;
		margin: 0;
	}

	.papyros {
		position: relative;
		color: #3e2723;
		filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.6));
	}

	.papyros::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;

		/* Inherit the rounded corners from the parent article */
		border-radius: inherit;

		/* Base paper color */
		background-color: #e8d7a7;
		background-size: cover;

		background-image:
            /* 1. General Paper Grit (Small, even noise) */
			url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E"),
			/* 2. Vertical Organic Fibers */
			url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='vFibers'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.2 0.01' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23vFibers)' opacity='0.08'/%3E%3C/svg%3E"),
			/* 3. Horizontal Organic Fibers */
			url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='hFibers'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01 0.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23hFibers)' opacity='0.08'/%3E%3C/svg%3E"),
			/* 4. Vignette / Darkened edges */
			radial-gradient(
					ellipse at center,
					transparent 40%,
					rgba(160, 110, 60, 0.6) 100%
				);
	}
</style>
