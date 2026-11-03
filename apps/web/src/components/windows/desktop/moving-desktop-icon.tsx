import useMousePosition from "@/hooks/use-mouse-position"
import AppTileIcon from "@/components/ui/app-tile-icon"
import { motion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

type Point = {
  x: number
  y: number
}

type PropTypes = {
  ApplicationName?: string
  Icon?: string
  iconFill?: boolean
  id?: number
  MouseLocation: Point
}

/** Ghost that follows the cursor while a desktop icon is being dragged. */
function MovingDesktopIcon({ id, Icon, iconFill, ApplicationName }: PropTypes) {
  const CursorLocation = useMousePosition()

  return (
    <div
      className="pointer-events-none absolute -top-12 -left-12.5 z-1000 select-none"
      data-id={id}
      style={{
        transform: `translate(${CursorLocation.x}px, ${CursorLocation.y}px)`,
      }}
    >
      <motion.div
        className="flex w-25 flex-col items-center gap-2 pt-2.5"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.06, opacity: 0.9 }}
        transition={{ duration: 0.18, ease: EASE_OUT }}
      >
        <AppTileIcon
          src={Icon ?? ""}
          fill={iconFill}
          className="shadow-[0_18px_40px_rgba(8,7,20,0.55)]!"
        />
        <span className="line-clamp-2 w-full text-center font-sans text-[13px] leading-4 font-medium text-moon [text-shadow:0_1px_3px_rgba(8,7,20,0.7)]">
          {ApplicationName}
        </span>
      </motion.div>
    </div>
  )
}

export default MovingDesktopIcon
