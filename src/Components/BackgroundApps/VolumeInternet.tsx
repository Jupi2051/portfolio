import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh as HighVolume,
  faWifiStrong as WifiIcon,
} from "@fortawesome/free-solid-svg-icons";

function VolumeInternet() {
  return (
    <div className="flex flex-row-reverse gap-2">
      <FontAwesomeIcon className="text-white" icon={HighVolume} />
      <FontAwesomeIcon className="text-white" icon={WifiIcon} />
    </div>
  );
}

export default VolumeInternet;
