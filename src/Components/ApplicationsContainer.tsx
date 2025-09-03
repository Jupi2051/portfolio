import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { OpenApplication } from "@/Components/Desktop";
import DummyApp from "@/Components/Apps/DummyApp";
import Jenni from "@/Components/Apps/Jenni";
import Photos from "@/Components/Apps/Photos";
import EIEN from "@/Components/Apps/EIEN";
import GalaxyGym from "@/Components/Apps/GalaxyGym";
import Oni from "@/Components/Apps/Oni";
import Explorer from "@/Components/Apps/Explorer";
import Social from "@/Components/Apps/Social";
import AboutMe from "@/Components/Apps/AboutMe";
import Blog from "@/Components/Apps/Blog";
import Controls from "@/Components/Apps/controls/Controls";

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
