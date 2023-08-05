import { createTheme, responsiveFontSizes } from "@mui/material";

// Extend the default theme of Material-UI by adding a custom property "primaryAppBar" with the "height" property
declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number;
        };
    }
    interface Theme {
        primaryDraw: {
            width: number;
            closed: number;
        };
    }
    interface Theme {
        secondaryDraw: {
            width: number;

        };
    }
    // Extend the ThemeOptions to allow configuring the "primaryAppBar" property during theme creation
    interface ThemeOptions {
        primaryAppBar?: {
            height?: number;
        };
        primaryDraw: {
            width: number;
            closed: number;
        };
        secondaryDraw: {
            width: number;
        };  
    }
}

// Function to create and customize the MUI theme
export const createMuiTheme = (mode:"light" | "dark") => {
    // Create the default theme and customize it by providing the "primaryAppBar" property
    let theme = createTheme({
        typography: {
            fontFamily: ['IBM Plex Sans', "sans-serif"].join(","),
            body2:{
                fontWeight: 600,
                letterSpacing: "0.5px",
            }, // Custom font family for the whole application
        },
        primaryAppBar: {
            height: 50, // Height value for the "primaryAppBar" property
        },
        primaryDraw: {
            width: 240,
            closed: 70
        },
        secondaryDraw: {
            width: 240
        },
        palette: {
            mode,
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
