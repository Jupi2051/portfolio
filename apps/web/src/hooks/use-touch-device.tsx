import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current device is in touch mode
 * @returns boolean indicating if the device is currently in touch mode
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check if this is currently a touch device by detecting input mode
    const checkTouchDevice = () => {
      // Check for coarse pointer (touch) vs fine pointer (mouse)
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

      // Check if hover is not supported (indicates touch mode)
      const hasNoHover = window.matchMedia("(hover: none)").matches;

      // Check if any-hover is not supported (indicates touch mode)
      const hasNoAnyHover = window.matchMedia("(any-hover: none)").matches;

      // Device is in touch mode if:
      // 1. Pointer is coarse (touch), OR
      // 2. Hover is not supported (touch device), OR
      // 3. Any-hover is not supported (touch device)
      const isCurrentlyTouch = hasCoarsePointer || hasNoHover || hasNoAnyHover;

      setIsTouchDevice(isCurrentlyTouch);
    };

    // Check immediately
    checkTouchDevice();

    // Create media query listeners for dynamic detection
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const hoverQuery = window.matchMedia("(hover: none)");
    const anyHoverQuery = window.matchMedia("(any-hover: none)");

    const handleMediaChange = () => {
      checkTouchDevice();
    };

    // Listen for changes in pointer type and hover capability
    coarsePointerQuery.addEventListener("change", handleMediaChange);
    hoverQuery.addEventListener("change", handleMediaChange);
    anyHoverQuery.addEventListener("change", handleMediaChange);

    // Also listen for orientation changes and resize events
    window.addEventListener("orientationchange", handleMediaChange);
    window.addEventListener("resize", handleMediaChange);

    // Cleanup
    return () => {
      coarsePointerQuery.removeEventListener("change", handleMediaChange);
      hoverQuery.removeEventListener("change", handleMediaChange);
      anyHoverQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("orientationchange", handleMediaChange);
      window.removeEventListener("resize", handleMediaChange);
    };
  }, []);

  return isTouchDevice;
}
