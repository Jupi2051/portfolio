import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "../Styles/SocialMedia.css";

export const enum SocialMediaTypes {
    Twitter,
    YouTube,
    GitHub
}

type PropTypes = {
    SocialMedia: SocialMediaTypes,
    Link: string
};

const SocialMediaData = {
    [SocialMediaTypes.YouTube]: {
        name: "YouTube",
        icon: faYoutube
    },
    [SocialMediaTypes.Twitter]: {
        name: "Twitter",
        icon: faTwitter
    },
    [SocialMediaTypes.GitHub]: {
        name: "GitHub",
        icon: faGithub
    },
};

function SocialMedia(Props: PropTypes)
{
    const icon = SocialMediaData[Props.SocialMedia].icon;
    const name = SocialMediaData[Props.SocialMedia].name;

    return <a className="social-media-container" href={Props.Link} target="_blank">
        <FontAwesomeIcon className="social-media-icon" icon={icon} />
        <p className="social-media-name">{name}</p>
    </a>
}

export default SocialMedia;