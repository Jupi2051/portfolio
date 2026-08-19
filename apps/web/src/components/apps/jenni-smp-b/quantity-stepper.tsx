import cn from "classnames"

type Props = {
  id: string
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function QuantityStepper({
  id,
  value,
  onChange,
  min = 0,
  max = 9999,
  disabled = false,
}: Props) {
  const commit = (raw: string) => {
    const parsed = Number.parseInt(raw.replace(/[^\d]/g, ""), 10)
    onChange(clamp(Number.isFinite(parsed) ? parsed : 0, min, max))
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Decrease"
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - 1, min, max))}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-ctp-yellow/30 bg-ctp-surface0 text-lg leading-none text-ctp-yellow transition",
          "hover:bg-ctp-yellow/15 disabled:cursor-not-allowed disabled:opacity-40",
        )}
      >
        −
      </button>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        disabled={disabled}
        onChange={(event) => commit(event.target.value)}
        className="h-8 w-16 rounded-md border border-ctp-surface2 bg-ctp-crust text-center text-sm text-ctp-text outline-none focus:border-ctp-yellow/60"
      />
      <button
        type="button"
        aria-label="Increase"
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + 1, min, max))}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-ctp-yellow/30 bg-ctp-surface0 text-lg leading-none text-ctp-yellow transition",
          "hover:bg-ctp-yellow/15 disabled:cursor-not-allowed disabled:opacity-40",
        )}
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper
