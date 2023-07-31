import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "../scaffold/PrimaryAppBar";
import PrimaryDraw from "../scaffold/PrimaryDraw";
import SecondaryDraw from "../scaffold/SecondaryDraw";
import MainContent from "../scaffold/MainContent";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";

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
      <MainContent />
    </Box>
  );
}

export default Home;
