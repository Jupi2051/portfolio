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
import { AppFoundationProps } from "@/components/ui/app-foundation";

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

export const DesktopAppsComponents: Record<
  DesktopAppsList,
  React.ComponentType<AppFoundationProps>
> = {
  [DesktopAppsList.DummyApp]: DummyApp,
  [DesktopAppsList.Oni]: Oni,
  [DesktopAppsList.Jenni]: Jenni,
  [DesktopAppsList.EIEN]: EIEN,
  [DesktopAppsList.GalaxyGym]: GalaxyGym,
  [DesktopAppsList.Blog]: Blog,
  [DesktopAppsList.Controls]: Controls,
  [DesktopAppsList.Social]: Social,
  [DesktopAppsList.AboutMe]: AboutMe,
  [DesktopAppsList.Photos]: Photos,
  [DesktopAppsList.Explorer]: Explorer,
};
