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
import MenuBar from '../MenuBar/menu';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../Store/viewerSlice';
import firebase from "firebase/app";
import axios from "axios";
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import ComIcon from '@mui/icons-material/ChatBubble';

const opacityValue = 0.9;
const endpoint = "http://localhost:4000";

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
            light: '#000000',
            dark: '#EDC7B7'
        },
    },
});


const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const App = () => {

    const viewCount = useSelector((state) => state.viewer.value)
    const dispatch = useDispatch()

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: lightTheme.palette.primary.light,
        height: 37,
        lineHeight: '40px',
    }));

    const [userEmail, setUserEmail] = React.useState("");

    firebase.auth().onAuthStateChanged((user) => {
        //if user is logged in then get the user email
        if (user) {
            setUserEmail(user.email);
        }
    });

    React.useEffect(() => {
        if (userEmail !== "") {
            handleDocSearch();
        }
    }, [userEmail]);

    const [userID, setUserID] = React.useState("");
    const [industry, setIndustry] = React.useState("");

    const getUser = async () => {
        const url = endpoint + "/api/getUser";
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
    const [docList, setDocList] = React.useState([]);

    const handleDocSearch = () => {
        getUser()
            .then(res => {
                var parsed = JSON.parse(res.express);
                parsed = parsed[0];
                console.log(parsed);
                setUserID(parsed.user_id);
                setIndustry(parsed.industry);
            });
    }

    React.useEffect(() => {
        if (industry !== "" & docList == []) {
            callApiFindIndustryDocs()
                .then(res => {
                    var docParsed = JSON.parse(res.express);
                    console.log(docParsed);
                    setDocList(docParsed);
                });
        }
    }, [industry])

    const callApiFindIndustryDocs = async () => {

        const url = endpoint + "/api/getIndustryDocs";
        console.log(url);
        console.log(industry);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: industry
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleEditSubmit = (id) => {
        console.log(id);
        dispatch(setView(id));
    }

    const handleClaimSubmit = (id) => {
        console.log(id);
        dispatch(setView(id));
        ClaimDocument(id);
    }

    const ClaimDocument = (id) => {
        callApiClaimDocs(id);
        window.location.reload();
    }

    const callApiClaimDocs = async (id) => {

        const url = endpoint + "/api/Claim";
        console.log(url);
        console.log(userID);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: userID,
                id: id
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleComSubmit = (id) => {
        console.log(id);
        dispatch(setView(id))
        history.push('/View');
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
                    style={{ maxWidth: '90%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography variant="h3" gutterBottom component="div">
                        Review Document
                    </Typography>
                    <Typography variant="h6" component="div">
                        Let the student know where to improve.
                    </Typography>
                    <br />
                    <Grid>
                        {docList.map((doc) => {
                            if (doc.doc_type !== "Reviewer") {
                                return (
                                    <Box
                                        sx={{
                                            p: 1,
                                            bgcolor: 'primary.light',
                                            display: '',
                                            gridTemplateColumns: { md: '1fr 1fr' },
                                            gap: 1,
                                        }}
                                    >
                                        <Grid container spacing={0}>
                                            <Grid item color='secondary' xs={5}><Item>{doc.doc_name}</Item></Grid>
                                            <Grid item color='secondary' xs={2}><Item>{doc.doc_type}</Item></Grid>
                                            <Grid item color='secondary' xs={2}><Item>{doc.tag}</Item></Grid>
                                            <Grid item xs={2.5} spacing={0}>
                                                <Button variant="contained" color='secondary' onClick={() => handleEditSubmit(doc.id)} ><EditIcon /></Button>
                                                <Button variant="contained" color='secondary' onClick={() => handleClaimSubmit(doc.id)} >Claim</Button>
                                                <Button variant="contained" color='secondary' onClick={() => handleComSubmit(doc.doc_name)} ><ComIcon /></Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            }
                        }
                        )}
                    </Grid>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;