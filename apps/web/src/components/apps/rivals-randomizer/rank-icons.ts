import bronze from "@/assets/ranks/Bronze.webp"
import cardboard from "@/assets/ranks/Cardboard.png"
import celestial from "@/assets/ranks/Celestial.webp"
import diamond from "@/assets/ranks/Diamond.webp"
import gold from "@/assets/ranks/Gold.webp"
import grandmaster from "@/assets/ranks/Grandmaster.webp"
import platinum from "@/assets/ranks/Platnium.webp"
import silver from "@/assets/ranks/Silver.webp"

export function getRankIconUrl(rankLabel: string): string {
  const tier = rankLabel.split(" ")[0]?.toLowerCase() ?? ""

  switch (tier) {
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
    case "silver":
      return silver
    case "bronze":
      return bronze
    default:
      return cardboard
  }
}
