import { ReactNode, useEffect, useMemo, useState } from "react";
import "../Styles/AppWindow.css";
import { AnimatePresence, Point, Variants, motion } from "framer-motion";
import useMousePosition from "../Hooks/useMousePosition";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Store";
import { bringToFront, closeApplication, setZIndex, unhandleZIndex } from "../Storage/Slices/Main";
import { closeTaskbarApplication } from "../Storage/Slices/Taskbar";
import { setFocusedApp, setMinimizedState, setMouseMovementOffset } from "../Storage/Slices/Desktop";
import { useResizeDetector } from "react-resize-detector";

type PropType = {
    children?: ReactNode,
    AppId: number,
    processName?: string,
    processIcon?: string,
    maximized?: boolean
}

type WindowBorderBox = {
    Location: Point
};

type Dimensions2D = {
    width?: number,
    height?: number
};

let WindowLocatorData = new Map<number, WindowBorderBox>();

function AppWindow(props: PropType)
{
    const [Maximized, SetMaximized] = useState(props.maximized?? true);
    const [MoveWindow, SetMoveWindow] = useState(false);
    const zIndexFrontData = useSelector((x: RootState) => x.mainState.zIndicesMap);
    const MinimizedData = useSelector((x: RootState) => x.desktopState.minimizedStates);
    const isFocused = useSelector((x: RootState) => x.desktopState.focusedAppId) === props.AppId;
    const dispatch = useDispatch();
    const CursorLocation = useMousePosition();
    const zIndexFront = zIndexFrontData.find((element) => element.id === props.AppId)?.zIndex?? 69;
    const isMinimized = MinimizedData.find((element) => element.id === props.AppId)?.minimized?? false; // its not minimized by default
    const WindowId = useMemo(() => +new Date(), []);
    const CursorOffset = useSelector((x: RootState) => x.desktopState.mouseMovementOffset);
    const { width, height, ref } = useResizeDetector();
    const [MinimizedDimensions, SetMinmizedDimensions] = useState<Dimensions2D>({width: 500, height: 500})

    let FoundObject = WindowLocatorData.get(WindowId);
    if (!FoundObject)
    {
        FoundObject = {Location: {x: Math.floor((Math.random() * 200)), y: Math.floor((Math.random() * 200))}};
        WindowLocatorData.set(WindowId, FoundObject);
    }
    
    function MaximizeWindow()
    {
        const maximizationNewState = !Maximized;

        if (maximizationNewState)
            SetMinmizedDimensions({width: width?? 0, height: height?? 0});

        SetMaximized(maximizationNewState);
    }

    function CloseApplication()
    {
        dispatch(closeApplication(props.AppId));
        dispatch(closeTaskbarApplication(props.AppId));
    }
    
    function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        const ClickedElement = event.target as HTMLDivElement;
        if (ClickedElement)
        {
            if (ClickedElement.classList.contains("window-header"))
            {
                dispatch(setMouseMovementOffset({x: NewLocation.x - (CursorLocation.x?? 0), y: NewLocation.y - (CursorLocation.y?? 0)}));
                SetMoveWindow(true);
            }
        }
    }

    function onMouseUp()
    {
        StopMovingWindow();
    }

    function StopMovingWindow()
    {
        SetMoveWindow(false);
    }

    let NewLocation: Point = {x: FoundObject.Location.x, y: FoundObject.Location.y};

    if (MoveWindow)
    {
        NewLocation = {
            x: CursorLocation.x === null? 0 : CursorLocation.x + CursorOffset.x,
            y: CursorLocation.y === null? 0 : CursorLocation.y + CursorOffset.y
        };
        WindowLocatorData.delete(WindowId);
        WindowLocatorData.set(WindowId, {Location: NewLocation});
    }

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
            x: Maximized? 0 : NewLocation.x,
            y: Maximized? 0 : NewLocation.y,
            zIndex: Maximized? 200 : zIndexFront,
            width: Maximized? "100%" : "auto",
            height: Maximized? "100%" : "auto",
            left: Maximized? "0" : undefined,
            top: Maximized? "0" : undefined
        },
        minimized: {
            filter: "blur(1px)",
            x: Maximized? 0 : NewLocation.x,
            y: Maximized? 0 : NewLocation.y,
            left: "0%",
            top: "100%",
            scale: 0,
            opacity: 0,
            width: Maximized? "100%" : "auto",
            height: Maximized? "100%" : "auto",
            zIndex: Maximized? 200 : zIndexFront
        }
    }

    function onWindowMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        dispatch(bringToFront(props.AppId));
        const ClickedElement = event.target as HTMLDivElement;
        if (ClickedElement) 
            if (ClickedElement.classList.contains("window-dismiss-button")) 
                return; // don't set as focus if clicking on dismiss
        
        dispatch(setFocusedApp(props.AppId));
    }

    function onDismissButton()
    {
        dispatch(setMinimizedState({id: props.AppId,state: true}));
        dispatch(setFocusedApp(-1));
    }

    function onWindowClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        if (event.detail !== 2) return;
        SetMaximized(!Maximized);
    }

    const animateValue = isMinimized === undefined? "visible" : (isMinimized === true? "minimized" : "visible");
    const MaximizedClass = Maximized? " maximized-app-window" : "";
    const FocusedClass = isFocused? " focused-app-window" : ""; 
    const MovingClass = MoveWindow? " moving-app-window" : "";
    
    return (
        <motion.div 
        className={`app-window${MaximizedClass}${FocusedClass}${MovingClass}`}
        variants={exitAndOpen}
        initial="hidden"
        animate={animateValue}
        transition={{duration: 0.1, width: {duration: 0.125}, height: {duration: 0.125}, x: {duration: 0}, y: {duration: 0}}}
        onMouseDown={onWindowMouseDown}>
            <div className="window-header" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onWindowClick}>
                {
                    props.processName !== undefined || props.processIcon !== undefined? 
                    <div className="process-data-container">
                        <img src={props.processIcon} />
                        <p>{props.processName}</p>
                    </div>
                    :
                    null
                }
                <div className="window-controls">
                    <span className="window-control-button window-close-button" onClick={CloseApplication}>✕</span>
                    <span className="window-control-button window-maximize-button" onClick={MaximizeWindow}><span id="square-button"></span></span>
                    <span className="window-control-button window-dismiss-button" onClick={onDismissButton}><span id="dismiss-button"/></span>
                </div>
            </div>
            <div className="window-content" style={{width: Maximized? "100%" : MinimizedDimensions.width?? "auto", height: Maximized? "100%" : MinimizedDimensions.height?? "auto", resize: Maximized? "none" : "both"}} ref={ref}>
                <div className="mother-window-container">
                    {props.children}
                </div>
            </div>
        </motion.div>
    )
}

export default AppWindow;