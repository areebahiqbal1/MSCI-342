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
import { useSelector, useDispatch } from 'react-redux';
import firebase from "firebase/app";
import { setView } from '../Store/viewerSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ComIcon from '@mui/icons-material/ChatBubble';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const opacityValue = 0.9;
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3306";
const serverURL = "http://localhost:4000";
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

    const viewCount = useSelector((state) => state.viewer.value)
    const dispatch = useDispatch()

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: lightTheme.palette.primary.light,
        height: 37,
        lineHeight: '40px',
    }));

    const [docList, setDocList] = React.useState([]);

    const [userEmail, setUserEmail] = React.useState("");

    firebase.auth().onAuthStateChanged((user) => {
        //if user is logged in then get the user email
        if (user) {
            setUserEmail(user.email);
        }
    });

    const [userID, setUserID] = React.useState("");

    React.useEffect(() => {
        if (userEmail !== "") {
            handleUserID();
        }
    }, [userEmail]);

    const handleUserID = () => {
        getUser()
            .then(res => {
                var parsed = JSON.parse(res.express);
                parsed = parsed[0];
                console.log(parsed.user_id);
                setUserID(parsed.user_id);
            });
    }

    const getUser = async () => {
        const url = serverURL + "/api/getUser";
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

    React.useEffect(() => {
        handleDocSearch();
    }, [userID]);

    const handleDocSearch = () => {
        callApiFindDocs()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setDocList(parsed);
            });
    }

    const callApiFindDocs = async () => {

        const url = serverURL + "/api/getDocs";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }


    const delDocument = (id) => {
        callApiDelDocs(id);
        window.location.reload();
    }

    const callApiDelDocs = async (id) => {

        const url = serverURL + "/api/delDocs";
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

    const createList = (givenList) => {
        {
            givenList.map((doc) => {
                if ((doc.doc_type !== "Reviewer") & (doc.user_email == userEmail | doc.reviewer_id == userID)) {
                    return (
                        <Typography>
                            {doc.doc_name}
                        </Typography>
                    )
                }
            }
            )
        }
    }

    const handleEditSubmit = (id) => {
        console.log(id);
        dispatch(setView(id));
        editDocs(id);
    }

    const handleDelSubmit = (id) => {
        console.log(id);
        dispatch(setView(id));
        delDocument(id);
    }

    const handleComSubmit = (id) => {
        console.log(id);
        dispatch(setView(id))
        history.push('/View');
    }

    const [newName, setNewName] = React.useState("");
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const [newIndustry, setNewIndustry] = React.useState("");
    const handleIndustryChange = (event) => {
        setNewIndustry(event.target.value);
    }

    const [newType, setNewType] = React.useState("");
    const handleTypeChange = (event) => {
        setNewType(event.target.value);
    }

    const editDocs = (id) => {
        callApiEditDocs(id);
        window.location.reload();
    }

    const callApiEditDocs = async (id) => {

        const url = serverURL + "/api/editDocs";
        console.log(url);
        console.log(viewCount);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                viewCount: id,
                newName: newName,
                newIndustry: newIndustry,
                newType: newType,
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
                    style={{ maxWidth: '90%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography variant="h3" gutterBottom component="div">
                        My Files
                    </Typography>
                    <Typography variant="h6" component="div">
                        Manage your uploads and view their feedback
                    </Typography>
                    <br />
                    <Grid>
                        {docList.map((doc) => {
                            if ((doc.doc_type !== "Reviewer") & (doc.user_email == userEmail | doc.reviewer_id == userID)) {
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
                                            <Grid item color='secondary' xs={5} >
                                                <Paper elevation={1} >
                                                    <Box height="30px" padding="12px">
                                                        <TextField defaultValue={doc.doc_name} onChange={handleNameChange} fullWidth disableUnderline={true} size="small" variant="standard" />
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            <Grid item color='secondary' xs={2}>
                                                <Paper elevation={1} >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={doc.doc_type}
                                                            label="Document Type"
                                                            onChange={handleTypeChange}
                                                        >
                                                            <MenuItem value={'Resume'}>Resume</MenuItem>
                                                            <MenuItem value={'WorkTermReport'}>Work Term Report</MenuItem>
                                                            <MenuItem value={'CoverLetter'}>Cover Letter</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Paper>
                                            </Grid>
                                            <Grid item color='secondary' xs={2}>
                                                <Paper elevation={1} >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={doc.tag}
                                                            label="Document Tag"
                                                            onChange={handleIndustryChange}
                                                        >
                                                            <MenuItem value={'Finance'}>Finance</MenuItem>
                                                            <MenuItem value={'Coding'}>Coding</MenuItem>
                                                            <MenuItem value={'Accounting'}>Accounting</MenuItem>
                                                            <MenuItem value={'Arts'}>Arts</MenuItem>
                                                            <MenuItem value={'Science'}>Science</MenuItem>
                                                            <MenuItem value={'Engineering'}>Engineering</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={2.5} spacing={0}>
                                                <Box padding="8px">
                                                    <Button variant="contained" color='secondary' size="large" onClick={() => handleEditSubmit(doc.id)} ><EditIcon /></Button>
                                                    <Button variant="contained" color='secondary' size="large" onClick={() => handleDelSubmit(doc.id)} ><DeleteIcon /></Button>
                                                    <Button variant="contained" color='secondary' size="large" onClick={() => handleComSubmit(doc.doc_name)} ><ComIcon /></Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            }
                        }
                        )}
                        {createList(docList)}
                    </Grid>
                    <br />
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;