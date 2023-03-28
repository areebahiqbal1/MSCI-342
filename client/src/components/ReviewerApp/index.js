import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import FileApp from './FileApp'
import MenuBar from '../MenuBar/menu';
import firebase from "firebase/app";

const opacityValue = 0.9;
const serverURL = ""
;
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

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const App = () => {

    const [userEmail, setUserEmail] = React.useState("");
    firebase.auth().onAuthStateChanged((user) => {
        //if user is logged in then get the user email
        if (user) {
            setUserEmail(user.email);
        }
    });

    const [role, setRole] = React.useState(-1);

    React.useEffect(() => handleUser(), [])

    const handleUser = () => {
        getUser()
            .then(res => {
                var parsed = JSON.parse(res.express);
                parsed = parsed[0];
                setRole(parsed.user_role);
            });
    }

    const getUser = async () => {
        const url = serverURL + "/api/getUser";
        console.log(url);
        console.log("getting: " + userEmail)

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: userEmail
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const allowView = () => {
        if (role == 1) {
            return (
                <Grid>
                    <FileApp />
                </Grid>
            )
        }
        else {
            return (
                <Grid>
                    <Typography variant="h3" gutterBottom component="div">
                        You cannot view this page
                    </Typography>
                </Grid>
            )
        }
    }


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
                <MainGridContainer
                    container
                    spacing={1}
                    style={{ maxWidth: '50%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography variant="h3" gutterBottom component="div">
                        Reviewer Application page
                    </Typography>
                    <Typography variant="h6" component="div">
                        Apply to be a reviewer here (Applying more than once will overwrite your previous applications)
                    </Typography>
                    <br />
                    <Grid>
                        {allowView}
                    </Grid>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;