import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  ListItemButton,
} from "@mui/material";

import { useEffect } from "react";
import { Link} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Server } from "../../@types/server";


interface ServerChannelsProps {
  data: Server[];
}

function ServerChannels(props: ServerChannelsProps) {
  const { data } = props;
  const theme = useTheme();
  const server_name = data?.[0]?.name ?? "Server"

  //....FOR TESTING
  useEffect(() => {
    console.log("Channel_server", data);
  }, [data]);

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `2px solid ${theme.palette.divider}`,
          positon: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="body1"
          sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {server_name}
        </Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {data.flatMap((server) =>
          server.channel_server.map((channel) => (
            <ListItem
              key={channel.id}
              disablePadding
              sx={{ display: "block", maxHeight: "40px" }}
              dense={true}
            >
              <Link
                to={`/server/${server.id}/${channel.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton sx={{ minHeight: 48 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" textAlign="start" paddingLeft={1}>
                        {channel.name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </>
  );
}

export default ServerChannels;
