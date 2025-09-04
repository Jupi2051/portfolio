import "./solar-system.css";
import Julogo from "@/components/apps/about-me/jupi-logo";
import { Variants, motion } from "framer-motion";

const ParentAnimations: Variants = {
  viewed: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5,
    },
  },
};

const ChildrenAnimations: Variants = {
  invisible: { scale: 0, opacity: 0 },
  viewed: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

const planetsPopUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 2.8, duration: 1 } },
};

const planetsVisual: Variants = {
  hidden: { opacity: 1, filter: "blur(100px)" },
  visible: {
    opacity: 1,
    filter: "blur(10px)",
    transition: { delay: 2.8, duration: 1.5 },
  },
};

function SolarSystem() {
  return (
    <div className="solar-container">
      <div className="solar-moon io-moon">
        <div className="solar-moon-container">
          <motion.div
            variants={planetsVisual}
            initial="hidden"
            animate="visible"
            className="planet-glow"
          ></motion.div>
          <motion.img
            variants={planetsPopUp}
            initial="hidden"
            animate="visible"
            className="moon-image"
            src="/Imgs/Apps/Solar/Io.webp"
          />
        </div>
      </div>
      <div className="solar-moon europa-moon">
        <div className="solar-moon-container">
          <motion.div
            variants={planetsVisual}
            initial="hidden"
            animate="visible"
            className="planet-glow"
          ></motion.div>
          <motion.img
            variants={planetsPopUp}
            initial="hidden"
            animate="visible"
            className="moon-image"
            src="/Imgs/Apps/Solar/Europa.webp"
          />
        </div>
      </div>
      <div className="solar-moon gany-moom">
        <div className="solar-moon-container">
          <motion.div
            variants={planetsVisual}
            initial="hidden"
            animate="visible"
            className="planet-glow"
          ></motion.div>
          <motion.img
            variants={planetsPopUp}
            initial="hidden"
            animate="visible"
            className="moon-image"
            src="/Imgs/Apps/Solar/Gany.webp"
          />
        </div>
      </div>
      <div className="solar-moon callisto-moon">
        <div className="solar-moon-container">
          <motion.div
            variants={planetsVisual}
            initial="hidden"
            animate="visible"
            className="planet-glow"
          ></motion.div>
          <motion.img
            variants={planetsPopUp}
            initial="hidden"
            animate="visible"
            className="moon-image"
            src="/Imgs/Apps/Solar/Callisto.webp"
          />
        </div>
      </div>
      <div className="jupiter">
        <Julogo className="jupiter-logo" Size={210} />
      </div>
      <motion.div
        className="orbits-container"
        variants={ParentAnimations}
        initial="invisible"
        animate="viewed"
      >
        <motion.div
          className="orbit-outline"
          variants={ChildrenAnimations}
          key={"orbit-1"}
        ></motion.div>
        <motion.div
          className="orbit-outline"
          variants={ChildrenAnimations}
          key={"orbit-2"}
        ></motion.div>
        <motion.div
          className="orbit-outline"
          variants={ChildrenAnimations}
          key={"orbit-3"}
        ></motion.div>
        <motion.div
          className="orbit-outline"
          variants={ChildrenAnimations}
          key={"orbit-4"}
        ></motion.div>
      </motion.div>
    </div>
  );
}

export default SolarSystem;
