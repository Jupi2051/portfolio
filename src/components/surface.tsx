import { useSelector } from "react-redux";
import Desktop from "./windows/desktop";
import Taskbar from "./windows/taskbar";
import { RootState } from "@/storage/store";
import WindowsSettings from "./windows/start-menu";
import { AnimatePresence } from "framer-motion";

function Surface() {
  const RenderWindowsSettings = useSelector(
    (x: RootState) => x.taskbarState.RenderStartMenu
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
