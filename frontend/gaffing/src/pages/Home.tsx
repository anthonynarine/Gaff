import { Box, CssBaseline } from "@mui/material"
import PrimaryAppBar from "../scaffold/PrimaryAppBar"
import PrimaryDraw from "../scaffold/PrimaryDraw"


function Home() {

  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw></PrimaryDraw>
    </Box>
  )
}

export default Home
