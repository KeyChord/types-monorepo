# Chord Types

> [!NOTE]
> This document is largely AI-written, so parts of it may not be fully accurate. It will be replaced with a hand-written version when I get the time.

The TypeScript setup for writing [Chord](https://github.com/KeyChord/Chord) packages. This monorepo contains two npm packages:

- [`@keychord/tsconfig`](./packages/tsconfig): the base `tsconfig.json` that chord packages extend. It vendors the Bun runtime declarations matching the Bun version Chord embeds through [rbun](https://github.com/KeyChord/rbun).
- [`@keychord/types`](./packages/types): declarations for Chord's built-in `chord` module and the `this` values Chord passes to handlers.

Install them in a chord package with `bun add -d @keychord/tsconfig @keychord/types`; each package's readme covers its setup. See [development.md](./development.md) for working on this repo.
