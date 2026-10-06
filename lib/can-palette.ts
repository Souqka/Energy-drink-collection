export type CanMotif = "violet" | "classic" | "mango" | "rush" | "tropical" | "white" | "fallback"

export type CanPalette = {
  motif: CanMotif
  bodyDeep: string
  body: string
  bodyLight: string
  label: string
  accent: string
  accent2: string
  ink: string
  muted: string
  light: boolean
}

const KNOWN: Record<string, CanPalette> = {
  "monster ultra violet": {
    motif: "violet",
    bodyDeep: "#120814",
    body: "#2a1238",
    bodyLight: "#5b3480",
    label: "#160a1e",
    accent: "#8b5cf6",
    accent2: "#ddd6fe",
    ink: "#f7f3ff",
    muted: "#c4b5fd",
    light: false,
  },
  "red bull original": {
    motif: "classic",
    bodyDeep: "#071433",
    body: "#12306a",
    bodyLight: "#3d6ec4",
    label: "#efece4",
    accent: "#d0122d",
    accent2: "#e2b340",
    ink: "#102454",
    muted: "#5d6d8f",
    light: true,
  },
  "monster mango loco": {
    motif: "mango",
    bodyDeep: "#140c06",
    body: "#2c180c",
    bodyLight: "#6a3d16",
    label: "#ffb703",
    accent: "#fb5607",
    accent2: "#2f6d4f",
    ink: "#1c1108",
    muted: "#7a4514",
    light: true,
  },
  "adrenaline rush original": {
    motif: "rush",
    bodyDeep: "#140206",
    body: "#4a0d16",
    bodyLight: "#8d2434",
    label: "#1a060a",
    accent: "#e11d2e",
    accent2: "#f4f4f5",
    ink: "#fff6f6",
    muted: "#ffb3bb",
    light: false,
  },
  "red bull tropical": {
    motif: "tropical",
    bodyDeep: "#042228",
    body: "#0d4a46",
    bodyLight: "#1f8f78",
    label: "#ffe08a",
    accent: "#0e8f86",
    accent2: "#0a3a66",
    ink: "#14241c",
    muted: "#3f5e50",
    light: true,
  },
  "monster ultra white": {
    motif: "white",
    bodyDeep: "#b7c6d4",
    body: "#e7eef5",
    bodyLight: "#ffffff",
    label: "#f8fbff",
    accent: "#7ec8e3",
    accent2: "#1d4e89",
    ink: "#16324f",
    muted: "#5d7c99",
    light: true,
  },
}

const FALLBACKS: CanPalette[] = [
  {
    motif: "fallback",
    bodyDeep: "#1a0c10",
    body: "#3c1822",
    bodyLight: "#7a3044",
    label: "#240e14",
    accent: "#ff5a6a",
    accent2: "#ffd0d6",
    ink: "#fff5f6",
    muted: "#f0b8c0",
    light: false,
  },
  {
    motif: "fallback",
    bodyDeep: "#06121c",
    body: "#14324c",
    bodyLight: "#3d7eae",
    label: "#0e2233",
    accent: "#49b6ff",
    accent2: "#d7f1ff",
    ink: "#f3fbff",
    muted: "#b7d7ea",
    light: false,
  },
  {
    motif: "fallback",
    bodyDeep: "#10160a",
    body: "#243816",
    bodyLight: "#5d8a32",
    label: "#17240e",
    accent: "#b6e36a",
    accent2: "#f4ffd8",
    ink: "#f7ffea",
    muted: "#d5e8b0",
    light: false,
  },
  {
    motif: "fallback",
    bodyDeep: "#1a1208",
    body: "#3d2a12",
    bodyLight: "#a06a2c",
    label: "#241808",
    accent: "#f0a202",
    accent2: "#ffe7ad",
    ink: "#fff8ea",
    muted: "#f0d7a4",
    light: false,
  },
  {
    motif: "fallback",
    bodyDeep: "#120818",
    body: "#321848",
    bodyLight: "#7a4ea6",
    label: "#1c0e28",
    accent: "#c084fc",
    accent2: "#f3e8ff",
    ink: "#faf5ff",
    muted: "#e0d0f4",
    light: false,
  },
]

function normalizeKey(brand: string, flavor: string) {
  return `${brand} ${flavor}`.trim().toLowerCase().replace(/\s+/g, " ")
}

function hashString(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function paletteFor(brand: string, flavor: string): CanPalette {
  const key = normalizeKey(brand, flavor)
  return KNOWN[key] ?? FALLBACKS[hashString(key) % FALLBACKS.length]
}
