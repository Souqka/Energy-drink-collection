"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

type CollectionHeaderProps = {
  cans: number
  brands: number
  onAdd: () => void
}

function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`
}

export function CollectionHeader({ cans, brands, onAdd }: CollectionHeaderProps) {
  return (
    <header className="collection-header">
      <div className="min-w-0">
        <h1>My energy drink collection</h1>
        <p className="collection-subtitle">Every can has a story.</p>
        <p className="collection-stats" aria-live="polite">
          <span>{countLabel(cans, "can", "cans")}</span>
          <span aria-hidden="true" className="collection-dot">
            ·
          </span>
          <span>{countLabel(brands, "brand", "brands")}</span>
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="add-collection-button"
        onClick={onAdd}
      >
        <Plus />
        Add to collection
      </Button>
    </header>
  )
}
