import { useState } from "react";
import BoardMessage from "@/components/apps/pinboard/board-message";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApplicationData } from "@/context/app-context";
import useSystemNotification from "@/components/apps/notification/use-system-notification";

type Messages = {
  content: string;
  name: string;
  id: number;
};

function Pinboard() {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("white");
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const trpc = useTRPC();
  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery(trpc.pinboard.getPinnedMessageList.queryOptions());
  const { mutate: pinMessage, isPending: isPinning } = useMutation(
    trpc.pinboard.createPinnedMessage.mutationOptions()
  );
  const data = useApplicationData();
  const { summonNotificationWindow } = useSystemNotification({
    content: "Message pinned",
    parentProcess: data.AppId,
  });

  async function onSendMessage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    summonNotificationWindow();
    // pinMessage(
    //   {
    //     content,
    //     author,
    //     color: "white",
    //     positionX: 0,
    //     positionY: 0,
    //   },
    //   {
    //     onSuccess: () => {
    //       setAuthor("");
    //       setContent("");
    //     },
    //     onError: console.log,
    //   }
    // );
  }

  function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(event.currentTarget.value);
  }

  function onContentChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.currentTarget.value);
  }

  return (
    <div className="h-full mx-auto bg-ctp-surface0 py-20 pt-10 w-full grid grid-rows-2">
      <div className="flex flex-col max-w-[850px] w-11/12 rounded-2xl mx-auto overflow-y-hidden overflow-x-hidden bg-contain bg-repeat bg-[100px_350px] bg-gray-200 bg-local min-h-80 bg-[url('/Imgs/Apps/Backgrounds/PaperLines.webp')]">
        <div className="relative flex flex-col p-5 text-[10px]">
          <div>
            <h3 className="font-indie-flower text-center w-fit mx-auto uppercase tracking-tight mt-0 mb-3.5 text-7xl whitespace-break-spaces bg-clip-text text-transparent bg-gradient-to-r from-ctp-pink-400 to-ctp-purple-400">
              Jupi's Pinboard
            </h3>
          </div>
          <div className="flex-grow">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {messages &&
              messages.map((element) => (
                <BoardMessage
                  content={element.content}
                  name={element.author}
                  key={element.id}
                />
              ))}
          </div>
          <img
            className="absolute right-0 bottom-0 max-w-[120px] bg-white border-[10px] border-white border-b-0 hidden"
            src="/Imgs/Chloe/Excited.webp"
          />
        </div>
      </div>
      <form className="flex items-center justify-between h-fit mx-auto p-[10px_5px] max-w-[850px] w-11/12 text-[10px] gap-5">
        <div className="flex flex-col items-center justify-center w-4/5 text-[10px] gap-4">
          <input
            className="w-full border-[0.15em] border-solid bg-ctp-lavender-300 text-white font-capirola py-[10px] px-[5px] text-[1.8em] rounded-[10px] focus:outline-none placeholder:text-white placeholder:opacity-80"
            type="text"
            name="Username"
            placeholder="Your name ..."
            onChange={onNameChange}
            value={author}
            maxLength={20}
          />
          <input
            className="w-full border-[0.15em] border-solid bg-ctp-lavender-300 text-white font-capirola py-[10px] px-[5px] text-[1.8em] rounded-[10px] focus:outline-none placeholder:text-white placeholder:opacity-80"
            type="text"
            name="Message"
            placeholder="Your Message ..."
            onChange={onContentChange}
            value={content}
            maxLength={205}
          />
        </div>
        <button
          type="submit"
          onClick={onSendMessage}
          className="font-capirola py-[7px] px-[15px] bg-transparent border-[0.2em] border-solid border-ctp-lavender-300 text-white rounded-[0.5em] text-[2em] transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-ctp-lavender-300 hover:rounded-[0px_30%_0px_30%] hover:scale-110"
        >
          Pin
        </button>
      </form>
    </div>
  );
}

export default Pinboard;
