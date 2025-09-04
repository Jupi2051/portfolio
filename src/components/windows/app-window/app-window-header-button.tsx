import cn from "classnames";

const AppWindowHeaderButton = ({
  children,
  onClick,
  className,
  type,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "normal" | "danger";
}) => {
  return (
    <span
      className={cn(
        "px-4 py-5 text-center flex items-center cursor-default bg-transparent transition-all duration-200 ease-in-out border-white h-full select-none",
        {
          "hover:bg-white/10 hover:active:bg-white/20 hover:active:transition-none":
            type === "normal",
          "hover:bg-red-700 hover:active:bg-red-800": type === "danger",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default AppWindowHeaderButton;
