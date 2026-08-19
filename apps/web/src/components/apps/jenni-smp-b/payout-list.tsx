import cn from "classnames"
import {
  DENOMINATIONS,
  formatUsd,
  pieceCount,
  type DenomCounts,
} from "./catalog"
import ItemIcon from "./item-icon"

type Props = {
  counts: DenomCounts
  remainder?: number
  emptyLabel: string
}

function PayoutList({ counts, remainder = 0, emptyLabel }: Props) {
  const rows = DENOMINATIONS.filter((denom) => counts[denom.id] > 0)
  const pieces = pieceCount(counts)

  if (rows.length === 0 && remainder <= 0) {
    return (
      <p className="rounded-xl border border-dashed border-ctp-surface2 bg-ctp-surface0/30 px-4 py-8 text-center text-sm text-ctp-subtext0">
        {emptyLabel}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {rows.map((denom) => {
        const qty = counts[denom.id]
        return (
          <div
            key={denom.id}
            className="flex items-center gap-3 rounded-xl border border-ctp-yellow/20 bg-ctp-surface0/50 px-3 py-2"
          >
            <div className="relative">
              <ItemIcon src={denom.icon} alt={denom.mineralName} size="md" />
              <span className="absolute -right-1 -bottom-1 rounded bg-ctp-crust/90 px-1 text-2xs font-semibold text-ctp-yellow">
                {qty}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ctp-text">
                {qty}× {denom.billName}
              </p>
              <p className="truncate text-xs text-ctp-subtext0">
                {qty}× {denom.mineralName}
              </p>
            </div>
            <p className="shrink-0 font-jockey-one text-lg text-ctp-yellow">
              {formatUsd(qty * denom.value)}
            </p>
          </div>
        )
      })}

      {remainder > 0 ? (
        <p
          className="rounded-lg border border-ctp-red/40 bg-ctp-red/10 px-3 py-2 text-xs text-ctp-red"
          role="status"
        >
          Leftover {formatUsd(remainder)} cannot be made with the selected
          bills. Enable a smaller coin to cover it.
        </p>
      ) : null}

      {pieces > 0 ? (
        <p className={cn("text-right text-xs text-ctp-subtext0")}>
          {pieces} piece{pieces === 1 ? "" : "s"}
        </p>
      ) : null}
    </div>
  )
}

export default PayoutList
