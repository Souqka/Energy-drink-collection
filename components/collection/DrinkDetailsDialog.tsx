"use client"

import { CanVisual } from "@/components/collection/CanVisual"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { EnergyDrink } from "@/lib/types"

type DrinkDetailsDialogProps = {
  drink: EnergyDrink | null
  onOpenChange: (open: boolean) => void
  onRemove: (id: string) => void
}

export function DrinkDetailsDialog({ drink, onOpenChange, onRemove }: DrinkDetailsDialogProps) {
  return (
    <Dialog open={drink !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {drink ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {drink.brand} {drink.flavor}
              </DialogTitle>
              <DialogDescription>
                Shelf {drink.shelf} · Niche {drink.slot}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-end gap-4">
              <div className="details-can">
                <CanVisual brand={drink.brand} flavor={drink.flavor} volumeMl={drink.volumeMl} />
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <p className="text-sm tracking-wide text-muted-foreground">{drink.volumeMl} ml</p>
                <p className="mt-3 text-[11px] tracking-[0.18em] text-brass uppercase">Rating</p>
                <p className="mt-1 font-heading text-3xl tracking-tight text-cream">
                  {drink.rating}
                  <span className="ml-1 text-base text-muted-foreground">/ 10</span>
                </p>
                {drink.comment ? (
                  <blockquote className="mt-4 border-l-2 border-brass/50 pl-3 text-sm leading-relaxed text-cream/90">
                    “{drink.comment}”
                  </blockquote>
                ) : null}
              </div>
            </div>
            <DialogFooter className="border-0 bg-transparent px-0 pb-0">
              <Button type="button" variant="destructive" onClick={() => onRemove(drink.id)}>
                Remove from collection
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
