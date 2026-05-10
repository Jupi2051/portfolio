import { useLayoutEffect, useRef } from "react"
import { addAppCloseListener } from "@/lib/app-close-bus"

/**
 * Subscribe to the `appclose` event for this app instance.
 * The handler should call `preventDefault` on the event to cancel closing.
 */
export const useAppCloseListener = (
  appId: number,
  handler: (event: Event) => void,
): void => {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useLayoutEffect(() => {
    return addAppCloseListener(appId, (event) => {
      handlerRef.current(event)
    })
  }, [appId])
}
