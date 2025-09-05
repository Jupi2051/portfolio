import { motion } from "framer-motion";
import { DesktopIcons } from "@/components/windows/desktop";
import StartMenuApp from "@/components/windows/start-menu/start-menu-app";
import SocialMedia, {
  SocialMediaTypes,
} from "@/components/windows/start-menu/start-menu-social-media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useOnClickOutside } from "usehooks-ts";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setRenderStartMenu } from "@/storage/slices/taskbar";
import cn from "classnames";

export const BottomAnimationVariants = {
  hidden: {
    y: "110%",
    x: "-50%",
  },
  visible: {
    y: -60,
    x: "-50%",
  },
  exit: {
    y: "110%",
    x: "-50%",
  },
};

const StartMenuComponent = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useOnClickOutside(ref, (e) => {
    if ((e.target as HTMLDivElement).dataset.isWindowsIcon) return;
    dispatch(setRenderStartMenu(false));
  });

  return (
    <motion.div
      className={cn(
        "absolute grid bottom-0 rounded-md px-9 pt-8 pb-5 font-sans text-gray-200 font-light overflow-hidden grid-cols-1 left-1/2 min-h-[700px] w-[600px] bg-gradient-to-r from-[#3f3550d6] to-[#3f3550d6] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.4)] grid-rows-[0.1fr_1.7fr_1fr]",
        className
      )}
      style={{
        backdropFilter: "blur(50px)",
      }}
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
      <div className="flex flex-col gap-5 self-center">
        <p>Pinned</p>
        <div className="grid w-full grid-cols-6 grid-rows-3 gap-x-6 gap-y-5 self-center items-center justify-items-center justify-between">
          {DesktopIcons.map((element) => (
            <StartMenuApp
              App={element.AppComponent}
              ApplicationName={element.Name}
              Icon={element.IconPath}
              customTaskbarIcon={element.customTaskbarIcon}
              processProps={element.processData}
              key={element.id}
            />
          ))}
        </div>
      </div>
      <div>
        <p>Socials</p>
        <div className="grid h-1/2 gap-x-2.5 grid-cols-2 items-center justify-items-start w-4/5 mx-auto">
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
      <div
        className="absolute w-full h-full left-0 bg-[#3f3550d6] top-[var(--user-container-inner)]"
        style={{ "--user-container-inner": "90%" } as React.CSSProperties}
      >
        <div className="flex items-center justify-between px-12 h-[calc(100%-var(--user-container-inner))]">
          <div className="flex items-center justify-center gap-5 text-2xs">
            <img
              src="https://i.postimg.cc/kX5cqZgP/Birthday-Festival-BD-artwork-2.png"
              className="w-9 h-9 object-cover rounded-full"
            />
            <p className="text-xs">Jupi</p>
          </div>
          <FontAwesomeIcon className="text-xl" icon={faPowerOff} />
        </div>
      </div>
    </motion.div>
  );
};
export default StartMenuComponent;
