# @keychord/tsconfig

The base `tsconfig.json` chord packages should extend from. See [./src/tsconfig.jsonc](./src/tsconfig.jsonc) for details.

The published package vendors `bun-types` 1.4.1 to match the Bun version embedded by
`rbun`, along with `@types/node` and `undici-types`. Consumers do not need to install
these packages separately. Update the exact `bun-types` version when upgrading
rbun's Bun runtime, and rebuild with the committed lockfile to keep the bundled
declarations reproducible.

## Usage

First, install the package from npm:

```bash
vp add -D @keychord/tsconfig
```

Then, in your `tsconfig.json`, set the `extends` field to `@keychord/tsconfig`:

```jsonc
{
  "extends": "@keychord/tsconfig",
  // ...
}
```
