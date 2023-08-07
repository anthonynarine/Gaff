import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "../scaffold/PrimaryAppBar/PrimaryAppBar";
import PrimaryDraw from "../scaffold/PrimaryDraw";
import SecondaryDraw from "../scaffold/SecondaryDraw";
import Main from "../scaffold/Main";
import MessageInterface from "../components/Main/Server/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServers";




function Server() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <UserServers />
      </PrimaryDraw>
      <SecondaryDraw>
        <ServerChannels />
      </SecondaryDraw>
      <Main>
        <MessageInterface />
      </Main>
    </Box>
  );
}

export default Server;
