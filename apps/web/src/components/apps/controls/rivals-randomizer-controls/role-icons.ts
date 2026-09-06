import support from "@/assets/roles/support.webp"
import tank from "@/assets/roles/tank.webp"
import dps from "@/assets/roles/dps.webp"

export const ROLE_ICONS: Record<0 | 1 | 2, string> = {
  0: support,
  1: tank,
  2: dps,
}

export const ROLE_NAMES: Record<0 | 1 | 2, string> = {
  0: "Support",
  1: "Tank",
  2: "Dps",
}
