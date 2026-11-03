import { motion } from "framer-motion";
import cn from "classnames";
import { CloseIcon } from "@/components/ui/icons";
import { EASE_OUT } from "@/lib/motion";
import { useState, useEffect } from "react";
import { NotificationItem } from "./types";

const TYPE_ACCENT: Record<string, string> = {
  success: "bg-mint",
  error: "bg-melon",
  warning: "bg-spark",
  info: "bg-holo",
};

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

  const typeAccent = TYPE_ACCENT[notification.type ?? ""] ?? "bg-holo"

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const offscreen = isMobile ? { x: 0, y: -16 } : { x: 24, y: 0 }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97, ...offscreen }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1, x: 0, y: 0 }
          : { opacity: 0, scale: 0.97, ...offscreen }
      }
      exit={{ opacity: 0, scale: 0.97, ...offscreen }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className={cn(
        "pointer-events-auto relative mx-auto w-full cursor-pointer touch-manipulation overflow-hidden rounded-2xl border border-white/12 bg-ink/72 backdrop-blur-xl select-none",
        "shadow-[0_16px_40px_rgba(6,5,16,0.45)] transition-[border-color] duration-150 ease-out-strong hover:border-white/20",
        isMobile ? "mb-2 max-w-xs p-3" : "mb-3 max-w-sm p-4",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleDismiss}
      style={{ zIndex: 1000 - index }}
    >
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-lg text-haze transition-colors duration-150 ease-out-strong hover:bg-melon hover:text-white active:scale-[0.94]"
        onClick={(e) => {
          e.stopPropagation()
          handleDismiss()
        }}
      >
        <CloseIcon className="size-3" />
      </button>

      <div className={cn("flex items-start gap-3", isMobile ? "pr-7" : "pr-8")}>
        {notification.avatar ? (
          <div
            className={cn(
              "shrink-0 overflow-hidden rounded-xl border border-white/14 bg-panel",
              isMobile ? "size-8" : "size-11",
            )}
          >
            <img
              src={notification.avatar}
              alt=""
              className="size-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
        ) : (
          <span
            className={cn("mt-1.5 size-2 shrink-0 rounded-full", typeAccent)}
          />
        )}

        <div className="min-w-0 flex-1">
          {notification.title && (
            <h3
              className={cn(
                "leading-tight font-semibold text-moon",
                isMobile ? "mb-0.5 text-sm" : "mb-1 text-sm",
              )}
            >
              {notification.title}
            </h3>
          )}
          {notification.message && (
            <p
              className={cn(
                "leading-relaxed text-haze",
                isMobile ? "text-xs" : "text-[13px]",
              )}
            >
              {notification.message}
            </p>
          )}
          {notification.date && (
            <div className="mt-2 text-xs text-haze-dim">
              {formatTime(notification.date)}
            </div>
          )}
        </div>
      </div>

      <motion.div
        className={cn("absolute bottom-0 left-0 h-0.5 w-full origin-left", typeAccent)}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          duration: (notification.duration || 5000) / 1000,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}
