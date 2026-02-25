import React, { useEffect, useState } from "react";

export default function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("recive_message", (data) => {
            // console.log(data);
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    return (
        <>
            <div className="chat-window">
                <div className="chat-header">
                    <p> Live Chat</p>
                </div>
                <div className="chat-body">
                    {messageList && messageList.map((messageContent) => {
                        // <h1 key={messageContent.id}>{messageContent.message}</h1>
                        return (
                            <div className="message" id={username == messageContent.username ? "other" : "you"}>
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p>{messageContent.time}</p>
                                        <p id="authoer">{messageContent.username}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="chat-footer">
                    <input type="text" placeholder="hey...." onChange={(e) => { setCurrentMessage(e.target.value) }} />
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
        </>
    )
}