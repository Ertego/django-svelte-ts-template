# django-svelte-ts-template

A template for using Svelte, TypeScript and Django together

## Supported Features
- URL resolution from TS, using a modified version of [django-js-reverse](https://github.com/ierror/django-js-reverse)
```js
import {Urls} from "./reverse";

let url: string = Urls["namespace:name"]("String", 8);
```
- Svelte init from ts via js glue code (see main.ts and glue/SvelteImports.d.ts)

## Not working
- Auto Reload, you have to run `npm run dev` when you made changes
