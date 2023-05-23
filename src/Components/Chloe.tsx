import { AnimatePresence, Variants, animate, motion } from "framer-motion";
import "../Styles/Chloe.css";
import { useEffect, useState } from "react";

const animationVariants: Variants = {
    initial: {y: 70},
    enter: {y: 70, transition: {staggerChildren: 0.5, delayChildren: 0.5}},
    exit: {y: 200}
}

const BubbleVariants: Variants = {
    initial: {scale: 0, x: "30%", y: "70%"},
    enter: {scale: 1, x: "0%", y: "0%"},
}

const ChloeVariants: Variants = {
    initial: {opacity: 0},
    enter: {opacity: 1},
    exit: {opacity: 0},
}

const CharacterMovement: Variants = {
    initial: {y: "100%"},
    enter: {y: 0},
    exit: {opacity: "100%"},
}

const SpeechVariant: Variants = {
    initial: {scale: 0, opacity: 0},
    enter: {scale: 1, opacity: 1},
    exit: {scale: 0, opacity: 0}
}

export enum ChloeEmotion {
    Neutral,
    Proud,
    Exhausted,
    Frustrated,
    Thinking,
    ConfidentSmile,
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
    unrenderFunction?: (render: boolean) => void,
}

type EmoteMapper = {
    ChloeEmote: ChloeEmotion,
    ImageLink: string
};

const EmotionsImagesMap: EmoteMapper[] = [
    {ChloeEmote: ChloeEmotion.Neutral, ImageLink: "/Imgs/Chloe/Neutral.webp"},
    {ChloeEmote: ChloeEmotion.Proud, ImageLink: "/Imgs/Chloe/Proud.webp"},
    {ChloeEmote: ChloeEmotion.Exhausted, ImageLink: "/Imgs/Chloe/Exhausted.webp"},
    {ChloeEmote: ChloeEmotion.Frustrated, ImageLink: "/Imgs/Chloe/Frustrated.webp"},
    {ChloeEmote: ChloeEmotion.Thinking, ImageLink: "/Imgs/Chloe/Thinking.webp"},
    {ChloeEmote: ChloeEmotion.ConfidentSmile, ImageLink: "/Imgs/Chloe/ConfidentSmile.webp"},
    {ChloeEmote: ChloeEmotion.Excited, ImageLink: "/Imgs/Chloe/Excited.webp"},
    {ChloeEmote: ChloeEmotion.Yay, ImageLink: "/Imgs/Chloe/Yay.wep"}
]

function Chloe(props: PropTypes)
{
    const [currentMessage, setCurrentMessage] = useState(0);
    const [pastMessage, setPastMessage] = useState("");

    const CurrentConversation = props.Conversations[props.ConversationIndex];
    if (!CurrentConversation) return <h1>Error with Conversation indexing.</h1>;

    const currentSpeechUnit = CurrentConversation.ChloeSpeechUnits[currentMessage];

    const FirstParagraphMessage = currentMessage % 2 === 0? currentSpeechUnit.Message : pastMessage;
    const SecondParagraphMessage = currentMessage % 2 === 0? pastMessage : currentSpeechUnit.Message;

    useEffect(() => {
        setCurrentMessage(0);
        return () => {};
    }, [props.ConversationIndex])
    
    function onClickChloe()
    {
        if (currentMessage === CurrentConversation.ChloeSpeechUnits.length -1) {
            if (props.unrenderFunction)
            {
                props.unrenderFunction(false);
                return;
            }
        }
        const currentSpeechUnit = CurrentConversation.ChloeSpeechUnits[currentMessage];
        setPastMessage(currentSpeechUnit.Message);
        setCurrentMessage(currentMessage === CurrentConversation.ChloeSpeechUnits.length - 1? 0 : currentMessage+1);
    }
    
    return(
        <AnimatePresence>
            <motion.div className="chloe-container" variants={animationVariants} initial="initial" animate="enter" exit="exit" onClick={onClickChloe}>
                <motion.div className="expression-container" variants={CharacterMovement} initial="initial" exit="exit" animate="enter">
                    <AnimatePresence>
                    {
                        EmotionsImagesMap.map((element) => element.ChloeEmote === currentSpeechUnit.emotion?
                        <motion.img className="chloe-image" src={element.ImageLink} variants={ChloeVariants} key={element.ChloeEmote}/> 
                        :
                        null)
                    }
                    </AnimatePresence>
                </motion.div>
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
        </AnimatePresence>
    )
}

export default Chloe;