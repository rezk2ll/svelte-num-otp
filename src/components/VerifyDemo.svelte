<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SvelteOtp from '$lib/components/SvelteOtp.svelte';
	import { digitClass, rowClass } from './otp-theme';

	const LIFETIME = 60;
	const phone = '+33 6 12 •• •• 06';

	let entry = $state('');
	let sentCode = $state('');
	let delivered = $state(false);
	let remaining = $state(LIFETIME);
	let shaking = $state(false);
	// Latched once a code checks out. Without it, editing a digit after success drops back
	// to a countdown whose ticker has already been stopped, frozen at whatever it read.
	let settled = $state(false);

	let ticker: ReturnType<typeof setInterval> | undefined;
	let delivery: ReturnType<typeof setTimeout> | undefined;

	const expired = $derived(!settled && remaining <= 0);
	const live = $derived(!settled && !expired);
	const matched = $derived(live && entry.length === 6 && entry === sentCode);
	const verified = $derived(settled || matched);
	const rejected = $derived(live && entry.length === 6 && entry !== sentCode);

	const clock = $derived(
		`${Math.floor(Math.max(remaining, 0) / 60)}:${String(Math.max(remaining, 0) % 60).padStart(2, '0')}`
	);

	const digits = $derived(
		verified
			? `${digitClass} border-success/70 text-success`
			: rejected
				? `${digitClass} border-danger/70 text-danger`
				: digitClass
	);

	function send() {
		clearTimeout(delivery);
		clearInterval(ticker);

		entry = '';
		sentCode = String(Math.floor(Math.random() * 900000) + 100000);
		settled = false;
		delivered = false;
		remaining = LIFETIME;

		// The code takes a moment to land, the way a real one does.
		delivery = setTimeout(() => (delivered = true), 600);
		ticker = setInterval(() => (remaining -= 1), 1000);
	}

	function fill() {
		entry = sentCode;
	}

	// A correct code and a lapsed one both end the attempt: stop the clock, drop the message.
	$effect(() => {
		if (!matched && !expired) return;
		if (matched) settled = true;
		clearInterval(ticker);
		delivered = false;
	});

	$effect(() => {
		// Clearing on the way out matters as much as setting on the way in: leaving the class
		// applied means the next wrong code toggles nothing and the animation never replays.
		if (!rejected) {
			shaking = false;
			return;
		}
		shaking = true;
		const reset = setTimeout(() => (shaking = false), 420);
		return () => clearTimeout(reset);
	});

	onMount(send);

	onDestroy(() => {
		clearInterval(ticker);
		clearTimeout(delivery);
	});
</script>

<div class="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/[0.03] sm:p-7">
	<!--
		Height is reserved while a code is in play, so the arriving message never pushes the
		inputs around. Once the number is verified the slot collapses and the card tidies up.
	-->
	<div class="flex items-start justify-end {verified ? '' : 'mb-6 min-h-[4.5rem]'}">
		{#if delivered}
			<div
				class="flex w-full max-w-[19rem] animate-message-in items-start gap-3 rounded-xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur"
			>
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
					</svg>
				</div>
				<div class="min-w-0 flex-1">
					<p class="flex items-baseline gap-2 text-xs text-muted-foreground">
						<span class="font-medium text-foreground">Messages</span>
						<span>now</span>
					</p>
					<p class="mt-0.5 text-sm leading-5">
						<span class="font-mono font-medium tabular-nums">{sentCode}</span> is your verification code.
					</p>
				</div>
				<button
					type="button"
					onclick={fill}
					class="shrink-0 rounded-md border border-border px-2 py-1 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
				>
					Fill
				</button>
			</div>
		{/if}
	</div>

	<p class="eyebrow">Verify your number</p>
	<p class="mt-2 text-sm text-muted-foreground">
		Enter the 6-digit code sent to <span class="font-mono text-foreground">{phone}</span>, or paste
		it into any box.
	</p>

	<div class="mt-6 flex justify-center" class:animate-shake={shaking}>
		<SvelteOtp
			bind:value={entry}
			disableDefaultStyle
			wrapperClass={rowClass}
			inputClass={digits}
			placeholder="------"
			autofocus={false}
		/>
	</div>

	<div
		class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm"
	>
		<p aria-live="polite" class="min-h-[1.25rem]">
			{#if verified}
				<span class="inline-flex items-center gap-1.5 font-medium text-success">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="m20 6-11 11-5-5" />
					</svg>
					Number verified
				</span>
			{:else if rejected}
				<span class="font-medium text-danger">That code doesn't match.</span>
			{:else if expired}
				<span class="text-muted-foreground">The code expired. Send a new one.</span>
			{:else if entry.length}
				<span class="text-muted-foreground tabular-nums">{entry.length} of 6 digits</span>
			{:else}
				<span class="text-muted-foreground">Waiting for the code</span>
			{/if}
		</p>

		<div class="flex items-center gap-3">
			{#if live && !verified}
				<span
					class="font-mono text-xs tabular-nums {remaining <= 15
						? 'text-warn'
						: 'text-muted-foreground'}"
				>
					expires in {clock}
				</span>
			{/if}
			<button
				type="button"
				onclick={send}
				class="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				{verified ? 'Run it again' : 'Send a new code'}
			</button>
		</div>
	</div>
</div>
