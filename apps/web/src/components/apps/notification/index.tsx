import { useApplicationData } from "@/context/app-context";

const NotificationWindow = () => {
  const { processData } = useApplicationData<{
    content: string | React.ReactNode;
  }>();

  return processData.content;
};

export default NotificationWindow;
