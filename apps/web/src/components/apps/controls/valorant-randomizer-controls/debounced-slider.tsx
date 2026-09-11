import { useEffect, useRef, useState } from "react"

type Props = {
  label: string
  icon?: string
  value: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  debounceMs?: number
  onCommit: (value: number) => void
}

/**
 * A range input whose visual position updates instantly while dragging (local
 * state), but only calls `onCommit` after the drag settles. Without this, a
 * fully server-controlled `value` snaps back on every tick as the mutation's
 * refetch re-renders the input mid-drag, making the slider feel like it only
 * moves one step per click.
 */
export default function DebouncedSlider({
  label,
  icon,
  value,
  min = 0,
  max = 1,
  step = 0.05,
  disabled,
  debounceMs = 350,
  onCommit,
}: Props) {
  const [localValue, setLocalValue] = useState(value)
  const isDraggingRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isDraggingRef.current) setLocalValue(value)
  }, [value])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleChange(next: number) {
    setLocalValue(next)
    isDraggingRef.current = true

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      isDraggingRef.current = false
      onCommit(next)
    }, debounceMs)
  }

  return (
    <label className="flex items-center gap-2 text-xs text-ctp-subtext1">
      {icon ? <img src={icon} alt="" className="h-4 w-4 shrink-0 object-contain" /> : null}
      <span className="w-14 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue}
        disabled={disabled}
        onChange={(event) => handleChange(Number(event.target.value))}
        className="flex-1 accent-ctp-red"
      />
      <span className="w-9 shrink-0 text-right tabular-nums">{localValue.toFixed(2)}</span>
    </label>
  )
}
