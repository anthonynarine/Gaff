import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  ListItemButton,
} from "@mui/material";

import useCrud from "../../hooks/useCruds";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";
import { Link } from "react-router-dom";
import Server  from "../../../src/@types/server"

interface PropsFromPrimaryDraw {
  open: boolean;
  // Add other props specific to PopularChannels component, if any
}

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
}

const PopularChannels: React.FC<PropsFromPrimaryDraw> = ({ open }) => {
  // Alt way of doing
  // function PopularChannels(props: PropsFromPrimaryDraw) {
  //   const { open } = props;
  // useCrud takes in initial data, and an apiURL
  const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
    [],
    "/server/select/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Servers", dataCRUD)
  }, [dataCRUD]);

  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%m",
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: open ? "block" : "none", color: "#637C5B" }}
        >
          Popular
        </Typography>
      </Box>
      <List>
        {dataCRUD.map((server) => (
          <ListItem key={server.id} disableGutters sx={{ display: "block" }} dense={true}>
            <Link
              to={`/server/${server.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 0 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <Avatar alt="Server Icon" src={`${MEDIA_URL}${server.icon}`} />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {server.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, lineHeight: 1.2, color: "textSecondary" }}
                    >
                      {server.category}
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    sx: {
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PopularChannels;
