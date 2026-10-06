"use client"

import { useState, type FormEvent } from "react"
import { BrandField } from "@/components/collection/BrandField"
import { FlavorField } from "@/components/collection/FlavorField"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MAX_COMMENT_LENGTH } from "@/lib/cabinet"
import { BRAND_OPTIONS, FLAVOR_SUGGESTIONS, RATING_OPTIONS } from "@/lib/drink-options"
import type { NewEnergyDrinkInput } from "@/lib/types"

type AddDrinkDialogProps = {
  open: boolean
  canAdd: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (input: NewEnergyDrinkInput) => void
}

const INITIAL_DRAFT = {
  brand: "Monster",
  flavor: "",
  volumeMl: "500",
  rating: "9",
  comment: "",
}

export function AddDrinkDialog({ open, canAdd, onOpenChange, onAdd }: AddDrinkDialogProps) {
  const [draft, setDraft] = useState(INITIAL_DRAFT)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canAdd) return

    const flavor = draft.flavor.trim()
    const volumeMl = Number(draft.volumeMl)
    const rating = Number(draft.rating)

    if (!flavor) {
      setError("Enter a flavor.")
      return
    }

    if (!Number.isInteger(volumeMl) || volumeMl < 50 || volumeMl > 1000) {
      setError("Volume should be a whole number from 50 to 1000 ml.")
      return
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
      setError("Choose a rating from 1 to 10.")
      return
    }

    onAdd({
      brand: draft.brand,
      flavor,
      volumeMl,
      rating,
      comment: draft.comment.trim().slice(0, MAX_COMMENT_LENGTH),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add energy drink</DialogTitle>
          <DialogDescription>
            {canAdd
              ? "It lines up with the other cans from that brand. Later brands shift forward."
              : "Every niche is occupied. Remove a can to free a place."}
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-1.5">
            <Label htmlFor="drink-brand">Brand</Label>
            <BrandField
              id="drink-brand"
              value={draft.brand}
              options={BRAND_OPTIONS}
              onChange={(brand) => setDraft((current) => ({ ...current, brand }))}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="drink-flavor">Flavor</Label>
            <FlavorField
              id="drink-flavor"
              value={draft.flavor}
              suggestions={FLAVOR_SUGGESTIONS}
              placeholder="Ultra Violet"
              onChange={(flavor) => setDraft((current) => ({ ...current, flavor }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="drink-volume">Volume</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="drink-volume"
                  inputMode="numeric"
                  value={draft.volumeMl}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, volumeMl: event.target.value }))
                  }
                />
                <span className="text-sm text-muted-foreground">ml</span>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="drink-rating">Rating</Label>
              <div className="flex items-center gap-2">
                <Select
                  value={draft.rating}
                  onValueChange={(rating) => setDraft((current) => ({ ...current, rating }))}
                >
                  <SelectTrigger id="drink-rating" className="w-full" aria-label="Rating">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[80]">
                    {RATING_OPTIONS.map((rating) => (
                      <SelectItem key={rating} value={String(rating)}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="shrink-0 text-sm text-muted-foreground">/ 10</span>
              </div>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="drink-comment">Comment</Label>
            <Input
              id="drink-comment"
              value={draft.comment}
              maxLength={MAX_COMMENT_LENGTH}
              placeholder="Very nice flavor"
              onChange={(event) =>
                setDraft((current) => ({ ...current, comment: event.target.value }))
              }
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <DialogFooter className="border-0 bg-transparent px-0 pb-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!canAdd}>
              Add to collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
