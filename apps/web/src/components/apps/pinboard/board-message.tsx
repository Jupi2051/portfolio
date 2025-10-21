import cn from "classnames";
interface Props {
  name: string;
  content: string;
  top: number;
  left: number;
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
}

function BoardMessage({
  name,
  content,
  top,
  left,
  color = "blue",
  isPending = false,
  isMoving = false,
}: Props) {
  return (
    <div
      className={cn(
        `absolute top-[${top}px] left-[${left}px] cursor-auto z-20`,
        {
          "animate-pulse pointer-events-none blur-[1px]": isPending,
          "animate-pulse shadow-2xl shadow-ctp-mauve/50 pointer-events-none":
            isMoving,
        }
      )}
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
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
}

export default BoardMessage;
