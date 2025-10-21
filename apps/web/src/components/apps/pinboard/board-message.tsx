import cn from "classnames";
import { useState, useEffect, useRef } from "react";
import useMousePosition from "@/hooks/use-mouse-position";

interface Props {
  name: string;
  content: string;
  top?: number;
  left?: number;
  color?:
    | "white"
    | "black"
    | "blue"
    | "green"
    | "red"
    | "pink"
    | "yellow"
    | "gray";
  isPending?: boolean;
  isMoving?: boolean;
  sticky?: boolean;
  boardRef?: React.RefObject<HTMLDivElement>;
}

function BoardMessage({
  name,
  content,
  top,
  left,
  color = "blue",
  isPending = false,
  isMoving = false,
  boardRef,
}: Props) {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const boardRefCurrent = boardRef?.current;
  const mainDivRefCurrent = mainDivRef.current;
  const mousePosition = useMousePosition();

  useEffect(() => {
    if (
      !isMoving ||
      !boardRefCurrent ||
      !mainDivRefCurrent ||
      !mousePosition.x ||
      !mousePosition.y
    )
      return;

    const scrollRect = boardRefCurrent.getBoundingClientRect();
    const scrollLeft = boardRefCurrent.scrollLeft;
    const scrollTop = boardRefCurrent.scrollTop;

    // Calculate position relative to scroll container + scroll offset
    const positionX = mousePosition.x - scrollRect.left + scrollLeft;
    const positionY = mousePosition.y - scrollRect.top + scrollTop;

    mainDivRefCurrent.style.top = `${positionY}px`;
    mainDivRefCurrent.style.left = `${positionX}px`;
  }, [
    isMoving,
    boardRefCurrent,
    mainDivRefCurrent,
    mousePosition.x,
    mousePosition.y,
  ]);

  return (
    <div
      ref={mainDivRef}
      className={cn(
        `absolute top-[${top ?? 0}px] left-[${left ?? 0}px] cursor-auto z-20`,
        {
          "animate-pulse pointer-events-none blur-[1px]": isPending,
          "shadow-2xl shadow-ctp-mauve/50 pointer-events-none": isMoving,
        }
      )}
      style={{
        ...(top && !isMoving && { top: `${top}px` }),
        ...(left && !isMoving && { left: `${left}px` }),
      }}
      data-prevent-drag-scroll={true}
    >
      <div
        className={cn("backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs", {
          "bg-blue-100/80": color === "blue",
          "bg-white/80": color === "white",
          "bg-black/80": color === "black",
          "bg-green-100/80": color === "green",
          "bg-red-100/80": color === "red",
          "bg-pink-100/80": color === "pink",
          "bg-yellow-100/80": color === "yellow",
          "bg-gray-100/80": color === "gray",
        })}
      >
        <h2
          className={cn("text-xl font-bold mb-2 text-white", {
            "text-black": color === "white" || color === "gray",
            "text-white": color === "black",
          })}
        >
          {name}
        </h2>
        <p
          className={cn("text-gray-700", {
            "text-black": color === "white" || color === "gray",
            "text-white": color === "black",
          })}
        >
          {content}
        </p>
      </div>
    </div>
  );
}

export default BoardMessage;
