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
  ListItem,
  useMediaQuery,
} from "@mui/material";

import { MEDIA_URL } from "../../config";
import { Server } from "../../@types/server";
import { useParams } from "react-router-dom";
import ServerChannels from "../SecondaryDraw/ServerChannels";
import { useState, useEffect } from "react";
import MoreVertIccon from "@mui/icons-material/MoreVert";
import { MessageInterfaceStyles } from "./MessageInterfaceStyles";
import getChannelNameFromData from "../../helper/getChannelNameFromData";

interface ServerChannelProps {
  data: Server[];
}

const MessageInterfaceChannels: React.FC<ServerChannelProps> = ({ data }) => {
  const [isDrawerVisible, setDrawerVisibility] = useState(false);

  const theme = useTheme();
  const classes = MessageInterfaceStyles(theme);
  const { serverId, channelId } = useParams();
  const channelName = getChannelNameFromData(data, serverId, channelId);

  // Check if the screen is small (up to "sm" breakpoint)
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  // Effect to handle drawer visibility on small screens
  useEffect(() => {
    // If the screen is small and the drawer is visible, close the drawer
    if (isSmallScreen && isDrawerVisible) {
      setDrawerVisibility(false);
    }
  }, [isSmallScreen, isDrawerVisible]);

  // Toggle the drawer visibility (open or closed)
  const toggleDrawer = (visible: boolean) => () => {
    setDrawerVisibility(visible);
  };

  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ServerChannels data={data} />
    </Box>
  );

  return (
    <>
      <AppBar
        sx={classes.channelInterfaceAppBar}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar variant="dense" sx={classes.channelInterfaceToolBar}>
          <Box sx={classes.listItemAvatarBox}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component="div">
            {channelName}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton onClick={toggleDrawer(true)} color="inherit" edge="end">
              <MoreVertIccon />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={isDrawerVisible} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MessageInterfaceChannels;
