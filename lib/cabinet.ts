import type { EnergyDrink, NewEnergyDrinkInput, ShelfPosition } from "@/lib/types"

export const SHELF_COUNT = 4
export const SLOTS_PER_SHELF = 6
export const CABINET_CAPACITY = SHELF_COUNT * SLOTS_PER_SHELF
export const MAX_COMMENT_LENGTH = 80

export function findFirstEmptySlot(drinks: EnergyDrink[]): ShelfPosition | null {
  const occupied = new Set(drinks.map((drink) => `${drink.shelf}:${drink.slot}`))

  for (let shelf = 1; shelf <= SHELF_COUNT; shelf += 1) {
    for (let slot = 1; slot <= SLOTS_PER_SHELF; slot += 1) {
      if (!occupied.has(`${shelf}:${slot}`)) {
        return { shelf, slot }
      }
    }
  }

  return null
}

export function createDrink(input: NewEnergyDrinkInput, position: ShelfPosition): EnergyDrink {
  return {
    id: crypto.randomUUID(),
    brand: input.brand.trim(),
    flavor: input.flavor.trim(),
    volumeMl: input.volumeMl,
    rating: input.rating,
    comment: input.comment.trim().slice(0, MAX_COMMENT_LENGTH),
    shelf: position.shelf,
    slot: position.slot,
    createdAt: new Date().toISOString(),
  }
}

export function collectionStats(drinks: EnergyDrink[]) {
  const brands = new Set(
    drinks.map((drink) => drink.brand.trim().toLowerCase()).filter((brand) => brand.length > 0),
  )

  return {
    cans: drinks.length,
    brands: brands.size,
  }
}

export function canProportion(volumeMl: number): "slim" | "mid" | "tall" {
  if (volumeMl <= 330) return "slim"
  if (volumeMl < 480) return "mid"
  return "tall"
}
