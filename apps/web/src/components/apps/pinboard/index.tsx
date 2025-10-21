import { useState, useRef } from "react";
import Board from "./board";
import BoardMessage from "./board-message";
import PinForm from "./pin-form";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

interface PendingMessage {
  name: string;
  message: string;
  color: string;
}

function Pinboard() {
  const trpc = useTRPC();
  const { data: pinnedMessages = [], refetch: refetchPinnedMessages } =
    useQuery(trpc.pinboard.getPinnedMessageList.queryOptions());
  const createPinnedMessage = useMutation(
    trpc.pinboard.createPinnedMessage.mutationOptions()
  );
  const [pendingMessage, setPendingMessage] = useState<PendingMessage | null>(
    null
  );
  const boardRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (data: {
    name: string;
    message: string;
    color: string;
  }) => {
    setPendingMessage(data);
  };

  const handleFormCancel = () => {
    setPendingMessage(null);
  };

  const handleBoardClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (!pendingMessage || !boardRef.current) return;

    const scrollContainer = boardRef.current.querySelector(
      ".react-indiana-drag-scroll"
    );

    if (!scrollContainer) return;

    const scrollRect = scrollContainer.getBoundingClientRect();
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollTop = scrollContainer.scrollTop;

    // Calculate position relative to scroll container + scroll offset
    const positionX = event.clientX - scrollRect.left + scrollLeft;
    const positionY = event.clientY - scrollRect.top + scrollTop;

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
          setPendingMessage(null);
          refetchPinnedMessages();
        },
        onError: console.error,
      }
    );
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Board ref={boardRef} onClick={handleBoardClick}>
        {pinnedMessages.map((message) => (
          <BoardMessage
            key={message.id}
            name={message.author}
            content={message.content}
            color={message.color as any}
            top={message.positionY}
            left={message.positionX}
          />
        ))}

        {/* Pending message that follows cursor */}
        {pendingMessage && (
          <BoardMessage
            name={pendingMessage.name}
            content={pendingMessage.message}
            color={pendingMessage.color as any}
            isMoving={
              !createPinnedMessage.isPending && !createPinnedMessage.isError
            }
            isPending={createPinnedMessage.isPending}
            boardRef={boardRef}
          />
        )}
      </Board>
      <PinForm
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        type={pendingMessage ? "edit" : "create"}
      />
    </div>
  );
}

export default Pinboard;
