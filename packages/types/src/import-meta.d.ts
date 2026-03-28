declare global {
  interface ImportMeta {
    chords: Record<string, import("chord").Chord>;
    bundleId: string;
  }
}

export {};
