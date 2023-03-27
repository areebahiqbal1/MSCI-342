import * as React from 'react';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { withFirebase } from "../Firebase";
import firebase from "firebase/app";


const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#EEE2DC',
            light: '#f5eae6',
            dark: '#000000',
            background: '#ffffff'
        },
        secondary: {
            main: "#EDC7B7",
            light: '#000000',
            dark: '#EDC7B7'
        },
    },
});
const App = () => {
    //const signOut = () => {
        
        //history.push('/SignOut')
    //  }

    //Gets and returns users email
    const [userEmail, setUserEmail] = React.useState("");
    firebase.auth().onAuthStateChanged((user) => {
        //if user is logged in then get the user email
        if (user) {
            setUserEmail(user.email);
        }
    });
    console.log(userEmail)

    const handleLogout =() => {
        firebase.auth().signOut();
        history.push('/');
    }

    return (
        <ThemeProvider theme={lightTheme}>
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
                                key='6'
                                onClick={() => handleLogout()}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                SignOut
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
    )};

    export default App;