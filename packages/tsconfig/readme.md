# @keychord/tsconfig

The base `tsconfig.json` chord packages should extend from. See [./src/tsconfig.jsonc](./src/tsconfig.jsonc) for details.

> [!NOTE]
> This section is largely AI-written, so parts of it may not be fully accurate. It will be replaced with a hand-written version when I get the time.

The package vendors `bun-types` 1.4.3, matching the Bun version embedded by
[`rbun`](https://github.com/KeyChord/rbun), along with `@types/node` and `undici-types`, and
selects them with `"types": ["bun-types"]`. Consumers do not need to install these packages
separately. If you set your own `types`, keep `"bun-types"` in the list. Because the config sets
`typeRoots`, TypeScript looks up `types` entries only in the vendored declarations and in your
`node_modules/@types`.

When upgrading rbun's Bun runtime, update the exact `bun-types` version in the root
`pnpm-workspace.yaml` catalog and rebuild with the committed lockfile to keep the bundled
declarations reproducible.

## Usage

First, install the package from npm:

```bash
bun add -d @keychord/tsconfig
```

Then, in your `tsconfig.json`, set the `extends` field to `@keychord/tsconfig`:

```jsonc
{
  "extends": "@keychord/tsconfig",
  // ...
}
```
