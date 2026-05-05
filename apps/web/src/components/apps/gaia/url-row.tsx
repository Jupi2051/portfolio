import cn from "classnames"
import { motion } from "framer-motion"
import MethodSelect from "./method-select"
import SendButtonLoader from "./send-button-loader"
import type { HttpMethod } from "./types"

type Props = {
  method: HttpMethod
  onMethodChange: (m: HttpMethod) => void
  url: string
  onUrlChange: (url: string) => void
  onSend: () => void
  loading: boolean
}

const SEND_SLOT_PX = 112

export default function UrlRow({
  method,
  onMethodChange,
  url,
  onUrlChange,
  onSend,
  loading,
}: Props) {
  return (
    <div className="flex min-h-10 w-full min-w-0 items-stretch shadow-sm">
      <MethodSelect
        value={method}
        onChange={onMethodChange}
        disabled={loading}
      />
      <input
        type="url"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) onSend()
        }}
        placeholder="https://api.example.com/resource"
        disabled={loading}
        spellCheck={false}
        className="box-border h-10 min-h-10 min-w-0 flex-1 border border-ctp-surface1 bg-ctp-base px-3 py-2 font-mono text-sm leading-normal text-ctp-text placeholder:text-ctp-overlay0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ctp-mauve/40 disabled:opacity-50"
        aria-label="Request URL"
      />
      <motion.button
        type="button"
        onClick={onSend}
        disabled={loading}
        aria-busy={loading}
        style={{
          width: SEND_SLOT_PX,
          minWidth: SEND_SLOT_PX,
          maxWidth: SEND_SLOT_PX,
        }}
        className={cn(
          "box-border relative h-10 min-h-10 shrink-0 cursor-pointer overflow-hidden rounded-r-md border border-l-0 border-ctp-surface1/80 bg-ctp-pink py-0 text-sm font-bold leading-none tracking-wide text-ctp-crust",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-mauve focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base",
          "disabled:cursor-wait disabled:opacity-100",
          !loading &&
            "transition-opacity duration-200 hover:opacity-90 active:opacity-100",
        )}
      >
        <span className="relative z-1 flex size-full items-center justify-center px-1">
          {loading ? (
            <>
              <span className="sr-only">Sending request</span>
              <SendButtonLoader />
            </>
          ) : (
            <span className="drop-shadow-sm">Send</span>
          )}
        </span>
        {loading ? (
          <motion.span
            className="pointer-events-none absolute inset-0 z-0 rounded-r-md border-2 border-ctp-crust/25"
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </motion.button>
    </div>
  )
}
