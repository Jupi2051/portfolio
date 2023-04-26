import { motion } from "framer-motion";
import "../Styles/WindowsSettings.css";

export const BottomAnimationVariants = {
    hidden: {
        y: "100vh",
        x: "-50%"
    },
    visible: {
        y: -60,
        x: "-50%"
    },
    exit: {
        y: "100vh",
        x: "-50%"
    }
}

function WindowsSettings()
{
    return <motion.div className="windows-settings-container" variants={BottomAnimationVariants} initial="hidden" animate="visible" exit="exit">
        <h1>Elemen</h1>
        <h2>asfasosfkasofkaos</h2>
    </motion.div>
}
export default WindowsSettings;