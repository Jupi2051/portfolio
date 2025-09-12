import { motion } from "framer-motion";
import { useState } from "react";

type PropTypes = {
  Name: string;
  Icon: string;
};

const TextAnimationsVariants = {
  init: { width: "auto" },
  visible: { width: "auto" },
  hidden: { width: "0px" },
};

const ContainerAnimationsVariants = {
  init: { gap: "var(--gap-value)" },
  visible: { gap: "var(--gap-value)" },
  hidden: { gap: "0px" },
};

function Tool(Props: PropTypes) {
  const [isCollapsed, setCollapsed] = useState(false);

  function onClickTool() {
    setCollapsed(!isCollapsed);
  }

  return (
    <motion.div
      className="text-2xs flex w-fit pl-0.5 pr-2.5 gap-[var(--gap-value)] items-center justify-center bg-gray-900 overflow-hidden border border-solid border-gray-700 select-none cursor-pointer"
      onClick={onClickTool}
      variants={ContainerAnimationsVariants}
      initial="init"
      animate={isCollapsed ? "hidden" : "visible"}
      style={
        {
          "--gap-value": "5px",
        } as React.CSSProperties
      }
    >
      <img src={`/Imgs/Icons/${Props.Icon}`} className="w-5 h-5" />
      <motion.h1
        variants={TextAnimationsVariants}
        initial="init"
        animate={isCollapsed ? "hidden" : "visible"}
        className="uppercase overflow-hidden text-white whitespace-nowrap font-capirola text-2xs"
      >
        {Props.Name}
      </motion.h1>
    </motion.div>
  );
}

export default Tool;
