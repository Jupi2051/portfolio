import { AnimatePresence } from "framer-motion";
import StartMenuComponent from "./start-menu";
import useStartMenu from "@/hooks/use-start-menu";

const StartMenu = ({ className }: { className?: string }) => {
  const { isRendered } = useStartMenu();

  return (
    <AnimatePresence>
      <AnimatePresence>
        {isRendered ? <StartMenuComponent className={className} /> : null}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default StartMenu;
