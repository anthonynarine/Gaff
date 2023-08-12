export const MessageInterfaceStyles = {
    box: {
      overflow: "hidden",
      padding: { xs: 0 },
      height: `calc(80vh)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#CAD3D7",
      // borderRadius: 5,
      // boxShadow: "5px 5px 10px #ccc",
      // ":hover": {
      //   boxShadow: "10px 10px 20px #060606",
      // },
    },
    btn: {
      backgroundColor: "#060606",
      width: 300,
      marginTop: 3,
      marginBottom: 3,
      borderRadius: 3,
      "&:hover": {
        backgroundColor: "#FF3F00",
      },
      paper: {
        width: 300,
      },
    },
  card: {
      maxWidth: 500,
      margin: "auto",
      marginTop: 10,
      // padding: 2,
      borderRadius: 0,
      boxShadow: "5px 5px 10px #ccc",
      ":hover": {
          boxShadow: "10px 10px 20px #060606",
      },
    },
  
  };