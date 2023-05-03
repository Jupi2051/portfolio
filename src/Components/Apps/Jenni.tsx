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
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <div style={{width: "100%", height: "100%", border: "none", overflowY: "scroll"}} className="showcase-app-main-container">
                    <div>
                        <h1 className="showcase-app-header-title text-align-left">Jenni</h1>
                        <Stack StackTools={[StackTool.HTML, StackTool.CSS, StackTool.JS, StackTool.Express, StackTool.Discord, StackTool.NodeJS, StackTool.Ubuntu, StackTool.Nginx, StackTool.JSON]} />
                        <p className="showcase-app-paragraph">This project was a fully functional website that i built for a digital artist.</p>
                    </div>
                    
                    <iframe src="https://www.jennixdraws.com/" style={{width: "70%", height: "70%", border: "none"}}></iframe>                    
                    <h1>This is the part where i talk about the portfolio</h1>
                    <p>Yes this is the part where i make even more description about the portfolio Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsum enim ullam totam minus, doloribus molestias nulla soluta! Ipsa culpa molestias neque sequi quas velit ipsam tempora nemo aliquid excepturi?</p>
                    <iframe src="https://www.jennixdraws.com/portfolio" style={{width: "70%", height: "70%", border: "none"}}></iframe>                    

                </div>
            </AppWindow>
        </motion.div>
    )
}

export default Jenni;