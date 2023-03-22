import * as React from 'react';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

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

const App = () => {

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
                                onClick={() => history.push('/SignOut')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                SignOut
                            </Button>
                            <Button
                                key='6'
                                onClick={() => history.push('/Review')}
                                sx={{ my: 2, color: 'red', display: 'block' }}
                            >
                                Review
                            </Button>
                            <Button
                                key='6'
                                onClick={() => history.push('/Calendar')}
                                sx={{ my: 2, color: 'red', display: 'block' }}
                            >
                                Calendar
                            </Button>
                            <Button
                                key='6'
                                onClick={() => history.push('/Admin')}
                                sx={{ my: 2, color: 'red', display: 'block' }}
                            >
                                Admin
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
    )};

    export default App;