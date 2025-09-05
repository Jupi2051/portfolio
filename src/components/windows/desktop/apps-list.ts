import { lazy } from "react";
import AppLoadingFailed from "@/components/ui/app-foundation/app-loading-failed";

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

const handleFailedLoad = () => ({ default: AppLoadingFailed });

export const DesktopAppsComponents: Record<DesktopAppsList, any> = {
  [DesktopAppsList.DummyApp]: lazy(() => import("@/components/apps/dummy-app").catch(handleFailedLoad)),
  [DesktopAppsList.Oni]: lazy(() => import("@/components/apps/oni").catch(handleFailedLoad)),
  [DesktopAppsList.Jenni]: lazy(() => import("@/components/apps/jenni").catch(handleFailedLoad)),
  [DesktopAppsList.EIEN]: lazy(() => import("@/components/apps/eien").catch(handleFailedLoad)),
  [DesktopAppsList.GalaxyGym]: lazy(() => import("@/components/apps/galaxy-gym").catch(handleFailedLoad)),
  [DesktopAppsList.Blog]: lazy(() => import("@/components/apps/blog").catch(handleFailedLoad)),
  [DesktopAppsList.Controls]: lazy(() => import("@/components/apps/controls").catch(handleFailedLoad)),
  [DesktopAppsList.Social]: lazy(() => import("@/components/apps/social").catch(handleFailedLoad)),
  [DesktopAppsList.AboutMe]: lazy(() => import("@/components/apps/about-me").catch(handleFailedLoad)),
  [DesktopAppsList.Photos]: lazy(() => import("@/components/apps/photos").catch(handleFailedLoad)),
  [DesktopAppsList.Explorer]: lazy(() => import("@/components/apps/explorer").catch(handleFailedLoad)),
};
