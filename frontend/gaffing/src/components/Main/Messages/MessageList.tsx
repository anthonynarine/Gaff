import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import Scroll from "./Scroll";

/**
 * Represents a single message.
 */
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

/**
 * Properties for the MessageList component.
 */
interface MessageListProps {
  messages: Message[];
}

/**
 * A component that renders a list of messages.
 *
 * @param {MessageListProps} props - The properties for the component.
 * @returns {JSX.Element} The JSX element representing the MessageList.
 */
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Scroll>
    <List>
      {messages.map((msg: Message) => (
        <ListItem key={msg.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="user image" />
          </ListItemAvatar>
          <ListItemText
            // Styling for the primary message content (sender)
            primaryTypographyProps={{ fontSize: "12px", variant: "body2" }}
            primary={
              <Typography
                component="span"
                variant="body1"
                color="text.primary"
                sx={{ display: "inline", fontWeight: 600 }}
              >
                {msg.sender}
              </Typography>
            }
            secondary={
              <>
                {/* Styling for the secondary message content (message content) */}
                <Typography
                  variant="body1"
                  component="span"
                  color="text.primary"
                  style={{
                    overflow: "visible",
                    whiteSpace: "normal",
                    textOverflow: "clip",
                  }}
                  sx={{
                    display: "inline",
                    lineHeight: 1.2,
                    fontWeight: 400,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {msg.content}
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
      ))}
    </List>
    </Scroll>
  );
};

export default MessageList;
