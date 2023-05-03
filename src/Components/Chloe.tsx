import { Variants, motion } from "framer-motion";
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
    
    const CurrentConversation = props.Conversations[props.ConversationIndex];
    if (!CurrentConversation) return <h1>Error with Conversation indexing.</h1>;
    
    useEffect(() => {
        setCurrentMessage(0);
        return () => {};
    }, [props.ConversationIndex])

    const currentSpeechUnit = CurrentConversation.ChloeSpeechUnits[currentMessage];
    
    function onClickChloe()
    {
        setCurrentMessage(currentMessage === CurrentConversation.ChloeSpeechUnits.length - 1? 0 : currentMessage+1);
    }

    return(
        <motion.div className="chloe-container" variants={animationVariants} initial="initial" animate="enter" onClick={onClickChloe}>
            <motion.img className="chloe-image" src="/Imgs/Chloe/Bestie.png" variants={ChloeVariants} />
            <motion.div variants={BubbleVariants} className="text-container">
                <p className="speech-bubble">{currentSpeechUnit.Message}</p>
            </motion.div>
        </motion.div>
    )
}

export default Chloe;