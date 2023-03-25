import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBar from '../MenuBar/menu';
import { useSelector } from 'react-redux';
import firebase from "firebase/app";
import axios from "axios";
import FileSaver from "file-saver";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

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

    //Gets and returns document ID
    const viewCount = useSelector((state) => state.viewer.value)
    console.log(viewCount)
    const docs = [{ uri: endpoint + '/files/' + viewCount }];

    //Gets and returns users email
    const [userEmail, setUserEmail] = React.useState("");
    firebase.auth().onAuthStateChanged((user) => {
        //if user is logged in then get the user email
        if (user) {
            setUserEmail(user.email);
        }
    });
    console.log(userEmail)

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
                        <Typography variant="h6" component="div">
                            {"User: " + userEmail}
                        </Typography>
                        <Typography variant="h6" csmponent="div">
                            {"Document ID: " + viewCount}
                        </Typography>

                        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
                    </Grid>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;