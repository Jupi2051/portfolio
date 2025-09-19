import BackgroundApps from "./taskbar-background-apps";
import OpenApps from "./taskbar-open-apps";
import cn from "classnames";

function Taskbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full justify-center justify-items-start bg-black/45 outline-4 outline-ctp-lavender-300/2 backdrop-blur-md",
        className
      )}
    >
      <OpenApps />
      <BackgroundApps />
    </div>
  );
}

export default Taskbar;
