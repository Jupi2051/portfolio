import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const enum SocialMediaTypes {
  Twitter,
  YouTube,
  GitHub,
}

type PropTypes = {
  SocialMedia: SocialMediaTypes;
  Link: string;
};

const SocialMediaData = {
  [SocialMediaTypes.YouTube]: {
    name: "YouTube",
    icon: faYoutube,
  },
  [SocialMediaTypes.Twitter]: {
    name: "Twitter",
    icon: faTwitter,
  },
  [SocialMediaTypes.GitHub]: {
    name: "GitHub",
    icon: faGithub,
  },
};

function SocialMedia(Props: PropTypes) {
  const icon = SocialMediaData[Props.SocialMedia].icon;
  const name = SocialMediaData[Props.SocialMedia].name;

  return (
    <a
      className="text-white flex gap-2.5 sm:text-xs w-full h-full items-center pl-2.5 rounded-md cursor-default no-underline transition-colors duration-150 ease-in-out hover:bg-white/10 "
      href={Props.Link}
      target="_blank"
    >
      <FontAwesomeIcon className="text-2xl sm:text-3xl" icon={icon} />
      <p className="text-xs sm:text-base text-white/80 font-normal font-sans">
        {name}
      </p>
    </a>
  );
}

export default SocialMedia;
