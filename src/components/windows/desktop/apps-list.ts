import { lazy } from "react";

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

export const DesktopAppsComponents: Record<DesktopAppsList, any> = {
  [DesktopAppsList.DummyApp]: lazy(() => import("@/components/apps/dummy-app")),
  [DesktopAppsList.Oni]: lazy(() => import("@/components/apps/oni")),
  [DesktopAppsList.Jenni]: lazy(() => import("@/components/apps/jenni")),
  [DesktopAppsList.EIEN]: lazy(() => import("@/components/apps/eien")),
  [DesktopAppsList.GalaxyGym]: lazy(() => import("@/components/apps/galaxy-gym")),
  [DesktopAppsList.Blog]: lazy(() => import("@/components/apps/blog")),
  [DesktopAppsList.Controls]: lazy(() => import("@/components/apps/controls")),
  [DesktopAppsList.Social]: lazy(() => import("@/components/apps/social")),
  [DesktopAppsList.AboutMe]: lazy(() => import("@/components/apps/about-me")),
  [DesktopAppsList.Photos]: lazy(() => import("@/components/apps/photos")),
  [DesktopAppsList.Explorer]: lazy(() => import("@/components/apps/explorer")),
};
