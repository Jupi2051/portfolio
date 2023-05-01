import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
import { useEffect } from "react";
import "../../Styles/Apps/AppDescrpition.css";
import Stack, { StackTool } from "../Stack";

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
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <div style={{width: "100%", height: "100%", border: "none"}} className="showcase-app-main-container">
                    <div>
                        <h1 className="showcase-app-header-title text-align-left">Jenni</h1>
                        <Stack StackTools={[StackTool.HTML, StackTool.CSS, StackTool.JS, StackTool.Express, StackTool.Discord, StackTool.Ubuntu, StackTool.Nginx]} />
                        <p className="showcase-app-paragraph">This project was a fully functional website that i built for a digital artist.</p>
                    </div>
                    <iframe src="https://www.jennixdraws.com/" style={{width: "100%", height: "100%", border: "none"}}></iframe>                    
                </div>
            </AppWindow>
        </motion.div>
    )
}

export default Jenni;