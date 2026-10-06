import { DEMO_DRINKS } from "@/lib/demo-data"
import { SHELF_COUNT, SLOTS_PER_SHELF } from "@/lib/cabinet"
import type { EnergyDrink } from "@/lib/types"

const STORAGE_KEY = "energy-drink-collection.v1"

/**
 * Browser collection store.
 * Swap this module for an API or spreadsheet adapter later;
 * the cabinet only depends on EnergyDrink records.
 */
export type CollectionStore = {
  load: () => EnergyDrink[]
  save: (drinks: EnergyDrink[]) => void
}

function localImage(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  if (!value.startsWith("/") || value.startsWith("//")) return undefined
  return value
}

function parseDrink(value: unknown): EnergyDrink | null {
  if (!value || typeof value !== "object") return null

  const drink = value as Record<string, unknown>
  const shelf = drink.shelf
  const slot = drink.slot
  const volumeMl = drink.volumeMl
  const rating = drink.rating

  if (typeof drink.id !== "string" || drink.id.length === 0) return null
  if (typeof drink.brand !== "string" || drink.brand.trim().length === 0) return null
  if (typeof drink.flavor !== "string" || drink.flavor.trim().length === 0) return null
  if (typeof drink.comment !== "string") return null
  if (typeof drink.createdAt !== "string") return null
  if (typeof shelf !== "number" || shelf < 1 || shelf > SHELF_COUNT) return null
  if (typeof slot !== "number" || slot < 1 || slot > SLOTS_PER_SHELF) return null
  if (typeof volumeMl !== "number" || volumeMl < 1 || volumeMl > 2000) return null
  if (typeof rating !== "number" || rating < 1 || rating > 10) return null

  return {
    id: drink.id,
    brand: drink.brand.trim(),
    flavor: drink.flavor.trim(),
    volumeMl: Math.round(volumeMl),
    rating: Math.round(rating),
    comment: drink.comment.trim(),
    image: localImage(drink.image),
    shelf,
    slot,
    createdAt: drink.createdAt,
  }
}

export function sanitizeCollection(input: unknown): EnergyDrink[] {
  if (!Array.isArray(input)) return []

  const drinks = input
    .map(parseDrink)
    .filter((drink): drink is EnergyDrink => drink !== null)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  const seen = new Set<string>()
  const unique: EnergyDrink[] = []

  for (const drink of drinks) {
    const key = `${drink.shelf}:${drink.slot}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(drink)
  }

  return unique
}

export function loadCollection(): EnergyDrink[] {
  if (typeof window === "undefined") return DEMO_DRINKS

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_DRINKS))
      return DEMO_DRINKS
    }

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_DRINKS))
      return DEMO_DRINKS
    }

    return sanitizeCollection(parsed)
  } catch {
    return DEMO_DRINKS
  }
}

export function saveCollection(drinks: EnergyDrink[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drinks))
}

export const localCollectionStore: CollectionStore = {
  load: loadCollection,
  save: saveCollection,
}
