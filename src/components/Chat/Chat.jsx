import React, { useState, useEffect } from "react";

import InfoBar from "../InfoBar/InfoBar";
import "./Chat.css";

import queryString from "querystring";
import io from "socket.io-client";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const ENDPOINT = "https://galimzianoff-chat-app.herokuapp.com/";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search.slice(1));
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (error) => {
            if(error) {
                alert(error);
                window.location.href = "/";
            }
        })

        return () => {
            socket.emit("disconnect")
            socket.off();
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.on("roomData", (roomData) => {
            console.log(323);
            setUsers(roomData.users)
        })

    }, [users])

    const sendMessage = event => {
        event.preventDefault()
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }
    // console.log(users)

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat;