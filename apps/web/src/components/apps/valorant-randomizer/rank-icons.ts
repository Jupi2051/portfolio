import iron from "@/assets/valorant-ranks/Iron.webp"
import bronze from "@/assets/valorant-ranks/Bronze.webp"
import silver from "@/assets/valorant-ranks/Silver.webp"
import gold from "@/assets/valorant-ranks/Gold.webp"
import platinum from "@/assets/valorant-ranks/Platinum.webp"
import diamond from "@/assets/valorant-ranks/Diamond.webp"
import ascendant from "@/assets/valorant-ranks/Ascendant.webp"
import immortal from "@/assets/valorant-ranks/Immortal.webp"
import radiant from "@/assets/valorant-ranks/Radiant.webp"

export function getRankIconUrl(rankLabel: string): string {
  const tier = rankLabel.split(" ")[0]?.toLowerCase() ?? ""

  switch (tier) {
    case "radiant":
      return radiant
    case "immortal":
      return immortal
    case "ascendant":
      return ascendant
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
      return iron
  }
}
