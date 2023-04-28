import { sveltekit } from '@sveltejs/kit/vite';
import { multicssclass } from '../../src/plugin';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
	plugins: [
		multicssclass(),
		UnoCSS({
			mode: 'svelte-scoped',
			transformers: [transformerDirectives()],
			presets: [presetUno()]
		}),
		sveltekit()
	]
});
