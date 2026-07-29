import type { PageServerLoad } from './$types';
import { marked } from 'marked';

// Inlined at build time with `?raw`. Reading these from disk at request time
// breaks on serverless hosts, where `src` is not part of the deployed bundle.
import firstData from '$lib/docs/usage/first.md?raw';
import secondData from '$lib/docs/usage/second.md?raw';
import thirdData from '$lib/docs/usage/third.md?raw';
import fourthData from '$lib/docs/usage/fourth.md?raw';
import fifthData from '$lib/docs/usage/fifth.md?raw';

export const load: PageServerLoad = () => {
	return {
		first: marked.parse(firstData),
		second: marked.parse(secondData),
		third: marked.parse(thirdData),
		fourth: marked.parse(fourthData),
		fifth: marked.parse(fifthData)
	};
};
