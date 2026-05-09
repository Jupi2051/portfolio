import { motion } from "framer-motion";

export default function ControlsLoadingScreen() {
  return (
    <div style={{ width: "100%", height: "100%", border: "none" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.h1
          className="text-6xl font-bold text-ctp-pink"
          style={{ fontFamily: "Caveat, cursive" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading
        </motion.h1>
      </div>
    </div>
  );
}
