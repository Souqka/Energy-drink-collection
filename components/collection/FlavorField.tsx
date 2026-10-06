"use client"

import { useId } from "react"
import { Input } from "@/components/ui/input"

type FlavorFieldProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  suggestions?: readonly string[]
  placeholder?: string
}

export function FlavorField({
  id,
  value,
  onChange,
  suggestions = [],
  placeholder,
}: FlavorFieldProps) {
  const autoId = useId()
  const listId = suggestions.length > 0 ? `${autoId}-flavors` : undefined

  return (
    <>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        list={listId}
        autoComplete="off"
        maxLength={40}
        onChange={(event) => onChange(event.target.value)}
      />
      {listId ? (
        <datalist id={listId}>
          {suggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
      ) : null}
    </>
  )
}
