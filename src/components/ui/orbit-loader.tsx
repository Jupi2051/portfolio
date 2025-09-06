import cn from "classnames";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

interface OrbitLoaderProps {
  size?: string;
  pulseColors?: [string, string, string];
  orbitColor?: string;
  dashedColor?: string;
  failedColor?: string;
  failed?: boolean;
  className?: string;
  moonClassName?: string;
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
  moonClassName,
}: OrbitLoaderProps) => {
  return (
    <motion.div
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
      animate={{
        scale: failed ? [1, 1.1, 1] : 1,
        rotate: failed ? [0, 180, 360] : 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        times: failed ? [0, 0.5, 1] : undefined,
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

      {/* Final pulse animation when switching to failed state */}
      <AnimatePresence>
        {failed && (
          <motion.div
            className="absolute inset-0 border-2 rounded-full"
            style={{ borderColor: failedColor }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {failed ? (
          /* Failed state: Show X at bottom center */
          <motion.div
            key="failed"
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 text-2xl"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <FontAwesomeIcon icon={faXmark} style={{ color: failedColor }} />
          </motion.div>
        ) : (
          /* Normal state: Show orbiting circle */
          <motion.div
            key="normal"
            className="aspect-square w-[70.7%] max-w-full absolute top-1/2 left-1/2 -translate-1/2"
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 360,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { duration: 0.3 },
              opacity: { duration: 0.3 },
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <div
              className={cn(
                "aspect-square w-[30%] rounded-full absolute top-0 left-0 -translate-1/2",
                moonClassName
              )}
              style={{ backgroundColor: orbitColor }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrbitLoader;
