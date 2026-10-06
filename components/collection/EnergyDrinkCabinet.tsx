"use client"

import { useEffect, useRef } from "react"
import { Shelf } from "@/components/collection/Shelf"
import { SHELF_COUNT } from "@/lib/cabinet"
import type { EnergyDrink } from "@/lib/types"

type EnergyDrinkCabinetProps = {
  drinks: EnergyDrink[]
  arrivingId: string | null
  leavingId: string | null
  onSelect: (drink: EnergyDrink) => void
}

export function EnergyDrinkCabinet({
  drinks,
  arrivingId,
  leavingId,
  onSelect,
}: EnergyDrinkCabinetProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!arrivingId || !rootRef.current) return
    const niche = rootRef.current.querySelector(`[data-drink-id="${CSS.escape(arrivingId)}"]`)
    niche?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [arrivingId])

  return (
    <div ref={rootRef} className="cabinet">
      <div className="cabinet-cornice" aria-hidden="true" />
      <div className="shelves">
        {Array.from({ length: SHELF_COUNT }, (_, index) => {
          const shelf = index + 1
          return (
            <Shelf
              key={shelf}
              shelf={shelf}
              drinks={drinks}
              arrivingId={arrivingId}
              leavingId={leavingId}
              onSelect={onSelect}
            />
          )
        })}
      </div>
      <div className="cabinet-plinth" aria-hidden="true" />
    </div>
  )
}
