import { ReactNode, useState } from "react";
import "../Styles/AppWindow.css";
import { AnimatePresence, motion } from "framer-motion";
import useMousePosition from "../Hooks/useMousePosition";

type CloseAppFunction = () => void;

type PropType = {
    children?: ReactNode,
    CloseApp?: CloseAppFunction
}

let MoveWindow = false;
let LastMouseLocation: {x: number, y: number} = {x: 0, y: 0};

function AppWindow(props: PropType)
{
    const [Maximized, SetMaximized] = useState(false);

    const CursorLocation = useMousePosition();
    
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

    const exitAndOpen = {
        hidden: {
            scale: 0.9,
            filter: "blur(1px)",
            opacity: 0,
        },
        visible: {
            scale: 1,
            filter: "blur(0px)",
            x: Maximized? 0 : LastMouseLocation.x,
            y: Maximized? 0 : LastMouseLocation.y,
            opacity: 1,
            width: Maximized? "100%" : undefined,
            height: Maximized? "100%" : undefined,
            left: Maximized? "0" : undefined,
            top: Maximized? "0" : undefined,
        },
    }
    
    function onMouseDown()
    {
        MoveWindow = true;
    }

    function onMouseUp()
    {
        StopMovingWindow();
    }

    function StopMovingWindow()
    {
        MoveWindow = false;
    }

    if (MoveWindow)
    {
        LastMouseLocation = {
            x: CursorLocation.x === null? 0 : CursorLocation.x - 150,
            y: CursorLocation.y === null? 0 : CursorLocation.y - 10 
        };
    }
    
    return (
        <motion.div className={`app-window${MaximizedClass}`}
            variants={exitAndOpen}
            initial="hidden"
            animate="visible"
            transition={{duration: 0.1, width: {duration: 0.125}, height: {duration: 0.125}, x: {duration: 0}, y: {duration: 0}}} >
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