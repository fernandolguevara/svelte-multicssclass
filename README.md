# svelte-multicssclass

[![npm version](https://badge.fury.io/js/svelte-multicssclass.svg)](https://badge.fury.io/js/svelte-multicssclass)

[![https://nodei.co/npm/svelte-multicssclass.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/svelte-multicssclass.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/svelte-multicssclass)

&nbsp;

before:

```html
<label
  class:text-gray-500="{isValid}"
  class:bg-gray-50="{isValid}"
  class:border-gray-300="{isValid}"
  class:text-red-700="{!isValid}"
  class:bg-red-50="{!isValid}"
  class:border-red-300="{!isValid}"
>
  text
</label>
```

alter:

```html
<label
  class:text-gray-500;bg-gray-50;border-gray-300;;text-red-700;bg-red-50;border-red-300="{isValid}"
>
  text
</label>
```

### Usage

```sh
npm i -D svelte-multicssclass
```

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

after:

```html
<label class:text-gray-500;bg-gray-50;border-gray-300="{isValid}">text</label>

<!-- OR -->

<label class:text-gray-500,bg-gray-50,border-gray-300="{isValid}">text</label>

<!-- OR -->

<label class:text-gray-500|bg-gray-50|border-gray-300="{isValid}">text</label>

<!-- 2 separator chars generates NOT Operator -->

<label class:text-green-700;;text-red-700="{isValid}">text</label>

<!-- OR -->

<label class:text-green-700,,text-red-700="{isValid}">text</label>

<!-- OR -->

<label class:text-green-700||text-red-700="{isValid}">text</label>
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

```html
<label class:text-gray-500@bg-gray-50@border-gray-300="{isValid}">text</label>

<!-- 2 separator chars generates NOT Operator -->

<label class:text-green-700@@text-red-700="{isValid}">text</label>
```
