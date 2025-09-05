import cn from "classnames";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OrbitLoaderProps {
  size?: string;
  pulseColors?: [string, string, string];
  orbitColor?: string;
  dashedColor?: string;
  failedColor?: string;
  failed?: boolean;
  className?: string;
}

const OrbitLoader = ({
  size = "w-32",
  pulseColors = [
    "rgba(255,255,255,0.4)",
    "rgba(255,255,255,0.2)",
    "rgba(255,255,255,0.1)",
  ],
  orbitColor = "white",
  dashedColor = "white",
  failedColor = "#a86170",
  failed = false,
  className = "m-10",
}: OrbitLoaderProps) => {
  return (
    <div
      className={cn(
        "aspect-square overflow-visible rounded-full relative border-2 border-dashed",
        size,
        className,
        {
          "border-solid border-4": failed,
        }
      )}
      style={{
        borderColor: failed ? failedColor : dashedColor,
      }}
    >
      {/* Pulsating rings emanating from the main circle - only show when not failed */}
      {!failed && (
        <>
          <div
            className="absolute inset-0 border-2 rounded-full animate-ping"
            style={{ borderColor: pulseColors[0] }}
          />
          <div
            className="absolute inset-0 border-2 rounded-full animate-ping"
            style={{
              borderColor: pulseColors[1],
              animationDelay: "0.5s",
            }}
          />
          <div
            className="absolute inset-0 border-2 rounded-full animate-ping"
            style={{
              borderColor: pulseColors[2],
              animationDelay: "1s",
            }}
          />
        </>
      )}

      {failed ? (
        /* Failed state: Show X at bottom center */
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 text-2xl">
          <FontAwesomeIcon icon={faXmark} style={{ color: failedColor }} />
        </div>
      ) : (
        /* Normal state: Show orbiting circle */
        <div className="aspect-square w-[70.7%] max-w-full absolute top-1/2 left-1/2 -translate-1/2 animate-spin">
          <div
            className="aspect-square w-[30%] rounded-full absolute top-0 left-0 -translate-1/2"
            style={{ backgroundColor: orbitColor }}
          />
        </div>
      )}
    </div>
  );
};

export default OrbitLoader;
