import { AnimatePresence } from "framer-motion";
import { OpenApplication } from "@/components/windows/desktop";
import DummyApp from "@/components/apps/dummy-app";
import Jenni from "@/components/apps/jenni";
import Photos from "@/components/apps/photos";
import EIEN from "@/components/apps/eien";
import GalaxyGym from "@/components/apps/galaxy-gym";
import Oni from "@/components/apps/oni";
import Explorer from "@/components/apps/explorer";
import Social from "@/components/apps/social";
import AboutMe from "@/components/apps/about-me";
import Blog from "@/components/apps/blog";
import Controls from "@/components/apps/controls";

type PropTypes = {
  OpenApplications: OpenApplication[];
};

export enum DesktopAppsList {
  DummyApp,
  Oni,
  Jenni,
  EIEN,
  GalaxyGym,
  Photos,
  Explorer,
  Social,
  AboutMe,
  Blog,
  Controls,
}

function ApplicationsContainer(Props: PropTypes) {
  return (
    <AnimatePresence>
      {Props.OpenApplications.map((openApp) => {
        switch (openApp.App) {
          case DesktopAppsList.DummyApp:
            return (
              <DummyApp
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.Jenni:
            return (
              <Jenni
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.EIEN:
            return (
              <EIEN
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.Oni:
            return (
              <Oni
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.GalaxyGym:
            return (
              <GalaxyGym
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.Photos:
            return (
              <Photos
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
                processData={{ ...(openApp.processProps ?? {}) }}
              />
            );
          case DesktopAppsList.Explorer:
            return (
              <Explorer
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
                processData={{ ...(openApp.processProps ?? {}) }}
              />
            );
          case DesktopAppsList.Social:
            return (
              <Social
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.AboutMe:
            return (
              <AboutMe
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.Blog:
            return (
              <Blog
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
          case DesktopAppsList.Controls:
            return (
              <Controls
                AppId={openApp.id}
                key={openApp.id}
                processIcon={openApp.processIcon}
                processName={openApp.processName}
              />
            );
        }
      })}
    </AnimatePresence>
  );
}

export default ApplicationsContainer;
