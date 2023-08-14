// Import necessary modules and hooks from libraries
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useRef, useEffect } from "react";

// Define the types of props expected by the Scroll component
interface Scrollprops {
  children: React.ReactNode; // React children to be rendered within the scrollable container
}

// Style the ScrollContainer using MUI's styled API. This container has customized styles for the scrollbar.
const ScrollContainer = styled(Box)(({ theme }) => ({
  height: `calc(100vh - 190px)`,          // Set the height minus a fixed pixel value
  overflowY: "scroll",                   // Enable vertical scrolling
  
  // Styling for the scrollbar
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",             // Dark gray scrollbar thumb
    borderRadius: "4px",                 // Rounded corners for thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",             // Slightly darker gray when hovered
  },
  "&::-webkit-scrollbar-track": {
    // backgroundColor: "f0f0f0",       // Intentionally commented out (assuming it's kept for potential future use)
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",      // Transparent corner
  },
}));

/**
 * Scroll Component.
 * This component renders a scrollable container and ensures that the content is scrolled to the bottom
 * whenever the children inside the container change.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the scrollable container.
 */
const Scroll = ({ children }: Scrollprops) => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Create a ref to store the scroll container

  useEffect(() => {
    // Check if the ref is currently pointing to a DOM element
    if (containerRef.current) {
      // Scroll to the bottom of the container when the children change
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [children]); // Run the effect whenever the children prop changes

  // Render the scrollable container with the provided children
  return <ScrollContainer ref={containerRef}>{children}</ScrollContainer>;
};

// Export the Scroll component for use in other parts of the application
export default Scroll;
