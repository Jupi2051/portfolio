import { ReactNode, useEffect, useMemo, useState } from "react";
import "../Styles/AppWindow.css";
import { AnimatePresence, Point, motion } from "framer-motion";
import useMousePosition from "../Hooks/useMousePosition";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Store";
import { bringToFront, closeApplication, setZIndex, unhandleZIndex } from "../Storage/Slices/Main";
import { closeTaskbarApplication } from "../Storage/Slices/Taskbar";
import { setFocusedApp, setMinimizedState, setMouseMovementOffset } from "../Storage/Slices/Desktop";

type PropType = {
    children?: ReactNode,
    AppId: number,
    processName?: string,
    processIcon?: string
}

type WindowBorderBox = {
    Location: Point
};

let WindowLocatorData = new Map<number, WindowBorderBox>();

function AppWindow(props: PropType)
{
    const [Maximized, SetMaximized] = useState(false);
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

    let FoundObject = WindowLocatorData.get(WindowId);
    if (!FoundObject)
    {
        FoundObject = {Location: {x: Math.floor((Math.random() * 200)), y: Math.floor((Math.random() * 200))}};
        WindowLocatorData.set(WindowId, FoundObject);
    }
    
    function MaximizeWindow()
    {
        SetMaximized(!Maximized);
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

    const exitAndOpen = {
        hidden: {
            scale: 0.9,
            filter: "blur(1px)",
            opacity: 0,
        },
        visible: {
            scale: 1,
            filter: "blur(0px)",
            x: Maximized? 0 : NewLocation.x,
            y: Maximized? 0 : NewLocation.y,
            zIndex: Maximized? 200 : zIndexFront,
            opacity: 1,
            width: Maximized? "100%" : "auto",
            height: Maximized? "100%" : "auto",
            left: Maximized? "0" : undefined,
            top: Maximized? "0" : undefined,
        },
        minimized: {
            scale: 1,
            filter: "blur(1px)",
            x: "-50%",
            y: "100%",
            left: "50%",
            top: "100%",
            zIndex: Maximized? 200 : zIndexFront,
            opacity: 1,
            width: Maximized? "100%" : "auto",
            height: Maximized? "100%" : "auto",
        }
    }

    function onWindowMouseDown()
    {
        dispatch(bringToFront(props.AppId));
        dispatch(setFocusedApp(props.AppId));
    }

    function onDismissButton()
    {
        dispatch(setMinimizedState({
            id: props.AppId,
            state: true
        }));
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
        onMouseDown={onWindowMouseDown}
        onClick={onWindowClick}>
            <div className="window-header" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
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
                    <span className="window-control-button" onClick={MaximizeWindow}><span id="square-button"></span></span>
                    <span className="window-control-button" onClick={onDismissButton}><span id="dismiss-button"/></span>
                </div>
            </div>
            <div className="window-content" style={{width: Maximized? "100%" : "auto", height: Maximized? "100%" : "auto"}}>
                {props.children}
            </div>
        </motion.div>
    )
}

export default AppWindow;