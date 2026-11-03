import { useState, useRef } from "react"
import Board from "./board"
import BoardMessage from "./board-message"
import PinForm from "./pin-form"
import { useTRPC } from "@/lib/trpc/trpc"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { useEventListener } from "usehooks-ts"
import { MoveIcon } from "@/components/ui/icons"
import { enterTransition, exitTransition } from "@/lib/motion"
import type { NoteColor } from "./note-colors"

interface PendingMessage {
  name: string
  message: string
  color: NoteColor
}

function Pinboard() {
  const trpc = useTRPC()
  const { data: pinnedMessages = [], refetch: refetchPinnedMessages } =
    useQuery(trpc.pinboard.getPinnedMessageList.queryOptions())
  const createPinnedMessage = useMutation(
    trpc.pinboard.createPinnedMessage.mutationOptions(),
  )
  const [pendingMessage, setPendingMessage] = useState<PendingMessage | null>(
    null,
  )
  const boardRef = useRef<HTMLDivElement>(null)

  const handleFormSubmit = (data: {
    name: string
    message: string
    color: string
  }) => {
    setPendingMessage({
      name: data.name,
      message: data.message,
      color: data.color as NoteColor,
    })
    createPinnedMessage.reset()
  }

  const handleFormCancel = () => {
    setPendingMessage(null)
    createPinnedMessage.reset()
  }

  useEventListener("keydown", (event) => {
    if (event.key === "Escape" && pendingMessage && !createPinnedMessage.isPending)
      handleFormCancel()
  })

  const handleBoardClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (!pendingMessage || !boardRef.current || createPinnedMessage.isPending)
      return

    const scrollContainer = boardRef.current.querySelector(
      ".react-indiana-drag-scroll",
    )

    if (!scrollContainer) return

    const scrollRect = scrollContainer.getBoundingClientRect()
    const scrollLeft = scrollContainer.scrollLeft
    const scrollTop = scrollContainer.scrollTop

    // Calculate position relative to scroll container + scroll offset
    const positionX = event.clientX - scrollRect.left + scrollLeft
    const positionY = event.clientY - scrollRect.top + scrollTop

    // Send TRPC request
    createPinnedMessage.mutate(
      {
        author: pendingMessage.name,
        content: pendingMessage.message,
        color: pendingMessage.color,
        positionX: Math.round(positionX),
        positionY: Math.round(positionY),
      },
      {
        onSuccess: () => {
          setPendingMessage(null)
          refetchPinnedMessages()
        },
        onError: console.error,
      },
    )
  }

  const isPlacing = Boolean(pendingMessage) && !createPinnedMessage.isPending

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-deep select-none">
      <Board ref={boardRef} onClick={handleBoardClick}>
        {pinnedMessages.map((message) => (
          <BoardMessage
            key={message.id}
            seed={message.id}
            name={message.author}
            content={message.content}
            color={message.color as NoteColor}
            top={message.positionY}
            left={message.positionX}
          />
        ))}

        {/* Pending message that follows the cursor */}
        {pendingMessage && (
          <BoardMessage
            name={pendingMessage.name}
            content={pendingMessage.message}
            color={pendingMessage.color}
            isMoving={!createPinnedMessage.isPending && !createPinnedMessage.isError}
            isPending={createPinnedMessage.isPending}
            boardRef={boardRef as React.RefObject<HTMLDivElement>}
          />
        )}
      </Board>

      <div
        className="pointer-events-none absolute top-4 left-4 flex items-center gap-3 rounded-2xl border border-white/12 bg-ink/62 py-2.5 pr-4 pl-3 shadow-[0_12px_30px_rgba(6,5,16,0.4)] backdrop-blur-xl"
      >
        <img src="/Imgs/DesktopApps/Pinboard.webp" alt="" className="size-7.5 object-contain" />
        <div className="flex flex-col gap-px">
          <span className="font-serif text-[22px] leading-6 text-moon-bright italic">
            The pinboard
          </span>
          <span className="text-xs leading-4 text-haze">
            {pinnedMessages.length} {pinnedMessages.length === 1 ? "note" : "notes"} from visitors
          </span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isPlacing || createPinnedMessage.isError ? (
          <motion.div
            key="placing"
            className="pointer-events-none absolute top-4.5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-holo-soft/35 bg-ink/72 py-1.5 pr-2 pl-3.5 shadow-[0_12px_30px_rgba(6,5,16,0.45)] backdrop-blur-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: enterTransition }}
            exit={{ opacity: 0, y: -8, transition: exitTransition }}
          >
            <span
              className={
                createPinnedMessage.isError
                  ? "size-2 rounded-full bg-melon"
                  : "size-2 rounded-full bg-holo shadow-[0_0_8px_rgba(140,142,255,0.9)]"
              }
            />
            <span className="text-[13px] leading-4 font-medium whitespace-nowrap text-moon">
              {createPinnedMessage.isError
                ? "Couldn't pin that — click to try again"
                : "Click anywhere to pin your note"}
            </span>
            <span className="flex h-6.5 items-center gap-1.5 rounded-full bg-white/8 px-2.25 text-xs text-haze">
              <span className="font-mono text-[11px]">Esc</span>
              to cancel
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!pendingMessage && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden h-8 -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-ink/55 px-3 backdrop-blur-lg @xl/appwindow:flex">
          <MoveIcon className="size-3.5 text-haze" />
          <span className="text-xs whitespace-nowrap text-lilac">Drag to look around</span>
        </div>
      )}

      <PinForm
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        type={pendingMessage ? "edit" : "create"}
      />
    </div>
  )
}

export default Pinboard
