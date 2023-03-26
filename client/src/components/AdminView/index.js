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
import { useSelector } from 'react-redux';
import FileSaver from "file-saver";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from "axios";
import MenuBar from '../MenuBar/menu';


const opacityValue = 0.9;
const endpoint = "http://localhost:4000";

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

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const App = () => {

    const viewCount = useSelector((state) => state.viewer.value)
    console.log(viewCount)
    const docs = [{ uri: endpoint + '/files/' + viewCount }];

    const handleDownload = () => {
        axios({
            method: 'get',
            url: endpoint + '/files/' + viewCount,
            responseType: 'blob'
        })
            .then((response) => {
                FileSaver.saveAs(response.data, viewCount);
            });
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
                        Doc View
                    </Typography>
                    <Typography variant="h6" component="div">
                        View comments and edit your document.
                    </Typography>
                    <br />
                    <Grid>
                        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
                    </Grid>
                    <Button variant="contained" color='secondary' onClick={() => handleDownload()} >Download</Button>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;