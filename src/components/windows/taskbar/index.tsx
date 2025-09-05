import BackgroundApps from "./taskbar-background-apps";
import OpenApps from "./taskbar-open-apps";
import cn from "classnames";

function Taskbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 grid-rows-[1fr] justify-center justify-items-end bg-black/45 outline-4 outline-ctp-lavender-300/2",
        className
      )}
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <OpenApps />
      <BackgroundApps />
    </div>
  );
}

export default Taskbar;
