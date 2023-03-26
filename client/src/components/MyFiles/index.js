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
import { setView } from '../Store/viewerSlice';

const opacityValue = 0.9;
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3306";
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

    const [docList, setDocList] = React.useState([]);

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
    
    const createList = (givenList) => {
        {
            givenList.map((doc) => {
                if (doc.doc_type !== "Reviewer") {
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
        callApiEdit(id);
    }

    const handleDelSubmit = (id) => {
        console.log(id);
        callApiDelete(id);
    }

    const handleComSubmit = (id) => {
        console.log(id);
        dispatch(setView(id))
        history.push('/View');
    }

    const callApiDelete = async () => {

    }

    const callApiEdit = async () => {

    }

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
                            onClick={() => history.push('/')}
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
                    style={{ maxWidth: '73.5%' }}
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
                                            <Grid item xs={5}><Item>{doc.doc_name}</Item></Grid>
                                            <Grid item xs={2}><Item>{doc.doc_type}</Item></Grid>
                                            <Grid item xs={2}><Item>{doc.tag}</Item></Grid>
                                            <Grid item xs={2.5} spacing={0}>
                                                <Button variant="contained" color='secondary' onClick={() => handleEditSubmit(doc.id)} >Edit</Button>
                                                <Button variant="contained" color='secondary' onClick={() => handleDelSubmit(doc.id)} >DELETE</Button>
                                                <Button variant="contained" color='secondary' onClick={() => handleComSubmit(doc.id)} >COMMENTS</Button>
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