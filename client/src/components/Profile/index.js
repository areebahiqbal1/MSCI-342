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

const opacityValue = 0.9;

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#EEE2DC',
            light: '#f5eae6',
            dark: '#ffffff',
            background: '#ffffff'
        },
        secondary: {
            main: "#EDC7B7",
            light: '#EDC7B7',
            dark: '#EDC7B7'
        },
    },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

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
                        Profile
                    </Typography>
                    <Typography variant="h6" component="div">
                        Manage your information
                    </Typography>
                    <br />
                    <Grid>
                    </Grid>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;