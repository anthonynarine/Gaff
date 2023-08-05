import { AccountCircle } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { IconButton, Box, Menu, MenuItem } from "@mui/material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import React, { useState } from "react";

/**
 * AccountButton component.
 * This component is a button that opens a menu when clicked.
 * The menu is anchored to the button that was clicked.
 */
export default function AccountButton() {
  // anchorElement is used to anchor the menu to the element
  // that was clicked to open the menu.
  // Initially, anchorElement is null.
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  // isMenuOpen is a boolean that indicates whether the menu is open.
  // It's true if anchorElement is not null, and false otherwise.
  const isMenuOpen = Boolean(anchorElement);

  // handleProfileMenuOpen is a function that's called when the user
  // clicks the button to open the menu. The click event is passed as
  // an argument to this function.
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    // The clicked element is set as the anchorElement.
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  // Menu to be rendered when the button is clicked.
  // It is anchored to the button that was clicked.
  const renderMenu = (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: 6, horizontal: "right" }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Brightness4Icon sx={{ marginRight: "6px", fontSize: "20px" }} />
        <DarkModeSwitch />
      </MenuItem>
    </Menu>
  );

  // The button that opens the menu and the menu itself are rendered here.
  // The menu is initially hidden because isMenuOpen is initially false.
  // When the button is clicked, isMenuOpen becomes true and the menu is shown.
  return (
    <>
      <Box sx={{ display: { xs: "flex" } }}>
        <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>
        {renderMenu}
      </Box>
    </>
  );
}
