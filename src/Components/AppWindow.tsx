import { ReactNode, useState } from "react";
import "../Styles/AppWindow.css";
import { AnimatePresence, motion } from "framer-motion";

type CloseAppFunction = () => void;

type PropType = {
    children?: ReactNode,
    CloseApp?: CloseAppFunction
}

function AppWindow(props: PropType)
{
    const [Maximized, SetMaximized] = useState(false);

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
            opacity: 1,
            width: Maximized? "100%" : undefined,
            height: Maximized? "100%" : undefined,
            left: Maximized? "0" : undefined,
            top: Maximized? "0" : undefined,
        },
    }
    
    return <motion.div className={`app-window${MaximizedClass}`}
            variants={exitAndOpen}
            initial="hidden"
            animate="visible"
            transition={{duration: 0.1, width: {duration: 0.125}, height: {duration: 0.125}}}
            layout
            >
            <div className="window-header">
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
    
}

export default AppWindow;