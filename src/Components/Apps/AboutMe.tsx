import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
import { useState } from "react";
import Julogo from "./AppsItems/Julogo";

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1, scale: 1}
}

function AboutMe(Props: PropTypes)
{
    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" className="main-app-container">
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <h1>Hi im jupi!</h1>
                and this is still WIP
                <div>
                <Julogo />
                </div>
            </AppWindow>
        </motion.div>
    )
}

export default AboutMe;