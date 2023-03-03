/*import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import history from "../Navigation/history";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-end"
        alignItems="center"
      >
        <Grid>
          <Typography variant="h6">This is Landing Page</Typography>
        </Grid>
        <Grid>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => history.push("/SignIn")}
          >
            Sign In
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => history.push("/SignUp")}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default LandingPage;*/

import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import ListItemButton from '@material-ui/core/ListItemButton';
import history from "../Navigation/history";
//import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
//import Typography from '@mui/material/Typography';
//import Grid from '@mui/material/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import resume from "./resumee.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
//import Slide from '@material-ui/core/Slide';
//import logo from './logo.png';
//F8B195   F67280   C06C84   6C5B7B   355C7D
const lighttheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#ffedf3", //pinkish
    },
    primary: {
      main: "#facad9", //pink
    },
    secondary: {
      main: "#ff003c", //pinker
    },
  },
});

function TheLanding() {
  //const { window } = props;
  //const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <MuiThemeProvider theme={lighttheme}>
      
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <NavBar></NavBar>
        <Box component="main" sx={{ p: 10 }}>
          <CardTitle></CardTitle>
        </Box>
      </Grid>
    </MuiThemeProvider>
  );
}
const CardTitle = () => {
  //const { post } = props;

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="300"
          sx={{ width: 200, display: { xs: "none", sm: "block" } }}
          //image="/static/images/cards/contemplative-reptile.jpg"
          img
          src={resume}
          alt="resume"
        />

        <CardContent sx={{ flex: 6 }}>
          <Box
            sx={{
              position: "absolute",
              bottom: 40,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
              padding: "10px",
            }}
          >
            <Typography component="h2" variant="h2">
              Can do Co-op
            </Typography>
            <Typography variant="h5" color="Primary">
              Go to spot for co-op help!
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <Typography variant="h6" paragraph>
        {
          " Welcome to the landing page!! Can do coop has all you need to help review your co-op documents and help you land that job!"
        }
      </Typography>
    </Card>
  );
};
const NavBar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            CAN DO CO-OP
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <div>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => history.push("/SignIn")}
              >
                Sign In
              </Button>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => history.push("/SignUp")}
              >
                Sign Up
              </Button>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav"></Box>
    </Box>
  );
};

export default TheLanding;
