import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current device supports touch interactions
 * @returns boolean indicating if the device is a touch device
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check if this is a touch device by looking for touch support
    const checkTouchDevice = () => {
      const hasTouchSupport =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // Additional check for older browsers
        ((window as any).DocumentTouch &&
          document instanceof (window as any).DocumentTouch);

      setIsTouchDevice(hasTouchSupport);
    };

    // Check immediately
    checkTouchDevice();

    // Listen for orientation changes which might affect touch detection
    const handleOrientationChange = () => {
      checkTouchDevice();
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return isTouchDevice;
}
