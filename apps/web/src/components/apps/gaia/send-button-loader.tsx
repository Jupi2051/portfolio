import { motion } from "framer-motion";

/** Three staggered dots — fixed visual weight so the send slot doesn’t jump */
export default function SendButtonLoader() {
  return (
    <span className="flex items-center justify-center gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-ctp-crust shadow-sm"
          animate={{
            y: [0, -3, 0],
            scale: [1, 1.15, 1],
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 0.55,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.14,
          }}
        />
      ))}
    </span>
  );
}
