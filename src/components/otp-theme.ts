// The classes the demo dresses SvelteOtp with. They live here so the styling
// example on the page can show the exact string it is rendering.
//
// The narrow widths below `sm` are load-bearing: six boxes plus five gaps have to fit the
// hero card on a phone, and the hero clips rather than scrolls. At w-10/gap-1.5 the row is
// 270px against the 286px a 360px-wide screen leaves inside the card.
export const rowClass = 'flex items-center gap-1.5 sm:gap-3';

export const digitClass =
	'h-14 w-10 rounded-lg border border-input bg-background text-center text-xl font-medium tabular-nums text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/40 focus:border-foreground/60 sm:w-12';
