import { motion } from "framer-motion";
import AppWindow from "../AppWindow";

type PropTypes = {
    AppId: number
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1,scale: 1,}
}

function DummyApp(Props: PropTypes)
{
    return(
    <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
        <AppWindow AppId={Props.AppId}>
            This is an example of a dummy app!
        </AppWindow>
    </motion.div>
    )
}

export default DummyApp;