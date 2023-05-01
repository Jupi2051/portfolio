import { motion } from "framer-motion";
import { useState } from "react";

type PropTypes = {
    Name: string,
    Icon: string
}

const TextAnimationsVariants = {
    init: {width: 'auto',},
    visible: {width: 'auto',},
    hidden: {width: '0px',}
}

const ContainerAnimationsVariants = {
    init: {gap: "var(--gap-value)",},
    visible: {gap: "var(--gap-value)",},
    hidden: {gap: '0px',}
}

function Tool(Props: PropTypes)
{
    const [isCollapsed, setCollapsed] = useState(false);

    function onClickTool()
    {
        setCollapsed(!isCollapsed);
    }

    return <motion.div className="tool-container" onClick={onClickTool}  variants={ContainerAnimationsVariants} initial="init" animate={isCollapsed? "hidden" : "visible"}>
        <img src={`/Imgs/Icons/${Props.Icon}`} />
        <motion.h1 variants={TextAnimationsVariants} initial="init" animate={isCollapsed? "hidden" : "visible"}>{Props.Name}</motion.h1>
    </motion.div>
}

export default Tool;