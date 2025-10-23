import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Notification from "./notification";
import { NotificationData, NotificationItem } from "./types";

export default function SystemNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const generateId = () => {
    return `notification-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  };

  const addNotification = useCallback((data: NotificationData) => {
    const newNotification: NotificationItem = {
      id: data.id || generateId(),
      timestamp: Date.now(),
      duration: data.duration || 5000,
      ...data,
    };

    setNotifications((prev) => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  useEffect(() => {
    const handleSystemNotification = (event: CustomEvent<NotificationData>) => {
      addNotification(event.detail);
    };

    window.addEventListener(
      "systemNotification",
      handleSystemNotification as EventListener
    );

    return () => {
      window.removeEventListener(
        "systemNotification",
        handleSystemNotification as EventListener
      );
    };
  }, [addNotification]);

  useEffect(() => {
    if (notifications.length > 5) {
      setNotifications((prev) => prev.slice(-5));
    }
  }, [notifications.length]);

  return (
    <>
      <div className="absolute bottom-4 right-4 z-50 w-full max-w-sm pointer-events-none sm:block hidden">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification, index) => (
            <Notification
              key={notification.id}
              notification={notification}
              onDismiss={removeNotification}
              index={index}
              isMobile={false}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs pointer-events-none sm:hidden block px-4">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification, index) => (
            <Notification
              key={notification.id}
              notification={notification}
              onDismiss={removeNotification}
              index={index}
              isMobile={true}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
