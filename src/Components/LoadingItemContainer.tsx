import { CSSProperties } from "react";
import cn from "classnames";

type LoadingItemProps = {
  style?: CSSProperties;
  className?: string;
  width?: string;
  height?: string;
};

function LoadingItemContainer(props: LoadingItemProps) {
  return (
    <div
      className={cn(
        `bg-gray-700 border-2 border-solid border-gray-600 overflow-hidden relative rounded-lg max-w-full animate-pulse`,
        props.className
      )}
      style={{ width: props.width, height: props.height, ...props.style }}
    ></div>
  );
}

export default LoadingItemContainer;
