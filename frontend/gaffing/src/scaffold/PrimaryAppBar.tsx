import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";

// Constants
const NUM_DRAWER_PARAGRAPHS = 100;

const PrimaryAppBar = () => {
  // State for the drawer visibility
  const [isDrawerVisible, setDrawerVisibility] = useState(false);

  // Theme
  const theme = useTheme();

  // Check if the screen is small (up to "sm" breakpoint)
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  // Effect to handle drawer visibility on small screens
  useEffect(() => {
    // If the screen is small and the drawer is visible, close the drawer
    if (isSmallScreen && isDrawerVisible) {
      setDrawerVisibility(false);
    }
  }, [isSmallScreen, isDrawerVisible]);

  // Toggle the drawer visibility (open or closed)
  const toggleDrawer = (visible: boolean) => () => {
    setDrawerVisibility(visible);
  };

  //....MAKE THIS INTO IT'S OWN COMPONENT ON REFACTOR
  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ExploreCategories />
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.default,
          borderBottom: `2px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            height: theme.primaryAppBar.height,
            minHeight: theme.primaryAppBar.height,
          }}
        >
          {/* Menu Icon Button */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Drawer */}
          <Drawer anchor="left" open={isDrawerVisible} onClose={toggleDrawer(false)}>
            {/* Drawer Content */}
            {list()}
          </Drawer>

          {/* App Title */}
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
    </>
  );
};

export default PrimaryAppBar;
