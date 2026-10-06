"use client"

import { useEffect, useState } from "react"
import { AddDrinkDialog } from "@/components/collection/AddDrinkDialog"
import { CollectionHeader } from "@/components/collection/CollectionHeader"
import { DrinkDetailsDialog } from "@/components/collection/DrinkDetailsDialog"
import { EnergyDrinkCabinet } from "@/components/collection/EnergyDrinkCabinet"
import { collectionStats, createDrink, findFirstEmptySlot } from "@/lib/cabinet"
import { loadCollection, saveCollection } from "@/lib/collection-storage"
import type { EnergyDrink, NewEnergyDrinkInput } from "@/lib/types"

export function CollectionScreen() {
  const [drinks, setDrinks] = useState<EnergyDrink[]>(() => loadCollection())
  const [addOpen, setAddOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [arrivingId, setArrivingId] = useState<string | null>(null)
  const [leavingId, setLeavingId] = useState<string | null>(null)

  const stats = collectionStats(drinks)
  const nextSlot = findFirstEmptySlot(drinks)
  const selected = drinks.find((drink) => drink.id === selectedId) ?? null

  useEffect(() => {
    if (!arrivingId) return
    const timeout = window.setTimeout(() => setArrivingId(null), 3400)
    return () => window.clearTimeout(timeout)
  }, [arrivingId])

  useEffect(() => {
    if (!leavingId) return
    const id = leavingId
    const timeout = window.setTimeout(() => {
      const next = drinks.filter((drink) => drink.id !== id)
      setDrinks(next)
      saveCollection(next)
      setLeavingId((current) => (current === id ? null : current))
    }, 380)
    return () => window.clearTimeout(timeout)
  }, [leavingId, drinks])

  function handleAdd(input: NewEnergyDrinkInput) {
    const position = findFirstEmptySlot(drinks)
    if (!position) return

    const drink = createDrink(input, position)
    const next = [...drinks, drink]
    setDrinks(next)
    saveCollection(next)
    setAddOpen(false)
    setArrivingId(drink.id)
  }

  function handleRemove(id: string) {
    setSelectedId(null)
    setLeavingId(id)
  }

  return (
    <div className="room">
      <div className="room-bg" aria-hidden="true" />
      <div className="room-scrim" aria-hidden="true" />
      <div className="room-ui">
        <CollectionHeader cans={stats.cans} brands={stats.brands} onAdd={() => {
          setFormKey((value) => value + 1)
          setAddOpen(true)
        }} />
        <main className="cabinet-main">
          <div className="cabinet-halo" aria-hidden="true" />
          <div className="cabinet-scroll">
            <EnergyDrinkCabinet
              drinks={drinks}
              arrivingId={arrivingId}
              leavingId={leavingId}
              onSelect={(drink) => setSelectedId(drink.id)}
            />
          </div>
        </main>
      </div>
      <AddDrinkDialog
        key={formKey}
        open={addOpen}
        canAdd={nextSlot !== null}
        onOpenChange={setAddOpen}
        onAdd={handleAdd}
      />
      <DrinkDetailsDialog
        drink={selected}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
        onRemove={handleRemove}
      />
    </div>
  )
}
