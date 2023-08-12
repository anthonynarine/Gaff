import { Theme } from "@mui/material/styles";

export const MessageInterfaceStyles = (theme: Theme) => ({
  box: {
    overflow: "hidden",
    padding: theme.spacing(0),
    height: `calc(80vh - ${theme.primaryAppBar.height}px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // ... other properties
  },
  submitBtn: {
    backgroundColor: "#060606",
    width: 150,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#FF3F00",
    },
  },
  card: {
    maxWidth: 500,
    margin: "auto",
    marginTop: 10,
  },
  msgInterFToolbar: {
    minHeight: theme.primaryAppBar.height,
  },
});
