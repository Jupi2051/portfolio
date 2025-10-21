import ScrollContainer from "react-indiana-drag-scroll";
import { forwardRef } from "react";

const Board = forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  }
>(({ children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      data-board-container={true}
      className="relative w-full h-full"
    >
      <ScrollContainer
        className="react-indiana-drag-scroll h-full w-full overflow-auto relative cursor-grab active:cursor-grabbing"
        style={{
          contain: "layout style paint",
          isolation: "isolate",
        }}
        hideScrollbars={true}
        ignoreElements="*[data-prevent-drag-scroll]"
        onClick={onClick}
      >
        <div
          className="absolute bg-repeat bg-left-top top-0 left-0"
          style={{
            backgroundImage: "url(/Imgs/Apps/Backgrounds/pinboard-texture.jpg)",
            backgroundSize: "auto",
            width: "4000px",
            height: "2000px",
          }}
        />

        <div
          className="relative w-[4000px] h-[2000px] min-w-[4000px] min-h-[2000px]"
          style={{
            backgroundImage: "url(/Imgs/Apps/Backgrounds/pinboard-texture.jpg)",
            backgroundRepeat: "repeat",
            backgroundPosition: "left top",
            backgroundSize: "auto",
          }}
        >
          {children}
        </div>
      </ScrollContainer>
    </div>
  );
});

Board.displayName = "Board";

export default Board;
