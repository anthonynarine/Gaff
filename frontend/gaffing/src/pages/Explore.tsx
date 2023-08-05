import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "../scaffold/PrimaryAppBar/PrimaryAppBar";
import PrimaryDraw from "../scaffold/PrimaryDraw";
import SecondaryDraw from "../scaffold/SecondaryDraw";
import ExploreServers from "../components/Main/ExploreServers";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import Main from "../scaffold/Main";

function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <PopularChannels open={false} />
      </PrimaryDraw>
      <SecondaryDraw>
        <ExploreCategories />
      </SecondaryDraw>
      <Main><ExploreServers/></Main>
    </Box>
  );
}

export default Home;
