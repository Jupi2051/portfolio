import { useMemo, useState } from "react"
import cn from "classnames"
import {
  ALL_DENOM_IDS,
  DENOMINATIONS,
  emptyCounts,
  formatUsd,
  totalFromCounts,
  type DenomCounts,
  type DenominationId,
} from "./catalog"
import { splitLikeAtm } from "./atm-split"
import ItemIcon from "./item-icon"
import PayoutList from "./payout-list"
import QuantityStepper from "./quantity-stepper"

function MineralExchange() {
  const [counts, setCounts] = useState<DenomCounts>(emptyCounts)

  const total = totalFromCounts(counts)
  const simplified = useMemo(
    () => splitLikeAtm(total, new Set(ALL_DENOM_IDS)),
    [total],
  )

  const setCount = (id: DenominationId, next: number) => {
    setCounts((current) => ({ ...current, [id]: next }))
  }

  return (
    <div className="flex flex-col gap-4 @lg/appwindow:flex-row @lg/appwindow:items-start">
      <section className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h2 className="font-jockey-one text-xl tracking-wide text-ctp-yellow">
              Minerals in
            </h2>
            <p className="text-xs text-ctp-subtext0">
              Count what you have. Each mineral maps 1:1 to its bill or coin.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCounts(emptyCounts())}
            className="cursor-pointer text-xs text-ctp-overlay1 underline-offset-2 hover:text-ctp-yellow hover:underline"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {DENOMINATIONS.map((denom) => (
            <label
              key={denom.id}
              htmlFor={`mineral-${denom.id}`}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-ctp-yellow/20 bg-ctp-surface0/40 px-3 py-2"
            >
              <ItemIcon src={denom.icon} alt={denom.mineralName} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ctp-text">
                  {denom.mineralName}
                </p>
                <p className="truncate text-xs text-ctp-subtext0">
                  → {denom.billName} · {formatUsd(denom.value)}
                </p>
              </div>
              <QuantityStepper
                id={`mineral-${denom.id}`}
                value={counts[denom.id]}
                onChange={(next) => setCount(denom.id, next)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="rounded-xl border border-ctp-yellow/35 bg-ctp-yellow/10 px-4 py-3">
          <p className="text-2xs font-medium uppercase tracking-widest text-ctp-yellow">
            Chest total
          </p>
          <p className="font-jockey-one text-3xl tracking-wide text-ctp-text">
            {formatUsd(total)}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-ctp-subtext0">
            Direct exchange
          </h3>
          <PayoutList
            counts={counts}
            emptyLabel="Add minerals to see the matching bills and coins."
          />
        </div>

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-ctp-subtext0">
            Bank simplified
          </h3>
          <p className="mb-2 text-xs text-ctp-overlay1">
            Same total, paid like an ATM: largest bills first.
          </p>
          <div
            className={cn(
              total > 0 &&
                JSON.stringify(simplified.counts) === JSON.stringify(counts)
                ? "opacity-70"
                : "",
            )}
          >
            <PayoutList
              counts={simplified.counts}
              emptyLabel="Nothing to simplify yet."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default MineralExchange
