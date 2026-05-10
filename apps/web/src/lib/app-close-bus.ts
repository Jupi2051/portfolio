/** Event type dispatched on an app window before it is torn down (Redux close). */
export const APP_CLOSE_EVENT = "appclose" as const

const targets = new Map<number, EventTarget>()

function ensureTarget(appId: number): EventTarget {
  let t = targets.get(appId)
  if (!t) {
    t = new EventTarget()
    targets.set(appId, t)
  }
  return t
}

/**
 * Remove the bus for an app (call when the window unmounts so ids cannot leak).
 */
export function disposeAppCloseTarget(appId: number): void {
  targets.delete(appId)
}

/**
 * Subscribe to app close attempts. Returns an unsubscribe function.
 * Listeners receive a cancelable DOM {@link Event}; call {@link Event.preventDefault}
 * to keep the window open.
 */
export function addAppCloseListener(
  appId: number,
  listener: (event: Event) => void,
): () => void {
  const target = ensureTarget(appId)
  target.addEventListener(APP_CLOSE_EVENT, listener)
  return () => target.removeEventListener(APP_CLOSE_EVENT, listener)
}

/**
 * Run all `appclose` listeners. Returns `false` if any listener called
 * {@link Event.preventDefault} (close should be aborted).
 */
export function tryDispatchAppClose(appId: number): boolean {
  const target = targets.get(appId)
  if (!target) return true
  const event = new Event(APP_CLOSE_EVENT, { cancelable: true })
  return target.dispatchEvent(event)
}
