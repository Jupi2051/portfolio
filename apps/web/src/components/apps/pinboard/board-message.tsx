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
    | "gray"
    | "purple";
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
          "backdrop-blur-sm p-8 shadow-2xl max-w-sm border-4 relative transform hover:scale-105 transition-all duration-300 rounded-tl-3xl rounded-tr-xl rounded-bl-xl rounded-br-3xl",
          {
            "bg-gradient-to-br from-blue-50/95 to-blue-100/90 border-blue-300 shadow-blue-200/50":
              color === "blue",
            "bg-gradient-to-br from-white/95 to-gray-50/90 border-gray-300 shadow-gray-200/50":
              color === "white",
            "bg-gradient-to-br from-gray-800/95 to-gray-900/90 border-gray-600 shadow-gray-800/50":
              color === "black",
            "bg-gradient-to-br from-green-50/95 to-green-100/90 border-green-300 shadow-green-200/50":
              color === "green",
            "bg-gradient-to-br from-red-50/95 to-red-100/90 border-red-300 shadow-red-200/50":
              color === "red",
            "bg-gradient-to-br from-pink-50/95 to-pink-100/90 border-pink-300 shadow-pink-200/50":
              color === "pink",
            "bg-gradient-to-br from-yellow-50/95 to-yellow-100/90 border-yellow-300 shadow-yellow-200/50":
              color === "yellow",
            "bg-gradient-to-br from-gray-50/95 to-gray-100/90 border-gray-300 shadow-gray-200/50":
              color === "gray",
            "bg-gradient-to-br from-ctp-mauve/20 to-ctp-mauve/30 border-ctp-mauve/40 shadow-ctp-mauve/30":
              color === "purple",
          }
        )}
      >
        {/* Elegant typography quote marks */}
        <div className="absolute top-2 left-3">
          <span
            className={cn(
              "text-4xl font-capirola font-light italic leading-none",
              {
                "text-blue-400/70": color === "blue",
                "text-gray-500/70": color === "white" || color === "gray",
                "text-gray-300/70": color === "black",
                "text-green-400/70": color === "green",
                "text-red-400/70": color === "red",
                "text-pink-400/70": color === "pink",
                "text-yellow-400/70": color === "yellow",
                "text-ctp-mauve/80": color === "purple",
              }
            )}
          >
            "
          </span>
        </div>

        {/* Quote content */}
        <blockquote className="relative">
          <p
            className={cn(
              "text-xl font-indie-flower leading-loose mb-6 italic tracking-wide",
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
                "text-ctp-text": color === "purple",
              }
            )}
          >
            {content}
          </p>

          {/* Author attribution with cute underline */}
          <footer className="flex items-center justify-end relative">
            <div className="flex items-center space-x-2">
              {/* Cute heart decoration */}
              <div
                className={cn("w-2 h-2 transform rotate-45", {
                  "bg-blue-400": color === "blue",
                  "bg-gray-400": color === "white" || color === "gray",
                  "bg-gray-300": color === "black",
                  "bg-green-400": color === "green",
                  "bg-red-400": color === "red",
                  "bg-pink-400": color === "pink",
                  "bg-yellow-400": color === "yellow",
                  "bg-ctp-mauve": color === "purple",
                })}
              ></div>
              <cite
                className={cn(
                  "text-base font-caveat not-italic font-semibold",
                  {
                    "text-gray-700":
                      color === "white" ||
                      color === "gray" ||
                      color === "blue" ||
                      color === "green" ||
                      color === "red" ||
                      color === "pink" ||
                      color === "yellow",
                    "text-gray-200": color === "black",
                    "text-ctp-subtext1": color === "purple",
                  }
                )}
              >
                {name}
              </cite>
            </div>
          </footer>
        </blockquote>

        {/* Closing elegant typography quote mark */}
        <div className="absolute bottom-2 right-3">
          <span
            className={cn(
              "text-4xl font-capirola font-light italic leading-none",
              {
                "text-blue-400/70": color === "blue",
                "text-gray-500/70": color === "white" || color === "gray",
                "text-gray-300/70": color === "black",
                "text-green-400/70": color === "green",
                "text-red-400/70": color === "red",
                "text-pink-400/70": color === "pink",
                "text-yellow-400/70": color === "yellow",
                "text-ctp-mauve/80": color === "purple",
              }
            )}
          >
            "
          </span>
        </div>
      </div>
    </div>
  );
}

export default BoardMessage;
