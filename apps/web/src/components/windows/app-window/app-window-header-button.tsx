import cn from "classnames"

const AppWindowHeaderButton = ({
  children,
  onClick,
  className,
  label,
  type = "normal",
  disabled = false,
}: {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  label: string
  type?: "normal" | "danger"
  disabled?: boolean
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onDoubleClick={(event) => event.stopPropagation()}
      className={cn(
        "flex h-7 w-8 cursor-default items-center justify-center rounded-lg text-lilac outline-none",
        "transition-[background-color,color,scale] duration-150 ease-out-strong active:scale-[0.94] active:duration-100",
        "focus-visible:bg-white/9 disabled:cursor-not-allowed disabled:opacity-50",
        type === "danger"
          ? "hover:bg-melon hover:text-white active:bg-[#f04a6d]"
          : "hover:bg-white/9 active:bg-white/14",
        className,
      )}
    >
      {children}
    </button>
  )
}

export default AppWindowHeaderButton
