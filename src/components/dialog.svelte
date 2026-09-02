<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		children,
		backgroundClose = true,
		secondary = false,
	}: {
		children: () => ReturnType<Snippet>;
		backgroundClose?: boolean;
		secondary?: boolean;
	} = $props();

	let dialog = $state<HTMLDialogElement>();
	let active = $state(false);
	let closeTimeout: NodeJS.Timeout | undefined;

	export function showModal() {
		active = true;
	}

	export function close() {
		active = false;
	}

	function onmousedown(event: MouseEvent) {
		if (!backgroundClose) return;
		if (event.target !== dialog) return;
		active = false;
	}

	$effect(() => {
		if (!dialog) return;
		if (active) {
			clearTimeout(closeTimeout);
			dialog.inert = true;
			dialog.showModal();
			dialog.inert = false;
		} else {
			closeTimeout = setTimeout(() => {
				dialog?.close();
			}, 300);
		}

		return () => clearTimeout(closeTimeout);
	});
</script>

<dialog bind:this={dialog} {onmousedown} class:active class:secondary>
	{@render children()}
</dialog>

<style>
	dialog {
		color: var(--text-normal);
		width: min-content;
		max-width: var(--modal-max-width);
		height: min-content;
		max-height: var(--modal-max-height);
		padding: 0;
		overflow: hidden;
		background-color: var(--modal-background);
		border: var(--modal-border-width) solid var(--modal-border-color);
		border-radius: var(--modal-radius);
		margin: auto;

		&.active {
			animation: dialog-fade-in 300ms ease forwards;
		}
		&:not(.active) {
			animation: dialog-fade-out 300ms forwards;
		}

		&.active::backdrop {
			animation: backdrop-fade-in 300ms ease forwards;
		}
		&:not(.active)::backdrop {
			animation: backdrop-fade-out 300ms forwards;
		}

		&.secondary {
			width: min(38rem, 90dvw);
			height: 70dvh;
			min-height: 32rem;
			max-height: 42rem;
		}

		@media screen and (max-width: 640px) {
			&.secondary {
				width: 90dvw;
				height: 80dvh;
				min-height: unset;
				max-height: 80dvh;
			}
		}
	}

	@keyframes dialog-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes dialog-fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes backdrop-fade-in {
		from {
			backdrop-filter: blur(0px);
			background: transparent;
		}
		to {
			backdrop-filter: blur(4px);
			background: rgba(0, 0, 0, 0.15);
		}
	}

	@keyframes backdrop-fade-out {
		from {
			backdrop-filter: blur(4px);
			background-color: rgba(0, 0, 0, 0.15);
		}
		to {
			backdrop-filter: blur(0px);
			background-color: transparent;
		}
	}
</style>
