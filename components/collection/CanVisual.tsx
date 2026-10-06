"use client"

import { useId } from "react"
import { paletteFor, type CanPalette } from "@/lib/can-palette"
import { cn } from "cn"

type CanVisualProps = {
  brand: string
  flavor: string
  volumeMl: number
  className?: string
}

function brandLines(brand: string) {
  const label = brand.trim().toUpperCase()
  if (label.length <= 11) return [label]
  const parts = label.split(/\s+/)
  if (parts.length >= 2) return [parts[0], parts.slice(1).join(" ")]
  return [label]
}

function flavorLines(flavor: string) {
  const label = flavor.trim()
  if (label.length <= 12) return [label]
  const parts = label.split(/\s+/)
  if (parts.length === 1) return [label]
  const midpoint = Math.ceil(parts.length / 2)
  return [parts.slice(0, midpoint).join(" "), parts.slice(midpoint).join(" ")]
}

function Motif({ palette }: { palette: CanPalette }) {
  switch (palette.motif) {
    case "violet":
      return (
        <g>
          <polygon points="42,86 208,118 208,142 42,110" fill={palette.accent} />
          <polygon points="42,98 208,130 208,138 42,106" fill={palette.accent2} opacity="0.9" />
        </g>
      )
    case "classic":
      return (
        <g>
          <rect x="42" y="72" width="166" height="16" fill={palette.accent} />
          <circle cx="125" cy="124" r="22" fill={palette.accent2} />
          <circle cx="125" cy="124" r="12" fill="none" stroke={palette.accent} strokeWidth="3.5" />
          <rect x="42" y="322" width="166" height="20" fill={palette.accent} />
        </g>
      )
    case "mango":
      return (
        <g>
          <circle cx="125" cy="116" r="32" fill={palette.accent} />
          <circle cx="125" cy="116" r="18" fill="#ffd166" />
          <ellipse cx="168" cy="96" rx="12" ry="6" fill={palette.accent2} transform="rotate(-32 168 96)" />
          <rect x="42" y="324" width="166" height="16" fill={palette.accent} />
        </g>
      )
    case "rush":
      return (
        <g>
          <polygon points="42,324 208,292 208,368 42,368" fill={palette.accent} />
          <polyline
            points="98,74 122,116 110,116 136,156"
            fill="none"
            stroke={palette.accent2}
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      )
    case "tropical":
      return (
        <g>
          <path
            d="M42 128 C74 104 98 150 128 126 C152 108 176 104 208 118 L208 156 L42 156 Z"
            fill={palette.accent}
          />
          <circle cx="78" cy="96" r="7" fill={palette.accent2} opacity="0.85" />
          <rect x="42" y="322" width="166" height="28" fill={palette.accent2} />
        </g>
      )
    case "white":
      return (
        <g>
          <path
            d="M42 108 C86 84 108 140 208 96 L208 128 C108 172 86 116 42 140 Z"
            fill={palette.accent}
          />
          <rect x="42" y="328" width="166" height="8" fill={palette.accent2} />
        </g>
      )
    default:
      return (
        <g>
          <rect x="42" y="78" width="166" height="14" fill={palette.accent} />
          <circle cx="125" cy="122" r="18" fill="none" stroke={palette.accent} strokeWidth="3.5" />
          <rect x="42" y="326" width="166" height="12" fill={palette.accent} />
        </g>
      )
  }
}

export function CanVisual({ brand, flavor, volumeMl, className }: CanVisualProps) {
  const rawId = useId().replace(/:/g, "")
  const palette = paletteFor(brand, flavor)
  const brands = brandLines(brand)
  const flavors = flavorLines(flavor)
  const longestFlavor = Math.max(...flavors.map((line) => line.length))
  const flavorSize = longestFlavor > 14 ? 16 : longestFlavor > 10 ? 20 : 24
  const brandSize = Math.max(...brands.map((line) => line.length)) > 10 ? 13 : 16
  const brandY = brands.length > 1 ? 196 : 208
  const flavorY = brands.length > 1 ? 236 : 242

  return (
    <svg viewBox="0 26 250 356" className={cn("can-visual", className)} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`${rawId}-body`} x1="42" x2="208" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={palette.bodyDeep} />
          <stop offset="18%" stopColor={palette.body} />
          <stop offset="46%" stopColor={palette.bodyLight} />
          <stop offset="72%" stopColor={palette.body} />
          <stop offset="100%" stopColor={palette.bodyDeep} />
        </linearGradient>
        <linearGradient id={`${rawId}-lid`} x1="42" x2="208" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8d929a" />
          <stop offset="32%" stopColor="#f7f8fa" />
          <stop offset="68%" stopColor="#c5c9d0" />
          <stop offset="100%" stopColor="#6e737b" />
        </linearGradient>
        <linearGradient id={`${rawId}-vignette`} x1="42" x2="208" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#000" stopOpacity={palette.light ? 0.22 : 0.42} />
          <stop offset="18%" stopColor="#000" stopOpacity="0" />
          <stop offset="48%" stopColor="#fff" stopOpacity={palette.light ? 0.16 : 0.08} />
          <stop offset="80%" stopColor="#000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity={palette.light ? 0.28 : 0.5} />
        </linearGradient>
        <clipPath id={`${rawId}-clip`}>
          <rect x="42" y="36" width="166" height="330" />
        </clipPath>
      </defs>

      <ellipse cx="125" cy="366" rx="83" ry="13" fill="#5c626a" />
      <rect x="42" y="36" width="166" height="330" fill={`url(#${rawId}-body)`} />

      <g clipPath={`url(#${rawId}-clip)`}>
        <Motif palette={palette} />
        <rect x="50" y="164" width="150" height="132" rx="2" fill={palette.label} />
        <rect x="42" y="36" width="166" height="330" fill={`url(#${rawId}-vignette)`} />
        <rect x="62" y="44" width="9" height="308" rx="5" fill="#fff" opacity="0.22" />
        <rect x="78" y="64" width="3" height="260" rx="2" fill="#fff" opacity="0.12" />
        <ellipse cx="70" cy="96" rx="2.2" ry="3.2" fill="#fff" opacity="0.28" />
        <ellipse cx="64" cy="140" rx="1.5" ry="2.3" fill="#fff" opacity="0.2" />
      </g>

      <g fill={palette.ink} textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif">
        <text x="125" y="186" fontSize="9" letterSpacing="2.6" fill={palette.muted}>
          ENERGY DRINK
        </text>
        {brands.map((line, index) => (
          <text
            key={line}
            x="125"
            y={brandY + index * (brandSize + 2)}
            fontSize={brandSize}
            fontWeight="700"
            letterSpacing="1.1"
          >
            {line}
          </text>
        ))}
        {flavors.map((line, index) => (
          <text
            key={`${line}-${index}`}
            x="125"
            y={flavorY + index * (flavorSize + 1)}
            fontSize={flavorSize}
            fontWeight="600"
          >
            {line}
          </text>
        ))}
        <text x="125" y="284" fontSize="13" letterSpacing="0.6" fill={palette.muted}>
          {volumeMl} ml
        </text>
      </g>

      <ellipse cx="125" cy="40" rx="83" ry="14" fill={`url(#${rawId}-lid)`} />
      <ellipse cx="125" cy="36" rx="52" ry="8" fill="#e4e7ec" />
      <ellipse cx="125" cy="34" rx="26" ry="4.2" fill="#f8f9fb" />
      <rect x="114" y="30" width="22" height="8" rx="3" fill="#c5cad1" />
      <circle cx="120" cy="34" r="1.6" fill="#8b919a" />
      <ellipse cx="125" cy="366" rx="83" ry="12" fill="none" stroke="#a0a6ae" strokeWidth="3" />
    </svg>
  )
}
