import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import useCrud from "../../hooks/useCruds";
import Server from "../../pages/Server";
import { useTheme } from "@mui/material";
import { MessageInterfaceStyles } from "./MessageInterfaceStyles";
import MessageInterfaceChannels from "./MessageInterfaceChannels";

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
          <Box sx={classes.renderMessageBox}>
            <List sx={classes.renderMessageList}>
              {messages.map((msg: Message) => {
                return (
                  <ListItem key={msg.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="user image" />
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "12px", variant: "body2" }}
                      primary={
                        <Typography
                          component="span"
                          variant="body1"
                          color="text.primary"
                          sx={{ display: "inline", fontWwight: 600 }}
                        >
                          {msg.sender}
                        </Typography>
                      }
                      secondary={
                        <Box>
                        <Typography
                          variant="body1"
                          component="span"
                          color="text.parmary"
                          style={{
                            overflow: "visible",
                            whiteSpace: "normal",
                            textOverflow: "clip",
                          }}
                          sx={{
                            display: "inline",
                            LineHeight: 1.2,
                            fontweight: 400,
                            letterSpacing: "-0.2px",
                          }}
                        >
                          {msg.content}
                        </Typography>
                        </Box>
                      }
                    ></ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {/* Input field for the user's message */}
          <form onSubmit={handleSendMessage}>
            <label>
              Enter Message:
              <input type="text" value={inputMessage} onChange={handleMessageChange} />
            </label>
            <Button sx={classes.submitBtn} type="submit">
              Send Message
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default MessageInterface;
