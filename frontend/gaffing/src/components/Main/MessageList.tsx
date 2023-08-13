import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
  }

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box>
      <List>
        {messages.map((msg: Message) => (
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
                  sx={{ display: "inline", fontWeight: 600 }}
                >
                  {msg.sender}
                </Typography>
              }
              secondary={
                <Box>
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
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
