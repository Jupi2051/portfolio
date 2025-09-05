import AppFoundation, {
  AppFoundationProps,
} from "@/components/ui/app-foundation";
import Chloe, { ChloeConversation, ChloeEmotion } from "@/components/ui/chloe";
import ChloeInfoButton from "@/components/ui/chloe/chloe-info-button";
import { useState } from "react";

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

function DummyApp() {
  const [renderChloe, setRenderChloe] = useState(false);
  const [conversationIndex, setConversationIndex] = useState(0);

  return (
    <>
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
    </>
  );
}

export default DummyApp;
