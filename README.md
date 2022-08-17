# svelte-multicssclass

before:

```html
<label
  class:text-gray-500="{isValid}"
  class:bg-gray-50="{isValid}"
  class:border-gray-300="{isValid}"
>
  text
</label>
```

after:

```html
<label class:text-gray-500;bg-gray-50;border-gray-300="{isValid}">text</label>
<!-- OR -->

<label class:text-gray-500,bg-gray-50,border-gray-300="{isValid}">text</label>

<!-- OR -->

<label class:text-gray-500|bg-gray-50|border-gray-300="{isValid}">text</label>
```

&nbsp;

### Usage

```ts
// vite.config.js

import { sveltekit } from '@sveltejs/kit/vite';
import { multicssclass } from 'svelte-multicssclass';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [multicssclass(), sveltekit()],
};

export default config;
```

or with a given separator

```ts
// vite.config.js

import { sveltekit } from '@sveltejs/kit/vite';
import { multicssclass } from 'svelte-multicssclass';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [multicssclass({ sep: '@' }), sveltekit()],
};

export default config;
```
