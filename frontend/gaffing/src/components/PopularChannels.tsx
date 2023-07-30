import {
  List,
  ListItem,
  listItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

import useCrud from "../hooks/useCruds";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../config";
import { Link } from "react-router-dom";

interface PopularChannelsProps {
  open: boolean;
  // Add other props specific to PopularChannels component, if any
}

function PopularChannels(props: PopularChannelsProps) {
  const { open } = props;

  return (
    <Box
      sx={{
        height: 50,
        p: 2,
        display: "flex",
        alignItems: "center",
        flex: "1 1 100%m",
        backgroundColor: "blue",
      }}
    >
        <Typography sx={{display: open ? "block" : "none"}}> Popular </Typography>
    </Box>
  );
}

export default PopularChannels;
