import ScrollContainer from "react-indiana-drag-scroll";

const Board = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ScrollContainer
      className="h-full w-full overflow-auto relative cursor-grab active:cursor-grabbing"
      style={{
        contain: "layout style paint",
        isolation: "isolate",
      }}
      stopPropagation={true}
      hideScrollbars={true}
      ignoreElements="*[data-prevent-drag-scroll]"
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
  );
};

export default Board;
