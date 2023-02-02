import "../Styles/Surface.css";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import "/src/fonts/SEGOEUI.ttf";

type PropsTypes = {
    children: React.ReactNode;
}

function Surface(props: any)
{
    return (
    <div id="surface-background">
        <Desktop></Desktop>
        <Taskbar></Taskbar>
    </div>)
}

export default Surface;