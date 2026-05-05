import cn from "classnames";

type Props = {
  status: number;
  className?: string;
};

function statusTone(status: number): string {
  if (status >= 200 && status < 300) return "bg-ctp-green/20 text-ctp-green";
  if (status >= 300 && status < 400) return "bg-ctp-teal/20 text-ctp-teal";
  if (status >= 400 && status < 500) return "bg-ctp-yellow/20 text-ctp-yellow";
  if (status >= 500) return "bg-ctp-red/20 text-ctp-red";
  if (status >= 100 && status < 200) return "bg-ctp-blue/20 text-ctp-blue";
  return "bg-ctp-surface1 text-ctp-subtext1";
}

/** Numeric HTTP status only, with Catppuccin tone by class. */
export default function ResponseStatusCode({ status, className }: Props) {
  return (
    <span
      className={cn(
        "shrink-0 rounded px-2 py-0.5 font-mono text-xs font-semibold tabular-nums",
        statusTone(status),
        className
      )}
    >
      {status}
    </span>
  );
}
