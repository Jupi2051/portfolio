import LiquidGlass from "./liquid-glass";
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
      style={{
        backdropFilter: "url(#glass-distortion) blur(2px) saturate(200%)",
        WebkitBackdropFilter: "url(#glass-distortion)",
      }}
    >
      <LiquidGlass />
      <OpenApps />
      <BackgroundApps />
    </div>
  );
}

export default Taskbar;
