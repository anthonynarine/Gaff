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
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
  banner_img: string;
  // banner: string; 
  // a lesson was learned here about matching model fieldnames and when rendering
}

function ExploreServers() {
  const { categoryName } = useParams();
  const url = categoryName
    ? `/server/select/?category=${categoryName}`
    : "/server/select";
  const { dataCRUD, fetchData } = useCrud<Server>([], url);

  useEffect(() => {
    fetchData();
    
  }, [categoryName]); // triggers a refresh if category name changes

  return (
    <div>
      <Container maxWidth="lg">
        <Box sx={{ pt: 6 }}>
          <Typography
            variant="h3"
            noWrap
            component="h1"
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                fontSize: "48px",
                letterSpacing: "-2px",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {categoryName ? categoryName : "Popular Channels"}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            noWrap
            component="h2"
            color="textSecondary"
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                fontSize: "48px",
                letterSpacing: "-1px",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {categoryName
              ? `Channels talking about ${categoryName}`
              : "Check  out some of our popular channels"}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{ pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px" }}
        >
          Recommended Channels
        </Typography>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          {dataCRUD.map((server) => {
            console.log(`${MEDIA_URL}${server.banner_img}`);
            return (
            <Grid item key={server.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "none",
                  backgroundImage: "none",
                }}
              >
                <Link
                  to={`/server/${server.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    image={
                      server.banner_img
                        ? `${MEDIA_URL}${server.banner_img}`
                        : ""
                    }
                    alt="random"
                    sx={{ display: "block" }}
                  />
                  <CardContent
                    sx={{ flexGrow: 1, p: 0, "&:last-child": { paddingBottom: 0 } }}
                  >
                    <List>
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <ListItemAvatar sx={{ minWidth: "50px" }}>
                            <Avatar
                              alt="server Icon"
                              src={`${MEDIA_URL}${server.icon}`}
                            ></Avatar>
                          </ListItemAvatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              textAlign="start"
                              sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                fontWeight: 700,
                              }}
                            >
                              {server.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                lineHeight: 1.2,
                                color: "textSecondary",
                              }}
                            >
                              {server.category}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Link>
              </Card>
                     
            </Grid>
          )})}
        </Grid>
      </Container>
    </div>
  );
}

export default ExploreServers;
