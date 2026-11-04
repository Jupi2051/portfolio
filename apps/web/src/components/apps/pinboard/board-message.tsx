import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import cn from "classnames"
import useMousePosition from "@/hooks/use-mouse-position"
import { EASE_OUT } from "@/lib/motion"
import { noteTheme, noteTilt, type NoteColor } from "./note-colors"

interface Props {
  name: string
  content: string
  top?: number
  left?: number
  color?: NoteColor
  /** Stable seed for the note's tilt (message id). */
  seed?: string
  isPending?: boolean
  isMoving?: boolean
  sticky?: boolean
  boardRef?: React.RefObject<HTMLDivElement>
  /** Static preview (compose modal) — no positioning. */
  preview?: boolean
}

/** A visitor's note: tilted paper, pushpin, handwritten message. */
function BoardMessage({
  name,
  content,
  top,
  left,
  color = "blue",
  seed,
  isPending = false,
  isMoving = false,
  boardRef,
  preview = false,
}: Props) {
  const mainDivRef = useRef<HTMLDivElement>(null)
  const boardRefCurrent = boardRef?.current
  const mainDivRefCurrent = mainDivRef.current
  const mousePosition = useMousePosition(isMoving)
  const theme = noteTheme(color)
  const tilt = isMoving ? -1 : noteTilt(seed ?? `${name}${content}`)

  useEffect(() => {
    if (
      !isMoving ||
      !boardRefCurrent ||
      !mainDivRefCurrent ||
      !mousePosition.x ||
      !mousePosition.y
    )
      return

    const scrollContainer = boardRefCurrent.querySelector(
      ".react-indiana-drag-scroll",
    )
    if (!scrollContainer) return

    const scrollRect = scrollContainer.getBoundingClientRect()
    const positionX =
      mousePosition.x - scrollRect.left + scrollContainer.scrollLeft
    const positionY = mousePosition.y - scrollRect.top + scrollContainer.scrollTop

    mainDivRefCurrent.style.top = `${positionY}px`
    mainDivRefCurrent.style.left = `${positionX}px`
  }, [
    isMoving,
    boardRefCurrent,
    mainDivRefCurrent,
    mousePosition.x,
    mousePosition.y,
  ])

  return (
    <div
      ref={mainDivRef}
      className={cn(
        preview ? "relative" : "absolute z-20",
        (isMoving || isPending) && "pointer-events-none z-30",
      )}
      style={
        preview || isMoving
          ? undefined
          : { top: `${top ?? 0}px`, left: `${left ?? 0}px` }
      }
      data-prevent-drag-scroll={true}
    >
      <motion.div
        className={cn(
          "group relative flex w-max max-w-60 min-w-40 cursor-auto flex-col gap-2.5 rounded-[14px] px-5 pt-6.5 pb-4",
          "transition-[translate,box-shadow] duration-200 ease-out-strong",
          isMoving
            ? "shadow-[0_36px_60px_rgba(6,5,16,0.6),0_0_0_2px_rgba(169,170,255,0.6)]"
            : "shadow-[0_18px_36px_rgba(6,5,16,0.5)] hover:-translate-y-0.5 hover:shadow-[0_24px_44px_rgba(6,5,16,0.55)]",
          color === "black" && "border border-white/10",
          isPending && "animate-pulse",
        )}
        style={{ backgroundColor: theme.paper }}
        initial={preview ? false : { opacity: 0, scale: 0.94, rotate: tilt }}
        animate={{ opacity: 1, scale: isMoving ? 1.04 : 1, rotate: tilt }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      >
        <span
          aria-hidden
          className="absolute -top-1.75 left-1/2 size-4 -translate-x-1/2 rounded-full shadow-[0_3px_6px_rgba(6,5,16,0.45)]"
          style={{ backgroundImage: theme.pin }}
        />
        <p
          className="font-handwriting text-[26px] leading-7 font-medium wrap-break-word"
          style={{ color: theme.ink }}
        >
          {content}
        </p>
        <cite
          className="text-xs leading-4 font-medium not-italic"
          style={{ color: theme.author }}
        >
          — {name}
        </cite>
      </motion.div>
    </div>
  )
}

export default BoardMessage
