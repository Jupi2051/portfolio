import { useEffect, useState } from "react";

type MousePosition = { x: number | null; y: number | null };

/**
 * One shared window listener records the latest cursor position without
 * touching React. Components only subscribe (and re-render per mousemove)
 * while `enabled` is true — e.g. during a drag — instead of every open
 * window re-rendering on every mouse move all the time.
 */
let lastPosition: MousePosition = { x: null, y: null };
const subscribers = new Set<(position: MousePosition) => void>();

if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (ev: MouseEvent) => {
      lastPosition = { x: ev.clientX, y: ev.clientY };
      subscribers.forEach((notify) => notify(lastPosition));
    },
    { passive: true },
  );
}

function useMousePosition(enabled = true): MousePosition {
  // State is only a re-render trigger; the value returned is always the live
  // position, so the first render after `enabled` flips is never stale.
  const [, setTick] = useState<MousePosition>(lastPosition);

  useEffect(() => {
    if (!enabled) return;
    subscribers.add(setTick);
    return () => {
      subscribers.delete(setTick);
    };
  }, [enabled]);

  return lastPosition;
}

export default useMousePosition;
