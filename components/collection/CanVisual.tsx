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
  if (label.length <= 12) return [label]
  const parts = label.split(/\s+/)
  if (parts.length >= 2) return [parts[0], parts.slice(1).join(" ")]
  return [label]
}

function flavorLines(flavor: string) {
  const label = flavor.trim()
  if (label.length <= 14) return [label]
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
          <polygon points="46,118 154,156 154,188 46,150" fill={palette.accent} />
          <polygon points="46,128 154,166 154,174 46,136" fill={palette.accent2} opacity="0.85" />
          <circle cx="100" cy="250" r="22" fill="none" stroke={palette.accent} strokeWidth="3" />
        </g>
      )
    case "classic":
      return (
        <g>
          <rect x="46" y="118" width="108" height="22" fill={palette.accent} />
          <circle cx="100" cy="168" r="18" fill={palette.accent2} />
          <circle cx="100" cy="168" r="10" fill="none" stroke={palette.accent} strokeWidth="3" />
          <rect x="46" y="300" width="108" height="26" fill={palette.accent} />
        </g>
      )
    case "mango":
      return (
        <g>
          <circle cx="100" cy="150" r="28" fill={palette.accent} />
          <circle cx="100" cy="150" r="16" fill="#ffd166" />
          <ellipse cx="132" cy="132" rx="10" ry="5" fill={palette.accent2} transform="rotate(-28 132 132)" />
          <rect x="46" y="292" width="108" height="18" fill={palette.accent} />
        </g>
      )
    case "rush":
      return (
        <g>
          <polygon points="46,292 154,250 154,340 46,340" fill={palette.accent} />
          <polyline
            points="78,168 96,206 88,206 108,248"
            fill="none"
            stroke={palette.accent2}
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      )
    case "tropical":
      return (
        <g>
          <path d="M46 168 C70 148 86 188 110 168 C128 154 140 150 154 160 L154 196 L46 196 Z" fill={palette.accent} />
          <rect x="46" y="300" width="108" height="34" fill={palette.accent2} />
          <circle cx="70" cy="142" r="6" fill={palette.accent2} opacity="0.8" />
        </g>
      )
    case "white":
      return (
        <g>
          <path d="M46 150 C78 128 96 176 154 140 L154 168 C96 204 78 156 46 178 Z" fill={palette.accent} opacity="0.95" />
          <rect x="46" y="304" width="108" height="8" fill={palette.accent2} />
        </g>
      )
    default:
      return (
        <g>
          <rect x="46" y="126" width="108" height="14" fill={palette.accent} />
          <circle cx="100" cy="168" r="16" fill="none" stroke={palette.accent} strokeWidth="3" />
          <rect x="46" y="308" width="108" height="12" fill={palette.accent} />
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
  const flavorSize = longestFlavor > 16 ? 15 : longestFlavor > 11 ? 18 : 22
  const brandSize = Math.max(...brands.map((line) => line.length)) > 11 ? 11 : 13
  const flavorStart = brands.length > 1 ? 236 : 228

  return (
    <svg
      viewBox="0 0 200 470"
      className={cn("can-visual", className)}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${rawId}-body`} x1="46" x2="154" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={palette.bodyDeep} />
          <stop offset="18%" stopColor={palette.body} />
          <stop offset="42%" stopColor={palette.bodyLight} />
          <stop offset="68%" stopColor={palette.body} />
          <stop offset="100%" stopColor={palette.bodyDeep} />
        </linearGradient>
        <linearGradient id={`${rawId}-lid`} x1="46" x2="154" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8d929a" />
          <stop offset="35%" stopColor="#f4f6f8" />
          <stop offset="70%" stopColor="#c5c9d0" />
          <stop offset="100%" stopColor="#6e737b" />
        </linearGradient>
        <linearGradient id={`${rawId}-vignette`} x1="46" x2="154" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#000" stopOpacity={palette.light ? 0.28 : 0.5} />
          <stop offset="16%" stopColor="#000" stopOpacity="0.05" />
          <stop offset="46%" stopColor="#fff" stopOpacity={palette.light ? 0.18 : 0.1} />
          <stop offset="78%" stopColor="#000" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity={palette.light ? 0.32 : 0.58} />
        </linearGradient>
        <clipPath id={`${rawId}-clip`}>
          <rect x="46" y="48" width="108" height="376" />
        </clipPath>
        <filter id={`${rawId}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.16" />
          </feComponentTransfer>
        </filter>
      </defs>

      <ellipse cx="100" cy="424" rx="54" ry="14" fill="#5e646c" />
      <rect x="46" y="48" width="108" height="376" fill={`url(#${rawId}-body)`} />

      <g clipPath={`url(#${rawId}-clip)`}>
        <rect x="46" y="188" width="108" height="128" fill={palette.label} />
        <Motif palette={palette} />
        <rect x="46" y="48" width="108" height="376" filter={`url(#${rawId}-grain)`} opacity="0.35" />
        <rect x="46" y="48" width="108" height="376" fill={`url(#${rawId}-vignette)`} />
        <rect x="66" y="56" width="7" height="352" rx="4" fill="#fff" opacity="0.2" />
        <rect x="78" y="78" width="3" height="300" rx="2" fill="#fff" opacity="0.12" />
        <ellipse cx="58" cy="120" rx="2" ry="3" fill="#fff" opacity="0.28" />
        <ellipse cx="52" cy="168" rx="1.4" ry="2.2" fill="#fff" opacity="0.22" />
        <ellipse cx="60" cy="250" rx="1.6" ry="2.4" fill="#fff" opacity="0.18" />
      </g>

      <g fill={palette.ink} textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif">
        <text x="100" y="206" fontSize="8" letterSpacing="2.4" fill={palette.muted}>
          ENERGY DRINK
        </text>
        {brands.map((line, index) => (
          <text
            key={line}
            x="100"
            y={brands.length === 1 ? 228 : 222 + index * 16}
            fontSize={brandSize}
            fontWeight="700"
            letterSpacing="1.4"
          >
            {line}
          </text>
        ))}
        {flavors.map((line, index) => (
          <text
            key={`${line}-${index}`}
            x="100"
            y={flavorStart + index * (flavorSize + 2)}
            fontSize={flavorSize}
            fontWeight="600"
          >
            {line}
          </text>
        ))}
        <text x="100" y="304" fontSize="11" letterSpacing="0.8" fill={palette.muted}>
          {volumeMl} ml
        </text>
      </g>

      <ellipse cx="100" cy="52" rx="54" ry="15" fill={`url(#${rawId}-lid)`} />
      <ellipse cx="100" cy="48" rx="34" ry="8.5" fill="#dfe3e8" />
      <ellipse cx="100" cy="46" rx="18" ry="4.5" fill="#f7f8fa" />
      <rect x="91" y="42" width="18" height="7" rx="3" fill="#c5cad1" />
      <circle cx="96" cy="45.5" r="1.4" fill="#8b919a" />
      <ellipse cx="100" cy="424" rx="54" ry="13" fill="none" stroke="#9aa1aa" strokeWidth="3" />
    </svg>
  )
}
