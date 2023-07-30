import { Box, CssBaseline } from "@mui/material"
import PrimaryAppBar from "../scaffold/PrimaryAppBar"
import PrimaryDraw from "../scaffold/PrimaryDraw"
import SecondaryDraw from "../scaffold/SecondaryDraw"


function Home() {

  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw></PrimaryDraw>
      <SecondaryDraw />
    </Box>
  )
}

export default Home
