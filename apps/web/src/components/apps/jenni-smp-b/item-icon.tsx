import cn from "classnames"

type Props = {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const SIZE_CLASS = {
  sm: "h-7 w-7",
  md: "h-10 w-10",
  lg: "h-14 w-14",
} as const

function ItemIcon({ src, alt, size = "md", className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={cn(
        "shrink-0 object-contain [image-rendering:pixelated]",
        SIZE_CLASS[size],
        className,
      )}
    />
  )
}

export default ItemIcon
