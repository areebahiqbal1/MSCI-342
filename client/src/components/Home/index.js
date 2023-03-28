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
import './Home.css';

const serverURL = "";

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#EDC7B7"
    },
    primary: {
      main: '#EEE2DC',
      light: '#EDC7B7',
      dark: '#EDC7B7',
      background: '#EE2DC'
    },
    secondary: {
      main: "#EDC7B7",
      light: '#EDC7B7',
      dark: '#BAB2B5'
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
    if (this.props.authUser.uid != null) {
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

        <Box
          sx={{
            height: '100vh',
            opacity: opacityValue,
            overflow: 'scroll',
            backgroundImage: `url(https://source.unsplash.com/q10VITrVYUM)`,
            backgroundSize: "cover"
          }}
        >
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Button
                  key='1'
                  onClick={() => history.push('/')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Home
                </Button>
                <Button
                  key='2'
                  onClick={() => history.push('/MyFiles')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  My Files
                </Button>
                <Button
                  key='3'
                  onClick={() => history.push('/Upload')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Upload
                </Button>
                <Button
                  key='4'
                  onClick={() => history.push('/Profile')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Profile
                </Button>
                <Button
                  key='5'
                  onClick={() => history.push('/Calendar')}
                  sx={{ my: 2, color: 'red', display: 'block' }}
                >
                  Calendar
                </Button>
                <Button
                  key='7'
                  onClick={() => history.push('/About')}
                  sx={{ my: 2, color: 'red', display: 'block' }}
                >
                  About
                </Button>
                <Button
                  key='8'
                  onClick={() => history.push('/FAQ')}
                  sx={{ my: 2, color: 'red', display: 'block' }}
                >
                  FAQ
                </Button>
                <Button
                  key='9'
                  onClick={() => history.push('/Apply')}
                  sx={{ my: 2, color: 'red', display: 'block' }}
                >
                  Apply
                </Button>
                <Button
                  key='10'
                  onClick={() => history.push('/Review')}
                  sx={{ my: 2, color: 'red', display: 'block' }}
                >
                  Review
                </Button>
                <Button
                  key='11'
                  onClick={() => history.push('/Admin')}
                  sx={{ my: 2, color: 'red', display: 'block' }}
                >
                  Admin
                </Button>
                <Button
                  key='5'
                  onClick={this.signOut.bind(this)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  SignOut
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
          <Box
            sx={{
              mt: 15,
              mx: 20,
              px: 4,
              py: 10,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow: 5,
            }}
          >
            <Grid container spacing={6} justifyContent="center">
              <Grid item>
                <Typography
                  class="can-do-co-op"
                  variant="h1"
                  component="h1"
                  align="center"
                  gutterBottom
                  style={{
                    color: '#333',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px #ccc',
                    letterSpacing: '0.1em',
                    lineHeight: '1.2',
                  }}
                >
                  CAN-DO-CO-OP
                  <br></br><br></br>
                </Typography>
              </Grid>
            </Grid>
            <div style={{ border: '3px solid #ccc', padding: '0.5rem', backgroundColor: '#f5f5f5', animation: 'fade-in 3s forwards' }}>
              <Typography
                variant="h1"
                component="h1"
                align="center"
                gutterBottom
                style={{
                  color: '#000',
                  fontSize: '1.5rem',
                  letterSpacing: '0.1em',
                  lineHeight: '1.2',
                }}
              >
                Can Do Co-op is a website that connects students with experienced reviewers to get feedback on their cover letters, resumes, and work term reports. <br></br>It's a user-friendly platform with helpful resources and tips for students to improve their job search skills.
              </Typography>
            </div>
            <Grid container
              direction="column"
              judtifyContent="center"
              alignItems="center">

            </Grid>
          </Box>
        </Box>

      </ThemeProvider>
    );
  }
}

const Home = compose(withRouter, withFirebase)(HomeBase);

export default Home;
