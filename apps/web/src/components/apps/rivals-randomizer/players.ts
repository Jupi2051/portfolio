import bonnie from "@/assets/rivals-players/bonnie.png"
import burger from "@/assets/rivals-players/burger.png"
import filip from "@/assets/rivals-players/filip.png"
import jenni from "@/assets/rivals-players/jenni.gif"
import jupi from "@/assets/rivals-players/jupi.png"
import kek from "@/assets/rivals-players/kek.png"
import mimi from "@/assets/rivals-players/mimi.png"
import oranthur from "@/assets/rivals-players/oranthur.png"
import sage from "@/assets/rivals-players/sage.png"
import seth from "@/assets/rivals-players/seth.png"
import thomas from "@/assets/rivals-players/thomas.webp"
import yuu from "@/assets/rivals-players/yuu.png"

export type RivalsPlayer = {
  id: string
  name: string
  image: string
}

export const RIVALS_PLAYERS: RivalsPlayer[] = [
  { id: "bonnie", name: "Bonnie", image: bonnie },
  { id: "burger", name: "Burger", image: burger },
  { id: "filip", name: "Filip", image: filip },
  { id: "jenni", name: "Jenni", image: jenni },
  { id: "jupi", name: "Jupi", image: jupi },
  { id: "kek", name: "Kek", image: kek },
  { id: "mimi", name: "Mimi", image: mimi },
  { id: "oranthur", name: "Oranthur", image: oranthur },
  { id: "sage", name: "Sage", image: sage },
  { id: "seth", name: "Seth", image: seth },
  { id: "thomas", name: "Thomas", image: thomas },
  { id: "yuu", name: "Yuu", image: yuu },
]
