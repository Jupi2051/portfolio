import cn from "classnames";
import { HTTP_METHODS, type HttpMethod } from "./types";

type Props = {
  value: HttpMethod;
  onChange: (m: HttpMethod) => void;
  disabled?: boolean;
};

export default function MethodSelect({ value, onChange, disabled }: Props) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as HttpMethod)}
      className={cn(
        "shrink-0 rounded-l-md border border-r-0 border-ctp-surface1 bg-ctp-mantle px-2 py-2 text-xs font-semibold uppercase tracking-wide text-ctp-text outline-none",
        "cursor-pointer focus-visible:ring-2 focus-visible:ring-ctp-mauve/50",
        "disabled:opacity-50",
        {
          "text-ctp-green": value === "GET",
          "text-ctp-yellow": ["POST", "PUT", "PATCH"].includes(value),
          "text-ctp-red": value === "DELETE",
          "text-ctp-teal": ["HEAD", "OPTIONS"].includes(value),
        }
      )}
      aria-label="HTTP method"
    >
      {HTTP_METHODS.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}
