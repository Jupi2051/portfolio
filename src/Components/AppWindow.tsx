import { ReactNode, useEffect, useMemo, useState } from "react";
import "../Styles/AppWindow.css";
import { AnimatePresence, Point, motion } from "framer-motion";
import useMousePosition from "../Hooks/useMousePosition";

type CloseAppFunction = () => void;

type PropType = {
    children?: ReactNode,
    CloseApp?: CloseAppFunction
}

type WindowBorderBox = {
    Location: Point
};

// let WindowLocatorData: WindowBorderBox[] = [];

let WindowLocatorData = new Map<number, WindowBorderBox>();

function AppWindow(props: PropType)
{
    const [Maximized, SetMaximized] = useState(false);
    const [MoveWindow, SetMoveWindow] = useState(false);
    const [zIndexFront, setZIndexFront] = useState(0);
    const CursorLocation = useMousePosition();

    const WindowId = useMemo(() => +new Date(), []);
    let FoundObject = WindowLocatorData.get(WindowId);
    if (!FoundObject)
    {
        FoundObject = {Location: {x: 0, y: 0}};
        WindowLocatorData.set(WindowId, FoundObject);
    }
    
    useEffect(() => {
        
        return () => {
            // console.log("deleted");
            // WindowLocatorData.delete(WindowId);
        }
    }, []); 

    function MaximizeWindow()
    {
        SetMaximized(!Maximized);
    }

    function CloseApplication()
    {
        if (props.CloseApp) props.CloseApp();
    }

    let MaximizedClass = "";
    if (Maximized) MaximizedClass = " maximized-app-window";
    
    function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        const ClickedElement = event.target as HTMLDivElement;
        if (ClickedElement)
            if (ClickedElement.classList.contains("window-header"))
                SetMoveWindow(true);
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
            x: CursorLocation.x === null? 0 : CursorLocation.x - 150,
            y: CursorLocation.y === null? 0 : CursorLocation.y - 10 
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
            width: Maximized? "100%" : undefined,
            height: Maximized? "100%" : undefined,
            left: Maximized? "0" : undefined,
            top: Maximized? "0" : undefined,
        },
    }

    function onWindowClick()
    {
        setZIndexFront(100);
    }

    return (
        <motion.div className={`app-window${MaximizedClass}`}
            variants={exitAndOpen}
            initial="hidden"
            animate="visible"
            transition={{duration: 0.1, width: {duration: 0.125}, height: {duration: 0.125}, x: {duration: 0}, y: {duration: 0}}}
            onMouseDown={onWindowClick}
            >
                <div className="window-header" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                    <div className="window-controls">
                        <span className="window-control-button window-close-button" onClick={CloseApplication}>✖</span>
                        <span className="window-control-button" onClick={MaximizeWindow}><span id="square-button"></span></span>
                        <span className="window-control-button"><span id="dismiss-button"/></span>
                    </div>
                </div>
                <div className="window-content">
                    {props.children}
                </div>
        </motion.div>
    )
}

export default AppWindow;