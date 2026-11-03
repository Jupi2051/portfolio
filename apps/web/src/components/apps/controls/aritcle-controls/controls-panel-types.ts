export type ControlsPanel =
  | "overview"
  | "articles"
  | "vico"
  | "rivals-randomizer"
  | "valorant-randomizer"

export type NavigateToPanel = (panel: ControlsPanel) => void
