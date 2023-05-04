import { AnimatePresence, Variants, animate, motion } from "framer-motion";
import "../Styles/Chloe.css";
import { useEffect, useState } from "react";

const animationVariants: Variants = {
    initial: {y: 0},
    enter: {y: 0, transition: {staggerChildren: 0.25}}
}

const BubbleVariants: Variants = {
    initial: {scale: 0, x: "30%", y: "70%"},
    enter: {scale: 1, x: "0%", y: "0%"}
}

const ChloeVariants: Variants = {
    initial: {y: 100},
    enter: {y: 5}
}

const SpeechVariant: Variants = {
    initial: {scale: 0, opacity: 0},
    enter: {scale: 1, opacity: 1},
    exit: {scale: 0, opacity: 0}
}

export enum ChloeEmotion {
    Proud,
    Sad,
    Exhausted,
    Frustrated,
    Thinking,
    Nerdy,
    Satisfied,
    Excited,
    Yay
};

type ChloeSpeechUnit = {
    emotion: ChloeEmotion,
    Message: string
};

export type ChloeConversation = {
    ChloeSpeechUnits: ChloeSpeechUnit[]
}

type PropTypes = {
    ConversationIndex: number,
    Conversations: ChloeConversation[],
}

function Chloe(props: PropTypes)
{
    const [currentMessage, setCurrentMessage] = useState(0);
    const [pastMessage, setPastMessage] = useState("");

    const CurrentConversation = props.Conversations[props.ConversationIndex];
    if (!CurrentConversation) return <h1>Error with Conversation indexing.</h1>;
    const currentSpeechUnit = CurrentConversation.ChloeSpeechUnits[currentMessage];

    const FirstParagraphMessage = currentMessage%2 === 0? currentSpeechUnit.Message : pastMessage;
    const SecondParagraphMessage = currentMessage%2 === 0? pastMessage : currentSpeechUnit.Message;

    useEffect(() => {
        setCurrentMessage(0);
        return () => {};
    }, [props.ConversationIndex])
    
    function onClickChloe()
    {
        const currentSpeechUnit = CurrentConversation.ChloeSpeechUnits[currentMessage];
        setPastMessage(currentSpeechUnit.Message);
        setCurrentMessage(currentMessage === CurrentConversation.ChloeSpeechUnits.length - 1? 0 : currentMessage+1);
    }

    return(
            <motion.div className="chloe-container" variants={animationVariants} initial="initial" animate="enter" onClick={onClickChloe}>
                <motion.img className="chloe-image" src="/Imgs/Chloe/Bestie.png" variants={ChloeVariants} />
                    <motion.div variants={BubbleVariants} className="text-container">
                        <AnimatePresence>
                            {
                                currentMessage % 2 === 0?
                                <motion.p className="speech-bubble" variants={SpeechVariant} initial="initial" exit="exit" animate="enter" key={1}>{FirstParagraphMessage}</motion.p>
                                :
                                <motion.p className="speech-bubble absolute-position-text" variants={SpeechVariant} initial="initial" exit="exit" animate="enter" key={2}>{SecondParagraphMessage}</motion.p>
                            }
                        </AnimatePresence>
                    </motion.div>
            </motion.div>
    )
}

export default Chloe;