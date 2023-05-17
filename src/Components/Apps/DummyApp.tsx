import { motion } from "framer-motion";
import AppWindow from "../AppWindow";
import Chloe, { ChloeConversation, ChloeEmotion } from "../Chloe";

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1, scale: 1}
}

const ChloeExplanation: ChloeConversation[] = [
    {
        ChloeSpeechUnits: [
            {emotion: ChloeEmotion.Excited, Message: "so true bestie"},
            {emotion: ChloeEmotion.Excited, Message: "I'M SO HAPPY WITH THE FACT U GETTING A CAR"},
            {emotion: ChloeEmotion.Neutral, Message: "very"},
            {emotion: ChloeEmotion.Frustrated, Message: "So True Bestie"},
            {emotion: ChloeEmotion.Excited, Message: "well this is a little glitchy"},
            {emotion: ChloeEmotion.Excited, Message: "I CAN DO IT THO!"},
        ]
    },
    {
        ChloeSpeechUnits: [
            {emotion: ChloeEmotion.Excited, Message: "im actually depressed"},
            {emotion: ChloeEmotion.Excited, Message: "i am depressed"},
            {emotion: ChloeEmotion.Excited, Message: "as hell"},
            {emotion: ChloeEmotion.Excited, Message: ";-;"},
        ]
    },
    {
        ChloeSpeechUnits: [
            {emotion: ChloeEmotion.Excited, Message: "yes"},
            {emotion: ChloeEmotion.Excited, Message: "man"},
            {emotion: ChloeEmotion.Excited, Message: "tf"},
            {emotion: ChloeEmotion.Excited, Message: "help"},
        ]
    },
]

function DummyApp(Props: PropTypes)
{
    return(
    <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" className="main-app-container">
        <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <h1>So True Bestie!</h1>
                <Chloe ConversationIndex={0} Conversations={ChloeExplanation}/>
        </AppWindow>
    </motion.div>
    )
}

export default DummyApp;