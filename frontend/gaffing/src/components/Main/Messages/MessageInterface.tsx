import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Typography, Box, TextField } from "@mui/material";
import useCrud from "../../../hooks/useCruds";
import Server from "../../../pages/Server";
import { useTheme } from "@mui/material";
import { MessageInterfaceStyles } from "./MessageInterfaceStyles";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import MessageList from "./MessageList";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface ServerChannelProps {
  data: Server[];
}

const MessageInterface: React.FC<ServerChannelProps> = ({ data }) => {
  const theme = useTheme();
  const classes = MessageInterfaceStyles(theme);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const { serverId, channelId } = useParams();
  const server_name = data?.[0]?.name ?? "Server";
  const { fetchData } = useCrud<Server>([], `/message/?channel_id=${channelId}`);

  const socketURL = channelId ? `ws://localhost:8000/${serverId}/${channelId}` : null;

  const { sendJsonMessage } = useWebSocket(socketURL, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        // setMessages([]);
        setMessages(Array.isArray(data) ? data : []);
        console.log("WebSocket connection opened successfully!");
      } catch (error) {
        console.log(error);
      }
    },

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({ type: "message", message: inputMessage });
      setInputMessage(""); // Clear the input after sending the message
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      sendJsonMessage({ type: "message", message: inputMessage });
      setInputMessage("");
    }
  };

  return (
    <>
      <MessageInterfaceChannels data={data} />
      {channelId === undefined ? (
        <Box sx={classes.messageInterfaceNoChannelSelectedBox}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={"-0.5px"}
              sx={{ px: 5, maxWidth: "600px" }}
            >
              Welcome to {server_name} Server
            </Typography>
            <Typography>{data?.[0]?.description ?? "This is our home"}</Typography>
          </Box>
        </Box>
      ) : (
        <>
          {/* Render each received message */}
          <Box sx={{overflow: "hidden", p:0, height:`calc(100vh - 100px)`}}>
            <MessageList messages={messages} />
          </Box>
          {/* Input field for the user's message */}
          {/* <Box sx={{position: "sticky", bottom:0, width:"100%"}}> */}
          <Box sx={classes.msgFormBox}>
            <form onSubmit={handleSendMessage} style={classes.msgForm}>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ paddingRight: '10px' }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={1}
                  maxRows={4}
                  sx={{ flexGrow: 1, pr:"10px" }}
                  onKeyDown={handleKeyDown}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;
