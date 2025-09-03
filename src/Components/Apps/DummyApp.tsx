import { AnimatePresence, motion } from "framer-motion";
import AppWindow from "@/Components/AppWindow";
import Chloe, { ChloeConversation, ChloeEmotion } from "@/Components/Chloe";
import ChloeInfoButton from "@/Components/ChloeInfoButton";
import { useState } from "react";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

const exitAndOpen = {
  exit: { opacity: 0 },
  init: { opacity: 1, scale: 1 },
};

const ChloeExplanation: ChloeConversation[] = [
  {
    ChloeSpeechUnits: [
      { emotion: ChloeEmotion.Excited, Message: "so true bestie" },
      {
        emotion: ChloeEmotion.Excited,
        Message: "I'M SO HAPPY WITH THE FACT U GETTING A CAR",
      },
      { emotion: ChloeEmotion.Neutral, Message: "very" },
      { emotion: ChloeEmotion.Frustrated, Message: "So True Bestie" },
      {
        emotion: ChloeEmotion.Excited,
        Message: "well this is a little glitchy",
      },
      { emotion: ChloeEmotion.Excited, Message: "I CAN DO IT THO!" },
    ],
  },
  {
    ChloeSpeechUnits: [
      { emotion: ChloeEmotion.Excited, Message: "im actually depressed" },
      { emotion: ChloeEmotion.Excited, Message: "i am depressed" },
      { emotion: ChloeEmotion.Excited, Message: "as hell" },
      { emotion: ChloeEmotion.Excited, Message: ";-;" },
    ],
  },
  {
    ChloeSpeechUnits: [
      { emotion: ChloeEmotion.Excited, Message: "yes" },
      { emotion: ChloeEmotion.Excited, Message: "man" },
      { emotion: ChloeEmotion.Excited, Message: "tf" },
      { emotion: ChloeEmotion.Excited, Message: "help" },
    ],
  },
];

function DummyApp(Props: PropTypes) {
  const [renderChloe, setRenderChloe] = useState(false);
  const [conversationIndex, setConversationIndex] = useState(0);

  return (
    <AppWindow
      AppId={Props.AppId}
      processIcon={Props.processIcon}
      processName={Props.processName}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflowY: "scroll",
        }}
      >
        <ChloeInfoButton
          conversationIndex={2}
          setConversationIndex={setConversationIndex}
          setRenderChloe={setRenderChloe}
        />
        <h1>So True Bestie!</h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae non
          nulla, possimus voluptates cum aut doloremque repellat pariatur
          consectetur placeat nam sunt molestias doloribus dicta ea debitis
          voluptas. Perspiciatis, quis!
        </h1>
      </div>
      {renderChloe ? (
        <Chloe
          unrenderFunction={setRenderChloe}
          ConversationIndex={conversationIndex}
          Conversations={ChloeExplanation}
        />
      ) : null}
    </AppWindow>
  );
}

export default DummyApp;
