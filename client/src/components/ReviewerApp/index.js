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
                        <FileApp />
                    </Grid>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;