import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import history from "../Navigation/history";
import Box from "@material-ui/core/Box";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBar from '../MenuBar/menu';

const serverURL = "";

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#ef9a9a',
      light: '#ffcccb',
      dark: '#ba6b6c',
      background: '#eeeeee'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
});

const opacityValue = 0.9;

class HomeBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      userID: "",
      mode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.authUser.uid !== null) {
      this.setState({ userID: this.props.authUser.uid });
      await this.getToken();
      this.loadUserSettings();
    }
  }

  getToken = async () => {
    const url = serverURL + "/login";
    await this.props.firebase.doGetIdToken(true).then(async (idToken) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });
      const body = await response.json();
      if (response.status !== 200) {
        this.setState({ token: null });
        throw Error(body.message);
      } else {
        this.setState({ token: body.token });
      }
    });
  };

  loadUserSettings() {
    console.log("called load user settings");

    this.callApiLoadUserSettings().then((res) => {
      //console.log("loadUserSettings returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("loadUserSettings parsed: ", parsed[0].mode);
      this.setState({ mode: parsed[0].mode });
    });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        userID: this.state.userID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };

  signOut() {
    this.setState({ mobileMoreAnchorEl: null });
    this.props.firebase.doSignOut();
    this.props.history.push("/");
  }

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <MenuBar />
        <Box
          sx={{
            height: '100vh',
            opacity: opacityValue,
            overflow: 'scroll',
            backgroundSize: "cover"
          }}
        >
          <Grid
            container
            spacing={1}
            style={{ maxWidth: '100%' }}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            align="center"
          >
            <br />
            <Typography variant="h3" gutterBottom component="div">
              Home
            </Typography>
            <Typography variant="h6" component="div">
              Welcome Back!
            </Typography>
            <br />
          </Grid>
        </Box>
      </ThemeProvider>
    );
  }
}

const Home = compose(withRouter, withFirebase)(HomeBase);

export default Home;
