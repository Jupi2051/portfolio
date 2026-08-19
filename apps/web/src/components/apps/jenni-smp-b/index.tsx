import { lazy, Suspense, useState } from "react"
import cn from "classnames"
import { DENOMINATIONS, TRADE_MINERALS, formatUsd } from "./catalog"
import ItemIcon from "./item-icon"
import goldIngot from "@/assets/jenni-smp-b/gold-ingot.png"

const MineralExchange = lazy(() => import("./mineral-exchange"))
const AtmMachine = lazy(() => import("./atm-machine"))
const TradeSell = lazy(() => import("./trade-sell"))

type TabId = "minerals" | "atm" | "trade"

function PanelFallback() {
  return (
    <div className="flex flex-1 items-center justify-center py-16 text-sm text-ctp-yellow">
      Counting coins...
    </div>
  )
}

function JenniSmpB() {
  const [tab, setTab] = useState<TabId>("minerals")
  const rates = tab === "trade" ? TRADE_MINERALS : DENOMINATIONS

  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden bg-linear-to-br from-ctp-base via-ctp-mantle to-ctp-crust text-ctp-text">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
          <header className="flex items-center gap-3">
            <img
              src={goldIngot}
              alt=""
              draggable={false}
              className="h-12 w-12 object-contain [image-rendering:pixelated]"
            />
            <div>
              <h1 className="font-jockey-one text-3xl tracking-wide text-ctp-yellow">
                Jenni SMP B
              </h1>
              <p className="text-sm text-ctp-subtext0">
                Mineral exchange, ore sell, and ATM cash-out for the B economy
              </p>
            </div>
          </header>

          <div
            className={cn(
              "grid gap-2",
              tab === "trade"
                ? "grid-cols-2 sm:grid-cols-5"
                : "grid-cols-2 sm:grid-cols-4",
            )}
          >
            {rates.map((item) => {
              const name = "mineralName" in item ? item.mineralName : item.name
              const valueLabel =
                "billName" in item ? item.billName : formatUsd(item.value)

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-lg border border-ctp-yellow/20 bg-ctp-surface0/40 px-2 py-1.5"
                >
                  <ItemIcon src={item.icon} alt={name} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-2xs leading-tight text-ctp-subtext0">
                      {name}
                    </p>
                    <p className="truncate text-xs font-medium text-ctp-yellow">
                      {valueLabel}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-1 rounded-xl border border-ctp-yellow/25 bg-ctp-surface0/40 p-1">
            <TabButton
              active={tab === "minerals"}
              onClick={() => setTab("minerals")}
            >
              Minerals → Bills
            </TabButton>
            <TabButton active={tab === "atm"} onClick={() => setTab("atm")}>
              ATM Split
            </TabButton>
            <TabButton active={tab === "trade"} onClick={() => setTab("trade")}>
              Sell Ores
            </TabButton>
          </div>

          <Suspense fallback={<PanelFallback />}>
            {tab === "minerals" ? (
              <MineralExchange />
            ) : tab === "atm" ? (
              <AtmMachine />
            ) : (
              <TradeSell />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 cursor-pointer rounded-lg px-2 py-2 font-jockey-one text-xs tracking-wide transition sm:px-3 sm:text-sm",
        active
          ? "bg-ctp-yellow text-ctp-crust"
          : "text-ctp-subtext0 hover:bg-ctp-yellow/10 hover:text-ctp-yellow",
      )}
    >
      {children}
    </button>
  )
}

export default JenniSmpB
