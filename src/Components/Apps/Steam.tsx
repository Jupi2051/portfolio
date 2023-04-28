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
    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                    <div>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum fugiat ipsa aut asperiores adipisci aliquam quis. Ad voluptatibus dicta sequi accusantium neque sit quibusdam pariatur, ducimus rem tenetur molestiae illo!</h2>
                    </div>
            </AppWindow>
        </motion.div>
    )
}

export default Steam;