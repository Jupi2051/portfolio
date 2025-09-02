import { useSelector } from "react-redux";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import "/src/fonts/SEGOEUI.ttf";
import { RootState } from "../Storage/Store";
import WindowsSettings from "./WindowsSettings";
import { AnimatePresence } from "framer-motion";

function Surface() {
  const RenderWindowsSettings = useSelector(
    (x: RootState) => x.taskbarState.RenderWindowsSettings
  );

  return (
    <div className="relative h-screen bg-cover grid grid-cols-1 grid-rows-[1fr_0.05fr] overflow-hidden isolate bg-[url('/Imgs/background.png')]">
      <Desktop></Desktop>
      <AnimatePresence>
        {RenderWindowsSettings ? <WindowsSettings /> : null}
      </AnimatePresence>
      <Taskbar></Taskbar>
    </div>
  );
}

export default Surface;
