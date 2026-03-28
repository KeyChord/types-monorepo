# @keychord/types

The type definitions for authoring chord packages.

You probably don't need this package directly, and should instead modify your `tsconfig.json` to extend [@keychord/tsconfig](https://github.com/KeyChord/tsconfig) instead.

## Usage

First, install the package:

```bash
vp add -D @keychord/types
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

Combinations of keys are separated by `+`, such as `CommandLeft+ShiftLeft+KeyP` (or in alias form, `cmd+shift+p`).

### registerGlobalHotkey(bundleId, hotkeyId)

Registers a global hotkey from the global hotkey pool for the application with the given bundle ID. The global hotkey pool consists of modifier + key combinations that are unlikely to conflict with existing shortcuts (e.g. `ctrl+option+shift+cmd+f1`).

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

The bundle ID of the application to register the hotkey for.

#### hotkeyId

Type: `string`

A unique identifier for this hotkey (scoped to the bundle ID).

### onAppLaunch(bundleId, callback)

Registers a callback that is called whenever the application with the given bundle ID is launched.

Returns a `() => void` unsubscribe function that can be called to unregister the callback.

#### bundleId

Type: `string`

The bundle ID of the application to register the hotkey for.

#### callback

Type: `(app: { pid: number, bundleId: string }) => void`

A callback function that is called whenever the application with the given bundle ID is launched. The callback receives an object containing the `pid` (process ID) and `bundleId` of the launched application.

### onAppTerminate(bundleId, callback)

Registers a callback that is called whenever the application with the given bundle ID is terminated.

Returns a `() => void` unsubscribe function that can be called to unregister the callback.

#### bundleId

Type: `string`

The bundle ID of the application to register the hotkey for.

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

## Types

### Chord

```ts
export type Chord = {
  name: string;
  shortcut?: string;
  shell?: string;
  args?: string[];
} & Record<string, any>;
```

Represents a chord definition from a Chord TOML file.

## Globals

### `import.meta.bundleId`

Type: `string`

Represents the bundle ID targeted by the current Chord TOML file. Only available inside the inline JavaScript inside the `config.js.module` property.

### `import.meta.chords`

Type: `Record<string, Chord>`

Represents the parsed `chords` table inside the current Chord TOML file. Only available inside the inline JavaScript inside the `config.js.module` property.
