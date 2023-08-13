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
  listItemAvatarBox: {
    display: {xs: "block", sm: "none"}

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
  channelInterfaceAppBar: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`

  },
  channelInterfaceToolBar: {
    minHeight: theme.primaryAppBar.height, 
    height: theme.primaryAppBar.height,
    display: "flex",
    alignItems: "center"
  }, 
});
