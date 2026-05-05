export default function PlanetManHeader() {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b border-ctp-surface1 bg-ctp-crust px-3 py-2">
      <span className="h-2 w-2 mt-0.5 rounded-full bg-ctp-mauve" aria-hidden />
      <h1 className="text-sm font-semibold tracking-tight text-ctp-text">
        Planetman
      </h1>
      <span className="text-[10px] uppercase tracking-widest text-ctp-subtext0">
        HTTP client
      </span>
    </header>
  )
}
