# Development

This repo uses [Vite+](https://viteplus.dev) with pnpm for development.

## Building

Run `vp pack` in a package directory to build that package.

> [!NOTE]
> This section is largely AI-written, so parts of it may not be fully accurate. It will be replaced with a hand-written version when I get the time.

Install dependencies with `vp install` at the root. To build both packages at once, run `vp exec --filter './packages/*' vp pack` from the root.

## Testing

In `packages/tsconfig`, `vp run test` builds the package, packs it with `npm pack`, and type-checks a consumer project that extends it.

## Releasing

Releases use [Changesets](https://github.com/changesets/changesets). Add a changeset with `vp exec changeset`, apply the version bumps with `vp exec changeset version`, then run `vp run release` at the root, which builds both packages and runs `changeset publish`.
