import Image from "next/image"
import { CanVisual } from "@/components/collection/CanVisual"
import { canProportion } from "@/lib/cabinet"
import type { EnergyDrink as EnergyDrinkRecord } from "@/lib/types"
import { cn } from "cn"

type EnergyDrinkProps = {
  drink: EnergyDrinkRecord
  arriving: boolean
  leaving: boolean
}

export function EnergyDrink({ drink, arriving, leaving }: EnergyDrinkProps) {
  const proportion = canProportion(drink.volumeMl)

  return (
    <div className={cn("can-stage", `proportion-${proportion}`, arriving && "is-arriving", leaving && "is-leaving")}>
      <div className="contact-shadow" aria-hidden="true" />
      <div className="can-sizer">
        {drink.image ? (
          <div className="can-photo-frame">
            <Image
              src={drink.image}
              alt=""
              fill
              sizes="180px"
              className="object-contain object-bottom"
            />
          </div>
        ) : (
          <CanVisual brand={drink.brand} flavor={drink.flavor} volumeMl={drink.volumeMl} />
        )}
      </div>
    </div>
  )
}
