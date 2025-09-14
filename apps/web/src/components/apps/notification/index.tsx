import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";
import { OpenApplication } from "@/components/windows/desktop";

interface SystemNotificationData {
  content: string | React.ReactNode;
  parentProcess: number;
}

const useSystemNotification = ({
  content,
  parentProcess,
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
    });

    focusWindow();
    bringWindowToFront();
  };

  return {
    summonNotificationWindow: openNotificationWindow,
  };
};

export default useSystemNotification;
