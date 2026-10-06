import type { EnergyDrink, NewEnergyDrinkInput, ShelfPosition } from "@/lib/types"

export const SHELF_COUNT = 4
export const SLOTS_PER_SHELF = 6
export const CABINET_CAPACITY = SHELF_COUNT * SLOTS_PER_SHELF
export const MAX_COMMENT_LENGTH = 80

export function hasRoom(drinks: EnergyDrink[]) {
  return drinks.length < CABINET_CAPACITY
}

export function pedestalStone(rating: number): "white" | "blue" | "red" {
  if (rating >= 9) return "red"
  if (rating >= 5) return "blue"
  return "white"
}

function compareDrinks(a: EnergyDrink, b: EnergyDrink) {
  const brand = a.brand.localeCompare(b.brand, "en", { sensitivity: "base" })
  if (brand !== 0) return brand
  const flavor = a.flavor.localeCompare(b.flavor, "en", { sensitivity: "base" })
  if (flavor !== 0) return flavor
  return a.createdAt.localeCompare(b.createdAt)
}

export function layoutByBrand(drinks: EnergyDrink[]): EnergyDrink[] {
  return [...drinks].sort(compareDrinks).map((drink, index) => {
    const shelf = Math.floor(index / SLOTS_PER_SHELF) + 1
    const slot = (index % SLOTS_PER_SHELF) + 1
    if (drink.shelf === shelf && drink.slot === slot) return drink
    return { ...drink, shelf, slot }
  })
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
