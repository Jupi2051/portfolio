import cardboard from "@/assets/ranks/Cardboard.png"
import celestial from "@/assets/ranks/Celestial.webp"
import diamond from "@/assets/ranks/Diamond.webp"
import gold from "@/assets/ranks/Gold.webp"
import grandmaster from "@/assets/ranks/Grandmaster.webp"
import oneAboveAll from "@/assets/ranks/OneAboveAll.webp"
import platinum from "@/assets/ranks/Platnium.webp"

export function getRankIconUrl(rankLabel: string): string {
  const tier = rankLabel.split(" ")[0]?.toLowerCase() ?? ""

  switch (tier) {
    case "one":
      return oneAboveAll
    case "celestial":
      return celestial
    case "grandmaster":
      return grandmaster
    case "diamond":
      return diamond
    case "platinum":
      return platinum
    case "gold":
      return gold
    default:
      return cardboard
  }
}
