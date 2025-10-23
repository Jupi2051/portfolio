export interface NotificationData {
  title?: string;
  message?: string;
  avatar?: string;
  type?: "window" | "success" | "error" | "warning" | "info";
  date?: string;
  duration?: number; // Auto-dismiss duration in milliseconds
  id?: string; // Unique identifier for the notification
}

export interface NotificationItem extends NotificationData {
  id: string;
  timestamp: number;
}
