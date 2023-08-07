import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "../scaffold/PrimaryAppBar/PrimaryAppBar";
import PrimaryDraw from "../scaffold/PrimaryDraw";
import SecondaryDraw from "../scaffold/SecondaryDraw";
import Main from "../scaffold/Main";
import MessageInterface from "../components/Main/Server/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServers";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react"
import useCrud from "../hooks/useCruds";

function Server() {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
    [],
    `/server/select/?by_serverid=${serverId}`
  );


  useEffect(()=>{
    fetchData();
  }, [])


  if (error !== null && error.message == "400") {
    navigate("/");
  }

  // const isChannel = (): Boolean => {
  //   if (!channelId) {
  //     return true;
  //   }
  //   return dataCRUD.some((server) =>
  //     Server.channel_server.some((channel) => channel.id === parseInt(channelID))
  //   );
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <UserServers open={false} data={dataCRUD} />
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