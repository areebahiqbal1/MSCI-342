import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from "../Navigation/history";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import firebase from "firebase/app";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const serverURL = "http://localhost:4000";
//const serverURL = "ec2-18-216-101-119.us-east-2.compute.amazonaws.com";
const fetch = require("node-fetch");
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

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [fieldUpdated, setFieldUpdated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //if user is logged in then get the user email
      if (user) {
        setUserEmail(user.email);
        //loadApiAvg();
      }
    });
    console.log(userEmail);
  }, []);

  useEffect(() => {
    if (userEmail) {
      loadApiUserName();
    }
  }, [userEmail]);

  useEffect(() => {
    if (inputValue) {
      loadApiUpdateName();
    }
  }, [inputValue]);

  const loadApiUserName = () => {
    callApiUserName().then((res) => {
      console.log("callApiFindAvg returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiFindAvg parsed: ", parsed[0]);
      setUserName(parsed);
    });
  };

  //call the post api thingy
  const callApiUserName = async () => {
    const url = serverURL + "/api/getAvrage";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        theEmail: userEmail,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found user: ", body);
    return body;
  };
  //for updating the usernaame of the user:
  const loadApiUpdateName = () => {
    callApiUpdateName().then((res) => {
      console.log(res.message);
    });
  };

  const callApiUpdateName = async () => {
    const url = serverURL + "/api/profile";
    console.log(url);
    let revContent = {
      email: userEmail,
      newName: inputValue,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(revContent),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`User input value: ${inputValue}`);
    // Do something with the user input value, such as saving it to a database
    setFieldUpdated(true);
    setInputValue("");
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

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
          <br />
          <Grid>
            <Card background="primary">
              <CardContent>
                <Typography variant="h5" component="h2" color="Secondary">
                  My Profile
                </Typography>
                <Typography color="textSecondary">User Name</Typography>
                <Typography gutterBottom>
                  <Typography variant="b1" gutterBottom component="div">
                    {console.log(userName[0])}

                    <div>
                      {userName.map((link) => {
                        return <div>{link.user_name}</div>;
                      })}
                    </div>
                  </Typography>
                </Typography>
                <Typography color="textSecondary">Email</Typography>
                <Typography gutterBottom>{userEmail}</Typography>
                {!showMore && (
                  <Button
                    onClick={handleShowMore}
                    variant="contained"
                    color="primary"
                  >
                    Edit profile
                  </Button>
                )}
                {showMore && (
                  <Card variant="outlined">
                    <CardContent>
                      <form onSubmit={handleSubmit}>
                        <TextField
                          id="user-input"
                          label="Edit Username"
                          value={inputValue}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Save
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </Grid>
          <br />
        </MainGridContainer>
      </Box>
    </ThemeProvider>
  );
};

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

/*import * as React from "react";
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

const serverURL = "http://localhost:4000";
//const serverURL = "ec2-18-216-101-119.us-east-2.compute.amazonaws.com";

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
    userEmail: "",
    userName: "",
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      //if user is loged in then get the user email
      if (user) {
        this.setState({ userEmail: user.email });
      }
    });
    //loadApiAvg();
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
              {this.state.userName}
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

export default App;*/

/*loadApiAvg = () => {
    callApiAvg().then((res) => {
      console.log("callApiFindAvg returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiFindAvg parsed: ", parsed[0]);
      this.setState({ userName: parsed[0] });
      console.log(this.state.userName);
    });
  };

  //call the post api thingy
  callApiAvg = async () => {
    const url = serverURL + "/api/getAvrage";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        email: this.state.userEmail,
      }),
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found recipes: ", body);
    return body;
  };*/
