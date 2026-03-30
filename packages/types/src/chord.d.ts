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

  export interface RawChordsFile {
    name: string;
    meta: Record<string, string>;
    handlers: Record<string, any>;
    imports: Array<{ file: string }>;
    chords: Record<string, any>;
  }

  export interface BuilderThis {
    chordsFile: RawChordsFile
  }
}
