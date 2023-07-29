
import { createTheme } from "@mui/material";

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
    const theme = createTheme({
        primaryAppBar: {
            height: 60, 
        },
        components:{
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                    elevation: 0
                }, 
            },
        },
    });

    // Return the customized theme
    return theme;
}

// Export the "createMuiTheme" function as the default export of this module
export default createMuiTheme