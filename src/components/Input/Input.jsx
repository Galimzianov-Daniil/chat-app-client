import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => (
    <form className="form" onSubmit={event => sendMessage(event)}>
        <input
            className="input"
            value={message}
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
        />
        <button className="sendButton">Send</button>
    </form>
)

export default Input;