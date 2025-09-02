import useMousePosition from "../Hooks/useMousePosition";
import cn from "classnames";

type Point = {
  x: number;
  y: number;
};

type PropTypes = {
  ApplicationName?: string;
  Icon?: string;
  id?: number;
  MouseLocation: Point;
  // ParentElement: HTMLDivElement | null
};

function MovingDesktopIcon(Props: PropTypes) {
  const CursorLocation = useMousePosition();

  return (
    <div
      className={cn(
        "absolute pointer-events-none -top-10 -left-12 opacity-60 flex flex-col w-[100px] h-[100px] pb-4 items-center justify-center text-white select-none isolate",
        'after:content-[" "] after:pointer-events-none after:w-full after:h-full after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-transparent after:z-[-1] hover:after:bg-white/15'
      )}
      data-id={Props.id}
      style={{
        transform: `translate(${CursorLocation.x}px, ${CursorLocation.y}px)`,
        filter: "blur(0.3px)",
      }}
    >
      <img src={Props.Icon} className="w-3/5 pointer-events-none" />
      <h1
        className="absolute bottom-1 font-segoe-ui-light font-thin text-xs mt-1.5 select-none pointer-events-none"
        style={{
          textShadow:
            "-1px -1px 1px #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          filter: "drop-shadow(0px 1px 2px #000)",
        }}
      >
        {Props.ApplicationName}
      </h1>
    </div>
  );
}

export default MovingDesktopIcon;
