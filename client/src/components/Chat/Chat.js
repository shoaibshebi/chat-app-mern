import React, { useState, useEffect } from "react";
import querystring from "query-string";
import io from "socket.io-client";
import { useLocation } from 'react-router-dom'
  
import "./chat.css";
import InfoBar from "../infobar/infobar";
import Input from "../input/input";
import Messages from "../Messages/messages";

const ENDPOINT = "localhost:5000";

let socket;

// WHEN NEW PERSON JOIN CHAT ,/Chat INVOKE AND COMPNENT MOUNT THEN USEEFFECT() RUNS
const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const { name, room } = querystring.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);
    // console.log(socket);

    socket.emit("join", { name, room }, (error) => {
      alert(error);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  },[location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      console.log("in the send mesaage ");
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
        />
      </div>
    </div>
  );
};

export default (Chat);
