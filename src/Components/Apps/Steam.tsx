import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
import { useEffect } from "react";

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1, scale: 1}
}

function Steam(Props: PropTypes)
{
    useEffect(() => {
        const SteamPage = fetch("https://steamcommunity.com/id/iJup/", 
        {
            mode: "no-cors",
        }).then((response) => {
            console.log(response);
        })
    }, []);

    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                    <div>
                        
                    </div>
            </AppWindow>
        </motion.div>
    )
}

export default Steam;