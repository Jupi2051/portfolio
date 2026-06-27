import { ReactNode, RefObject, useCallback, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, Point, Variants, motion } from "framer-motion"
import useMousePosition from "@/hooks/use-mouse-position"
import { useSelector } from "react-redux"
import { RootState } from "@/storage/store"
import cn from "classnames"
import AppWindowHeader from "./app-window-header"
import AppWindowSnapPreview from "./app-window-snap-preview"
import useAppWindowData from "@/hooks/use-app-window-data"
import { useResizeObserver } from "usehooks-ts"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import { disposeAppCloseTarget } from "@/lib/app-close-bus"
import { useTouchDevice } from "@/hooks/use-touch-device"
import useTailwindMediaQuery from "@/hooks/use-tailwind-media-query"

import {
  registerAppWindowBounds,
  resolveInitialWindowPlacement,
  toWindowRect,
  unregisterAppWindowBounds,
  type InitialWindowPlacement,
} from "@/lib/app-window-placement"
import { isCursorInMaximizeSnapZone } from "@/lib/app-window-snap"

type PropType = {
  children?: ReactNode
  AppId: number
  processName?: string
  processIcon?: string
}

export type Dimensions2D = {
  width?: number
  height?: number
}

const exitAndOpenMainContainer: Variants = {
  exit: { opacity: 0 },
  init: { opacity: 1, scale: 1 },
}

function getOrCreateInitialPlacement(
  placementRef: RefObject<InitialWindowPlacement | null>,

  appId: number,

  metaData: ReturnType<typeof useAppWindowData>["metaData"],
) {
  if (!placementRef.current) {
    placementRef.current = resolveInitialWindowPlacement(appId, metaData)
  }
  return placementRef.current
}

function AppWindow({ AppId, processName, processIcon, children }: PropType) {
  const {
    isMinimized,
    zIndexFront,
    isFocused,
    focusWindow,
    bringWindowToFront,
    metaData,
    isDisabled,
    disabledByOtherApp,
    isFlashing,
  } = useAppWindowData(AppId)
  const isTouchDevice = useTouchDevice()
  const { isPastPoint } = useTailwindMediaQuery()
  const { focusWindowWithId, flashWindow } = useGlobalWindowsControls()

  const initialPlacementRef = useRef<InitialWindowPlacement | null>(null)

  const initialPlacement = getOrCreateInitialPlacement(
    initialPlacementRef,

    AppId,

    metaData,
  )

  const [Maximized, SetMaximized] = useState(
    metaData?.maximized ?? (!isPastPoint("md") || isTouchDevice),
  )

  const [MoveWindow, SetMoveWindow] = useState(false)
  const [
    isMovingWindowFromMaximizedToMinimized,
    SetIsMovingWindowFromMaximizedToMinimized,
  ] = useState(false)
  const [offsetFromMaximizedToMinimized, SetOffsetFromMaximizedToMinimized] =
    useState(0)

  const CursorLocation = useMousePosition()
  const CursorOffset = useSelector(
    (x: RootState) => x.desktopState.mouseMovementOffset,
  )
  const ref = useRef<HTMLDivElement>(null)
  const [initialPosition, setInitialPosition] = useState<null | Point>(null)
  const { width = 0, height = 0 } = useResizeObserver({
    ref: ref as RefObject<HTMLElement>,
    box: "border-box",
  })

  const [MinimizedDimensions, SetMinmizedDimensions] = useState<Dimensions2D>(
    () => initialPlacement.size,
  )

  const windowLocationDataRef = useRef<Point | null>(initialPlacement.position)
  const cursorLocationRef = useRef(CursorLocation)
  cursorLocationRef.current = CursorLocation

  let NewLocation: Point = {
    x: windowLocationDataRef.current?.x ?? 0,
    y: windowLocationDataRef.current?.y ?? 0,
  }

  if (MoveWindow) {
    NewLocation = {
      x: CursorLocation.x === null ? 0 : CursorLocation.x + CursorOffset.x,
      y: CursorLocation.y === null ? 0 : CursorLocation.y + CursorOffset.y,
    }
    windowLocationDataRef.current = NewLocation

    if (Maximized) {
      const deltaVector = {
        x: NewLocation.x - (initialPosition?.x ?? 0),
        y: NewLocation.y - (initialPosition?.y ?? 0),
      }

      const movementDistance = Math.sqrt(
        Math.pow(deltaVector.x, 2) + Math.pow(deltaVector.y, 2),
      )

      if (movementDistance > 7 && !isTouchDevice) {
        SetMaximized(false)
        SetIsMovingWindowFromMaximizedToMinimized(true)
        setInitialPosition?.(null)
        const xOffsetPercentage = Math.min(
          (CursorLocation.x ?? 0) / (window.innerWidth ?? 1),
          0.7,
        )
        const finalXValue = xOffsetPercentage * (MinimizedDimensions.width ?? 0)
        SetOffsetFromMaximizedToMinimized(finalXValue)
      }
    }
  }

  if (isMovingWindowFromMaximizedToMinimized) {
    NewLocation = {
      x: (CursorLocation.x ?? 0) - offsetFromMaximizedToMinimized,
      y: (CursorLocation.y ?? 0) - 15,
    }
    windowLocationDataRef.current = NewLocation
  }

  useLayoutEffect(() => {
    if (Maximized) {
      unregisterAppWindowBounds(AppId)
      return
    }

    registerAppWindowBounds(
      AppId,
      toWindowRect(NewLocation, MinimizedDimensions),
    )

    return () => {
      unregisterAppWindowBounds(AppId)
    }
  }, [
    AppId,
    Maximized,
    NewLocation.x,
    NewLocation.y,
    MinimizedDimensions.width,
    MinimizedDimensions.height,
  ])

  const exitAndOpen: Variants = {
    hidden: {
      scale: 0.9,
      filter: "blur(1px)",
      opacity: 0,
    },
    visible: {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      x: Maximized ? 0 : NewLocation.x,
      y: Maximized ? 0 : NewLocation.y,
      zIndex: zIndexFront,
      width: Maximized ? "100%" : "auto",
      height: Maximized ? "100%" : "auto",
      left: Maximized ? "0" : undefined,
      top: Maximized ? "0" : undefined,
    },
    minimized: {
      filter: "blur(1px)",
      x: Maximized ? 0 : NewLocation.x,
      y: Maximized ? 0 : NewLocation.y,
      left: "0%",
      top: "100%",
      scale: 0,
      opacity: 0,
      width: Maximized ? "100%" : "auto",
      height: Maximized ? "100%" : "auto",
      zIndex: zIndexFront,
    },
  }

  function onWindowMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    bringWindowToFront()
    const ClickedElement = event.target as HTMLDivElement
    if (ClickedElement)
      if (ClickedElement.classList.contains("window-dismiss-button")) return // don't set as focus if clicking on dismiss

    focusWindow()
  }

  function onInteractWithWindow() {
    if (isDisabled) {
      focusWindowWithId(disabledByOtherApp?.id ?? -1)
      flashWindow(disabledByOtherApp?.id ?? -1, 200)
    }
  }

  useLayoutEffect(() => {
    return () => {
      disposeAppCloseTarget(AppId)
    }
  }, [AppId])

  const animateValue =
    isMinimized === undefined
      ? "visible"
      : isMinimized === true
        ? "minimized"
        : "visible"

  const canUseMaximizeSnap =
    MoveWindow &&
    !Maximized &&
    !isMovingWindowFromMaximizedToMinimized &&
    !isTouchDevice &&
    !metaData?.disableMaximize

  const showMaximizeSnapPreview =
    canUseMaximizeSnap &&
    CursorLocation.y !== null &&
    isCursorInMaximizeSnapZone(CursorLocation.y)

  const snapPreviewWindowRect = {
    x: NewLocation.x,
    y: NewLocation.y,
    width: width || MinimizedDimensions.width || 0,
    height: height || MinimizedDimensions.height || 0,
  }

  const onWindowMoveEnd = useCallback(() => {
    const cursorY = cursorLocationRef.current.y

    if (
      MoveWindow &&
      !Maximized &&
      !isTouchDevice &&
      !metaData?.disableMaximize &&
      cursorY !== null &&
      isCursorInMaximizeSnapZone(cursorY)
    ) {
      SetMinmizedDimensions({
        width: width ?? MinimizedDimensions.width ?? 0,
        height: height ?? MinimizedDimensions.height ?? 0,
      })
      SetMaximized(true)
    }

    SetMoveWindow(false)
    setInitialPosition(null)
    SetIsMovingWindowFromMaximizedToMinimized(false)
  }, [
    MoveWindow,
    Maximized,
    isTouchDevice,
    metaData?.disableMaximize,
    width,
    height,
    MinimizedDimensions.width,
    MinimizedDimensions.height,
  ])

  return (
    <motion.div
      variants={exitAndOpenMainContainer}
      exit="exit"
      transition={{ duration: 0.1 }}
      initial="init"
      animate="init"
      style={{
        zIndex: metaData?.forceView ? 9999 : zIndexFront,
      }}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
      <AnimatePresence>
        {canUseMaximizeSnap ? (
          <AppWindowSnapPreview
            windowRect={snapPreviewWindowRect}
            active={showMaximizeSnapPreview}
          />
        ) : null}
      </AnimatePresence>
      <motion.div
        className={cn(
          `absolute border pointer-events-auto border-black border-solid mx-auto rounded-md overflow-hidden box-shadow-[0px_0px_15px_0px_rgba(0,0,0,0.4)] user-select-none transition-[box-shadow,border] duration-200 isolate ease-in-out`,
          {
            "border-none! rounded-none!": Maximized,
            "select-auto border border-ctp-sky-400 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.7)]":
              isFocused,
            "user-select-none": MoveWindow,
          },
        )}
        variants={exitAndOpen}
        initial="hidden"
        animate={animateValue}
        transition={{
          duration: MoveWindow ? 0 : 0.1,
          delay: MoveWindow ? 0 : undefined,
          width: { duration: 0.125 },
          height: { duration: 0.125 },
          x: { duration: 0 },
          y: { duration: 0 },
        }}
        onMouseDown={onWindowMouseDown}
        onClick={onInteractWithWindow}
      >
        <motion.div
          className={cn(
            "relative bg-ctp-base resize-both overflow-hidden flex flex-col z-[-1] @container/appwindow",
            {
              "resize-none!": metaData?.disableResize,
              "pointer-events-auto": !isDisabled,
              "pointer-events-none": isDisabled,
            },
          )}
          style={{
            width: Maximized ? "100%" : (MinimizedDimensions.width ?? "auto"),
            height: Maximized ? "100%" : (MinimizedDimensions.height ?? "auto"),
            resize: Maximized ? "none" : "both",
          }}
          animate={
            isFlashing
              ? {
                  x: [0, -3, 0, 3, 0],
                  y: [0, -3, 0, 3, 0],
                  transition: {
                    delay: 0,
                    repeat: Infinity,
                    duration: 0.1,
                  },
                }
              : { transition: { duration: 0 } }
          }
          ref={ref}
        >
          <AppWindowHeader
            processName={processName}
            processIcon={processIcon}
            setMaximized={SetMaximized}
            SetMinmizedDimensions={SetMinmizedDimensions}
            maximized={Maximized}
            setMoveWindow={SetMoveWindow}
            AppId={AppId}
            windowWidth={width ?? 0}
            windowHeight={height ?? 0}
            NewLocation={NewLocation}
            hiddenButtons={metaData?.hiddenButtons ?? []}
            disableMaximize={metaData?.disableMaximize}
            disableMinimize={metaData?.disableMinimize}
            isFlashing={isFlashing}
            isDisabled={isDisabled}
            setInitialPosition={setInitialPosition}
            setIsMovingWindowFromMaximizedToMinimized={
              SetIsMovingWindowFromMaximizedToMinimized
            }
            onWindowMoveEnd={onWindowMoveEnd}
          />
          <div className="flex flex-col w-full h-full border-none overflow-hidden">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AppWindow
