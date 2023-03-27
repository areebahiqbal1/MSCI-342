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
import Paper from '@mui/material/Paper';
import MenuBar from '../MenuBar/menu';

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
            light: '#ffffff',
            dark: '#ffffff'
        },
    },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const App = () => {

    return (
        <ThemeProvider theme={lightTheme}>
            <MenuBar />
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                    backgroundImage: `url(https://source.unsplash.com/_0sEjWfAK3Q)`,
                    backgroundSize: "cover"

                }}
            >
                <MainGridContainer
                    container
                    spacing={1}
                    style={{ maxWidth: '90%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography variant="h3" gutterBottom component="div">
                        About Us
                    </Typography>
                    <Typography variant="h6" component="div">
                        Our dedicated team and mission
                    </Typography>
                    <br />
                    <Paper>
                        <Box height="150px" spacing={2} textAlign="center">
                            <div>
                                <h2>Mission Statement</h2>
                                <p>To enable students in their pursuit of employment by ensuring</p>
                                <p>they have the proper support and tools to exceed interview expectations.</p>
                            </div>
                        </Box>
                    </Paper>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box textAlign={"center"}>
                                <img src="./Chicken1.jpg" alt="logo" />
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper>
                                <Box fullWidth height="150px" spacing={2} textAlign="center" padding={2}>
                                    <div>
                                        <h2>Areeba Iqbal</h2>
                                        <p>Team Captain.</p>
                                    </div>
                                </Box>
                            </Paper>
                        </Grid>
                        <br />
                        <Grid item xs={8}>
                            <Paper>
                                <Box fullWidth height="150px" spacing={2} textAlign="center" padding={2}>
                                    <div>
                                        <h2>Aamina</h2>
                                        <p>Lablet God</p>
                                    </div>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Box textAlign={"center"}>
                                <img src="./Chicken3.jpg" alt="logo" />
                            </Box>
                        </Grid>
                        <br />
                        <Grid item xs={4}>
                            <Box textAlign={"center"}>
                                <img src="./Chicken4.jpg" alt="logo" />
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper>
                                <Box fullWidth height="150px" spacing={2} textAlign="center" padding={2}>
                                    <div>
                                        <h2>Dylan Chow</h2>
                                        <p>Extremely muscular. Extremely.</p>
                                    </div>
                                </Box>
                            </Paper>
                        </Grid>
                        <br />
                        <Grid item xs={8}>
                            <Paper>
                                <Box fullWidth height="150px" spacing={2} textAlign="center" padding={2}>
                                    <div>
                                        <h2>Tristan Walker</h2>
                                        <p>Philantropist, upstanding civilian, good samartian and all around nice guy.</p>
                                    </div>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Box textAlign={"center"}>
                                <img src="./Chicken2.jpg" alt="logo" />
                            </Box>
                        </Grid>
                    </Grid>
                    <br />
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

export default App;