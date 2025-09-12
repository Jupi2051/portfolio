import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh as HighVolume,
  faWifiStrong as WifiIcon,
} from "@fortawesome/free-solid-svg-icons";
import BackgroundAppWrapper from "./background-app-wrapper";

function VolumeInternet() {
  return (
    <BackgroundAppWrapper>
      <div className="flex flex-row-reverse gap-2">
        <FontAwesomeIcon className="text-white" icon={HighVolume} />
        <FontAwesomeIcon className="text-white" icon={WifiIcon} />
      </div>
    </BackgroundAppWrapper>
  );
}

export default VolumeInternet;
