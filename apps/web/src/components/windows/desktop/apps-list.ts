import { lazy } from "react";
import AppLoadingFailed from "@/components/ui/app-foundation/app-loading-failed";
import NotificationWindow from "@/components/apps/notification/index";
type AppKey = keyof typeof DesktopAppsList;
export const toAppFromName = (k: string): DesktopAppsList =>
  DesktopAppsList[k as AppKey] as DesktopAppsList;

export enum DesktopAppsList {
  DummyApp,
  InstatusInspace,
  Jenni,
  EIEN,
  GalaxyGym,
  Photos,
  Explorer,
  Pinboard,
  AboutMe,
  Blog,
  Controls,
  Notification,
}

const handleFailedLoad = () => ({ default: AppLoadingFailed });

export const DesktopAppsComponents: Record<DesktopAppsList, any> = {
  [DesktopAppsList.DummyApp]: lazy(() =>
    delayForDemo(import("@/components/apps/dummy-app").catch(handleFailedLoad))
  ),
  [DesktopAppsList.InstatusInspace]: lazy(() =>
    delayForDemo(
      import("@/components/apps/instatus-inspace").catch(handleFailedLoad)
    )
  ),
  [DesktopAppsList.Jenni]: lazy(() =>
    delayForDemo(import("@/components/apps/jenni").catch(handleFailedLoad))
  ),
  [DesktopAppsList.EIEN]: lazy(() =>
    delayForDemo(import("@/components/apps/eien").catch(handleFailedLoad))
  ),
  [DesktopAppsList.GalaxyGym]: lazy(() =>
    delayForDemo(import("@/components/apps/galaxy-gym").catch(handleFailedLoad))
  ),
  [DesktopAppsList.Blog]: lazy(() =>
    import("@/components/apps/blog").catch(handleFailedLoad)
  ),
  [DesktopAppsList.Controls]: lazy(() =>
    delayForDemo(import("@/components/apps/controls").catch(handleFailedLoad))
  ),
  [DesktopAppsList.Pinboard]: lazy(() =>
    delayForDemo(import("@/components/apps/pinboard").catch(handleFailedLoad))
  ),
  [DesktopAppsList.AboutMe]: lazy(() =>
    delayForDemo(import("@/components/apps/about-me").catch(handleFailedLoad))
  ),
  [DesktopAppsList.Photos]: lazy(() =>
    delayForDemo(import("@/components/apps/photos").catch(handleFailedLoad))
  ),
  [DesktopAppsList.Explorer]: lazy(() =>
    delayForDemo(import("@/components/apps/explorer").catch(handleFailedLoad))
  ),
  [DesktopAppsList.Notification]: NotificationWindow,
};

function delayForDemo(promise: Promise<any>) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}
