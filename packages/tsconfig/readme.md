# @keychord/tsconfig

The base `tsconfig.json` chord packages should extend from. See [./src/tsconfig.jsonc](./src/tsconfig.jsonc) for details.

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
