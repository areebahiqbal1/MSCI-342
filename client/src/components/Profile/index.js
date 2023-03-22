import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from "../Navigation/history";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { Component } from "react";
import firebase from "firebase/app";

const opacityValue = 0.9;

const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#ef9a9a",
      light: "#ffcccb",
      dark: "#ba6b6c",
      background: "#eeeeee",
    },
    secondary: {
      main: "#b71c1c",
      light: "#f05545",
      dark: "#7f0000",
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}));

class App extends Component {
  state = {
    userEmail: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      //if user is loged in then get the user email
      if (user) {
        this.setState({ userEmail: user.email });
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <NavBar />
        <Box
          sx={{
            height: "100vh",
            opacity: opacityValue,
            overflow: "scroll",
            backgroundSize: "cover",
          }}
        >
          <MainGridContainer
            container
            spacing={1}
            style={{ maxWidth: "50%" }}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Typography variant="h3" gutterBottom component="div">
              Profile
            </Typography>

            <Typography variant="b1" gutterBottom component="div">
              {this.state.userEmail}
            </Typography>

            <Typography variant="h6" component="div">
              Manage your information
            </Typography>
            <br />
            <Grid></Grid>
            <br />
          </MainGridContainer>
        </Box>
      </ThemeProvider>
    );
  }
}
const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            key="1"
            onClick={() => history.push("/")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Home
          </Button>
          <Button
            key="2"
            onClick={() => history.push("/MyFiles")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            My Files
          </Button>
          <Button
            key="3"
            onClick={() => history.push("/Upload")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Upload
          </Button>
          <Button
            key="4"
            onClick={() => history.push("/Profile")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Profile
          </Button>
          <Button
            key="5"
            onClick={() => history.push("/SignOut")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            SignOut
          </Button>
          <Button
            key="6"
            onClick={() => history.push("/Review")}
            sx={{ my: 2, color: "red", display: "block" }}
          >
            Review
          </Button>
          <Button
            key="6"
            onClick={() => history.push("/Calendar")}
            sx={{ my: 2, color: "red", display: "block" }}
          >
            Calendar
          </Button>
          <Button
            key="6"
            onClick={() => history.push("/Admin")}
            sx={{ my: 2, color: "red", display: "block" }}
          >
            Admin
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default App;
