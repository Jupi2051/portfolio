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
        className="flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-[9px] border border-white/10 bg-white/4 px-2 text-xs text-moon transition-colors duration-150 ease-out-strong hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {selected?.icon ? (
          <img src={selected.icon} alt="" className="h-5 w-5 shrink-0 rounded object-cover" />
        ) : null}
        <span className="min-w-0 flex-1 truncate text-left">
          {selected?.label ?? placeholder}
        </span>
        <svg viewBox="0 0 24 24" className="size-3 shrink-0 text-haze-dim" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open ? (
        <div className="absolute z-30 mt-1 w-56 overflow-hidden rounded-xl border border-white/12 bg-[rgba(20,19,36,0.97)] shadow-[0_16px_40px_rgba(6,5,16,0.5)] backdrop-blur-xl">
          {searchable ? (
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
              className="w-full border-b border-white/8 bg-transparent px-3 py-2 text-xs text-moon outline-none placeholder:text-haze-dim"
            />
          ) : null}
          <div className="max-h-64 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <p className="px-2 py-1.5 text-xs text-haze-dim">No matches</p>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors duration-150 hover:bg-white/8 ${
                    option.value === value ? "bg-raised text-moon" : "text-haze"
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
