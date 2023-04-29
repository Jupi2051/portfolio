import { motion } from "framer-motion";
import "../Styles/WindowsSettings.css";
import { DesktopIcons } from "./Desktop";
import WindowsSettingsApp from "./WindowsSettingsApp";
import SocialMedia, { SocialMediaTypes } from "./SocialMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

export const BottomAnimationVariants = {
    hidden: {
        y: "100vh",
        x: "-50%"
    },
    visible: {
        y: -60,
        x: "-50%"
    },
    exit: {
        y: "100vh",
        x: "-50%"
    }
}

function WindowsSettings()
{
    return <motion.div className="windows-settings-container" variants={BottomAnimationVariants} initial="hidden" animate="visible" exit="exit">
        <input type="text" placeholder="Search for apps, settings and documents." title="Search" className="search-bar"/>
        <div>
            <p>Pinned</p>
            <div className="windows-settings-apps-container">
                {
                    DesktopIcons.map((element) =>
                        <WindowsSettingsApp App={element.AppComponent} ApplicationName={element.Name} Icon={element.IconPath} customTaskbarIcon={element.customTaskbarIcon} key={element.id}/>
                    )
                }
            </div>
        </div>
        <div>
            <p>Socials</p>
            <div className="windows-settings-social-container">
                <SocialMedia SocialMedia={SocialMediaTypes.Twitter} />
                <SocialMedia SocialMedia={SocialMediaTypes.YouTube} />
                <SocialMedia SocialMedia={SocialMediaTypes.GitHub} />
                <SocialMedia SocialMedia={SocialMediaTypes.Twitter} />
                <SocialMedia SocialMedia={SocialMediaTypes.YouTube} />
                <SocialMedia SocialMedia={SocialMediaTypes.GitHub} />
            </div>
        </div>
        <div className="windows-settings-user-container">
            <div className="user-data-container">
                <div>
                    <img src="https://cdn.discordapp.com/attachments/854012967820460102/1101491813560365126/avatar.png" />
                    <p>Jupi</p>
                </div>
                <FontAwesomeIcon className="power-off-icon" icon={faPowerOff} />
            </div>
        </div>
    </motion.div>
}
export default WindowsSettings;