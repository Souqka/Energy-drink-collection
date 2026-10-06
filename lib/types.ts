export type EnergyDrink = {
  id: string
  brand: string
  flavor: string
  volumeMl: number
  rating: number
  comment: string
  image?: string
  shelf: number
  slot: number
  createdAt: string
}

export type NewEnergyDrinkInput = {
  brand: string
  flavor: string
  volumeMl: number
  rating: number
  comment: string
}

export type ShelfPosition = {
  shelf: number
  slot: number
}
