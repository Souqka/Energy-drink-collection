"use client"

import dynamic from "next/dynamic"

const CollectionScreen = dynamic(
  () => import("@/components/collection/CollectionScreen").then((mod) => mod.CollectionScreen),
  {
    ssr: false,
    loading: () => (
      <div className="room">
        <div className="room-bg" aria-hidden="true" />
        <div className="room-scrim" aria-hidden="true" />
      </div>
    ),
  },
)

export function CollectionApp() {
  return <CollectionScreen />
}
