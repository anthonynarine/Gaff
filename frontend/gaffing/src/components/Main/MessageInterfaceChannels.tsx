

import {
  AppBar,
  Toolbar,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  useTheme,
} from "@mui/material";

import { MEDIA_URL } from "../../config";
import { Server } from "../../@types/server";
import { useParams } from "react-router-dom";
import ServerChannels from "../SecondaryDraw/ServerChannels";
import { useState } from "react"
import MoreVertIccon from "@mui/icons-material/MoreVert"






interface ServerChannelProps {
    data: Server[];
  }

const MessageInterfaceChannels: React.FC<ServerChannelProps> = ({ data }) => {
// const classes = useStyles
    return(
        <>
        </>
    )
};

export default MessageInterfaceChannels