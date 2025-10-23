import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NotificationItem } from "./types";

interface NotificationProps {
  notification: NotificationItem;
  onDismiss: (id: string) => void;
  index: number;
  isMobile: boolean;
}

export default function Notification({
  notification,
  onDismiss,
  index,
  isMobile,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const duration = notification.duration || 5000;

    const timer = setTimeout(() => {
      if (!isHovered) {
        handleDismiss();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [notification.duration, isHovered]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(notification.id), 300);
  };

  const getTypeStyles = () => {
    switch (notification.type) {
      case "success":
        return "border-l-ctp-green bg-ctp-green/10 dark:bg-ctp-green/20";
      case "error":
        return "border-l-ctp-red bg-ctp-red/10 dark:bg-ctp-red/20";
      case "warning":
        return "border-l-ctp-yellow bg-ctp-yellow/10 dark:bg-ctp-yellow/20";
      case "info":
        return "border-l-ctp-blue bg-ctp-blue/10 dark:bg-ctp-blue/20";
      default:
        return "border-l-ctp-surface1 bg-ctp-base dark:bg-ctp-mantle";
    }
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isMobile ? 0 : 400,
        y: isMobile ? -50 : 0,
        scale: 0.8,
        rotateY: 15,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : isMobile ? 0 : 400,
        y: isVisible ? 0 : isMobile ? -50 : 0,
        scale: isVisible ? 1 : 0.8,
        rotateY: isVisible ? 0 : 15,
      }}
      exit={{
        opacity: 0,
        x: isMobile ? 0 : 400,
        y: isMobile ? -50 : 0,
        scale: 0.8,
        rotateY: 15,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.4,
      }}
      className={`
        relative w-full mx-auto rounded-2xl shadow-xl border-l-4
        ${isMobile ? "max-w-xs p-3 mb-2" : "max-w-sm p-5 mb-3"}
        ${getTypeStyles()}
        backdrop-blur-sm bg-ctp-base/95 dark:bg-ctp-mantle/95
        border border-ctp-surface1 dark:border-ctp-surface2
        cursor-pointer select-none
        hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out
        touch-manipulation pointer-events-auto
        transform-gpu
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleDismiss}
      style={{
        zIndex: 1000 - index,
        marginBottom: isMobile ? `${index * 4}px` : `${index * 8}px`,
      }}
    >
      <motion.button
        className={`absolute top-2 right-2 rounded-full bg-ctp-surface1 dark:bg-ctp-surface2 hover:bg-ctp-red/20 dark:hover:bg-ctp-red/20 flex items-center justify-center text-ctp-text dark:text-ctp-text cursor-pointer group
          ${isMobile ? "w-6 h-6 text-sm" : "w-7 h-7 text-lg"}
        `}
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <span className="group-hover:text-ctp-red transition-colors duration-200">
          X
        </span>
      </motion.button>

      <div
        className={`flex items-start space-x-3 ${isMobile ? "pr-6" : "pr-8"}`}
      >
        {notification.avatar && (
          <motion.div
            className={`flex-shrink-0 rounded-full overflow-hidden bg-ctp-surface1 dark:bg-ctp-surface2 ring-2 ring-ctp-surface1 dark:ring-ctp-surface2 shadow-lg
              ${isMobile ? "w-8 h-8" : "w-12 h-12"}
            `}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <img
              src={notification.avatar}
              alt={notification.title || "Notification"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>
        )}

        <div className="flex-1 min-w-0">
          {notification.title && (
            <motion.h3
              className={`font-bold text-ctp-text dark:text-ctp-text leading-tight
                ${isMobile ? "text-sm mb-1" : "text-base mb-2"}
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {notification.title}
            </motion.h3>
          )}

          {notification.message && (
            <motion.p
              className={`text-ctp-subtext1 dark:text-ctp-subtext1 leading-relaxed
                ${isMobile ? "text-xs" : "text-sm"}
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {notification.message}
            </motion.p>
          )}

          {notification.date && (
            <motion.div
              className={`text-ctp-subtext0 dark:text-ctp-subtext0
                ${isMobile ? "text-xs mt-2" : "text-xs mt-3"}
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              {formatTime(notification.date)}
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-ctp-pink via-ctp-mauve to-ctp-blue rounded-b-2xl shadow-inner"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{
          duration: (notification.duration || 5000) / 1000,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}
