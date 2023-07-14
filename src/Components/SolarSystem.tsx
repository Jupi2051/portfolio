import "../Styles/SolarSystem.css";
import Julogo from "./Apps/AppsItems/Julogo";
import { Variants, motion } from "framer-motion";

const ParentAnimations: Variants = {
    viewed: {
        transition: {
            staggerChildren: 0.3,
            delayChildren: 1.5
        }
    }
};

const ChildrenAnimations: Variants = {
    invisible: {scale: 0, opacity: 0},
    viewed: {scale: 1, opacity: 1, transition: {duration: 0.3}},
};

const planetsPopUp: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {delay: 2.8, duration: 1}}
}

function SolarSystem()
{
    return <div className="solar-container">
        <div className="solar-moon io-moon">
            <motion.img variants={planetsPopUp} initial="hidden" animate="visible" className="moon-image" src="/Imgs/Apps/Solar/Io.webp" />
        </div>
        <div className="solar-moon europa-moon">
            <motion.img variants={planetsPopUp} initial="hidden" animate="visible" className="moon-image" src="/Imgs/Apps/Solar/Europa.webp" />
        </div>
        <div className="solar-moon gany-moom">
            <motion.img variants={planetsPopUp} initial="hidden" animate="visible" className="moon-image" src="/Imgs/Apps/Solar/Gany.webp" />
        </div>
        <div className="solar-moon callisto-moon">
            <motion.img variants={planetsPopUp} initial="hidden" animate="visible" className="moon-image" src="/Imgs/Apps/Solar/Callisto.webp" />
        </div>
        <div className="jupiter">
            <Julogo className="jupiter-logo" Size={210}/>
        </div>
        <motion.div className="orbits-container" variants={ParentAnimations} initial="invisible" animate="viewed">
            <motion.div className="orbit-outline" variants={ChildrenAnimations} key={"orbit-1"}></motion.div>
            <motion.div className="orbit-outline" variants={ChildrenAnimations} key={"orbit-2"}></motion.div>
            <motion.div className="orbit-outline" variants={ChildrenAnimations} key={"orbit-3"}></motion.div>
            <motion.div className="orbit-outline" variants={ChildrenAnimations} key={"orbit-4"}></motion.div>
        </motion.div>
    </div>
}

export default SolarSystem;