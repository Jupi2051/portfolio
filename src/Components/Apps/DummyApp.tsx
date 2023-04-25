import { motion } from "framer-motion";
import AppWindow from "../AppWindow";

type PropTypes = {
    CloseApp: CloseAppFunction,
};

type CloseAppFunction = () => void;

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1,scale: 1,}
}

function DummyApp(Props: PropTypes)
{
    return(
    <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
        <AppWindow CloseApp={Props.CloseApp} key={Math.random()}>
            This is an example of a dummy app!
        </AppWindow>
    </motion.div>
    )
}

export default DummyApp;