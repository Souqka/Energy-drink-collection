"use client"

import { Plus } from "lucide-react"
import { EnergyDrink } from "@/components/collection/EnergyDrink"
import { Pedestal } from "@/components/collection/Pedestal"
import type { EnergyDrink as EnergyDrinkRecord } from "@/lib/types"
import { cn } from "cn"

type ShelfSlotProps = {
  shelf: number
  slot: number
  drink: EnergyDrinkRecord | null
  arriving: boolean
  leaving: boolean
  onSelect: (drink: EnergyDrinkRecord) => void
}

export function ShelfSlot({ shelf, slot, drink, arriving, leaving, onSelect }: ShelfSlotProps) {
  const occupied = Boolean(drink)

  return (
    <div
      className={cn("niche", occupied ? "niche-occupied" : "niche-empty", arriving && "is-arriving")}
      data-shelf={shelf}
      data-slot={slot}
      data-drink-id={drink?.id}
    >
      <div className="niche-glow" aria-hidden="true" />
      {drink ? (
        <button
          type="button"
          className="niche-hit"
          onClick={() => onSelect(drink)}
          disabled={leaving}
          aria-label={`${drink.brand} ${drink.flavor}, rated ${drink.rating} out of 10, ${drink.volumeMl} milliliters`}
        >
          <EnergyDrink drink={drink} arriving={arriving} leaving={leaving} />
          <Pedestal drink={drink} arriving={arriving} />
        </button>
      ) : (
        <div className="niche-hit niche-hit-empty">
          <div className="empty-bay">
            <svg className="empty-can" viewBox="0 0 80 150" aria-hidden="true">
              <ellipse cx="40" cy="16" rx="18" ry="6" />
              <rect x="22" y="16" width="36" height="112" />
              <ellipse cx="40" cy="128" rx="18" ry="6" />
            </svg>
            <div className="empty-hover">
              <Plus className="size-4" />
              <span>Empty</span>
            </div>
          </div>
          <Pedestal drink={null} />
        </div>
      )}
    </div>
  )
}
