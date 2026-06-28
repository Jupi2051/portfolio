import bonnie from "@/assets/rivals-players/bonnie.png"
import burger from "@/assets/rivals-players/burger.png"
import filip from "@/assets/rivals-players/filip.png"
import jenni from "@/assets/rivals-players/jenni.gif"
import jupi from "@/assets/rivals-players/jupi.png"
import kek from "@/assets/rivals-players/kek.png"
import mimi from "@/assets/rivals-players/mimi.png"
import n0rieth from "@/assets/rivals-players/noreith.png"
import oranthur from "@/assets/rivals-players/oranthur.png"
import sage from "@/assets/rivals-players/sage.png"
import thomas from "@/assets/rivals-players/thomas.webp"
import yuu from "@/assets/rivals-players/yuu.png"
import type { RivalsPlayer } from "./types"

export const RIVALS_PLAYERS: RivalsPlayer[] = [
  {
    id: "jupi",
    name: "Jupi",
    image: jupi,
    peakRank: { label: "Celestial 3", skillLevel: 7 },
    skillLevel: 1,
    roleSkills: [
      { weight: 1.0, role: 2 },
      { weight: 0.9, role: 0 },
      { weight: 0.6, role: 1 },
    ],
  },
  {
    id: "filip",
    name: "Filip",
    image: filip,
    peakRank: { label: "Celestial 1", skillLevel: 9 },
    skillLevel: 1,
    roleSkills: [
      { weight: 1.0, role: 2 },
      { weight: 0.8, role: 1 },
      { weight: 0.6, role: 0 },
    ],
  },
  {
    id: "bonnie",
    name: "Bonnie",
    image: bonnie,
    peakRank: { label: "Celestial 2", skillLevel: 8 },
    skillLevel: 0.95,
    roleSkills: [
      { weight: 0.95, role: 0 },
      { weight: 0.65, role: 1 },
      { weight: 0.6, role: 2 },
    ],
  },
  {
    id: "thomas",
    name: "Thomas",
    image: thomas,
    peakRank: { label: "Beginner 3", skillLevel: 0 },
    skillLevel: 0.1,
    roleSkills: [
      { weight: 0.1, role: 1 },
      { weight: 0.08, role: 0 },
      { weight: 0.05, role: 2 },
    ],
  },
  {
    id: "n0rieth",
    name: "N0rieth",
    image: n0rieth,
    peakRank: { label: "Diamond 2", skillLevel: 3 },
    skillLevel: 0.7,
    roleSkills: [
      { weight: 0.7, role: 1 },
      { weight: 0.6, role: 2 },
      { weight: 0.5, role: 0 },
    ],
  },
  {
    id: "kek",
    name: "Kek",
    image: kek,
    peakRank: { label: "Grandmaster 3", skillLevel: 4 },
    skillLevel: 0.8,
    roleSkills: [
      { weight: 0.8, role: 2 },
      { weight: 0.55, role: 1 },
      { weight: 0.5, role: 0 },
    ],
  },
  {
    id: "burger",
    name: "Burger",
    image: burger,
    peakRank: { label: "Grandmaster 2", skillLevel: 5 },
    skillLevel: 0.75,
    roleSkills: [
      { weight: 0.85, role: 1 },
      { weight: 0.7, role: 2 },
      { weight: 0.3, role: 0 },
    ],
  },
  {
    id: "oranthur",
    name: "Oranthur",
    image: oranthur,
    peakRank: { label: "Grandmaster 3", skillLevel: 4 },
    skillLevel: 0.7,
    roleSkills: [
      { weight: 0.7, role: 2 },
      { weight: 0.65, role: 0 },
      { weight: 0.5, role: 1 },
    ],
  },
  {
    id: "sage",
    name: "Sage",
    image: sage,
    peakRank: { label: "Platinum 3", skillLevel: 2 },
    skillLevel: 0.45,
    roleSkills: [
      { weight: 0.45, role: 2 },
      { weight: 0.45, role: 0 },
      { weight: 0.1, role: 1 },
    ],
  },
  {
    id: "jenni",
    name: "Jenni",
    image: jenni,
    peakRank: { label: "Gold 3", skillLevel: 1 },
    skillLevel: 0.3,
    roleSkills: [
      { weight: 0.4, role: 0 },
      { weight: 0.3, role: 1 },
      { weight: 0.1, role: 2 },
    ],
  },
  {
    id: "mimi",
    name: "Mimi",
    image: mimi,
    peakRank: { label: "Gold 3", skillLevel: 1 },
    skillLevel: 0.3,
    roleSkills: [
      { weight: 0.5, role: 0 },
      { weight: 0.4, role: 1 },
      { weight: 0.3, role: 2 },
    ],
  },
  {
    id: "yuu",
    name: "Yuu",
    image: yuu,
    peakRank: { label: "Grandmaster 1", skillLevel: 6 },
    skillLevel: 0.9,
    roleSkills: [
      { weight: 1.0, role: 0 },
      { weight: 0.45, role: 1 },
      { weight: 0.4, role: 2 },
    ],
  },
]
