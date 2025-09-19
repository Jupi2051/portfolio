import useMousePosition from "@/hooks/use-mouse-position";
import cn from "classnames";
import { motion } from "framer-motion";

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

function MovingDesktopIcon({ id, Icon, ApplicationName }: PropTypes) {
  const CursorLocation = useMousePosition();

  return (
    <div
      className={cn(
        "absolute pointer-events-none -top-10 -left-12 opacity-60 flex flex-col w-[90px] h-[90px] pb-4 items-center justify-center text-white select-none isolate",
        'after:content-[" "] after:pointer-events-none after:w-full after:h-full after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-transparent after:z-[-1] hover:after:bg-white/15'
      )}
      data-id={id}
      style={{
        transform: `translate(${CursorLocation.x}px, ${CursorLocation.y}px)`,
        filter: "blur(0.3px)",
      }}
    >
      <motion.img
        src={Icon}
        className="pointer-events-none max-h-[50px] max-w-[55px]"
        animate={{
          scale: [1, 1.3, 1.3, 1],
          rotate: [0, -15, 15, -10, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <h1 className="absolute bottom-0 font-normal text-xs mt-1.5 select-none pointer-events-none uppercase text-center font-roboto-condensed">
        {ApplicationName}
      </h1>
    </div>
  );
}

export default MovingDesktopIcon;
