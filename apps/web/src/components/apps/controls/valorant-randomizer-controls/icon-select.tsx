import { useEffect, useMemo, useRef, useState } from "react"

export type IconSelectOption = {
  value: string
  label: string
  icon?: string | null
}

type Props = {
  value: string
  options: IconSelectOption[]
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  searchable?: boolean
}

/** A native `<select>` can't render an image per option; this is a minimal listbox that can. */
export default function IconSelect({
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled,
  searchable = false,
}: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = options.find((option) => option.value === value)

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options
    const query = search.trim().toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(query))
  }, [options, search])

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [open])

  useEffect(() => {
    if (!open) setSearch("")
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center gap-1.5 rounded-md border border-ctp-surface1 bg-ctp-base px-2 py-1 text-xs text-ctp-text transition hover:border-ctp-surface2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {selected?.icon ? (
          <img src={selected.icon} alt="" className="h-5 w-5 shrink-0 rounded object-cover" />
        ) : null}
        <span className="min-w-0 flex-1 truncate text-left">
          {selected?.label ?? placeholder}
        </span>
        <span className="shrink-0 text-ctp-subtext0">▾</span>
      </button>

      {open ? (
        <div className="absolute z-30 mt-1 w-56 overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-mantle shadow-xl">
          {searchable ? (
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
              className="w-full border-b border-ctp-surface1 bg-ctp-base px-2 py-1.5 text-xs text-ctp-text outline-none"
            />
          ) : null}
          <div className="max-h-64 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <p className="px-2 py-1.5 text-xs text-ctp-subtext0">No matches</p>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition hover:bg-ctp-surface0 ${
                    option.value === value ? "bg-ctp-surface0 text-ctp-text" : "text-ctp-subtext1"
                  }`}
                >
                  {option.icon ? (
                    <img
                      src={option.icon}
                      alt=""
                      className="h-6 w-6 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <span className="h-6 w-6 shrink-0" />
                  )}
                  <span className="truncate">{option.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
