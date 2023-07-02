import { AnimatePresence, motion } from "framer-motion";
import AppWindow from "../AppWindow";
import Chloe, { ChloeConversation, ChloeEmotion } from "../Chloe";
import ChloeInfoButton from "../ChloeInfoButton";
import { useEffect, useState } from "react";
import BoardMessage from "./AppsItems/BoardMessage";
import "../../Styles/Apps/Social.css";
import { getMessages, sendMessage } from "../../API/MessagesBoard";

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1, scale: 1}
}

type Messages = {
    content: string,
    name: string,
    id: number,
}

function Social(Props: PropTypes)
{
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [messages, setMessages] = useState<Messages[]>([]);

    useEffect(() => {
        getMessages()
        .then((response) => {
            setMessages(response.messages);
        })
        .catch((error) => console.log(error));
        return () => {};
    }, [])

    async function onSendMessage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        try
        {
            event.preventDefault();
            const MessageSend = await sendMessage(name, content);
            setMessages(MessageSend.messages);
        } catch (error) {
            console.log(error);
        }
    }

    function onNameChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setName(event.currentTarget.value);
    }

    function onContentChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setContent(event.currentTarget.value);
    }

    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" className="main-app-container">
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <div style={{width: "100%", height: "100%", border: "none"}}>
                    <div className="messages-board-container">
                        <div className="Messages">
                            {
                                messages.map((element) => <BoardMessage content={element.content} name={element.name} key={element.id}/>)
                            }
                        </div>
                        <form className="message-form">
                            <div className="message-payload">
                                <input type="text" name="Username" placeholder="name" onChange={onNameChange} value={name}/>
                                <input type="text" name="Message" placeholder="message..." onChange={onContentChange} value={content}/>
                            </div>
                            <button type="submit" onClick={onSendMessage}>Send</button>
                        </form>
                    </div>
                </div>
            </AppWindow>
        </motion.div>
    )
}

export default Social;