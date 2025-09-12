import { AnimatePresence, Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";

const animationVariants: Variants = {
  initial: { y: 70 },
  enter: { y: 70, transition: { staggerChildren: 0.5, delayChildren: 0.5 } },
  exit: { y: 200 },
};

const BubbleVariants: Variants = {
  initial: { scale: 0, x: "30%", y: "70%" },
  enter: { scale: 1, x: "0%", y: "0%" },
};

const ChloeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const CharacterMovement: Variants = {
  initial: { y: "100%" },
  enter: { y: 0 },
  exit: { opacity: "100%" },
};

const SpeechVariant: Variants = {
  initial: { scale: 0, opacity: 0 },
  enter: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

export enum ChloeEmotion {
  Neutral,
  Proud,
  Exhausted,
  Frustrated,
  Thinking,
  ConfidentSmile,
  Excited,
  Yay,
}

type ChloeSpeechUnit = {
  emotion: ChloeEmotion;
  Message: string;
};

export type ChloeConversation = {
  ChloeSpeechUnits: ChloeSpeechUnit[];
};

type PropTypes = {
  ConversationIndex: number;
  Conversations: ChloeConversation[];
  unrenderFunction?: (render: boolean) => void;
};

type EmoteMapper = {
  ChloeEmote: ChloeEmotion;
  ImageLink: string;
};

const EmotionsImagesMap: EmoteMapper[] = [
  { ChloeEmote: ChloeEmotion.Neutral, ImageLink: "/Imgs/Chloe/Neutral.webp" },
  { ChloeEmote: ChloeEmotion.Proud, ImageLink: "/Imgs/Chloe/Proud.webp" },
  {
    ChloeEmote: ChloeEmotion.Exhausted,
    ImageLink: "/Imgs/Chloe/Exhausted.webp",
  },
  {
    ChloeEmote: ChloeEmotion.Frustrated,
    ImageLink: "/Imgs/Chloe/Frustrated.webp",
  },
  { ChloeEmote: ChloeEmotion.Thinking, ImageLink: "/Imgs/Chloe/Thinking.webp" },
  {
    ChloeEmote: ChloeEmotion.ConfidentSmile,
    ImageLink: "/Imgs/Chloe/ConfidentSmile.webp",
  },
  { ChloeEmote: ChloeEmotion.Excited, ImageLink: "/Imgs/Chloe/Excited.webp" },
  { ChloeEmote: ChloeEmotion.Yay, ImageLink: "/Imgs/Chloe/Yay.wep" },
];

function Chloe(props: PropTypes) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [pastMessage, setPastMessage] = useState("");

  const CurrentConversation = props.Conversations[props.ConversationIndex];
  if (!CurrentConversation) return <h1>Error with Conversation indexing.</h1>;

  const currentSpeechUnit =
    CurrentConversation.ChloeSpeechUnits[currentMessage];

  const FirstParagraphMessage =
    currentMessage % 2 === 0 ? currentSpeechUnit.Message : pastMessage;
  const SecondParagraphMessage =
    currentMessage % 2 === 0 ? pastMessage : currentSpeechUnit.Message;

  useEffect(() => {
    setCurrentMessage(0);
    return () => {};
  }, [props.ConversationIndex]);

  function onClickChloe() {
    if (currentMessage === CurrentConversation.ChloeSpeechUnits.length - 1) {
      if (props.unrenderFunction) {
        props.unrenderFunction(false);
        return;
      }
    }
    const currentSpeechUnit =
      CurrentConversation.ChloeSpeechUnits[currentMessage];
    setPastMessage(currentSpeechUnit.Message);
    setCurrentMessage(
      currentMessage === CurrentConversation.ChloeSpeechUnits.length - 1
        ? 0
        : currentMessage + 1
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="absolute max-w-lg -bottom-1.5 right-0"
        variants={animationVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        onClick={onClickChloe}
      >
        <motion.div
          className="w-40 h-60"
          variants={CharacterMovement}
          initial="initial"
          exit="exit"
          animate="enter"
        >
          <AnimatePresence>
            {EmotionsImagesMap.map((element) =>
              element.ChloeEmote === currentSpeechUnit.emotion ? (
                <motion.img
                  className="absolute select-none"
                  src={element.ImageLink}
                  variants={ChloeVariants}
                  key={element.ChloeEmote}
                />
              ) : null
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          variants={BubbleVariants}
          className="absolute bottom-full right-2/5 w-52 h-40 before:content-[''] before:absolute before:w-[110%] before:h-[110%] before:left-[-5%] before:top-0 before:bg-image-url before:bg-no-repeat before:bg-cover before:bg-center before:overflow-visible -z-10 filter-[drop-shadow(5px_0px_15px_#0f0f0f)] bg-[url('/Imgs/Images/Speech.svg')] bg-cover bg-center bg-no-repeat"
        >
          <AnimatePresence>
            {currentMessage % 2 === 0 ? (
              <motion.p
                className="flex flex-col px-2 py-4 -mt-3 items-center justify-center aspect-[18/14] w-52 text-ctp-lavender-500 font-thin font-capirola leading-none -tracking-tighter text-center select-none"
                variants={SpeechVariant}
                initial="initial"
                exit="exit"
                animate="enter"
                key={1}
              >
                {FirstParagraphMessage}
              </motion.p>
            ) : (
              <motion.p
                className="flex flex-col px-2 py-4 -mt-3 items-center justify-center aspect-[18/14] w-52 text-ctp-lavender-500 font-thin font-capirola leading-none -tracking-tighter text-center select-none absolute top-0 left-0"
                variants={SpeechVariant}
                initial="initial"
                exit="exit"
                animate="enter"
                key={2}
              >
                {SecondParagraphMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Chloe;
