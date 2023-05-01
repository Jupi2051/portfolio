import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
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

function Oni(Props: PropTypes)
{
    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <Stack StackTools={[StackTool.HTML, StackTool.CSS, StackTool.JS, StackTool.Express, StackTool.Bootstrap, StackTool.Discord, StackTool.Ubuntu, StackTool.Nginx]} />
                <iframe src="https://www.oniverse.xyz/" style={{width: "100%", height: "100%", border: "none"}}></iframe>
            </AppWindow>
        </motion.div>
    )
}

export default Oni;