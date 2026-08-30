<script lang="ts">
	import { getAncestryName } from "../../types/ancestry";
	import type { Pc } from "../../types/pc";
	import { getAlignmentName } from "../../types/alignment";
	import { getStatModifier } from "../../types/stat";
	import { getBackgroundName } from "../../types/background";

	let { pc }: { pc: Pc } = $props();
</script>

<article>
	<h2 class="papyros">
		<span>{pc.name}</span><span>{getAncestryName(pc.ancestry)}</span>
	</h2>
	<ul class="stats papyros">
		<li>
			<h3>STR</h3>
			<div>
				<span>{getStatModifier(pc.stats.strength)}</span>
				({pc.stats.strength})
			</div>
		</li>
		<li>
			<h3>DEX</h3>
			<div>
				<span>{getStatModifier(pc.stats.dexterity)}</span>
				({pc.stats.dexterity})
			</div>
		</li>
		<li>
			<h3>CON</h3>
			<div>
				<span>{getStatModifier(pc.stats.constitution)}</span>
				({pc.stats.constitution})
			</div>
		</li>
		<li>
			<h3>INT</h3>
			<div>
				<span>{getStatModifier(pc.stats.intelligence)}</span>
				({pc.stats.intelligence})
			</div>
		</li>
		<li>
			<h3>WIS</h3>
			<div>
				<span>{getStatModifier(pc.stats.wisdom)}</span>
				({pc.stats.wisdom})
			</div>
		</li>
		<li>
			<h3>CHA</h3>
			<div>
				<span>{getStatModifier(pc.stats.charisma)}</span>
				({pc.stats.charisma})
			</div>
		</li>
	</ul>
	<div class="info papyros">
		<span>Background:{getBackgroundName(pc.background)}</span>
		<span>Alignment: {getAlignmentName(pc.alignment)}</span>
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
		display: flex;
		justify-content: space-between;
	}

	.stats {
		all: unset;
		display: grid;
		grid-auto-flow: column;
		border-radius: 0.4rem;
		padding: 0.4rem;

		li {
			all: unset;
			display: flex;
			flex-direction: column;

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
