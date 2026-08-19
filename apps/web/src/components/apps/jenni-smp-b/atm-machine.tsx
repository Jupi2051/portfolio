import { useMemo, useState } from "react"
import cn from "classnames"
import {
  ALL_DENOM_IDS,
  DENOMINATIONS,
  emptyCounts,
  formatUsd,
  type DenominationId,
} from "./catalog"
import { splitLikeAtm } from "./atm-split"
import ItemIcon from "./item-icon"
import PayoutList from "./payout-list"

const PRESETS = [20, 50, 100, 137, 250]

function AtmMachine() {
  const [amountText, setAmountText] = useState("")
  const [enabled, setEnabled] = useState<Set<DenominationId>>(
    () => new Set(ALL_DENOM_IDS),
  )

  const amount = Number.parseInt(amountText.replace(/[^\d]/g, ""), 10) || 0

  const split = useMemo(
    () => splitLikeAtm(amount, enabled),
    [amount, enabled],
  )

  const toggle = (id: DenominationId) => {
    setEnabled((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const enableKind = (kind: "bill" | "coin" | "all") => {
    if (kind === "all") {
      setEnabled(new Set(ALL_DENOM_IDS))
      return
    }
    setEnabled(
      new Set(
        DENOMINATIONS.filter((denom) => denom.kind === kind).map(
          (denom) => denom.id,
        ),
      ),
    )
  }

  return (
    <div className="flex flex-col gap-4 @lg/appwindow:flex-row @lg/appwindow:items-start">
      <section className="flex min-w-0 flex-1 flex-col gap-3">
        <div>
          <h2 className="font-jockey-one text-xl tracking-wide text-ctp-yellow">
            Cash out
          </h2>
          <p className="text-xs text-ctp-subtext0">
            Enter an amount. The bank fills it largest-first, like a real ATM.
          </p>
        </div>

        <label className="flex flex-col gap-1" htmlFor="atm-amount">
          <span className="text-2xs font-medium uppercase tracking-widest text-ctp-subtext0">
            Amount
          </span>
          <div className="flex items-center gap-2 rounded-xl border border-ctp-yellow/35 bg-ctp-crust px-3 py-2">
            <span className="font-jockey-one text-2xl text-ctp-yellow">$</span>
            <input
              id="atm-amount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={amountText}
              onChange={(event) =>
                setAmountText(event.target.value.replace(/[^\d]/g, ""))
              }
              className="w-full bg-transparent font-jockey-one text-3xl tracking-wide text-ctp-text outline-none placeholder:text-ctp-overlay0"
            />
          </div>
        </label>

        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmountText(String(preset))}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1 text-xs transition",
                amount === preset
                  ? "border-ctp-yellow bg-ctp-yellow/20 text-ctp-yellow"
                  : "border-ctp-surface2 text-ctp-subtext0 hover:border-ctp-yellow/40 hover:text-ctp-yellow",
              )}
            >
              {formatUsd(preset)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-2xs font-medium uppercase tracking-widest text-ctp-subtext0">
            Use
          </p>
          <button
            type="button"
            onClick={() => enableKind("all")}
            className="cursor-pointer rounded-md border border-ctp-yellow/30 px-2 py-0.5 text-[11px] text-ctp-yellow hover:bg-ctp-yellow/10"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => enableKind("bill")}
            className="cursor-pointer rounded-md border border-ctp-green/30 px-2 py-0.5 text-[11px] text-ctp-green hover:bg-ctp-green/10"
          >
            Bills
          </button>
          <button
            type="button"
            onClick={() => enableKind("coin")}
            className="cursor-pointer rounded-md border border-ctp-peach/30 px-2 py-0.5 text-[11px] text-ctp-peach hover:bg-ctp-peach/10"
          >
            Coins
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {DENOMINATIONS.map((denom) => {
            const checked = enabled.has(denom.id)
            return (
              <label
                key={denom.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition",
                  checked
                    ? "border-ctp-yellow/35 bg-ctp-yellow/10"
                    : "border-ctp-surface2 bg-ctp-surface0/30 opacity-70",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(denom.id)}
                  className="size-4 accent-yellow-400"
                />
                <ItemIcon src={denom.icon} alt={denom.mineralName} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ctp-text">
                    {denom.billName}
                  </p>
                  <p className="truncate text-xs text-ctp-subtext0">
                    {denom.mineralName}
                  </p>
                </div>
                <span className="font-jockey-one text-lg text-ctp-yellow">
                  {formatUsd(denom.value)}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      <section className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="rounded-xl border border-ctp-yellow/35 bg-ctp-yellow/10 px-4 py-3">
          <p className="text-2xs font-medium uppercase tracking-widest text-ctp-yellow">
            Dispensed
          </p>
          <p className="font-jockey-one text-3xl tracking-wide text-ctp-text">
            {formatUsd(split.dispensed)}
            {split.remainder > 0 ? (
              <span className="ml-2 text-lg text-ctp-red">
                leftover {formatUsd(split.remainder)}
              </span>
            ) : null}
          </p>
        </div>

        {enabled.size === 0 ? (
          <p className="rounded-xl border border-dashed border-ctp-surface2 bg-ctp-surface0/30 px-4 py-8 text-center text-sm text-ctp-subtext0">
            Check at least one bill or coin to build a stack.
          </p>
        ) : (
          <PayoutList
            counts={amount > 0 ? split.counts : emptyCounts()}
            remainder={amount > 0 ? split.remainder : 0}
            emptyLabel="Type an amount to see the ATM stack."
          />
        )}
      </section>
    </div>
  )
}

export default AtmMachine
