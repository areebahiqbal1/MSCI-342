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
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
            },
            body: JSON.stringify({

            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
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
                            onClick={() => history.push('/SignOut')}
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
                    style={{ maxWidth: '50%' }}
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
                            return (
                                <Typography>
                                    {doc.doc_name}
                                </Typography>
                            )
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