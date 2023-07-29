import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"

import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

function PrimaryAppBar() {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { fontWeight: 700, letterSpacing: "0.5px" } }}
          >
            LeWeGaff
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default PrimaryAppBar;
