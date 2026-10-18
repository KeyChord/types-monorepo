# @keychord/types

The type definitions for authoring chord packages.

It declares Chord's built-in `chord` module; the Bun runtime types come from [@keychord/tsconfig](https://github.com/KeyChord/types-monorepo/tree/main/packages/tsconfig).

## Usage

First, install the package:

```bash
bun add -d @keychord/types
```

Then, add `@keychord/types` to the `types` array in your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "@keychord/types"
    ],
  },
}
```

## API

### press(key)

### release(key)

### tap(key)

Simulate a key event with the given `key`:

- **press** is equivalent to pressing _down_ the key
- **release** is equivalent to lifting _up_ the key
- **tap** is equivalent to a **press** immediately followed by a **release**

```ts
press("cmd+shift+p");
```

#### key

Type: `string`

A string representing the key (along with any modifier combinations).

The list of valid key strings is [based on Chromium](https://github.com/KeyChord/keycode-ts/blob/106f93f13f1a8ecf928ef114ac831b080e80a08a/src/generated.ts#L18).

Common key aliases are supported as well. Common ones include:

- Single character letters/numbers (`a`, `1`, etc.)
- `cmd` for `MetaLeft`
- `ctrl` for `ControlLeft`
- `alt` for `AltLeft`
- `shift` for `ShiftLeft`

Combinations of keys are separated by `+`, such as `MetaLeft+ShiftLeft+KeyP` (or in alias form, `cmd+shift+p`).

### registerGlobalHotkey(bundleId, hotkeyId)

Registers a global hotkey from the global hotkey pool for the application with the given bundle ID. The global hotkey pool consists of modifier + key combinations that are unlikely to conflict with existing shortcuts (e.g. `ctrl+option+shift+cmd+a`).

Returns a `string` representing the hotkey if it was successfully registered, or `undefined` if there was no more available global hotkeys.

#### bundleId

Type: `string`

The bundle ID of the application to register the hotkey for.

#### hotkeyId

Type: `string`

A unique identifier for this hotkey (scoped to the bundle ID).

### getGlobalHotkey(bundleId, hotkeyId)

Returns a `string` representing the key combination of the global hotkey matching the given hotkey ID. Returns `undefined` if a hotkey with the given ID hasn't been registered.

#### bundleId

Type: `string`

The bundle ID of the application the hotkey was registered for.

#### hotkeyId

Type: `string`

A unique identifier for this hotkey (scoped to the bundle ID).

### onAppLaunch(bundleId, callback)

Registers a callback that is called whenever the application with the given bundle ID is launched.

#### bundleId

Type: `string`

The bundle ID of the application to watch.

#### callback

Type: `(app: { pid: number, bundleId: string }) => void`

A callback function that is called whenever the application with the given bundle ID is launched. The callback receives an object containing the `pid` (process ID) and `bundleId` of the launched application.

### onAppTerminate(bundleId, callback)

Registers a callback that is called whenever the application with the given bundle ID is terminated.

Returns a `() => void` unsubscribe function that can be called to unregister the callback.

#### bundleId

Type: `string`

The bundle ID of the application to watch.

#### callback

Type: `(app: { pid: number, bundleId: string }) => void`

A callback function that is called whenever the application with the given bundle ID is terminated. The callback receives an object containing the `pid` (process ID) and `bundleId` of the terminated application.

### setAppNeedsRelaunch(bundleId, needsRelaunch)

Sets a flag indicating the application with the given bundle ID needs to be relaunched for changes to take effect.

#### bundleId

Type: `string`

The bundle ID of the application.

#### needsRelaunch

Type: `boolean`

Whether or not the application needs to be relaunched for changes to take effect (typically set to `true`).

> [!NOTE]
> This section is largely AI-written, so parts of it may not be fully accurate. It will be replaced with a hand-written version when I get the time.

### resolvePackageFile(importMeta, relativePath)

### resolveNativeModulePath(importMeta, name)

Return absolute paths inside the calling module's chord package, given its `import.meta`:

- **resolvePackageFile** resolves `relativePath` relative to the package root as authored (for example `bin/tool`). Vendored packages are remapped to where their folders were copied. The file doesn't need to exist.
- **resolveNativeModulePath** resolves the package's prebuilt Node-API add-on `target/<triple>/<name>/<name>.node` for the triple Chord runs on, for use with `process.dlopen`.

Chord also attaches the same helpers to every module it loads as `import.meta.chord.resolvePackageFile(relativePath)` and `import.meta.chord.resolveNative(name)` (not declared by this package). Handlers built with [@keychord/config](https://github.com/KeyChord/config) can import `.node` add-ons directly instead.

## Types

> [!NOTE]
> This section is largely AI-written, so parts of it may not be fully accurate. It will be replaced with a hand-written version when I get the time.

These interfaces are exported from the `chord` module:

- `HandlerThis`: the `this` value of a handler call: `focusedAppId`, `focusedWindowId` (the Core Graphics number of the window focused when the input started running, or `null`), `input` (the entered sequence) and `event` (a `ChordKeyboardEvent`, or `null` when there's no keyboard event, e.g. from the CLI).
- `BuilderThis`: the `this` value of the handler module's default export: `chordsFile` (the chord file's parsed TOML, typed as `RawChordsFile`) and `chordsFilePath`.
- `ChordKeyboardEvent`: the [KeyboardEvent](https://www.w3.org/TR/uievents/#interface-keyboardevent)-compatible snapshot of the key event (`type`, `key`, `code`, modifier flags, `repeat`, `getModifierState()`, ...).

```ts
import type { HandlerThis } from "chord";

export default function build() {
  return function handler(this: HandlerThis) {
    console.log(this.focusedAppId, this.input);
  };
}
```
