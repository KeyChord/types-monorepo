# Development

We use [Vite+](https://viteplus.dev/guide/#install-vp) for development.

## Build

```bash
vp build
```

1. Takes the `tsconfig.jsonc` and transforms it into a root `tsconfig.json` file.
2. Inlines `@keychord/types` into `lib/` (ideally we should just add `@keychord/types` as a dependency but I have no idea how to reference this dependency from our `tsconfig.json`).
