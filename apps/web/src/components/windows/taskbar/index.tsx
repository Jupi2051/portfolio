import BackgroundApps from "./taskbar-background-apps";
import OpenApps from "./taskbar-open-apps";
import cn from "classnames";

function Taskbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full justify-center items-center bg-black/45 outline-4 outline-ctp-lavender-300/2",
        className
      )}
    >
      <OpenApps />
      <BackgroundApps />
    </div>
  );
}

export default Taskbar;
