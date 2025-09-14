import { useApplicationData } from "@/context/app-context";

const NotificationWindow = () => {
  const { processData } = useApplicationData<{
    content: string | React.ReactNode;
  }>();

  return <div>{processData.content}</div>;
};

export default NotificationWindow;
