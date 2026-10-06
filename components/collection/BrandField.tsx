"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type BrandFieldProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
}

export function BrandField({ id, value, onChange, options }: BrandFieldProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full" aria-label="Brand">
        <SelectValue placeholder="Select a brand" />
      </SelectTrigger>
      <SelectContent position="popper" className="z-[80]">
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
