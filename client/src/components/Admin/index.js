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
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../Store/viewerSlice';
import ViewIcon from '@mui/icons-material/Visibility';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';

const opacityValue = 0.9;
const serverURL = "";

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
    const [num, setNum] = React.useState([]);

    React.useEffect(() => {
        handleDocSearch();
    }, []);

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

    const callApiSetReviewer = async (email, tag) => {

        const url = serverURL + "/api/setReviewer";
        console.log(url);
        console.log(viewCount);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: tag,
                email: email
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }


    const createList = (givenList) => {
        {
            givenList.map((doc) => {
                if (doc.doc_type == "Reviewer") {
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

    const addNum = () => {
        var i = num + 1;
        setNum(i);
    }

    const delDocument = (id) => {
        callApiDelDocs(id);
        window.location.reload();
    }

    const handleAccept = (id, email, tag) => {
        dispatch(setView(id));
        delDocument(id);
        callApiSetReviewer(email, tag)
    }

    const handleReject = (id) => {
        dispatch(setView(id));
        delDocument(id);
    }

    const handleView = (id) => {
        console.log(id)
        dispatch(setView(id))
        history.push('/AdminView');
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
                    style={{ maxWidth: '73.5%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography variant="h3" gutterBottom component="div">
                        Admin
                    </Typography>
                    <Typography variant="h6" component="div">
                        Review applications for the reviewer role
                    </Typography>
                    <br />
                    <Grid>
                        {docList.map((doc) => {
                            if (doc.doc_type == "Reviewer") {
                                console.log(doc)
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
                                            <Grid item xs={3}><Item>{doc.doc_name}</Item></Grid>
                                            <Grid item xs={4}><Item>{doc.user_email}</Item></Grid>
                                            <Grid item xs={2}><Item>{doc.tag}</Item></Grid>
                                            <Grid item xs={2.5} spacing={0}>
                                                <Button variant="contained" color='secondary' onClick={() => handleAccept(doc.id, doc.user_email, doc.tag)} ><Check /></Button>
                                                <Button variant="contained" color='secondary' onClick={() => handleReject(doc.id)} ><Clear /></Button>
                                                <Button variant="contained" color='secondary' onClick={() => handleView([doc.doc_name, doc.id])} ><ViewIcon /></Button>
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