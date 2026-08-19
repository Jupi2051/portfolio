import { useMemo, useState } from "react"
import {
  ALL_DENOM_IDS,
  emptyTradeCounts,
  formatUsd,
  totalFromTradeCounts,
  TRADE_MINERALS,
  type TradeCounts,
  type TradeMineralId,
} from "./catalog"
import { splitLikeAtm } from "./atm-split"
import ItemIcon from "./item-icon"
import PayoutList from "./payout-list"
import QuantityStepper from "./quantity-stepper"

function TradeSell() {
  const [counts, setCounts] = useState<TradeCounts>(emptyTradeCounts)

  const total = totalFromTradeCounts(counts)
  const payout = useMemo(
    () => splitLikeAtm(total, new Set(ALL_DENOM_IDS)),
    [total],
  )
  const sold = TRADE_MINERALS.filter((mineral) => counts[mineral.id] > 0)

  const setCount = (id: TradeMineralId, next: number) => {
    setCounts((current) => ({ ...current, [id]: next }))
  }

  return (
    <div className="flex flex-col gap-4 @lg/appwindow:flex-row @lg/appwindow:items-start">
      <section className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h2 className="font-jockey-one text-xl tracking-wide text-ctp-yellow">
              Sell ores
            </h2>
            <p className="text-xs text-ctp-subtext0">
              Add Minecraft minerals. The total converts to B cash, then bills.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCounts(emptyTradeCounts())}
            className="cursor-pointer text-xs text-ctp-overlay1 underline-offset-2 hover:text-ctp-yellow hover:underline"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {TRADE_MINERALS.map((mineral) => (
            <label
              key={mineral.id}
              htmlFor={`trade-${mineral.id}`}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-ctp-yellow/20 bg-ctp-surface0/40 px-3 py-2"
            >
              <ItemIcon src={mineral.icon} alt={mineral.name} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ctp-text">
                  {mineral.name}
                </p>
                <p className="truncate text-xs text-ctp-subtext0">
                  1 = {formatUsd(mineral.value)}
                </p>
              </div>
              <QuantityStepper
                id={`trade-${mineral.id}`}
                value={counts[mineral.id]}
                onChange={(next) => setCount(mineral.id, next)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="rounded-xl border border-ctp-yellow/35 bg-ctp-yellow/10 px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-widest text-ctp-yellow">
            Worth
          </p>
          <p className="font-jockey-one text-3xl tracking-wide text-ctp-text">
            {formatUsd(total)}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-ctp-subtext0">
            Sold
          </h3>
          {sold.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ctp-surface2 bg-ctp-surface0/30 px-4 py-8 text-center text-sm text-ctp-subtext0">
              Add a diamond, emerald, ingot, or netherite to see the payout.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {sold.map((mineral) => {
                const qty = counts[mineral.id]
                return (
                  <div
                    key={mineral.id}
                    className="flex items-center gap-3 rounded-xl border border-ctp-yellow/20 bg-ctp-surface0/50 px-3 py-2"
                  >
                    <div className="relative">
                      <ItemIcon
                        src={mineral.icon}
                        alt={mineral.name}
                        size="md"
                      />
                      <span className="absolute -right-1 -bottom-1 rounded bg-ctp-crust/90 px-1 text-[10px] font-semibold text-ctp-yellow">
                        {qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ctp-text">
                        {qty}× {mineral.name}
                      </p>
                      <p className="truncate text-xs text-ctp-subtext0">
                        {formatUsd(mineral.value)} each
                      </p>
                    </div>
                    <p className="shrink-0 font-jockey-one text-lg text-ctp-yellow">
                      {formatUsd(qty * mineral.value)}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-ctp-subtext0">
            Paid in bills
          </h3>
          <p className="mb-2 text-xs text-ctp-overlay1">
            ATM split of the total, largest bills first.
          </p>
          <PayoutList
            counts={payout.counts}
            emptyLabel="Nothing to cash out yet."
          />
        </div>
      </section>
    </div>
  )
}

export default TradeSell
