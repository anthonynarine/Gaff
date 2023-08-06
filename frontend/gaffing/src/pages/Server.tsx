import { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketURL = "ws://localhost:8000/ws/test";

export default function Server() {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { sendJsonMessage } = useWebSocket(socketURL, {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      setMessage(msg.data);
    },
  });

  const sendInputValue = () => {
    const message = { text: inputValue };
    sendJsonMessage(message);
    setInputValue("");
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={sendInputValue}>Send Hello</button>
      <div>Recieved Data: {message}</div>
    </>
  );
}
