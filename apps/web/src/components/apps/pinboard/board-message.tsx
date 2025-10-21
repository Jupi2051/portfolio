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

    const scrollContainer = boardRefCurrent.querySelector(
      ".react-indiana-drag-scroll"
    );

    if (!scrollContainer) return;

    const scrollRect = scrollContainer.getBoundingClientRect();
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollTop = scrollContainer.scrollTop;

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
        className={cn(
          "backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-sm border-2 relative",
          {
            "bg-blue-50/90 border-blue-200": color === "blue",
            "bg-white/90 border-gray-200": color === "white",
            "bg-gray-900/90 border-gray-700": color === "black",
            "bg-green-50/90 border-green-200": color === "green",
            "bg-red-50/90 border-red-200": color === "red",
            "bg-pink-50/90 border-pink-200": color === "pink",
            "bg-yellow-50/90 border-yellow-200": color === "yellow",
            "bg-gray-50/90 border-gray-200": color === "gray",
          }
        )}
      >
        {/* Quote marks */}
        <div className="absolute -top-2 -left-2 w-8 h-8 flex items-center justify-center">
          <span
            className={cn("text-4xl font-caveat font-bold", {
              "text-blue-400": color === "blue",
              "text-gray-400": color === "white" || color === "gray",
              "text-gray-300": color === "black",
              "text-green-400": color === "green",
              "text-red-400": color === "red",
              "text-pink-400": color === "pink",
              "text-yellow-400": color === "yellow",
            })}
          >
            "
          </span>
        </div>

        {/* Quote content */}
        <blockquote className="relative">
          <p
            className={cn(
              "text-lg font-indie-flower leading-relaxed mb-4 italic",
              {
                "text-gray-800":
                  color === "white" ||
                  color === "gray" ||
                  color === "blue" ||
                  color === "green" ||
                  color === "red" ||
                  color === "pink" ||
                  color === "yellow",
                "text-gray-100": color === "black",
              }
            )}
          >
            {content}
          </p>

          {/* Author attribution */}
          <footer className="flex items-center justify-end">
            <cite
              className={cn("text-sm font-caveat not-italic", {
                "text-gray-600":
                  color === "white" ||
                  color === "gray" ||
                  color === "blue" ||
                  color === "green" ||
                  color === "red" ||
                  color === "pink" ||
                  color === "yellow",
                "text-gray-300": color === "black",
              })}
            >
              — {name}
            </cite>
          </footer>
        </blockquote>

        {/* Closing quote mark */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 flex items-center justify-center">
          <span
            className={cn("text-4xl font-caveat font-bold", {
              "text-blue-400": color === "blue",
              "text-gray-400": color === "white" || color === "gray",
              "text-gray-300": color === "black",
              "text-green-400": color === "green",
              "text-red-400": color === "red",
              "text-pink-400": color === "pink",
              "text-yellow-400": color === "yellow",
            })}
          >
            "
          </span>
        </div>
      </div>
    </div>
  );
}

export default BoardMessage;
