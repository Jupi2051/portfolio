import { AnimatePresence } from "framer-motion";
import { RootState } from "@/storage/store";
import { useSelector } from "react-redux";
import StartMenuComponent from "./start-menu";

const StartMenu = ({ className }: { className?: string }) => {
  const RenderWindowsSettings = useSelector(
    (x: RootState) => x.taskbarState.RenderStartMenu
  );
  return (
    <AnimatePresence>
      <AnimatePresence>
        {RenderWindowsSettings ? (
          <StartMenuComponent className={className} />
        ) : null}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default StartMenu;
