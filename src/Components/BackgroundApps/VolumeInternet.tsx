import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh as HighVolume, faWifiStrong as WifiIcon } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/BackgroundApps/VolumeInternet.css";

function VolumeInternet()
{

    return <div className="volume-internet-container">
        <FontAwesomeIcon className="volume-internet-icon" icon={HighVolume}/>
        <FontAwesomeIcon className="volume-internet-icon" icon={WifiIcon}/>
    </div>
}

export default VolumeInternet;