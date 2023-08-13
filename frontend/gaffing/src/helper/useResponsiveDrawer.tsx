import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

/**
 * Custom hook for handling responsive drawer visibility.
 * Automatically closes the drawer on small screens when it's open.
 *
 * @returns {Object} An object containing `isDrawerVisible` and `toggleDrawer` functions.
 */
export function useResponsiveDrawer() {
  // State to track the drawer visibility
  const [isDrawerVisible, setDrawerVisibility] = useState(false);

  // Get the current theme
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

  // Function to toggle the drawer visibility (open or closed)
  const toggleDrawer = (visible: boolean) => () => {
    setDrawerVisibility(visible);
  };

  // Return the state and functions for external use
  return { isDrawerVisible, toggleDrawer };
}


//                      SUMMARY
{/*The useResponsiveDrawer custom hook is designed to handle the visibility
of a responsive drawer, ensuring that it behaves appropriately on different 
screen sizes. It encapsulates the logic to track the visibility state of the 
drawer and automatically closes it when the screen size is small.

Functionality summary:

The hook manages the visibility of a drawer on different screen sizes.
It takes care of automatically closing the drawer when the screen size is small.
The hook returns the isDrawerVisible state variable and the toggleDrawer function
 for external use.
isDrawerVisible indicates whether the drawer is currently visible or not.
toggleDrawer is a function that can be used to toggle the visibility state 
of the drawer (open or closed).
By using this custom hook, you can easily integrate responsive drawer
 behavior into your components without duplicating the logic for handling 
visibility and screen size checks.*/}