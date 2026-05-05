import MethodSelect from "./method-select";
import type { HttpMethod } from "./types";

type Props = {
  method: HttpMethod;
  onMethodChange: (m: HttpMethod) => void;
  url: string;
  onUrlChange: (url: string) => void;
  onSend: () => void;
  loading: boolean;
};

export default function UrlRow({
  method,
  onMethodChange,
  url,
  onUrlChange,
  onSend,
  loading,
}: Props) {
  return (
    <div className="flex w-full min-w-0 items-stretch shadow-sm">
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
          if (e.key === "Enter" && !loading) onSend();
        }}
        placeholder="https://api.example.com/resource"
        disabled={loading}
        spellCheck={false}
        className="min-w-0 flex-1 border border-ctp-surface1 bg-ctp-base px-3 py-2 font-mono text-sm text-ctp-text placeholder:text-ctp-overlay0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ctp-mauve/40 disabled:opacity-50"
        aria-label="Request URL"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={loading}
        className="shrink-0 cursor-pointer rounded-r-md bg-ctp-pink px-5 py-2 text-sm font-semibold text-ctp-crust transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "…" : "Send"}
      </button>
    </div>
  );
}
