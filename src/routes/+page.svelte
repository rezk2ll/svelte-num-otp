<script lang="ts">
	import SvelteOtp from '$lib/components/SvelteOtp.svelte';
	import CodeBlock from '../components/CodeBlock.svelte';
	import Example from '../components/Example.svelte';
	import InstallTabs from '../components/InstallTabs.svelte';
	import PropsTable from '../components/PropsTable.svelte';
	import SectionNav from '../components/SectionNav.svelte';
	import VerifyDemo from '../components/VerifyDemo.svelte';
	import { digitClass, rowClass } from '../components/otp-theme';
	import { version } from '../../package.json';

	const sections = [
		{ id: 'installation', label: 'Installation' },
		{ id: 'basic', label: 'Basic usage' },
		{ id: 'binding', label: 'Binding the value' },
		{ id: 'separators', label: 'Separators' },
		{ id: 'styling', label: 'Styling' },
		{ id: 'accessibility', label: 'Accessibility' },
		{ id: 'api', label: 'API' }
	];

	const traits = [
		{
			title: 'Paste anywhere',
			body: 'A code dropped into any box spreads across the rest, from the clipboard or a mobile keyboard suggestion.'
		},
		{
			title: 'Keyboard first',
			body: 'Arrow keys walk the boxes, backspace on an empty one steps back, and anything that is not a digit never lands.'
		},
		{
			title: 'Labelled for real',
			body: 'Every box carries its own accessible name and asks for the one-time code, which is what mobile autofill needs.'
		}
	];

	const importCode = `<script>
	import SvelteOtp from 'svelte-num-otp';
<\/script>`;

	const basicCode = `<SvelteOtp />`;

	const bindingCode = `<script>
	import SvelteOtp from 'svelte-num-otp';

	let code = $state('');
<\/script>

<SvelteOtp numOfInputs={5} bind:value={code} />`;

	const separatorCode = `<SvelteOtp separator="-" placeholder="######" />`;

	const middleSeparatorCode = `<SvelteOtp separator="/" onlyShowMiddleSeparator />`;

	const stylingCode = `<SvelteOtp
	disableDefaultStyle
	wrapperClass="${rowClass}"
	inputClass="${digitClass}"
/>`;

	const accessibilityCode = `<SvelteOtp ariaLabel={(index, total) => \`Chiffre \${index} sur \${total}\`} />`;

	let bound = $state('12345');
	let separated = $state('');
	let middle = $state('');
	let styled = $state('');
</script>

<svelte:head>
	<title>svelte-num-otp | One-time-code input for Svelte</title>
	<meta
		name="description"
		content="A numeric one-time-code input for Svelte 5. Multi-box paste, mobile autofill, keyboard editing, and styling that gets out of your way."
	/>
</svelte:head>

<section class="relative overflow-hidden border-b border-border">
	<div class="dot-field pointer-events-none absolute inset-0" aria-hidden="true"></div>

	<div class="relative mx-auto max-w-shell px-4 py-16 sm:px-8 sm:py-24">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<div class="animate-rise-in">
				<div class="flex items-center gap-2">
					<span class="eyebrow">for svelte 5</span>
					<span
						class="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
					>
						v{version}
					</span>
				</div>

				<h1 class="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
					Paste it. Autofill it.<br />
					<span class="text-muted-foreground">Type it.</span>
				</h1>

				<p class="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
					A numeric one-time-code input for Svelte that handles the parts people get wrong: a code
					pasted into any box, autofill on mobile, arrow-key editing, and a real label on every
					input.
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-3">
					<a
						href="#installation"
						class="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
					>
						Get started
					</a>
					<a
						href="https://github.com/rezk2ll/svelte-num-otp"
						target="_blank"
						rel="noreferrer"
						class="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						View source
					</a>
				</div>
			</div>

			<div class="animate-rise-in [animation-delay:120ms]">
				<VerifyDemo />
			</div>
		</div>
	</div>
</section>

<section class="border-b border-border">
	<dl class="mx-auto grid max-w-shell gap-px bg-border sm:grid-cols-3">
		{#each traits as trait (trait.title)}
			<div class="bg-background px-4 py-6 sm:px-8">
				<dt class="text-sm font-medium">{trait.title}</dt>
				<dd class="mt-1.5 text-sm leading-6 text-muted-foreground">{trait.body}</dd>
			</div>
		{/each}
	</dl>
</section>

<div class="mx-auto max-w-[64rem] px-4 sm:px-8">
	<div class="gap-14 py-14 sm:py-20 lg:grid lg:grid-cols-[minmax(0,1fr)_12rem]">
		<div class="min-w-0 space-y-16">
			<section id="installation">
				<h2 class="text-2xl font-semibold tracking-tight">Installation</h2>
				<p class="mt-3 leading-7 text-muted-foreground">
					One package, no dependencies beyond Svelte itself.
				</p>
				<div class="mt-6 space-y-4">
					<InstallTabs />
					<div class="overflow-hidden rounded-xl border border-border bg-card">
						<CodeBlock code={importCode} />
					</div>
				</div>
			</section>

			<section id="basic">
				<h2 class="text-2xl font-semibold tracking-tight">Basic usage</h2>
				<p class="mt-3 leading-7 text-muted-foreground">
					Six boxes, arrow-key navigation and paste support, with nothing configured. The built-in
					styling is one thin border, so it stays out of the way of yours.
				</p>
				<div class="mt-6">
					<Example code={basicCode} surface="paper">
						<SvelteOtp autofocus={false} />
					</Example>
				</div>
			</section>

			<section id="binding">
				<h2 class="text-2xl font-semibold tracking-tight">Binding the value</h2>
				<p class="mt-3 leading-7 text-muted-foreground">
					<code class="font-mono text-[0.8125rem] text-foreground">value</code> is bindable and
					always holds the digits currently in the boxes. Set how many there are with
					<code class="font-mono text-[0.8125rem] text-foreground">numOfInputs</code>.
				</p>
				<div class="mt-6">
					<Example code={bindingCode} surface="paper">
						<SvelteOtp numOfInputs={5} bind:value={bound} autofocus={false} />
						{#snippet status()}
							value: {bound || '(empty)'}
						{/snippet}
					</Example>
				</div>
			</section>

			<section id="separators">
				<h2 class="text-2xl font-semibold tracking-tight">Separators and placeholders</h2>
				<p class="mt-3 leading-7 text-muted-foreground">
					<code class="font-mono text-[0.8125rem] text-foreground">separator</code> draws a
					character between the boxes, and
					<code class="font-mono text-[0.8125rem] text-foreground">placeholder</code> is spread one character
					per box.
				</p>
				<div class="mt-6 space-y-4">
					<Example code={separatorCode} surface="paper">
						<SvelteOtp
							separator="-"
							placeholder="######"
							bind:value={separated}
							autofocus={false}
						/>
					</Example>
					<p class="leading-7 text-muted-foreground">
						Or draw it once, in the middle, the way a code is usually read out.
					</p>
					<Example code={middleSeparatorCode} surface="paper">
						<SvelteOtp
							separator="/"
							onlyShowMiddleSeparator
							bind:value={middle}
							autofocus={false}
						/>
					</Example>
				</div>
			</section>

			<section id="styling">
				<h2 class="text-2xl font-semibold tracking-tight">Styling</h2>
				<p class="mt-3 leading-7 text-muted-foreground">
					<code class="font-mono text-[0.8125rem] text-foreground">disableDefaultStyle</code> drops
					the built-in border and the flex row, leaving bare inputs. From there
					<code class="font-mono text-[0.8125rem] text-foreground">wrapperClass</code>,
					<code class="font-mono text-[0.8125rem] text-foreground">inputClass</code> and
					<code class="font-mono text-[0.8125rem] text-foreground">separatorClass</code> take whatever
					you throw at them. The boxes at the top of this page are this exact code.
				</p>
				<div class="mt-6">
					<Example code={stylingCode}>
						<SvelteOtp
							disableDefaultStyle
							wrapperClass={rowClass}
							inputClass={digitClass}
							bind:value={styled}
							autofocus={false}
						/>
					</Example>
				</div>
			</section>

			<section id="accessibility">
				<h2 class="text-2xl font-semibold tracking-tight">Accessibility and autofill</h2>
				<p class="mt-3 leading-7 text-muted-foreground">
					Each box is labelled <span class="font-mono text-[0.8125rem] text-foreground"
						>Digit 3 of 6</span
					>
					by default, and each one carries
					<code class="font-mono text-[0.8125rem] text-foreground"
						>autocomplete="one-time-code"</code
					>. That second part matters: iOS and Android only offer a code they just received when
					every input asks for it, not only the first.
				</p>
				<p class="mt-3 leading-7 text-muted-foreground">
					Pass <code class="font-mono text-[0.8125rem] text-foreground">ariaLabel</code> to translate
					the label or word it differently.
				</p>
				<div class="mt-6 overflow-hidden rounded-xl border border-border bg-card">
					<!-- Highlighted as JS: the `=>` in the callback closes the tag for the markup
					     grammar, which leaves the whole template literal unstyled. -->
					<CodeBlock code={accessibilityCode} lang="javascript" />
				</div>
			</section>

			<section id="api">
				<h2 class="text-2xl font-semibold tracking-tight">API</h2>
				<p class="mt-3 leading-7 text-muted-foreground">
					Every prop, and what it falls back to when you leave it alone.
				</p>
				<div class="mt-6">
					<PropsTable />
				</div>
			</section>
		</div>

		<aside class="hidden lg:block">
			<SectionNav {sections} />
		</aside>
	</div>
</div>
