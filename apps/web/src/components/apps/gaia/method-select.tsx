import cn from "classnames";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { HTTP_METHODS, type HttpMethod } from "./types";
import { HTTP_METHOD_TONE } from "./http-method-tones";

type Props = {
  value: HttpMethod;
  onChange: (m: HttpMethod) => void;
  disabled?: boolean;
};

export default function MethodSelect({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();
  const listboxId = `${baseId}-method-listbox`;
  const tone = HTTP_METHOD_TONE[value];

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  useOnClickOutside(rootRef as RefObject<HTMLElement>, () => {
    if (open) close();
  });

  useEffect(() => {
    if (!open) return;
    const i = HTTP_METHODS.indexOf(value);
    setHighlightIndex(i >= 0 ? i : 0);
    const t = requestAnimationFrame(() => {
      listRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(t);
  }, [open, value]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(
      `[data-method-index="${highlightIndex}"]`
    );
    row?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);

  const selectMethod = (m: HttpMethod) => {
    onChange(m);
    close();
  };

  const onListKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % HTTP_METHODS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(
        (i) => (i - 1 + HTTP_METHODS.length) % HTTP_METHODS.length
      );
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(HTTP_METHODS[highlightIndex]);
      close();
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlightIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlightIndex(HTTP_METHODS.length - 1);
    }
  };

  return (
    <div ref={rootRef} className="relative h-10 min-h-10 shrink-0 self-stretch">
      <button
        ref={triggerRef}
        type="button"
        id={`${baseId}-method-trigger`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          "flex h-full min-h-10 min-w-23 cursor-pointer items-center justify-between gap-1 rounded-l-md border border-r-0 border-ctp-surface1 px-2.5 py-0 outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-ctp-mauve/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          tone.triggerBg
        )}
      >
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-wide",
            tone.text
          )}
        >
          {value}
        </span>
        <svg
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-ctp-subtext0 transition-transform",
            open && "rotate-180"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${baseId}-opt-${HTTP_METHODS[highlightIndex]}`}
          onKeyDown={onListKeyDown}
          className="absolute left-0 top-[calc(100%+4px)] z-50 min-w-full overflow-hidden rounded-md border border-ctp-surface1 bg-ctp-mantle py-1 shadow-lg ring-1 ring-black/20 outline-none"
        >
          <div className="gaia-scrollbar max-h-56 overflow-y-auto py-0.5">
            {HTTP_METHODS.map((m, index) => {
              const t = HTTP_METHOD_TONE[m];
              const selected = m === value;
              const highlighted = index === highlightIndex;
              return (
                <div
                  key={m}
                  id={`${baseId}-opt-${m}`}
                  role="option"
                  aria-selected={selected}
                  data-method-index={index}
                  className={cn(
                    "flex cursor-pointer items-center border-l-[3px] border-transparent py-2 pl-2.5 pr-3 text-xs font-semibold uppercase tracking-wide transition",
                    t.text,
                    highlighted && "bg-ctp-surface0/90",
                    selected &&
                      cn(t.listItemSelected, t.listBorderSelected, "font-bold"),
                    !selected && !highlighted && "hover:bg-ctp-surface0/50"
                  )}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectMethod(m);
                  }}
                >
                  {m}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
