import React, { useContext, useEffect, useState } from 'react';
import GptLogo from "../images/gpt_logo.svg";
import axios from "axios"
import { Context } from '../context/Context';



export function Message({ message, addMessage }) {

    const [data, setData] = useState(message.data);
    const [isPending, setIsPending] = useState(message.isPending)
    const isBot = message.isBot
    const [messageClassName, setMessageClassName] = useState(`message ${isBot ? "" : "message-personal"} loading new`)
    const { apiController } = useContext(Context)

    useEffect(() => {
        const prepareMessage = async () => {
            if (isPending) {
                if (isBot) {
                    const response = await apiController.postSendMessage(data)
                    setData(response)
                    stopPending()

                } else {
                    setTimeout(() => {
                        addMessage(data, true)
                    }, 500)
                    stopPending()
                }
            }
        }
        prepareMessage();
    }, [])

    const stopPending = () => {
        setIsPending(false)
        setMessageClassName(messageClassName.replace("loading", ""))
    }

    return (
        <div className={`message-container ${isBot ? "bot" : "personal"}`} >
            {isBot ?
                <figure className='avatar'>
                    <img src={GptLogo}></img>
                </figure>
                :
                <>
                </>
            }
            <div className={messageClassName}>
                {isPending ? <span></span> : data}
            </div>
        </div>
    )
}
