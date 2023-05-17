import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
import { useEffect } from "react";
import "../../Styles/Apps/AppDescrpition.css";
import Stack, { StackTool } from "../Stack";
import Chloe from "../Chloe";

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1, scale: 1}
}

function Jenni(Props: PropTypes)
{
    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" className="main-app-container">
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <div style={{width: "100%", height: "100%", border: "none", overflowY: "scroll"}} className="showcase-app-main-container">
                    <div>
                        <h1 className="showcase-app-header-title text-align-left">Where as a common understanding and freedoms</h1>
                        <Stack StackTools={[StackTool.HTML, StackTool.CSS, StackTool.JS, StackTool.Express, StackTool.Discord, StackTool.NodeJS, StackTool.Ubuntu, StackTool.Nginx, StackTool.JSON]} />
                    </div>

                </div>
            </AppWindow>
        </motion.div>
    )
}

export default Jenni;