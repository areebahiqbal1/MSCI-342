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
import FileSaver from "file-saver";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from "axios";
import MenuBar from '../MenuBar/menu';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../Store/viewerSlice';


const opacityValue = 0.9;
const endpoint = "http://localhost:4000";

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

    const viewCount = useSelector((state) => state.viewer.value)
    console.log(viewCount)
    const dispatch = useDispatch()

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

    const handleAccept = (id) => {
        dispatch(setView(id));
        delDocument(id);
    }

    const handleReject = (id) => {
        dispatch(setView(id));
        delDocument(id);
    }

    const delDocument = (id) => {
        callApiDelDocs(id);
        window.location.reload();
    }

    const callApiDelDocs = async (id) => {

        const url = endpoint + "/api/delDocs";
        console.log(url);
        console.log(viewCount);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                viewCount: id,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
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
                        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
                    </Grid>
                    <Button variant="contained" color='secondary' onClick={() => handleDownload()} >Download</Button>
                    <br />
                    <Button variant="contained" color='secondary' onClick={() => handleAccept(viewCount)} ><Check /></Button>
                    <br />
                    <Button variant="contained" color='secondary' onClick={() => handleReject(viewCount)} ><Clear /></Button>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;