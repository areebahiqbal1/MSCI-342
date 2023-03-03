import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FileApp from './FileApp'

const opacityValue = 0.9;

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

    const [upload, setUpload] = React.useState('');

    const [docType, setType] = React.useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const [tag, setTag] = React.useState('');

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleUpload = (event) => {
        setUpload(event.target.value);
    }

    const handleSubmit = (event) => {
        
    }

    const clear = () => {
        setType('');
        setTag('');
        setUpload('');
    }
    
    return (
        <ThemeProvider theme={lightTheme}>
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
                        Upload Documents
                    </Typography>
                    <Typography variant="h6" component="div">
                        Resumes, Cover Letters, or Work Term Reports
                    </Typography>
                    <br />
                    <Grid>
                        <FileApp />
                        <Grid>{upload}</Grid>
                    </Grid>
                    <br />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Document Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={docType}
                                label="Document Type"
                                onChange={handleTypeChange}
                            >
                                <MenuItem value={'Resume'}>Resume</MenuItem>
                                <MenuItem value={'WorkTermReport'}>Work Term Report</MenuItem>
                                <MenuItem value={'CoverLetter'}>Cover Letter</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <br />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tag}
                                label="Document Tag"
                                onChange={handleTagChange}
                            >
                                <MenuItem value={'Finance'}>Finance</MenuItem>
                                <MenuItem value={'Coding'}>Coding</MenuItem>
                                <MenuItem value={'Accounting'}>Accounting</MenuItem>
                                <MenuItem value={'Arts'}>Arts</MenuItem>
                                <MenuItem value={'Science'}>Science</MenuItem>
                                <MenuItem value={'Engineering'}>Engineering</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <br />
                    <Grid container>
                        <Button variant="contained" color='secondary' onClick={handleSubmit} style={{marginRight: '10px'}}>Submit</Button>
                        <Button variant="contained" color='secondary' onClick={clear} style={{marginRight: '10px'}}>Clear</Button>
                    </Grid>
                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

export default App;