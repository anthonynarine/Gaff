import { createTheme, responsiveFontSizes } from "@mui/material";

// Extend the default theme of Material-UI by adding a custom property "primaryAppBar" with the "height" property
declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number;
        };
    }
    // Extend the ThemeOptions to allow configuring the "primaryAppBar" property during theme creation
    interface ThemeOptions {
        primaryAppBar?: {
            height?: number;
        };
    }
}

// Function to create and customize the MUI theme
export const createMuiTheme = () => {
    // Create the default theme and customize it by providing the "primaryAppBar" property
    let theme = createTheme({
        typography: {
            fontFamily: ['IBM Plex Sans', "sans-serif"].join(","), // Custom font family for the whole application
        },
        primaryAppBar: {
            height: 60, // Height value for the "primaryAppBar" property
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default", // Default color for the MuiAppBar component
                    elevation: 0, // Shadow elevation for the MuiAppBar component (0 means no shadow)
                },
            },
        },
    });

    // Apply responsive font sizes to the theme (optional but can make the typography responsive)
    theme = responsiveFontSizes(theme);

    // Return the customized theme
    return theme;
}

// Export the "createMuiTheme" function as the default export of this module
export default createMuiTheme;