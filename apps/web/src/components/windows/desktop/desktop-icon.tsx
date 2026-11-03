import { useEffect, useRef, useState } from "react"
import { OpenApplication } from "@/components/windows/desktop"
import { DesktopAppsList } from "@/components/windows/desktop/apps-list"
import cn from "classnames"
import { motion, useReducedMotion } from "framer-motion"
import useGlobalTaskbarControls from "@/hooks/use-global-taskbar-controls"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import { useTouchDevice } from "@/hooks/use-touch-device"
import DesktopIconNameForm from "./desktop-icon-name-form"
import useAnimationsSignals from "@/hooks/use-animations-signals"
import AppTileIcon from "@/components/ui/app-tile-icon"
import { EASE_OUT } from "@/lib/motion"

type PropTypes = {
  ApplicationName: string
  Icon: string
  iconFill?: boolean
  id: number
  customTaskbarIcon?: string
  Style?: {
    gridRow?: number
    gridColumn?: number
  }
  Selected: boolean
  AppName: DesktopAppsList
  processData?: Object
  index?: number
  isMovingAnIcon?: boolean
  onApplicationOpened?: () => void
}

function DesktopIcon(Props: PropTypes) {
  const [ApplicationName, SetAppName] = useState(Props.ApplicationName)
  const [isEditingName, SetIsEditingName] = useState(false)
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] =
    useState(false)
  const wasSelectedOnMouseDown = useRef(false)
  const { openNewApplication } = useGlobalWindowsControls()
  const { openNewTaskbarApplication } = useGlobalTaskbarControls()
  const isTouchDevice = useTouchDevice()
  const { animateIntro } = useAnimationsSignals()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!Props.Selected && isEditingName) SetIsEditingName(false)
  }, [Props.Selected, isEditingName])

  const openLinkedApplication = () => {
    const id = +new Date()

    const ApplicationObject: OpenApplication = {
      id,
      App: Props.AppName,
      processIcon: Props.customTaskbarIcon ?? Props.Icon,
      processName: Props.ApplicationName,
      processData: Props.processData,
    }

    const { focusWindow, bringWindowToFront, app } =
      openNewApplication(ApplicationObject)
    focusWindow()
    bringWindowToFront()
    openNewTaskbarApplication({
      id: app.id,
      AppId: app.id,
      Icon: Props.Icon,
      CustomTaskbarIcon: Props.customTaskbarIcon,
    })
    Props.onApplicationOpened?.()
  }

  const onClickApplication = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!isTouchDevice && !(event.detail === 2 || event.detail === 0)) return
    openLinkedApplication()
  }

  const onMouseDownName = () => {
    wasSelectedOnMouseDown.current = Props.Selected
  }

  const onClickName = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
  ) => {
    if (!wasSelectedOnMouseDown.current) return
    if (!isTouchDevice && event.detail !== 1) return
    setTimeout(() => SetIsEditingName(true), 250)
  }

  const onChangeName = (newName: string) => {
    SetAppName(newName)
    SetIsEditingName(false)
  }

  const onCancelEditName = () => {
    SetIsEditingName(false)
  }

  const hiddenState = { opacity: 0, y: reduceMotion ? 0 : 8, scale: 0.96 }

  return (
    <motion.button
      style={{ ...Props.Style }}
      className={cn(
        "Desktop-Icon-Container group relative flex h-27.5 w-25 flex-col items-center gap-2 rounded-2xl border px-1 pt-2.5 pb-1.5 select-none isolate outline-none",
        "transition-[background-color,border-color] duration-150 ease-out-strong focus-visible:border-holo-soft/60",
        Props.Selected
          ? "z-999 border-holo/38 bg-holo/16 backdrop-blur-[10px]"
          : "border-transparent",
      )}
      data-id={Props.id}
      onClick={onClickApplication}
      initial={hiddenState}
      animate={animateIntro ? { opacity: 1, y: 0, scale: 1 } : hiddenState}
      transition={{
        duration: 0.4,
        ease: EASE_OUT,
        delay:
          hasInitialAnimationPlayed && !animateIntro
            ? 0
            : (Props.index || 0) * 0.05,
      }}
      onAnimationComplete={() => {
        if (!hasInitialAnimationPlayed) setHasInitialAnimationPlayed(true)
      }}
    >
      <AppTileIcon
        src={Props.Icon}
        fill={Props.iconFill}
        selected={Props.Selected}
      />
      {isEditingName ? (
        <DesktopIconNameForm
          value={ApplicationName}
          onSubmit={onChangeName}
          onCancel={onCancelEditName}
        />
      ) : (
        <h1
          className={cn(
            "w-full shrink-0 text-center font-sans text-[13px] leading-4 font-medium wrap-break-word text-moon select-none [text-shadow:0_1px_3px_rgba(8,7,20,0.7)]",
            { "line-clamp-2": !Props.Selected, "text-white": Props.Selected },
          )}
          onMouseDown={onMouseDownName}
          onClick={onClickName}
        >
          {ApplicationName}
        </h1>
      )}
    </motion.button>
  )
}

export default DesktopIcon
