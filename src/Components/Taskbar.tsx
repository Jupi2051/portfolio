import BackgroundApps from "./BackgroundApps";
import OpenApps from "./OpenApps";

function Taskbar() {
  return (
    <div className="grid grid-cols-3 grid-rows-[1fr] justify-center justify-items-end">
      <OpenApps></OpenApps>
      <BackgroundApps></BackgroundApps>
    </div>
  );
}

export default Taskbar;
