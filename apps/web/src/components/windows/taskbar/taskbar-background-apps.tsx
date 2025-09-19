import DateTime from "./background-apps/date-time";
import VolumeInternet from "./background-apps/volume-internet";

function BackgroundApps() {
  return (
    <div className="hidden sm:flex flex-row-reverse gap-4 px-4 items-center rounded-t-lg list-none pt-1 pb-0.5 w-fit z-[3]">
      <DateTime />
      <VolumeInternet />
    </div>
  );
}

export default BackgroundApps;
