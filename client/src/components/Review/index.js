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
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import ComIcon from '@mui/icons-material/ChatBubble';
import Paper from '@mui/material/Paper';
import firebase from "firebase/app";
import { setView, setView2 } from '../Store/viewerSlice';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    const viewCount2 = useSelector((state) => state.viewer.value2)
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
        if (userEmail !== "" && industry == "") {
            handleUserFetch();
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

    React.useEffect(() => {
        if (docList.length == 0) {
            handleDocSearch();
        }
    }, [docList]);

    const handleDocSearch = () => {
        callApiFindIndustryDocs()
            .then(res => {
                var parsed = JSON.parse(res.express);
                console.log(parsed + " 5");
                setDocList(parsed);
            });
        console.log("Doc Search Called");
    }

    const handleUserFetch = () => {
        getUser()
            .then(res => {
                var parsed = JSON.parse(res.express);
                parsed = parsed[0];
                console.log(parsed + " 4");
                setUserID(parsed.user_id);
                setIndustry(parsed.industry);
            });
        console.log("User Search Called");
    }

    /*const handleDocSearch = () => {
        getUser()
            .then(res => {
                var parsed = JSON.parse(res.express);
                parsed = parsed[0];
                console.log(parsed);
                setUserID(parsed.user_id);
                setIndustry(parsed.industry);
                setRole(parsed.user_role);
            });
    }*/

    /*React.useEffect(() => {
        console.log("test1");
        if (docList.length == 0) {
            console.log("test2");
            callApiFindIndustryDocs()
                .then(res => {
                    var docParsed = JSON.parse(res.express);
                    console.log(docParsed);
                    setDocList(docParsed);
                });
        }
        console.log(docList);
    }, [industry]) */

    const callApiFindIndustryDocs = async () => {

        const url = endpoint + "/api/getIndustryDocs";
        console.log(url);
        console.log(industry + " 6");

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

    const handleComSubmit = (id, id2) => {
        console.log(id + " 8");
        dispatch(setView(id))
        dispatch(setView2(id2))
        history.push('/View');
    }
    const createList = (givenList) => {
        {
            givenList.map((doc) => {
                return (
                    <Typography>
                        {doc.doc_name}
                    </Typography>
                )
            }
            )
        }
    }

    const [role, setRole] = React.useState(-1);

    const allowView = () => {
        if (role == 1) {
        
    

    return (
                <Grid>
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
                                                <Button variant="contained" color='secondary' onClick={() => handleComSubmit(doc.doc_name, doc.id)} ><ComIcon /></Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            }
                        }
                        )}
                    </Grid>
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
                    style={{ maxWidth: '90%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    {allowView()}
                </MainGridContainer>

                                </Box>
                            </ThemeProvider>
                            );
}

                            export default App;