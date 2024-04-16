import React, { useRef, useState } from "react";
import { Message } from "./Message";
import { MessageItem } from "../utils/MessageItem";
import GptLogo from "../images/gpt_logo.svg";

export function ChatWindow() {

    const inputRef = useRef(null);

    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState("")

    const submitMessage = (e) => {
        e.preventDefault()
        if (message.length > 0) {
            addNewMessage(message, false)
            setMessage("")
        }
    }

    const addNewMessage = (message, isBot) => {
        setMessageList([...messageList, new MessageItem(message, isBot, true)])
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e) => {
        const isEnter = e.key === "Enter" || e.key === "NumpadEnter"
        if (isEnter && e.ctrlKey) {
            const input = inputRef.current;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const value = input.value;
            input.value = value.substring(0, start) + "\n" + value.substring(end);
            input.selectionStart = input.selectionEnd = start + 1;

        } else if (isEnter && e.shiftKey) {
            const newEvent = new KeyboardEvent('keydown', { key: "Enter" })
            inputRef.current.dispatchEvent(newEvent)
        } else if (isEnter) {
            submitMessage(e)
        }
    }

    return (
        <>
            <div className="chat">
                <div className="chat-title">
                    <h1>GPT</h1>
                    <h2>chat</h2>
                    <figure className="avatar">
                        <img src={GptLogo} /></figure>
                </div>
                <div className="messages">
                    <div className="messages-content">

                        <div className="messages-content mCustomScrollbar _mCS_1">
                            <div id="mCSB_1" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style={{ maxHeight: "none", tabindex: "0" }}>
                                <div id="mCSB_1_container" className="mCSB_container" style={{ position: "relative", top: "0px", left: "0px" }} dir="ltr">

                                    {messageList.map(message => {
                                        return (
                                            <Message message={message} addMessage={addNewMessage} />
                                        )
                                    })}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="message-box">
                    <textarea type="text" className="message-input" placeholder="Type message..." onChange={handleChange} value={message} onKeyDown={handleKeyDown} ref={inputRef}></textarea>
                    <button type="submit" className="message-submit" onSubmit={submitMessage}>Send</button>
                </div>

            </div>
            <div className="bg"></div>
        </>
    )


}
