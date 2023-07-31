import { Box, useMediaQuery, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import MuiDrawer from "@mui/material/Drawer";

import DrawerToggle from "../components/DrawerToggle";

type Props = {
  children: React.ReactElement<ChildProps>;
};

type ChildProps = {
  open: boolean;
};

function PrimaryDraw(props: Props) {
  const { children } = props;
  const theme = useTheme();

  // Check if the screen is below 600px (sm breakpoint)
  const below600sm = Boolean(useMediaQuery("(max-width:599px)"));

  // State to control the drawer's open/close state
  const [open, setOpen] = useState(false);

  /**
   * Returns the styles to apply when the drawer is open.
   *
   * @returns {object} The object containing the open styles for the drawer.
   */
  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden",
  });

  /**
   * Returns the styles to apply when the drawer is closed.
   *
   * @returns {object} The object containing the closed styles for the drawer.
   */
  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden",
    width: theme.primaryDraw.closed,
  });

  /**
   * A custom styled MuiDrawer component that handles the appearance of the drawer
   * based on its open or closed state.
   *
   * @param {object} theme - The Material-UI theme object.
   * @param {boolean} open - Indicates whether the drawer is currently open or closed.
   * @returns {object} The object containing the styles for the Drawer component.
   */
  const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }));

  // Effect to update the drawer's open state when the screen size changes
  useEffect(() => {
    // If the screen size is below 600px, set the drawer to be closed (temporary variant)
    // Otherwise, set the drawer to be open (permanent variant)
    setOpen(!below600sm);
  }, [below600sm]);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  // Clone each child element and pass the `open` prop to it
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { open }) : child
  );

  return (
    <Drawer
      open={open}
      variant={below600sm ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%",
          }}
        >
          <DrawerToggle open={open} openDrawer={openDrawer} closeDrawer={closeDrawer} />
        </Box>
        {childrenWithProps}
      </Box>
    </Drawer>
  );
}

export default PrimaryDraw;
