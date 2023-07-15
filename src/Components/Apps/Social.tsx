import { AnimatePresence, Variants, motion } from "framer-motion";
import AppWindow from "../AppWindow";
import Chloe, { ChloeConversation, ChloeEmotion } from "../Chloe";
import ChloeInfoButton from "../ChloeInfoButton";
import { useEffect, useState } from "react";
import BoardMessage from "./AppsItems/BoardMessage";
import "../../Styles/Apps/Social.css";
import { getMessages, sendMessage } from "../../API/MessagesBoard";
import Stack, { StackTool } from "../Stack";

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
            if (!MessageSend) return;
            setMessages(MessageSend.messages);
            setName("");
            setContent("");
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
                <div className="paper-container">
                    <div className="messages-board-container">
                        <div className="messages-container">
                            <div>
                                <h3 className="message-board-title">Jupi's Pinboard</h3>
                            </div>
                            <div className="message-writing-container">
                                {messages.map((element) => <BoardMessage content={element.content} name={element.name} key={element.id}/>)}
                            </div>
                            <img className="cute-drawing" src="/Imgs/Chloe/Excited.webp" />
                        </div>
                    </div>
                    <form className="message-form">
                        <div className="message-payload">
                            <input className="text-input" type="text" name="Username" placeholder="Your name ..." onChange={onNameChange} value={name} maxLength={20}/>
                            <input className="text-input" type="text" name="Message" placeholder="Your Message ..." onChange={onContentChange} value={content} maxLength={205}/>
                        </div>
                        <button type="submit" onClick={onSendMessage} className="submit-message">Pin</button>
                    </form>
                </div>
            </AppWindow>
        </motion.div>
    )
}

export default Social;