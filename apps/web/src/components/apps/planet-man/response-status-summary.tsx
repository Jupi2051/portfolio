import ResponseStatusCode from "./response-status-code";
import { getHttpStatusPhrase } from "./http-status-phrases";

type Props = {
  status: number;
  /** Raw phrase from the server (e.g. axios `statusText`), used if not in the canonical list */
  statusText: string;
  durationMs: number;
};

/**
 * Status line: code badge + canonical meaning; response time as subtext.
 */
export default function ResponseStatusSummary({
  status,
  statusText,
  durationMs,
}: Props) {
  const phrase = getHttpStatusPhrase(status, statusText);

  return (
    <div
      className="flex min-w-0 items-start gap-2.5"
      role="status"
      aria-label={`HTTP ${status} ${phrase}, ${durationMs} milliseconds`}
    >
      <ResponseStatusCode status={status} />
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0 leading-tight">
        <span className="text-xs font-medium tracking-tight text-ctp-text">
          {phrase}
        </span>
        <span className="text-[9px] font-normal tracking-normal text-ctp-overlay0/85">
          {durationMs} ms
        </span>
      </div>
    </div>
  );
}
