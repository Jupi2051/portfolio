import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
import "../../Styles/Apps/Photos.css";

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string,
    processData: Object
};

const exitAndOpen = {
    exit: {opacity: 0},
    init: {opacity: 1, scale: 1}
}

function Photos(Props: PropTypes)
{
    const PassedData = Props.processData as any;
    
    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" className="main-app-container">
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <div className="main-container">
                    <img src={PassedData.openedImage} />
                </div>
            </AppWindow>
        </motion.div>
        )
}

export default Photos;