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
import './Landing.css';


const serverURL = "";

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#EDC7B7"
    },
    primary: {
      main: '#EDC7B7',
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

// class HomeBase extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       token: "",
//       userID: "",
//       mode: 0,
//     };
//   }

//   async componentDidMount() {
//     if (this.props.authUser.uid !== null) {
//       this.setState({ userID: this.props.authUser.uid });
//       await this.getToken();
//       this.loadUserSettings();
//     }
//   }

//   getToken = async () => {
//     const url = serverURL + "/login";
//     await this.props.firebase.doGetIdToken(true).then(async (idToken) => {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: idToken }),
//       });
//       const body = await response.json();
//       if (response.status !== 200) {
//         this.setState({ token: null });
//         throw Error(body.message);
//       } else {
//         this.setState({ token: body.token });
//       }
//     });
//   };

//   loadUserSettings() {
//     console.log("called load user settings");

//     this.callApiLoadUserSettings().then((res) => {
//       //console.log("loadUserSettings returned: ", res)
//       var parsed = JSON.parse(res.express);
//       console.log("loadUserSettings parsed: ", parsed[0].mode);
//       this.setState({ mode: parsed[0].mode });
//     });
//   }

//   callApiLoadUserSettings = async () => {
//     const url = serverURL + "/api/loadUserSettings";

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${this.state.token}`,
//       },
//       body: JSON.stringify({
//         userID: this.state.userID,
//       }),
//     });
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);
//     console.log("User settings: ", body);
//     return body;
//   };

//   signOut() {
//     this.setState({ mobileMoreAnchorEl: null });
//     this.props.firebase.doSignOut();
//     this.props.history.push("client\src\components\Home\index.js");
//   }

function TheLanding() {
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
    </Typography>
  </Grid>
</Grid>
<Grid container
direction="column"
judtifyContent="center"
alignItems="center">

    <Button
            key='1'
            onClick={() => history.push('/SignUp')}
            type="submit"
            halfWidth
            variant="contained"
            color="primary"
          >
            Sign Up
        </Button>  
   <br></br>
   <br></br>
      <Button
            key='2'
            onClick={() => history.push('/SignIn')}
            type="submit"
            halfWidth
            variant="contained"
            color="primary"
          >
            Sign In
        </Button>  
   </Grid>
    </Box>
    </Box>

  </ThemeProvider>
);
  
}


export default TheLanding;
