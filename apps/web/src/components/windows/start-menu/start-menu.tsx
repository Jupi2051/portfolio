import { motion, Variants } from "framer-motion";
import { DesktopIcons } from "@/components/windows/desktop";
import StartMenuApp from "@/components/windows/start-menu/start-menu-app";
import SocialMedia, {
  SocialMediaTypes,
} from "@/components/windows/start-menu/start-menu-social-media";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";
import cn from "classnames";
import useStartMenu from "@/hooks/use-start-menu";
import StartMenuFooter from "./start-menu-footer";

export const BottomAnimationVariants: Variants = {
  hidden: {
    y: "110%",
    x: "-50%",
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
  visible: {
    y: -60,
    x: "-50%",
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
  exit: {
    y: "110%",
    x: "-50%",
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
};

const StartMenuComponent = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setRenderStartMenu } = useStartMenu();
  useOnClickOutside(ref, (e) => {
    if ((e.target as HTMLDivElement).dataset.isWindowsIcon) return;
    setRenderStartMenu(false);
  });

  return (
    <motion.div
      className={cn(
        "absolute grid bottom-0 left-3 translate-x-1/2 rounded-md px-9 pt-8 pb-0 sm:pb-5 font-sans text-gray-200 font-light overflow-hidden grid-cols-1 max-h-[600px] h-full sm:min-h-[700px] w-full sm:w-[600px] bg-gradient-to-r from-ctp-blue-950/80 to-ctp-lavender-300/60 backdrop-blur-md shadow-[0px_0px_15px_0px_rgba(0,0,0,0.4)] grid-rows-[0.1fr_1.7fr_1fr]",
        className
      )}
      variants={BottomAnimationVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={ref}
    >
      <input
        type="text"
        placeholder="Search for apps, settings and documents."
        title="Search"
        className="rounded-3xl text-sm px-9 h-7 border border-gray-600 text-ctp-lavender-500 bg-gray-700 focus:border-transparent focus:outline-transparent focus:outline-none"
      />
      <div className="flex flex-col gap-0 sm:gap-5 self-center">
        <p className="text-xs sm:text-base">Pinned</p>
        <div className="grid w-full grid-cols-6 grid-rows-3 gap-x-6 gap-y-5 self-center items-center justify-items-center justify-between">
          {DesktopIcons.map((element) => (
            <StartMenuApp
              App={element.AppComponent}
              ApplicationName={element.Name}
              Icon={element.IconPath}
              customTaskbarIcon={element.customTaskbarIcon}
              processData={element.processData}
              key={element.id}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs sm:text-base mt-2.5 sm:mt-0">Socials</p>
        <div className="grid h-1/2 gap-x-2.5 grid-cols-2 items-center justify-items-start w-full sm:w-4/5 mx-auto">
          <SocialMedia
            SocialMedia={SocialMediaTypes.Twitter}
            Link="https://twitter.com/Jupi205"
          />
          <SocialMedia
            SocialMedia={SocialMediaTypes.YouTube}
            Link="https://www.youtube.com/@Jupi205"
          />
          <SocialMedia
            SocialMedia={SocialMediaTypes.GitHub}
            Link="https://github.com/Jupi2051"
          />
        </div>
      </div>
      <StartMenuFooter />
    </motion.div>
  );
};
export default StartMenuComponent;
