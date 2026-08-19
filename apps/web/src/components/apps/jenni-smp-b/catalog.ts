import diamond from "@/assets/jenni-smp-b/diamond.png"
import emerald from "@/assets/jenni-smp-b/emerald.png"
import goldIngot from "@/assets/jenni-smp-b/gold-ingot.png"
import goldNugget from "@/assets/jenni-smp-b/gold-nugget.png"
import ironIngot from "@/assets/jenni-smp-b/iron-ingot.png"
import netheriteIngot from "@/assets/jenni-smp-b/netherite-ingot.png"
import resinBrick from "@/assets/jenni-smp-b/resin-brick.png"
import resinClump from "@/assets/jenni-smp-b/resin-clump.png"

export const DENOMINATIONS = [
  {
    id: "bill100",
    value: 100,
    kind: "bill",
    billName: "$100 Bill",
    billShort: "B 100",
    mineralName: "Resin Brick",
    icon: resinBrick,
  },
  {
    id: "coin10",
    value: 10,
    kind: "coin",
    billName: "$10 Coin",
    billShort: "B 10 Coin",
    mineralName: "Resin Clump",
    icon: resinClump,
  },
  {
    id: "bill5",
    value: 5,
    kind: "bill",
    billName: "$5 Bill",
    billShort: "B 5",
    mineralName: "Gold Ingot",
    icon: goldIngot,
  },
  {
    id: "coin1",
    value: 1,
    kind: "coin",
    billName: "B Coin",
    billShort: "B Coin",
    mineralName: "Gold Nugget",
    icon: goldNugget,
  },
] as const

export type Denomination = (typeof DENOMINATIONS)[number]
export type DenominationId = Denomination["id"]
export type DenomCounts = Record<DenominationId, number>

export const ALL_DENOM_IDS = DENOMINATIONS.map((denom) => denom.id)

export function emptyCounts(): DenomCounts {
  return {
    bill100: 0,
    coin10: 0,
    bill5: 0,
    coin1: 0,
  }
}

export function totalFromCounts(counts: DenomCounts): number {
  return DENOMINATIONS.reduce(
    (sum, denom) => sum + counts[denom.id] * denom.value,
    0,
  )
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`
}

export function pieceCount(counts: DenomCounts): number {
  return ALL_DENOM_IDS.reduce((sum, id) => sum + counts[id], 0)
}

export const TRADE_MINERALS = [
  {
    id: "netherite",
    name: "Netherite Ingot",
    value: 70,
    icon: netheriteIngot,
  },
  {
    id: "emerald",
    name: "Emerald",
    value: 50,
    icon: emerald,
  },
  {
    id: "diamond",
    name: "Diamond",
    value: 40,
    icon: diamond,
  },
  {
    id: "iron",
    name: "Iron Ingot",
    value: 5,
    icon: ironIngot,
  },
  {
    id: "gold",
    name: "Gold Ingot",
    value: 5,
    icon: goldIngot,
  },
] as const

export type TradeMineral = (typeof TRADE_MINERALS)[number]
export type TradeMineralId = TradeMineral["id"]
export type TradeCounts = Record<TradeMineralId, number>

export function emptyTradeCounts(): TradeCounts {
  return {
    netherite: 0,
    emerald: 0,
    diamond: 0,
    iron: 0,
    gold: 0,
  }
}

export function totalFromTradeCounts(counts: TradeCounts): number {
  return TRADE_MINERALS.reduce(
    (sum, mineral) => sum + counts[mineral.id] * mineral.value,
    0,
  )
}
