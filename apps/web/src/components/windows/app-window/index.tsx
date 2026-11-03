import {
  ReactNode,
  RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {
  AnimatePresence,
  Point,
  Variants,
  motion,
  useReducedMotion,
} from "framer-motion"
import useMousePosition from "@/hooks/use-mouse-position"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/storage/store"
import cn from "classnames"
import AppWindowHeader from "./app-window-header"
import AppWindowSnapPreview from "./app-window-snap-preview"
import useAppWindowData from "@/hooks/use-app-window-data"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import { disposeAppCloseTarget } from "@/lib/app-close-bus"
import { useTouchDevice } from "@/hooks/use-touch-device"
import useTailwindMediaQuery from "@/hooks/use-tailwind-media-query"
import { setAppWindowSnapState } from "@/storage/slices/main"
import { Resizable, type NumberSize, type ResizeDirection } from "re-resizable"

import { EASE_OUT } from "@/lib/motion"
import {
  getDesktopViewport,
  registerAppWindowBounds,
  resolveInitialWindowPlacement,
  toWindowRect,
  unregisterAppWindowBounds,
  type InitialWindowPlacement,
} from "@/lib/app-window-placement"
import {
  getSnapLayoutRect,
  resolveCursorSnapLayout,
  type WindowSnapLayout,
} from "@/lib/app-window-snap"

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
  // The frame inside runs the visible exit; this layer just waits for it.
  exit: { opacity: 1, transition: { duration: 0.15 } },
  init: { opacity: 1 },
}

function resizeDirectionAffectsLeft(direction: ResizeDirection) {
  return (
    direction === "left" ||
    direction === "topLeft" ||
    direction === "bottomLeft"
  )
}

function resizeDirectionAffectsTop(direction: ResizeDirection) {
  return (
    direction === "top" || direction === "topLeft" || direction === "topRight"
  )
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
  const dispatch = useDispatch()
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
  const [isResizing, setIsResizing] = useState(false)
  const reduceMotion = useReducedMotion()
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
  const [initialPosition, setInitialPosition] = useState<null | Point>(null)

  const [MinimizedDimensions, SetMinmizedDimensions] = useState<Dimensions2D>(
    () => initialPlacement.size,
  )

  const windowLocationDataRef = useRef<Point | null>(initialPlacement.position)
  const resizeStartLocationRef = useRef<Point | null>(null)
  const cursorLocationRef = useRef(CursorLocation)
  cursorLocationRef.current = CursorLocation

  const clearSnapState = useCallback(() => {
    dispatch(
      setAppWindowSnapState({
        id: AppId,
        snapped: false,
        presnapWidth: undefined,
        presnapHeight: undefined,
      }),
    )
  }, [AppId, dispatch])

  const restorePresnapDimensions = useCallback(() => {
    if (!metaData?.snapped) return false

    if (
      metaData.presnapWidth !== undefined &&
      metaData.presnapHeight !== undefined
    ) {
      SetMinmizedDimensions({
        width: metaData.presnapWidth,
        height: metaData.presnapHeight,
      })
    }

    clearSnapState()
    return true
  }, [
    metaData?.snapped,
    metaData?.presnapWidth,
    metaData?.presnapHeight,
    clearSnapState,
  ])

  const saveSnapState = useCallback(
    (presnapWidth: number, presnapHeight: number) => {
      dispatch(
        setAppWindowSnapState({
          id: AppId,
          snapped: true,
          presnapWidth,
          presnapHeight,
        }),
      )
    },
    [AppId, dispatch],
  )

  const handleSetMaximized = useCallback(
    (value: boolean) => {
      if (!value) {
        restorePresnapDimensions()
      }
      SetMaximized(value)
    },
    [restorePresnapDimensions],
  )

  const onWindowMoveStart = useCallback(() => {
    if (Maximized) return
    restorePresnapDimensions()
  }, [Maximized, restorePresnapDimensions])

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
        restorePresnapDimensions()
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

  // Minimising flies the window toward the dock (bottom-centre) at half
  // scale; never scale(0) — nothing in the real world appears from nothing.
  const viewport = getDesktopViewport()
  const minimizedX = Maximized
    ? 0
    : viewport.width / 2 - (MinimizedDimensions.width ?? 0) / 2
  const minimizedY = Maximized
    ? viewport.height / 2
    : viewport.height - (MinimizedDimensions.height ?? 0) / 2

  const exitAndOpen: Variants = {
    hidden: {
      scale: reduceMotion ? 1 : 0.96,
      opacity: 0,
      x: Maximized ? 0 : NewLocation.x,
      y: Maximized ? 0 : NewLocation.y,
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: Maximized ? 0 : NewLocation.x,
      y: Maximized ? 0 : NewLocation.y,
      zIndex: zIndexFront,
      width: Maximized ? "100%" : "auto",
      height: Maximized ? "100%" : "auto",
    },
    minimized: {
      x: reduceMotion ? (Maximized ? 0 : NewLocation.x) : minimizedX,
      y: reduceMotion ? (Maximized ? 0 : NewLocation.y) : minimizedY,
      scale: reduceMotion ? 1 : 0.5,
      opacity: 0,
      width: Maximized ? "100%" : "auto",
      height: Maximized ? "100%" : "auto",
      zIndex: zIndexFront,
    },
    exit: {
      scale: reduceMotion ? 1 : 0.96,
      opacity: 0,
      transition: { duration: 0.15, ease: EASE_OUT },
    },
  }

  function onWindowMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    bringWindowToFront()
    const ClickedElement = event.target as Element | null
    // don't set as focus if clicking on dismiss
    if (ClickedElement?.closest(".window-dismiss-button")) return

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

  const canUseWindowSnap = MoveWindow && !isTouchDevice

  const activeSnapLayout: WindowSnapLayout | null =
    canUseWindowSnap && CursorLocation.x !== null && CursorLocation.y !== null
      ? resolveCursorSnapLayout(CursorLocation.x, CursorLocation.y)
      : null

  const effectiveSnapLayout =
    activeSnapLayout === "maximize" && metaData?.disableMaximize
      ? null
      : activeSnapLayout

  const windowWidth = MinimizedDimensions.width ?? 0
  const windowHeight = MinimizedDimensions.height ?? 0

  const snapPreviewWindowRect = Maximized
    ? getSnapLayoutRect("maximize")
    : {
        x: NewLocation.x,
        y: NewLocation.y,
        width: windowWidth,
        height: windowHeight,
      }

  const snapPreviewTargetRect = effectiveSnapLayout
    ? getSnapLayoutRect(effectiveSnapLayout)
    : null

  const applySnapLayout = useCallback(
    (layout: WindowSnapLayout) => {
      saveSnapState(windowWidth, windowHeight)

      if (layout === "maximize") {
        SetMinmizedDimensions({
          width: windowWidth,
          height: windowHeight,
        })
        SetMaximized(true)
        return
      }

      const snapRect = getSnapLayoutRect(layout)
      windowLocationDataRef.current = { x: snapRect.x, y: snapRect.y }
      SetMinmizedDimensions({
        width: snapRect.width,
        height: snapRect.height,
      })
      SetMaximized(false)
    },
    [windowWidth, windowHeight, saveSnapState],
  )

  const canResize = !Maximized && !metaData?.disableResize && !MoveWindow

  const handleResizeStart = useCallback(
    (
      _event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
      _direction: ResizeDirection,
      _elementRef: HTMLElement,
    ) => {
      if (!Maximized && metaData?.snapped) clearSnapState()
      setIsResizing(true)

      resizeStartLocationRef.current = {
        x: windowLocationDataRef.current?.x ?? 0,
        y: windowLocationDataRef.current?.y ?? 0,
      }
    },
    [Maximized, metaData?.snapped, clearSnapState],
  )

  const handleResize = useCallback(
    (
      _event: MouseEvent | TouchEvent,
      direction: ResizeDirection,
      elementRef: HTMLElement,
      delta: NumberSize,
    ) => {
      SetMinmizedDimensions({
        width: elementRef.offsetWidth,
        height: elementRef.offsetHeight,
      })

      const start = resizeStartLocationRef.current
      if (!start) return

      windowLocationDataRef.current = {
        x: resizeDirectionAffectsLeft(direction)
          ? start.x - delta.width
          : start.x,
        y: resizeDirectionAffectsTop(direction)
          ? start.y - delta.height
          : start.y,
      }
    },
    [],
  )

  const onWindowMoveEnd = useCallback(() => {
    const { x: cursorX, y: cursorY } = cursorLocationRef.current

    if (MoveWindow && !isTouchDevice && cursorX !== null && cursorY !== null) {
      const layout = resolveCursorSnapLayout(cursorX, cursorY)

      if (layout && !(layout === "maximize" && metaData?.disableMaximize)) {
        applySnapLayout(layout)
      }
    }

    SetMoveWindow(false)
    setInitialPosition(null)
    SetIsMovingWindowFromMaximizedToMinimized(false)
  }, [MoveWindow, isTouchDevice, metaData?.disableMaximize, applySnapLayout])

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
        {canUseWindowSnap ? (
          <AppWindowSnapPreview
            windowRect={snapPreviewWindowRect}
            targetRect={snapPreviewTargetRect}
          />
        ) : null}
      </AnimatePresence>
      <motion.div
        className={cn(
          "absolute top-0 left-0 isolate overflow-hidden",
          "transition-[border-color,box-shadow] duration-200 ease-out-strong",
          isMinimized ? "pointer-events-none" : "pointer-events-auto",
          // Maximised windows drop the border entirely — a transparent 1px
          // border still insets the content and lets the wallpaper peek through.
          Maximized ? "rounded-none" : "rounded-2xl border",
          !Maximized &&
            (isDisabled
              ? "border-melon/55 shadow-[0_18px_44px_rgba(6,5,16,0.42),0_0_0_4px_rgba(255,93,126,0.12)]"
              : isFocused
                ? "border-[rgba(160,162,255,0.32)] shadow-[0_40px_100px_rgba(6,5,16,0.62),0_12px_30px_rgba(6,5,16,0.35)]"
                : "border-white/8 shadow-[0_18px_44px_rgba(6,5,16,0.42)]"),
          isFocused && !MoveWindow ? "select-auto" : "select-none",
        )}
        variants={exitAndOpen}
        initial="hidden"
        animate={animateValue}
        transition={{
          duration: 0.22,
          ease: EASE_OUT,
          width: { duration: 0.125 },
          height: { duration: 0.125 },
          zIndex: { duration: 0 },
          // Drag and resize write x/y every frame — those must not tween.
          x:
            MoveWindow || isResizing || isMovingWindowFromMaximizedToMinimized
              ? { duration: 0 }
              : { duration: 0.25, ease: EASE_OUT },
          y:
            MoveWindow || isResizing || isMovingWindowFromMaximizedToMinimized
              ? { duration: 0 }
              : { duration: 0.25, ease: EASE_OUT },
        }}
        onMouseDown={onWindowMouseDown}
        onClick={onInteractWithWindow}
      >
        <Resizable
          className={cn(
            "relative bg-panel overflow-hidden flex flex-col z-[-1] @container/appwindow",
            {
              "pointer-events-auto": !isDisabled,
              "pointer-events-none": isDisabled,
            },
          )}
          size={{
            width: Maximized ? "100%" : windowWidth,
            height: Maximized ? "100%" : windowHeight,
          }}
          enable={
            canResize
              ? {
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  topRight: true,
                  bottomRight: true,
                  bottomLeft: true,
                  topLeft: true,
                }
              : false
          }
          bounds="window"
          minWidth={280}
          minHeight={220}
          onResizeStart={handleResizeStart}
          onResize={handleResize}
          onResizeStop={(...args) => {
            handleResize(...args)
            setIsResizing(false)
          }}
        >
          <motion.div
            className="flex flex-col h-full w-full"
            animate={
              isFlashing && !reduceMotion
                ? { x: [0, -5, 5, -3, 3, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <AppWindowHeader
              processName={processName}
              processIcon={processIcon}
              setMaximized={handleSetMaximized}
              SetMinmizedDimensions={SetMinmizedDimensions}
              maximized={Maximized}
              setMoveWindow={SetMoveWindow}
              AppId={AppId}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
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
              onWindowMoveStart={onWindowMoveStart}
              onWindowMoveEnd={onWindowMoveEnd}
            />
            <div className="flex flex-col w-full h-full border-none overflow-hidden">
              {children}
            </div>
          </motion.div>
        </Resizable>
      </motion.div>
    </motion.div>
  )
}

export default AppWindow
