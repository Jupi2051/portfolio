import "../Styles/Surface.css";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import "/src/fonts/SEGOEUI.ttf";

function Surface()
{
    return (
    <div id="surface-background">
        <Desktop></Desktop>
        <Taskbar></Taskbar>
    </div>)
}

export default Surface;