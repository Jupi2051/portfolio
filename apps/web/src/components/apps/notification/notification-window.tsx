import AppWindow from "@/components/windows/app-window";
import { useMemo } from "react";

const NotificationWindow = () => {
  const appId = useMemo(() => +new Date(), []);

  return <div>Notification</div>;
};

export default NotificationWindow;
