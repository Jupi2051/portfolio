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
            {emotion: ChloeEmotion.Excited, Message: "first co"},
            {emotion: ChloeEmotion.Excited, Message: "is going"},
            {emotion: ChloeEmotion.Excited, Message: "very"},
            {emotion: ChloeEmotion.Excited, Message: "bestie"}
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
    <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" layout>
        <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <h1>So True Bestie!</h1>
                <Chloe ConversationIndex={1} Conversations={ChloeExplanation}/>
        </AppWindow>
    </motion.div>
    )
}

export default DummyApp;