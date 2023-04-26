import { useSelector } from "react-redux";
import "../Styles/Surface.css";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import "/src/fonts/SEGOEUI.ttf";
import { RootState } from "../Storage/Store";
import WindowsSettings from "./WindowsSettings";
import { AnimatePresence } from "framer-motion";

function Surface()
{
    const RenderWindowsSettings = useSelector((x: RootState) => x.taskbarState.RenderWindowsSettings);

    return (
    <div id="surface-background">
        <Desktop></Desktop>
        <AnimatePresence>{RenderWindowsSettings? <WindowsSettings /> : null}</AnimatePresence>
        <Taskbar></Taskbar>
    </div>)
}

export default Surface;