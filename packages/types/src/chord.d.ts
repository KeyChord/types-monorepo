declare module "chord" {
  export function tap(key: string): void;
  export function press(key: string): void;
  export function release(key: string): void;

  export function registerGlobalHotkey(bundleId: string, hotkeyId: string): string | undefined;

  export function getGlobalHotkey(bundleId: string, hotkeyId: string): string | undefined;

  export function onAppLaunch(
    bundleId: string,
    callback: (app: { pid: number; bundleId: string }) => void,
  ): () => void;

  export function onAppTerminate(bundleId: string, callback: () => void): () => void;

  export function setAppNeedsRelaunch(bundleId: string, needsRelaunch: boolean): void;

  /**
   * Absolute path of a file of the calling module's package, given relative to the package
   * root as authored (e.g. `bin/tool`). Vendored packages are remapped to where their folders
   * were copied. The file need not exist.
   */
  export function resolvePackageFile(importMeta: ImportMeta, relativePath: string): string;

  /**
   * Absolute path of the package's prebuilt Node-API addon
   * `target/<Chord's triple>/<relpath>/<stem>.node`, for `process.dlopen`
   * (e.g. `"menu"` -> `target/<triple>/menu/menu.node`).
   */
  export function resolveNativeModulePath(importMeta: ImportMeta, name: string): string;

  export interface RawChordsFile {
    name: string;
    meta: Record<string, string>;
    handlers: Record<string, any>;
    imports: Array<{ file: string }>;
    chords: Record<string, any>;
  }

  export interface BuilderThis {
    chordsFile: RawChordsFile
    chordsFilePath: string;
  }

  export interface HandlerThis {
    focusedAppId: string;
    input: string;
    event: ChordKeyboardEvent | null;
  }

  /** KeyboardEvent-compatible data captured from the native key event. */
  export interface ChordKeyboardEvent extends Event {
    readonly type: "keydown" | "keypress" | "keyup";
    readonly key: string;
    readonly code: string;
    readonly location: 0 | 1 | 2 | 3;
    readonly ctrlKey: boolean;
    readonly shiftKey: boolean;
    readonly altKey: boolean;
    readonly metaKey: boolean;
    readonly repeat: boolean;
    readonly isComposing: boolean;
    readonly timeStamp: number;
    readonly view: null;
    readonly detail: 0;
    getModifierState(keyArg: string): boolean;
  }
}
