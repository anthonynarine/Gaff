import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  ListItemButton,
} from "@mui/material";

import useCrud from "../../hooks/useCruds";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { TrendingUpOutlined } from "@mui/icons-material";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

function ExploreCategories() {
  // Theme
  const theme = useTheme();

  const { dataCRUD, error, isLoading, fetchData } = useCrud<Category>(
    [],
    "/server/category/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  //....FOR TESTING
  useEffect(() => {
    console.log("Category", dataCRUD);
  }, [dataCRUD]);

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `2px solid ${theme.palette.divider}`,
          positon: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        Explore
      </Box>
      <List sx={{ py: 0 }}>
        {dataCRUD.map((category) => (
          <ListItem
            key={category.id}
            disablePadding
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/explore/${category.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "" }}>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <img
                      alt="server Icon"
                      src={`${MEDIA_URL}${category.icon}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        display: "block",
                        margin: "auto",
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      textAlign="start"
                      paddingLeft={1}
                    >{category.name}</Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ExploreCategories;
