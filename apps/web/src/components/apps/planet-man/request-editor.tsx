import { useEffect, useState } from "react";
import cn from "classnames";
import type { HttpMethod } from "./types";

type Tab = "body" | "headers";

type Props = {
  method: HttpMethod;
  headersText: string;
  onHeadersChange: (v: string) => void;
  bodyText: string;
  onBodyChange: (v: string) => void;
};

const BODY_METHODS: HttpMethod[] = ["POST", "PUT", "PATCH", "DELETE"];

export default function RequestEditor({
  method,
  headersText,
  onHeadersChange,
  bodyText,
  onBodyChange,
}: Props) {
  const [tab, setTab] = useState<Tab>("headers");
  const showBody = BODY_METHODS.includes(method);

  useEffect(() => {
    if (!showBody && tab === "body") setTab("headers");
  }, [showBody, tab]);

  return (
    <div className="flex min-h-0 flex-1 flex-col border border-ctp-surface1 bg-ctp-mantle/80">
      <div className="flex border-b border-ctp-surface1 bg-ctp-crust/90">
        <button
          type="button"
          onClick={() => setTab("headers")}
          className={cn(
            "cursor-pointer px-3 py-2 text-xs font-medium uppercase tracking-wide transition",
            tab === "headers"
              ? "border-b-2 border-ctp-mauve text-ctp-text"
              : "text-ctp-subtext0 hover:text-ctp-text"
          )}
        >
          Headers
        </button>
        {showBody ? (
          <button
            type="button"
            onClick={() => setTab("body")}
            className={cn(
              "cursor-pointer px-3 py-2 text-xs font-medium uppercase tracking-wide transition",
              tab === "body"
                ? "border-b-2 border-ctp-mauve text-ctp-text"
                : "text-ctp-subtext0 hover:text-ctp-text"
            )}
          >
            Body
          </button>
        ) : null}
      </div>
      <div className="min-h-0 flex-1 p-2">
        {tab === "headers" ? (
          <div className="flex h-full min-h-[140px] flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-ctp-subtext0">
              JSON object (merged with request)
            </p>
            <textarea
              value={headersText}
              onChange={(e) => onHeadersChange(e.target.value)}
              spellCheck={false}
              className="planet-man-scrollbar min-h-[120px] flex-1 resize-none rounded border border-ctp-surface1 bg-ctp-base p-2 font-mono text-xs text-ctp-text outline-none focus-visible:ring-1 focus-visible:ring-ctp-mauve/50"
              placeholder='{\n  "Accept": "application/json"\n}'
            />
          </div>
        ) : showBody ? (
          <div className="flex h-full min-h-[140px] flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-ctp-subtext0">
              JSON or raw text
            </p>
            <textarea
              value={bodyText}
              onChange={(e) => onBodyChange(e.target.value)}
              spellCheck={false}
              className="planet-man-scrollbar min-h-[120px] flex-1 resize-none rounded border border-ctp-surface1 bg-ctp-base p-2 font-mono text-xs text-ctp-text outline-none focus-visible:ring-1 focus-visible:ring-ctp-mauve/50"
              placeholder='{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}'
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
