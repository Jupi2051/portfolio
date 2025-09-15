import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";
import { Dimensions2D } from "@/components/windows/app-window";

interface SystemNotificationData {
  content: string | React.ReactNode;
  parentProcess: number;
  windowSize?: Dimensions2D;
}

const useSystemNotification = ({
  content,
  parentProcess,
  windowSize,
}: SystemNotificationData) => {
  const { openNewApplication } = useGlobalWindowsControls();

  const openNotificationWindow = () => {
    const { focusWindow, bringWindowToFront } = openNewApplication({
      App: DesktopAppsList.Notification,
      processIcon: "Imgs/Apps/Notification.webp",
      processName: "Notification",
      processData: {
        content,
      },
      parentProcess: parentProcess,
      metaData: {
        forceView: true,
        hiddenButtons: ["minimize", "maximize"],
        windowSize: windowSize ?? {
          width: 300,
          height: 200,
        },
        maximized: false,
        windowLocation: "center",
        disableMaximize: true,
        disableMinimize: true,
        disableResize: true,
        disableOtherAppsPointerEvents: true,
      },
    });

    focusWindow();
    bringWindowToFront();
  };

  return {
    summonNotificationWindow: openNotificationWindow,
  };
};

export default useSystemNotification;
