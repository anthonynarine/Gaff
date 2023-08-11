import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import Typography from '@mui/material/Typography';
import useCrud from "../../../hooks/useCruds";
import Server from "../../../pages/Server";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export default function MessageInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const { serverId, channelId } = useParams();
  const { fetchData } = useCrud<Server>([], `/message/?channel_id=${channelId}`)

  const socketURL = channelId ? `ws://localhost:8000/${serverId}/${channelId}` : null;

  const { sendJsonMessage } = useWebSocket(socketURL, {
    onOpen: () => console.log("WebSocket connection opened successfully!"),
    onClose: () => console.log("WebSocket connection closed."),
    onError: () => console.log("An error occurred with the WebSocket connection."),
    onMessage: handleIncomingMessage,
  });

  function handleIncomingMessage(msg: any) {
    const data = JSON.parse(msg.data);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: data.id,
        sender: data.sender,
        content: data.new_message,
        timestamp: data.timestamp,
      },
    ]);
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendJsonMessage({ type: "message", message: inputMessage });
    setInputMessage("");
  };

  return (
    <>
      {/* Render each received message */}
      {messages.map((msg) => (
        <div key={msg.id}>
        <p>
            <strong>{msg.sender}</strong> 
            <Typography 
                variant="body1" 
                style={{ backgroundColor: 'blue', color: 'white', borderRadius: '8px', padding: '8px 12px', display: 'inline-block' }}>
                {msg.content}
            </Typography>
        </p>
        </div>
      ))}

      {/* Input field for the user's message */}
      <form onSubmit={handleSendMessage}>
        <label>
          Enter Message:
          <input type="text" value={inputMessage} onChange={handleMessageChange} />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </>
  );
}
