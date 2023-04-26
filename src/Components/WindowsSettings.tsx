import { motion } from "framer-motion";
import "../Styles/WindowsSettings.css";

const AnimationVariants = {
    hidden: {
        y: 200,
        x: "-50%"
    },
    visible: {
        y: -60,
        x: "-50%"
    },
    exit: {
        y: 200,
        x: "-50%"
    }
}

function WindowsSettings()
{
    return <motion.div className="windows-settings-container" variants={AnimationVariants} initial="hidden" animate="visible" exit="exit">
        <h1>asfoasfka</h1>
        <h2>asfasosfkasofkaos</h2>
    </motion.div>
}

export default WindowsSettings;