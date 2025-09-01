import DateTime from "./BackgroundApps/DateTime";
import VolumeInternet from "./BackgroundApps/VolumeInternet";
import "../Styles/BackgroundApps.css";

function BackgroundApps() {
  return (
    <div
      className="flex items-center justify-center gap-0 rounded-t-lg list-none px-1 pt-1 pb-0.5 w-fit z-[3] background-apps-container col-start-3 bg-gradient-to-r from-[#3f3550] to-[#523a54]"
      id="background-apps"
    >
      <DateTime />
      <VolumeInternet />
    </div>
  );
}

export default BackgroundApps;
