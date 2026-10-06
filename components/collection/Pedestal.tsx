import type { EnergyDrink } from "@/lib/types"
import { cn } from "cn"

type PedestalProps = {
  drink: EnergyDrink | null
  arriving?: boolean
}

export function Pedestal({ drink, arriving = false }: PedestalProps) {
  return (
    <div className={cn("pedestal", !drink && "pedestal-empty", arriving && "pedestal-arriving")}>
      <div className="pedestal-top" aria-hidden="true" />
      <div className="pedestal-face">
        {drink ? (
          <>
            <p className="pedestal-rating">
              <span>{drink.rating}</span>
              <small> / 10</small>
            </p>
            <p className="pedestal-volume">{drink.volumeMl} ml</p>
            <p className="pedestal-comment">{drink.comment || "\u00a0"}</p>
          </>
        ) : (
          <p className="pedestal-empty-label">Empty</p>
        )}
      </div>
    </div>
  )
}
