import {
  setFocusedApp,
  setMinimizedState,
  setMouseMovementOffset,
} from "@/storage/slices/desktop"
import { useDispatch } from "react-redux"
import { Dimensions2D } from "."
import useMousePosition from "@/hooks/use-mouse-position"
import { Point } from "framer-motion"
import cn from "classnames"
import AppWindowHeaderButton from "./app-window-header-button"
import { useEventListener } from "usehooks-ts"
import useAppWindowControls from "@/hooks/use-app-window-data"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import useMediaQuery from "@/hooks/use-media-query"
import {
  CloseIcon,
  LockIcon,
  MaximizeIcon,
  MinimizeIcon,
  RestoreIcon,
} from "@/components/ui/icons"

interface AppWindowHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  processName?: string
  processIcon?: string
  maximized: boolean
  AppId: number
  setMaximized: (maximized: boolean) => void
  setMoveWindow: (moveWindow: boolean) => void
  SetMinmizedDimensions: (newDimensions: Dimensions2D) => void
  windowWidth: number
  windowHeight: number
  NewLocation: Point
  hiddenButtons: ("minimize" | "maximize" | "close")[]
  disableMaximize?: boolean
  disableMinimize?: boolean
  isFlashing: boolean
  isDisabled: boolean
  initialPosition?: Point
  setInitialPosition?: (position: Point | null) => void
  setIsMovingWindowFromMaximizedToMinimized?: (isMoving: boolean) => void
  onWindowMoveStart?: () => void
  onWindowMoveEnd?: () => void
}

const AppWindowHeader = ({
  processName,
  processIcon,
  setMaximized,
  SetMinmizedDimensions,
  maximized,
  setMoveWindow,
  AppId,
  windowWidth,
  windowHeight,
  NewLocation,
  hiddenButtons,
  disableMaximize = false,
  disableMinimize = false,
  isDisabled,
  setInitialPosition,
  setIsMovingWindowFromMaximizedToMinimized,
  onWindowMoveStart,
  onWindowMoveEnd,
}: AppWindowHeaderProps) => {
  const isPhone = useMediaQuery("sm")
  const dispatch = useDispatch()
  const { isFocused } = useAppWindowControls(AppId)
  const { unFocusAllWindows, closeApplication } = useGlobalWindowsControls()
  const CursorLocation = useMousePosition()

  const onDismissButton = () => {
    dispatch(setMinimizedState({ id: AppId, state: true }))
    dispatch(setFocusedApp(-1))
  }

  const onDoubleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isPhone) return
    event.preventDefault()
    const newMaximizedState = !maximized
    if (newMaximizedState && disableMaximize) return
    if (!newMaximizedState && disableMinimize) return
    setMaximized(!maximized)
  }

  const CloseApplication = () => {
    if (isFocused) unFocusAllWindows()

    closeApplication(AppId)
  }

  useEventListener("mouseup", () => {
    onWindowMoveEnd?.()
  })

  function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const ClickedElement = event.target as HTMLDivElement
    if (ClickedElement) {
      if (ClickedElement.classList.contains("window-header")) {
        dispatch(
          setMouseMovementOffset({
            x: NewLocation.x - (CursorLocation.x ?? 0),
            y: NewLocation.y - (CursorLocation.y ?? 0),
          }),
        )
        setInitialPosition?.(NewLocation)
        onWindowMoveStart?.()
        setMoveWindow(true)
      }
    }
  }

  function MaximizeWindow() {
    const newMaximizedState = !maximized

    if (newMaximizedState && disableMaximize) return
    if (!newMaximizedState && disableMinimize) return

    if (newMaximizedState)
      SetMinmizedDimensions({
        width: windowWidth ?? 0,
        height: windowHeight ?? 0,
      })

    setMaximized(newMaximizedState)
  }

  const titleFaded = !isFocused || isDisabled

  return (
    <div
      className={cn(
        "window-header flex h-11 min-h-11 min-w-max shrink-0 items-center justify-between border-b pr-2 pl-4 select-none",
        "transition-colors duration-200 ease-out-strong",
        isFocused
          ? "border-white/7 bg-chrome/92"
          : "border-white/6 bg-chrome-dim/90",
      )}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {processName !== undefined || processIcon !== undefined ? (
        <div
          className={cn(
            "pointer-events-none mr-4 flex min-w-fit items-center gap-2.5 transition-opacity duration-200 ease-out-strong",
            { "opacity-60": titleFaded },
          )}
        >
          {processIcon && (
            <img
              src={processIcon}
              alt=""
              className="max-h-4.5 max-w-4.5 rounded-[5px]"
            />
          )}
          <span className="text-[13px] leading-4 font-semibold text-moon">
            {processName}
          </span>
        </div>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-3">
        {isDisabled && (
          <div className="pointer-events-none flex h-6 items-center gap-1.5 rounded-full bg-melon/14 pr-2.5 pl-2">
            <LockIcon className="size-3 text-[#ff8fa6]" />
            <span className="text-xs leading-4 font-medium whitespace-nowrap text-[#ffb3c2]">
              Finish the dialog first
            </span>
          </div>
        )}
        <div
          className={cn(
            "flex items-center gap-0.5 transition-opacity duration-200 ease-out-strong",
            isDisabled ? "opacity-35" : !isFocused && "opacity-45",
          )}
        >
          {!hiddenButtons.includes("minimize") && (
            <AppWindowHeaderButton
              onClick={onDismissButton}
              label="Minimize"
              className="window-dismiss-button"
            >
              <MinimizeIcon className="size-3" />
            </AppWindowHeaderButton>
          )}
          {!hiddenButtons.includes("maximize") && (
            <AppWindowHeaderButton
              onClick={MaximizeWindow}
              label={maximized ? "Restore" : "Maximize"}
              className="hidden sm:flex"
            >
              {maximized ? (
                <RestoreIcon className="size-3" />
              ) : (
                <MaximizeIcon className="size-3" />
              )}
            </AppWindowHeaderButton>
          )}
          {!hiddenButtons.includes("close") && (
            <AppWindowHeaderButton
              onClick={CloseApplication}
              label="Close"
              type="danger"
            >
              <CloseIcon className="size-3" />
            </AppWindowHeaderButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppWindowHeader
