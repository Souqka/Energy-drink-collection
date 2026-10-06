import { ShelfSlot } from "@/components/collection/ShelfSlot"
import { SLOTS_PER_SHELF } from "@/lib/cabinet"
import type { EnergyDrink } from "@/lib/types"

const SHELF_NUMERALS = ["I", "II", "III", "IV"]

type ShelfProps = {
  shelf: number
  drinks: EnergyDrink[]
  arrivingId: string | null
  leavingId: string | null
  onSelect: (drink: EnergyDrink) => void
}

export function Shelf({ shelf, drinks, arrivingId, leavingId, onSelect }: ShelfProps) {
  const slots = Array.from({ length: SLOTS_PER_SHELF }, (_, index) => {
    const slot = index + 1
    return drinks.find((drink) => drink.shelf === shelf && drink.slot === slot) ?? null
  })

  return (
    <section className="shelf" aria-label={`Shelf ${shelf}`}>
      <div className="shelf-index" aria-hidden="true">
        {SHELF_NUMERALS[shelf - 1]}
      </div>
      <div className="shelf-main">
        <div className="shelf-light" aria-hidden="true" />
        <div className="shelf-bays">
          {slots.map((drink, index) => {
            const slot = index + 1
            return (
              <ShelfSlot
                key={`${shelf}-${slot}`}
                shelf={shelf}
                slot={slot}
                drink={drink}
                arriving={Boolean(drink && drink.id === arrivingId)}
                leaving={Boolean(drink && drink.id === leavingId)}
                onSelect={onSelect}
              />
            )
          })}
        </div>
        <div className="shelf-board" aria-hidden="true" />
      </div>
      <div className="shelf-end" aria-hidden="true" />
    </section>
  )
}
